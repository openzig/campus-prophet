import axios from "axios";
import { Component } from "react";
import RichTextEditor from "../common/RichTextEditor";
import Post from "../models/Post";

interface IMailboxProps {}

interface IMailboxState {
  isLoading: boolean;
}

export default class AdminMailbox extends Component<
  IMailboxProps,
  IMailboxState
> {
  constructor(props: IMailboxProps) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  submitPostHandler(content: string): Promise<any> {
    const post: Post = {
      title: "First post",
      content: content,
      comment_count: 0,
      voteup_count: 0,
      poster_id: 0,
      poster_name: "Centurion",
      entity: "AdminMailbox",
    };

    return axios.post("http://localhost:5000/api/v1/post/add", post);
  }

  render() {
    return (
      <div id="richTextEditor">
        <RichTextEditor submitHandler={this.submitPostHandler} />
      </div>
    );
  }
}
