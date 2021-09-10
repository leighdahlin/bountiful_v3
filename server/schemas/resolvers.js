const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { User, Item, Order, Review } = require('../models');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const { signToken } = require('../utils/auth');


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
            path: 'orders.orderitems'
          });
  
          return user.orders.id(_id);
        }
  
        throw new AuthenticationError('Not logged in');
      },
      checkout: async (parent, args, context) => {
        const url = new URL(context.headers.referer).origin;
        const order = new Order({ orderitems: args.orderitems });
        const line_items = [];
  
        const { orderitems } = await order.populate('orderitems').execPopulate();
  
        for (let i = 0; i < items.length; i++) {
          const item = await stripe.orderitems.create({
            item_name: orderitems[i].item_name,
            item_description: orderitems[i].item_description,            
          });
  
          const price = await stripe.prices.create({
            item: item.id,
            unit_amount: orderitems[i].item_quantity * orderitems[i].item_price,
            currency: 'usd',
          });
  
          line_items.push({
            price: price.id,
            quantity: 1
          });
        }
  
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items,
          mode: 'payment',
          success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${url}/`
        });
  
        return { session: session.id };
      }
    },

        //TODO: getReviews and getReview Queries:
        //reviews: async () => Review.find(),
        /*async getReviews() {
      try {
        const reviews = await Review.find().sort({ createdAt: -1 });//tells Mongoose to sort reviews in descending order
        return reviews;
      } catch (err) {
        throw new Error(err);
      }
    },
    
    //async getReview(_, { itemId }) {
      try {
        const review = await Review.findById(itemId);
        if (review) {
          return review;
        } else {
          throw new Error('Review not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    }*/
    

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
        console.log(review2)
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
  },
  };
    


module.exports = resolvers;