import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose';

await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/practice');
console.log('MongoDB connected');

const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello from Node GraphQL + MongoDB!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { host: '0.0.0.0', port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);