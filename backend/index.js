import { ApolloServer } from '@apollo/server'; // graphql을 구현하기 위한 library
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose'; // mongoDB를 편하게 다루게 해주는 library

// Docker에 build될 때 환경 변수를 들고 와서 DB 연결
await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/practice');
console.log('MongoDB connected');

// typeDefs: 전달용 변수(이름은 관례적)
// #graphql: 주석 같은 개념
// type Query 부분부터 진짜 graphql 문법
// Query: client가 data를 조회(잘문)할 수 있는 진입점
// 해석: hello라는 질문을 받으면 문자열로 답해준다.
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

// 질문에 대한 실제 답(typeDefs에 정의된 이름과 resolver의 함수 이름이랑 같게 할 것)
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