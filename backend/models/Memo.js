import mongoose from 'mongoose';

// schema: DB에 저장할 데이터가 어떤 모양인지 정의하는 설계도(메모를 저장할 때 내용은 글자, 작성 기간은 날짜)
// schema 정의를 위한 객체
const memoSchema = new mongoose.Schema({
  content: { // 컬럼명
    type: String, // 타입
    required: true, // 반드시 필요
  },
  createdAt: {
    type: Date,
    default: Date.now, // 자동 현재 시간 삽입
  },
});

// DB 접근 -> 위에서 정의한 schema의 memos(자동 복수형)라는 컬렉션(table과 비슷)을 만듦
const Memo = mongoose.model('Memo', memoSchema);

export default Memo;