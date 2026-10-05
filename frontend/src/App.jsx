import { gql } from '@apollo/client'
import { useMutation, useQuery } from '@apollo/client/react'
import { useState } from 'react';

// gql: graphql client가 이 안의 문자열을 graphql 문법으로 읽을 수 있게 해주는 keyword
// 조회는 query(읽기, DB를 바꾸지 않음), 변경은 mutation(생성/수정/삭제, DB를 바꿈)
// 현재는 조회여서 자동 실행
// 해석: memos라는 조회를 할 때 id, 내용, 만든 시간을 다 들고 오겠다.
const MEMOS_QUERY = gql`
  query {
    memos {
      id
      content
      createdAt
    }
  }
`

// mutation AddMemo($content: String)
// mutation: 조회가 아닌 변경 작업임을 선언
// AddMemo: 무슨 요청인지 구별하기 위한 label(임의로 지은 이름)
// ($content: String): content라는 이름의 변수를 받을 거고 type은 string임을 미리 선언하는 부분

// addMemo(content: $content) <- 실제 서버에 있는 addMemo를 호출하는 부분
// addMemo: 서버에 설정돼 있는 이름과 일치해야 함
// (content: $content): content라는 인자에 $content를 넣어 보낸다.
// id, content, createdAt: 실행 후 돌아오는 Memo에서 해당 값만 응답으로 받겠다.
const ADD_MEMO_MUTATION = gql`
  mutation AddMemo($content: String) {
    addMemo(content: $content) {
      id
      content
      createdAt
    }
  }
`

function App() {
  const [content, setContent] = useState('');
  // useQuery: provider에서 전달한 client로 인해 꺼내쓸 수 있는 함수
  const { loading, error, data } = useQuery(MEMOS_QUERY);
  // useQuery랑 달리 자동으로 실행하지 않고 실행할 수 있는 함수를 줌
  const [addMemo] = useMutation(ADD_MEMO_MUTATION, {
    refetchQueries: [{ query: MEMOS_QUERY }], // mutation이 끝나면 다시 쿼리를 실행해서 조회
  });

  const handleSubmit = (e) => {
    e.preventDefault()
    // 실제 mutation 요청
    // ADD_MEMO_MUTATION에 선언했던 변수를 채워넣고 보냄
    addMemo({ variables: { content } })
    setContent('')
  }
  
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  return (
    <div>
      <h1>메모 목록</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="메모 입력"
        />
        <button type="submit">추가</button>
      </form>
      <ul>
        {data.memos.map((memo) => (
          <li key={memo.id}>
            {memo.content} ({memo.createdAt})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App