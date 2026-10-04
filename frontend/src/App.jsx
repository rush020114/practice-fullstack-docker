import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'

// gpl: graphql client가 이 안의 문자열을 graphql 문법으로 읽을 수 있게 해주는 keyword
// 조회는 query, 실행은 mutation
// 현재는 조회여서 자동 실행
// 해석: hello라는 조회를 하고 싶다.
const HELLO_QUERY = gql`query { hello }`

function App() {
  // useQuery: provider에서 전달한 client로 인해 꺼내쓸 수 있는 함수
  const { loading, error, data } = useQuery(HELLO_QUERY)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  return <h1>{data.hello}</h1>
}

export default App