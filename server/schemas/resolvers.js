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

        //Find a user based on the id (for a seller profile - does args bring in the correct id?)
        user: (parent, args) => {
          return User.find((user) => user.id === args.id);
        },


    },
};

module.exports = resolvers;