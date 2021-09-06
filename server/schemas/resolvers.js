const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { User, Item, Category } = require('../models');

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
        itemscat: async(parent, {category}) =>{
          return Item.find({category:category});
        },
        itemsuser: async(parent, {username}) =>{
          return Item.find({username:username});
        },
        //Single item search
        item: async (parent, { itemId }) => {
            return Item.findOne({ _id: itemId });
        },

        //Find a user based on the id (for a seller profile - does args bring in the correct id? Which one of these will work?)
        // user: (parent, args) => {
        //   return User.find((user) => user.id === args.id);
        // },
        user: async (parent, { username }) => {
            // console.log("++++++++++++++++++++++++++++++++")
            // console.log(username)
            // console.log("++++++++++++++++++++++++++++++++")
            return User.findOne({ username: username });
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
        updateUser: async (parent, {args}, context) => {
            if (context.user) {
              return User.findByIdAndUpdate(context.user.id, args, {
                new: true,
              });
            }
      
            throw new AuthenticationError('Not logged in');
        },

        // addItem: async (parent, args, context) => {
        //     console.log(args)
        //     console.log("INSIDE CREATE ITEM RESOLVER");
        //     // console.log(context.data);
        //     console.log(context.user);
        //     // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
        //     if (context.user) {
        //       return Item.create(args);
        //     }
        //     // If user attempts to execute this mutation and isn't logged in, throw an error
        //     throw new AuthenticationError('You need to be logged in!');
        //   },

          addItem: async (parent, args, context) => {
      
            if (context.user) {
              const item = new Item(args);
              console.log(args);
              console.log("INSIDE ADD ITEM RESOLVER");
              console.log(item);
      
              await User.findByIdAndUpdate(context.user._id, { $push: { items: item } });
      
              return item;
            }
            // If user attempts to execute this mutation and isn't logged in, throw an error
            throw new AuthenticationError('You need to be logged in!');
          },

          updateItem: async (parent, { title, item_name, item_description, item_quantity, item_unit, item_price, cat_name }, context) => {
            if(context.user){
            return Item.findOneAndUpdate(
              { _id: itemId },
              {
                $addToSet: { title: title, item_name: item_name, item_description: item_description,
                    item_quantity: item_quantity, item_unit: item_unit, item_price: item_price, cat_name: cat_name },
              },
              {
                new: true,
                runValidators: true,
              }
            );
            }
            throw new AuthenticationError('You need to be logged in!');
          },
          removeItem: async (parent, { itemId }, context) => {
              if(context.user){
                return Item.findOneAndDelete({ _id: itemId });
              }
              throw new AuthenticationError('You need to be logged in!');
          },
          //Add createReview behind a login:
          createReview: async (_, args, context) => {//putting _ in place of 'parent'. Context is
            //related to checking for user auth as a basis for having permission to post a review
            //const user = checkAuth(context);
            if (context.user) {
              return Review.create(args);
            }
            throw new AuthenticationError('You need to be logged in!');
          },
    
          //TODO: Add deleteReview behind a login:
         // deleteReview: async (_, { reviewId }, context) => {
            //try {
             // const review = await Review.findById({id: reviewId});
             // if (context.user) {
             //   await review.delete();
             //   return 'Review deleted successfully';
             // } else {
                //throw new AuthenticationError('Action not allowed');
             // }
           // } catch (err) {
             // throw new Error(err);
           // }
          
        },
      };
    


module.exports = resolvers;