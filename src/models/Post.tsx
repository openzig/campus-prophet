type Post = {
  _id?: number;
  title: string;
  content: string;
  comment_count: number;
  voteup_count: number;
  poster_id: number;
  poster_name: string;
  entity: string;
};

export default Post;
