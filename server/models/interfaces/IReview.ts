export default interface IReview {
  content: string;
  createdTime: number;
  comment_count: number;
  voteup_count: number;
  question_id: number;
  entity: string;
}
