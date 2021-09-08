import axios from "axios";
import moment from "moment";
import { Component, createRef } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { RouteComponentProps } from "react-router";
import Post from "../models/Post";
import Comment from "../models/Comment";
import {
  HandThumbsUp,
  HandThumbsUpFill,
  PersonCircle,
  Reply,
} from "react-bootstrap-icons";
import RichTextEditor from "./RichTextEditor";
import { withAuth0, WithAuth0Props } from "@auth0/auth0-react";
import SingleCommentItem from "./SingleCommentItem";

var HtmlToReactParser = require("html-to-react").Parser;

interface MatchParams {
  id: string;
}

interface ISinglePostPageProps
  extends RouteComponentProps<MatchParams>,
    WithAuth0Props {}

interface ISinglePostPageState {
  post: Post | undefined;
  comments: Comment[];
  isVoted: boolean;
  nextPageLoading: boolean;
  currentPageNumber: number;
  isLastPage: boolean;
  replyToName?: string;
  replyToId?: string;
}

const DEFAULT_PAGE_SIZE: number = parseInt(
  process.env.REACT_APP_DEFAULT_PAGE_SIZE || "5"
);

class SinglePostPage extends Component<
  ISinglePostPageProps,
  ISinglePostPageState
> {
  constructor(props: ISinglePostPageProps) {
    super(props);
    this.state = {
      post: undefined,
      comments: [],
      isVoted: false,
      nextPageLoading: false,
      currentPageNumber: 0,
      isLastPage: false,
    };
  }

  private editorRef = createRef<HTMLDivElement>();

  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/post/${this.props.match.params.id}`
      )
      .then((response) => {
        this.setState({
          post: response.data,
        });
        this.loadMorePages();
      })
      .catch(function (error) {
        console.log(error);
      });

    this.props.auth0.getAccessTokenSilently().then((token) => {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/vote/${this.props.auth0
            .user?.email!}/${this.props.match.params.id}`
        )
        .then((response) => {
          this.setState({
            isVoted: response.data != null,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  onClickThumbup() {
    if (!this.props.auth0.isAuthenticated || this.state.isVoted) {
      return;
    }

    this.setState({ isVoted: true });
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/post/${this.props.match.params.id}/vote`,
        {
          voter_id: this.props.auth0.user?.name,
        }
      )
      .then((response) => {
        this.setState({
          post: response.data,
          isVoted: true,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async submitCommentHandler(newCommentContent: string): Promise<any> {
    if (!this.state.replyToId) {
      return new Promise((_resolve_1, reject_1) =>
          reject_1("请先在要回复的帖子上点击'回复'按钮")
        );
    }

    const comment: Comment = {
      parent_id: this.state.post?._id!,
      reply_to_post: this.state.replyToId === this.state.post?._id,
      content: newCommentContent,
      voteup_count: 0,
      commenter_id: this.props.auth0.user!.name!,
      commenter_name: this.props.auth0.user!.nickname!,
    };

    return axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/comment/add`, comment)
      .then((response) => { 
        this.setState({ comments: [...this.state.comments, response.data] });
        return new Promise((resolve, _reject) => resolve(response));
      })
      .catch((err: any) => {
        return new Promise((_resolve_1, reject_1) =>
          reject_1("发布失败，请重试")
        );
      });
  }

  loadMorePages() {
    const nextPageNumber = this.state.currentPageNumber + 1;
    this.setState({ nextPageLoading: true, currentPageNumber: nextPageNumber });
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/post/${this.state.post?._id}/comments?page=${nextPageNumber}&size=${DEFAULT_PAGE_SIZE}`
      )
      .then((response) => {
        if (!response || !response.data) {
          this.setState({ isLastPage: true });
          return;
        }

        if (response.data.length < DEFAULT_PAGE_SIZE) {
          this.setState({ isLastPage: true });
        }

        const newComments = [...this.state.comments, ...response.data];
        this.setState({ comments: newComments });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.setState({ nextPageLoading: false });
      });
  }

  onClickReplyForPost() {
    this.editorRef.current?.scrollIntoView();
    this.setState({
      replyToName: `@${this.state.post?.poster_name!} `,
      replyToId: this.state.post?._id,
    });
  }

  render() {
    var htmlToReactParser = new HtmlToReactParser();
    return (
      <div>
        <div className="singlePostWapper">
          {this.state.post ? (
            <Card className="singlePost full">
              <Card.Body>
                <Card.Subtitle className="persona">
                  <PersonCircle size={18} /> {this.state.post.poster_name}
                </Card.Subtitle>
                <Card.Title>{this.state.post.title}</Card.Title>
                <Card.Text>
                  {htmlToReactParser.parse(this.state.post.content)}
                </Card.Text>
                <Card.Subtitle className="mb-2 text-muted button">
                  {this.state.isVoted ? (
                    <HandThumbsUpFill size={18} />
                  ) : (
                    <HandThumbsUp
                      size={18}
                      onClick={this.onClickThumbup.bind(this)}
                    />
                  )}{" "}
                  {this.state.post.voteup_count}
                </Card.Subtitle>
                <Card.Subtitle
                  className="mb-2 text-muted button"
                  onClick={this.onClickReplyForPost.bind(this)}
                >
                  <Reply size={24} /> 回复
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted timestamp">
                  发布于{" "}
                  {moment(this.state.post.createdAt).format("YYYY-MM-DD")}
                </Card.Subtitle>
              </Card.Body>
            </Card>
          ) : (
            <Spinner animation="border" />
          )}
        </div>
        <div className="postsWrapper">
          <h5>评论:</h5>
          {this.state.comments &&
            this.state.comments.map((comment) => (
              <SingleCommentItem
                key={comment._id}
                data={comment}
                onClickReply={() => {
                  this.editorRef.current?.scrollIntoView();
                  this.setState({
                    replyToName: `@${comment.commenter_name} `,
                    replyToId: comment._id,
                  });
                }}
              />
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
        <div ref={this.editorRef} className="postMessage">
          <Card>
            <Card.Header>
              <Card.Title>发布新评论</Card.Title>
            </Card.Header>
            <Card.Body>
              <RichTextEditor
                submitHandler={this.submitCommentHandler.bind(this)}
                initialText={this.state.replyToName}
              />
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

export default withAuth0(SinglePostPage);
