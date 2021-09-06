type Comment = {
  _id?: string;
  parent_id: string;
  reply_to_post: boolean;
  content: string;
  voteup_count: number;
  commenter_id: string;
  commenter_name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export default Comment;
