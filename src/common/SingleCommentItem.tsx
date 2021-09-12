import { Component } from "react";
import { Card } from "react-bootstrap";
import Comment from "../models/Comment";
import "../styles/SinglePost.css";
import moment from "moment";
import { PersonSquare, Reply } from "react-bootstrap-icons";

var HtmlToReactParser = require("html-to-react").Parser;

type ClickReplyHandler = () => void;

interface ISingleCommentProps {
  data: Comment;
  onClickReply?: ClickReplyHandler;
}

interface ISingleCommentState {}

export default class SingleCommentItem extends Component<
  ISingleCommentProps,
  ISingleCommentState
> {
  constructor(props: ISingleCommentProps) {
    super(props);
    this.state = {};
  }

  render() {
    var htmlToReactParser = new HtmlToReactParser();
    return (
      <div className="singlePost">
        <Card>
          <Card.Body>
            <Card.Subtitle className="persona">
              <PersonSquare size={18} /> {this.props.data.commenter_name}
            </Card.Subtitle>
            <Card.Text>
              {htmlToReactParser.parse(this.props.data.content)}
            </Card.Text>
            <Card.Subtitle
              onClick={() => {
                this.props.onClickReply && this.props.onClickReply();
              }}
              className="mb-2 text-muted button"
            >
              <Reply size={24} /> 回复
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
