import { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";

import { unemojify } from "node-emoji";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Alert, Button } from "react-bootstrap";

import "../styles/RichTextEditor.css";
import LoginButton from "./LoginButton";
import { withAuth0, WithAuth0Props } from "@auth0/auth0-react";

type SubmitHandler = (content: string) => Promise<any>;

interface IRichTextEditorProps extends WithAuth0Props {
  submitHandler: SubmitHandler;
  initialText?: string;
}

interface IRichTextEditorState {
  editorState: EditorState;
  isLoading: boolean;
  submitSuccess: boolean;
  submitFailure: boolean;
  failureMessage: string;
  initialText?: string;
}

const MIN_TEXT_LENGTH: number = 10;

class RichTextEditor extends Component<
  IRichTextEditorProps,
  IRichTextEditorState
> {
  constructor(props: IRichTextEditorProps) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      isLoading: false,
      submitSuccess: false,
      submitFailure: false,
      failureMessage: "",
    };
  }

  static getDerivedStateFromProps(
    props: IRichTextEditorProps,
    state: IRichTextEditorState
  ) {
    if (props.initialText && props.initialText !== state.initialText) {
      return {
        editorState: EditorState.createWithContent(
          ContentState.createFromText(props.initialText)
        ),
        initialText: props.initialText,
      };
    }

    return null;
  }

  onChange(state: EditorState) {
    this.setState({ editorState: state });
  }

  handleSubmit() {
    this.setState({
      isLoading: true,
      submitSuccess: false,
      submitFailure: false,
    });

    const content = unemojify(
      draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    );

    if (content.length < MIN_TEXT_LENGTH) {
      this.failureAlert("输入太短，请多写一点～");
      return;
    }

    this.props
      .submitHandler(content)
      .then((result: any) => {
        this.setState({
          isLoading: false,
          submitSuccess: true,
          submitFailure: false,
          editorState: EditorState.createEmpty(),
        });
      })
      .catch((err: any) => this.failureAlert(err));
  }

  failureAlert(message: string) {
    this.setState({
      isLoading: false,
      submitSuccess: false,
      submitFailure: true,
      failureMessage: message,
    });
  }

  render() {
    return (
      <div className="richTextEditor">
        <Editor
          editorState={this.state.editorState}
          onEditorStateChange={this.onChange.bind(this)}
          editorStyle={{
            minHeight: "300px",
            border: "1px solid rgba(0,0,0,.125)",
            marginBottom: "1em",
            padding: "5px",
          }}
        />
        <Button
          variant="primary"
          disabled={!this.props.auth0.isAuthenticated || this.state.isLoading}
          onClick={this.handleSubmit.bind(this)}
        >
          {this.state.isLoading ? "发布中…" : "发布"}
        </Button>
        {!this.props.auth0.isAuthenticated && (
          <LoginButton>请先登陆</LoginButton>
        )}
        {/* {!this.props.auth0.isAuthenticated && (
          <Button
            variant="primary"
            disabled={this.state.isLoading}
            onClick={this.handleSubmit.bind(this)}
          >
            {this.state.isLoading ? "发布中…" : "匿名发布"}
          </Button>
        )} */}
        <div className="errorMessage">
          <Alert show={this.state.submitSuccess} variant="success">
            发表成功
          </Alert>
          <Alert show={this.state.submitFailure} variant="danger">
            {this.state.failureMessage}
          </Alert>
        </div>
      </div>
    );
  }
}

export default withAuth0(RichTextEditor);
