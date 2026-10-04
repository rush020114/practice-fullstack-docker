import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import App from './App.jsx'

// graphql server와 연결하기 위한 객체
const client = new ApolloClient({
  // http방식으로 graphql server와 연결
  // 요청을 줄 때 현재 있는 domain 정보에 /graphql을 추가
  link: new HttpLink({ uri: '/graphql' }),
  // server에서 받은 답을 어디 둘지 결정
  // 현재는 memory에 저장하여 같은 질문을 빠르게 대답
  cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById('root')).render(
  // App이 어디서든 server 연결용 graphql client를 꺼내쓸 수 있게 전역 component로 전달
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)