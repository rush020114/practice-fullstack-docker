import { ApolloServer } from '@apollo/server'; // graphql을 구현하기 위한 library
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose'; // mongoDB를 편하게 다루게 해주는 library
import Memo from './models/Memo.js';

// Docker에 build될 때 환경 변수를 들고 와서 DB 연결
await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/practice');
console.log('MongoDB connected');

// typeDefs: 전달용 변수(이름은 관례적)
// #graphql: 주석 같은 개념
// type Query 부분부터 진짜 graphql 문법
// Query: client가 data를 조회(잘문)할 수 있는 진입점
// 해석: hello라는 질문을 받으면 문자열로 답해준다.

// [Memo]: memos라는 조회를 하면 Memo type의 배열을 돌려준다.

// addMemo: client는 content만 보내고, createdAt은 schema의 default로 자동 채워짐(Memo.js 참조)
const typeDefs = `#graphql
  type Memo {
    id: ID
    content: String
    createdAt: String
  }

  type Query {
    hello: String
    memos: [Memo]
  }

  type Mutation {
    addMemo(content: String): Memo
  }
`;

// 질문에 대한 실제 답(typeDefs에 정의된 이름과 resolver의 함수 이름이랑 같게 할 것)
const resolvers = {
  Memo: { 
    // parent: 지금 응답 중인 memo 객체 하나 (memos 조회든 addMemo 결과든 상관없이 Memo 타입이면 다 적용됨)
    // Memo 응답 시 createdAt을 사람이 읽을 수 있는 ISO 날짜/시간 문자열로 변환 (예: 2026-10-05T03:33:46.442Z)
    createdAt: (parent) => parent.createdAt.toISOString(),
  },
  Query: {
    hello: () => 'Hello from Node GraphQL + MongoDB!',
    memos: async () => await Memo.find() // Memo 배열 조회 함수
  },
  Mutation: {
    addMemo: async (_, { content }) => { // Memo의 내용 등록
      const memo = new Memo({ content }); // Memo 객체 생성 후
      await memo.save(); // collection에 저장
      return memo; // 저장된 memo(자동 생성된 id, createdAt 포함)를 client에게 바로 돌려줌 → 추가 조회 없이 결과 확인 가능
    }
  }
};

// apollo server 객체 만들기
const server = new ApolloServer({ typeDefs, resolvers });

// apollo server 실행 함수
const { url } = await startStandaloneServer(server, {
  // 4000 port를 개방하고 모든 ip의 요청을 다 받겠다
  listen: { host: '0.0.0.0', port: 4000 },
});

console.log(`Server ready at ${url}`);