const { AuthenticationError } = require('apollo-server-express');
const { User, Comment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      
      user: async (parent, args, context) => {
        if (context.user) {
          const user = await User.findById(context.user._id).populate({
            path: 'orders.products',
            populate: 'category'
          });
          user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
          return user;
        }
        throw new AuthenticationError('Not logged in');
      },
      getComments: async () => {
        return await Comment.find();
      }
  },
  Mutation: {
    addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
      },
      
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
      insertComment: async (parent, args) => {
        const comment = await Comment.create(args);
        return {comment}
      }
  }
  
}
  
  module.exports = resolvers;
  