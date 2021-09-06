import axios from "axios";
import moment from "moment";
import { Component } from "react";
import { Card, Spinner } from "react-bootstrap";
import { RouteComponentProps } from "react-router";
import Post from "../models/Post";
import {
  HandThumbsUp,
  HandThumbsUpFill,
  PersonCircle,
  Reply,
} from "react-bootstrap-icons";
import RichTextEditor from "./RichTextEditor";
import { withAuth0, WithAuth0Props } from "@auth0/auth0-react";

var HtmlToReactParser = require("html-to-react").Parser;

interface MatchParams {
  id: string;
}

interface ISinglePostPageProps
  extends RouteComponentProps<MatchParams>,
    WithAuth0Props {}

interface ISinglePostPageState {
  data: Post[];
  isVoted: boolean;
}

class SinglePostPage extends Component<
  ISinglePostPageProps,
  ISinglePostPageState
> {
  constructor(props: ISinglePostPageProps) {
    super(props);
    this.state = { data: [], isVoted: false };
  }

  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/post/${this.props.match.params.id}`
      )
      .then((response) => {
        this.setState({
          data: [response.data],
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    if (this.props.auth0.isAuthenticated) {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/vote/${this.props.auth0
            .user?.email!}/${this.props.match.params.id}`
        )
        .then((response) => {
          this.setState({
            data: [response.data],
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  onClickThumbup() {
    if (!this.props.auth0.isAuthenticated) {
      return;
    }

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/post/${this.props.match.params.id}/vote`,
        {
          voter_id: this.props.auth0.user?.name,
        }
      )
      .then((response) => {
        this.setState({
          data: [response.data],
        });
        this.forceUpdate();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async submitCommentHandler(newCommentContent: string): Promise<any> {}

  render() {
    var htmlToReactParser = new HtmlToReactParser();
    return (
      <div>
        <div className="singlePostWapper">
          {this.state.data.length > 0 ? (
            this.state.data.map((post) => (
              <Card className="singlePost full">
                <Card.Body>
                  <Card.Subtitle className="persona">
                    <PersonCircle size={18} /> {post.poster_name}
                  </Card.Subtitle>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{htmlToReactParser.parse(post.content)}</Card.Text>
                  <Card.Subtitle className="mb-2 text-muted button">
                    <HandThumbsUp
                      size={18}
                      onClick={this.onClickThumbup.bind(this)}
                    />{" "}
                    {post.voteup_count}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted button">
                    <Reply size={24} /> 回复
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted timestamp">
                    发布于 {moment(post.createdAt).format("YYYY-MM-DD")}
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            ))
          ) : (
            <Spinner animation="border" />
          )}
        </div>
        <div className="postMessage">
          <Card>
            <Card.Header>
              <Card.Title>发布新评论</Card.Title>
            </Card.Header>
            <Card.Body>
              <RichTextEditor
                submitHandler={this.submitCommentHandler.bind(this)}
              />
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

export default withAuth0(SinglePostPage);
