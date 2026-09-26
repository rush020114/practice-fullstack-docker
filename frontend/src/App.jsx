import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'

const HELLO_QUERY = gql`query { hello }`

function App() {
  const { loading, error, data } = useQuery(HELLO_QUERY)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  return <h1>{data.hello}</h1>
}

export default App