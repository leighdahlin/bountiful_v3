const { AuthenticationError } = require('apollo-server-express');
const { User, Item, Category } = require('../models');
// const { signToken } = require('../utils/auth'); NEED TO BUILD THIS FILE (EX22  WK22)

const resolvers = {
    Query: {
        categories: async () => Category.find(),
        items: async () => Item.find(),
        //Find items by category or username:
        items: async (parent, { category, username }) => {
            const params = {};
      
            if (category) {
              params.category = category;
            }
      
            if (username) {
              params.username = {
                $regex: username,
              };
            }
      
            return Item.find(params).populate('category');
          },
        //Single item search
        item: async (parent, { itemId }) => {
            return Item.findOne({ _id: itemId });
        },

        //Find a user based on the id (for a seller profile - does args bring in the correct id? Which one of these will work?)
        user: (parent, args) => {
          return User.find((user) => user.id === args.id);
        },
        user: async (parent, { userId }) => {
            return Profile.findOne({ _id: userId });
        },
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
              return User.findByIdAndUpdate(context.user.id, args, {
                new: true,
              });
            }
      
            throw new AuthenticationError('Not logged in');
        },
        createItem: async (parent, { item }) => {
            return Item.create({item});
          },
          updateItem: async (parent, { title, item_name, item_description, item_quantity, item_unit, item_price, cat_name }) => {
            return Profile.findOneAndUpdate(
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
          },
          removeItem: async (parent, { itemId }) => {
            return Item.findOneAndDelete({ _id: itemId });
          },


    },
};

module.exports = resolvers;