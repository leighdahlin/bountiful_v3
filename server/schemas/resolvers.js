const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { User, Item, Order, Review } = require('../models');
const stripe = require('stripe')('sk_test_51JYJT2JDMSXsetnhqF7kZfG3mAEbFNjNMIN05OXkkCzOugaPFqkXlev6a1XyFVFbWCbSAxivmQwmwsNSEOZlQQmR001eRq7MnD');
const { signToken } = require('../utils/auth');
const AWS = require('aws-sdk');
const s3Bucket = process.env.S3_BUCKET;


const resolvers = {
    Query: {
        items: async () => Item.find(),
        itemscat: async(parent, {category_name}) =>{
          const filteredItems = await Item.find({category_name:category_name}).populate('user');
          return filteredItems;
        },
        itemsuser: async(parent, args, context) =>{
          return Item.find({username: context.user.username});
        },
        //Single item search
        item: async (parent, { _id }) => {
            return Item.findOne({ _id: _id }).populate('user');
        },

        //Find a seller based on the username: WORKING:
        seller: async (parent, { username }) => {
            // console.log("++++++++++++++++++++++++++++++++")
            // console.log(username)
            // console.log("++++++++++++++++++++++++++++++++")
            return User.findOne({ username: username }).populate({
              path:'items'
            });
        },
        //get review and get reviews Queries:
        reviews: async (parent, { reviewee }) => { 
          // console.log("username: " + reviewee)
          // console.log("IN QUERY REVIEW")
          return Review.find({ reviewee: reviewee }).populate({
          path:'user'
        })},
        
        review: async (parent, { reviewId }) => {
          return Review.findOne({ _id: reviewId });
        },

        user: async (parent, args, context) => {
          if(context.user){
            const user = await User.findById(context.user._id).populate({
              path: 'items'
            });
            //Sort the orders a user has made by most recent:
            user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
            return user;
          }    
      },
      order: async (parent, { _id }, context) => {
        if (context.user) {
          const user = await User.findById(context.user._id).populate({
            path: 'orders.items'
          });
  
          return user.orders.id(_id);
        }
  
        throw new AuthenticationError('Not logged in');
      },
      checkout: async (parent, args, context) => {
        // console.log("HITTING CHECKOUT RESOLVER");
        // console.log(args);
        const url = new URL(context.headers.referer).origin;
        // console.log("URL:");
        // console.log(url);
        const order = new Order({ items: args.items });
        // console.log("CREATED Items");
        // console.log(args.items);
        const line_items = [];

        
  
        const { items } = await order.populate('items').execPopulate();
        // console.log("ORDER ITEMS IN RESOLVER:");
        // console.log(orderitems.length);
  
        for (let i = 0; i < items.length; i++) {
          // console.log("INSIDE FOR LOOP");
          // console.log(i);
          // console.log(items);

          //stripe.products is specific to stripe naming convention. The name: is also a stripe specific key.
          const item = await stripe.products.create({
            name: items[i].item_name,
                        
          });
          // console.log("STRIPE ITEM CREATION");
          //   console.log(item);
          
  
          const price = await stripe.prices.create({
            product: item.id,
            unit_amount: items[i].item_quantity * items[i].item_price *100,
            currency: 'usd',
          });

          // console.log("STRIPE PRICE CREATION");
          // console.log(price);
  
          line_items.push({
            price: price.id,
            quantity: 1
          });
        }
        // console.log("LINE ITEM CREATION");
        // console.log(line_items);
        

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items,
          mode: 'payment',
          success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${url}/`
        });
        // console.log("SESSION IN RESOLVER:");
        // console.log(session);
  
        return { session: session.id };
      }
    },
  

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
      
            return { token, user };
        },
        updateUser: async (parent, args, context) => {
            if (context.user) {
              return User.findByIdAndUpdate(context.user._id, args, {
                new: true,
              });
            }
      
            throw new AuthenticationError('Not logged in');
        },

          addItem: async (parent, args, context) => {
      
            if (context.user) {
              //Create the item with the arguments coming in from the form input:
              const item = await Item.create(args);
              // console.log(args);
              // console.log("INSIDE ADD ITEM RESOLVER");
              // console.log(item);
              // console.log(item._id);

              //Since the item also has an associated user, update the created item with the user information:
              const item2 = await Item.findByIdAndUpdate({_id:item._id}, {$addToSet: {user: 
                {_id:context.user._id, username: context.user.username, location:context.user.location, email: context.user.email}}},
                {
                  new: true,
                  runValidators: true,
                });
                // console.log(item2);
              
              //Update a user with the created item:
              await User.findByIdAndUpdate(context.user._id, { $addToSet: { items: item2 } }, {
                new: true,
                runValidators: true,
              });              
              return item2;
            }
            // If user attempts to execute this mutation and isn't logged in, throw an error
            throw new AuthenticationError('You need to be logged in!');
          },

          updateItem: async (parent, { _id, title, item_name, item_description, item_quantity, item_unit, item_price, category_name }, context) => {
            if(context.user){
            return Item.findOneAndUpdate(
              { _id: _id },
              {
                title: title, item_name: item_name, item_description: item_description,
                    item_quantity: item_quantity, item_unit: item_unit, item_price: item_price, category_name: category_name },
              {
                new: true,
                runValidators: true,
              }
            );
            }
            throw new AuthenticationError('You need to be logged in!');
          },
          addOrder: async (parent, { items }, context) => {
            if (context.user) {
              const order = new Order({ items });
      
              await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
      
              return order;
            }
      
            throw new AuthenticationError('Not logged in');
          },

          removeItem: async (parent, { _id }, context) => {
            if (context.user) {
              const item = await Item.findOneAndDelete({_id: _id});
      
              await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { items: item._id } },
                {
                  new: true,
                  runValidators: true,
                }
              );
      
              return item;
            }
            throw new AuthenticationError('You need to be logged in!');
          },

          //Add createReview behind a login:
      createReview: async (parent, args, context) => {
      if (context.user) {
        const review = await Review.create(args);

        const review2 = await Review.findByIdAndUpdate({_id:review._id}, {$addToSet: {user: 
        {_id:context.user._id, username: context.user.username}}},
        {
          new: true,
          runValidators: true,
        });
      
        await User.findByIdAndUpdate(context.user._id, 
          {
            $addToSet: { reviews: review2 }
            },
        
          {
            new: true,
            runValidators: true,
          }
        );
        // console.log(review2)
        return review2;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    //Delete a review behind a login:
    deleteReview: async (_, { userId, reviewId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: userId },
          {
            $pull: {
              reviews: { 
                _id: reviewId,

               },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    //S3 Creation for profile pic:
    uploadFile: async (parent, {filename}, context) => {
      if(context.user){

        console.log("INSIDE UPLOAD FILE RESOLVER!!")
      const s3 = new AWS.S3({
        signatureVersion: 'v4',
        region: 'us-west-1',
      });

      const s3Params = {
        Bucket: s3Bucket,
        Key: filename,
        Expires: 60,
        ACL: 'public-read',
      };

      const signedRequest = await s3.getSignedUrl('putObject', s3Params);
      const url = `https://${s3Bucket}.s3.amazonaws.com/${filename}`;

      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $push: { picURL: url } },
        {
          new: true,
          runValidators: true,
        }
      );
      const data = await s3.upload(s3Params).promise();
      const { Location } = data;

      return {
        signedRequest,
        url,
        Location
      };
      }     
    },    
  },
  };
    


module.exports = resolvers;