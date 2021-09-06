import { withAuth0, WithAuth0Props } from "@auth0/auth0-react";
import axios from "axios";
import React, { Component } from "react";
import {
  Button,
  Card,
  FormControl,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import RichTextEditor from "../common/RichTextEditor";
import SinglePostItem from "../common/SinglePostItem";
import Post from "../models/Post";
import "../styles/AdminMailbox.css";

interface IMailboxProps extends WithAuth0Props {}

interface IMailboxState {
  nextPageLoading: boolean;
  posts: Post[];
  newPostTitle: string;
  currentPageNumber: number;
  isLastPage: boolean;
}

const MIN_NEW_POST_TITLE_LENGTH: number = 4;

class AdminMailbox extends Component<
  IMailboxProps,
  IMailboxState
> {
  constructor(props: IMailboxProps) {
    super(props);

    this.state = {
      nextPageLoading: false,
      posts: [],
      newPostTitle: "",
      currentPageNumber: 0,
      isLastPage: false,
    };
  }

  componentDidMount() {
    this.loadMorePages();
  }

  loadMorePages() {
    const nextPageNumber = this.state.currentPageNumber + 1;
    this.setState({ nextPageLoading: true, currentPageNumber: nextPageNumber });
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/post/search/AdminMailbox?page=${nextPageNumber}`
      )
      .then((response) => {
        if (!response || !response.data || response.data.length === 0) {
          this.setState({ isLastPage: true });
          return;
        }

        const newPosts = [...this.state.posts, ...response.data];
        this.setState({ posts: newPosts });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.setState({ nextPageLoading: false });
      });
  }

  async submitPostHandler(newPostContent: string): Promise<any> {
    if (
      !this.state.newPostTitle ||
      this.state.newPostTitle.length < MIN_NEW_POST_TITLE_LENGTH
    ) {
      return new Promise((_resolve, reject) => reject("标题太短"));
    }

    const post: Post = {
      title: this.state.newPostTitle,
      content: newPostContent,
      comment_count: 0,
      voteup_count: 0,
      poster_id: this.props.auth0.user!.name!,
      poster_name: this.props.auth0.user!.nickname!,
      entity: "AdminMailbox",
    };

    try {
      const result = await axios
        .post(`${process.env.BACKEND_URL}/api/v1/post/add`, post);
      this.setState({ posts: [...this.state.posts, post] });
      return await new Promise((resolve, _reject) => resolve(result));
    } catch (err) {
      return await new Promise((_resolve_1, reject_1) => reject_1("发布失败，请重试"));
    }
  }

  render() {
    return (
      <div className="adminMailboxWrapper">
        <div className="postsWrapper">
          {this.state.posts.length > 0 &&
            this.state.posts.map((post) => (
              <Link target="_blank" to={`/post/${post._id}`}>
                <SinglePostItem key={post._id} data={post} />
              </Link>
            ))}
          <div className="postsSpinner">
            {this.state.nextPageLoading && <Spinner animation="border" />}
          </div>
          <div className="d-grid gap-2">
            <Button
              variant={this.state.isLastPage ? "dark" : "primary"}
              disabled={this.state.nextPageLoading || this.state.isLastPage}
              onClick={this.loadMorePages.bind(this)}
            >
              {this.state.isLastPage
                ? "没有可以加载的了..."
                : this.state.nextPageLoading
                ? "加载中…"
                : "加载更多"}
            </Button>
          </div>
        </div>
        <div className="postMessage">
          <Card>
            <Card.Header>
              <Card.Title>发布新话题</Card.Title>
            </Card.Header>
            <Card.Body>
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  标题
                </InputGroup.Text>
                <FormControl
                  type="text"
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                    this.setState({
                      newPostTitle: evt.currentTarget.value,
                    });
                  }}
                />
              </InputGroup>
              <RichTextEditor
                submitHandler={this.submitPostHandler.bind(this)}
              />
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

export default withAuth0(AdminMailbox);
