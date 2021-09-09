const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { User, Item, Category, Review } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        categories: async () => Category.find(),
        items: async () => Item.find(),
        //Find items by category or username:
        // items: async (parent, { category, username }) => {
        //     const params = {};
      
        //     if (category) {
        //       params.category = category;
        //     }
      
        //     if (username) {
        //       params.username = {
        //         $regex: username,
        //       };
        //     }
      
        //     return Item.find(params).populate('category');
        //   },
        itemscat: async(parent, {category_name}) =>{
          return Item.find({category_name:category_name});
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
        reviews: async () => Review.find(),
        
        review: async (parent, { reviewId }) => {
          return Review.findOne({ _id: reviewId });
        },

        user: async (parent, args, context) => {
          if(context.user){
            const user = await User.findById(context.user._id).populate({
              path: 'items'
            });
            return user;
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

        // addItem: async (parent, args, context) => {
        //     // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
        //     if (context.user) {
        //       return Item.create(args);
        //     }
        //     // If user attempts to execute this mutation and isn't logged in, throw an error
        //     throw new AuthenticationError('You need to be logged in!');
        //   },

          addItem: async (parent, args, context) => {
      
            if (context.user) {
              //Create the item with the arguments coming in from the form input:
              const item = await Item.create(args);
              // console.log(args);
              // console.log("INSIDE ADD ITEM RESOLVER");
              // console.log(item);
              // console.log(item._id);

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
              //Update the item with the user that created the item from context:
              
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
          // removeItem: async (parent, { _id }, context) => {
          //     if(context.user){
          //       return Item.findOneAndDelete({ _id: _id });
          //     }
          //     throw new AuthenticationError('You need to be logged in!');
          // },

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
          createReview: async (_, { userId, title, body }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: {
              reviews: { title, body },
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