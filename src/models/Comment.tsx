type Comment = {
  _id?: string;
  parent_id: string;
  content: string;
  voteup_count: number;
  commenter_id: number;
  commenter_name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export default Comment;
