import { Component } from "react";
import { Card } from "react-bootstrap";
import Post from "../models/Post";
import "../styles/SinglePost.css";
import moment from "moment";
import { PersonSquare } from "react-bootstrap-icons";

//var HtmlToReactParser = require("html-to-react").Parser;

interface ISinglePostProps {
  data: Post;
}

interface ISinglePostState {}

export default class SinglePostItem extends Component<
  ISinglePostProps,
  ISinglePostState
> {
  constructor(props: ISinglePostProps) {
    super(props);
    this.state = {};
  }

  render() {
    //var htmlToReactParser = new HtmlToReactParser();
    return (
      <div className="singlePost">
        <Card>
          <Card.Body>
            <Card.Subtitle className="persona">
              <PersonSquare size={18} /> {this.props.data.poster_name}
            </Card.Subtitle>
            <Card.Title>{this.props.data.title}</Card.Title>
            <Card.Text className="post-caption">
              {this.props.data.content.replace(/<[^>]+>/g, '')}
            </Card.Text>
            <Card.Subtitle className="mb-2 text-muted">
              {this.props.data.voteup_count} 赞同
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              {this.props.data.comment_count} 评论
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted timestamp">
              发布于 {moment(this.props.data.createdAt).format("YYYY-MM-DD")}
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
