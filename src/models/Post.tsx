type Post = {
  _id?: string;
  title: string;
  content: string;
  comment_count: number;
  voteup_count: number;
  poster_id: string;
  poster_name: string;
  entity: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export default Post;
