import { ApolloServer } from '@apollo/server'; // graphql을 구현하기 위한 library
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose'; // mongoDB를 편하게 다루게 해주는 library

// Docker에 build될 때 환경 변수를 들고 와서 DB 연결
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