import { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

import { unemojify } from "node-emoji";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Alert, Button } from "react-bootstrap";

type SubmitHandler = (content: string) => Promise<any>;

interface IRichTextEditorProps {
  submitHandler: SubmitHandler;
}

interface IRichTextEditorState {
  editorState: EditorState;
  isLoading: boolean;
  submitSuccess: boolean;
  submitFailure: boolean;
}

export default class RichTextEditor extends Component<
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
    };
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
    this.props
      .submitHandler(content)
      .then((result: any) =>
        this.setState({
          isLoading: false,
          submitSuccess: true,
          submitFailure: false,
        })
      )
      .catch((err: any) =>
        this.setState({
          isLoading: false,
          submitSuccess: false,
          submitFailure: true,
        })
      );
  }

  render() {
    return (
      <div>
        <Editor
          editorState={this.state.editorState}
          onEditorStateChange={this.onChange.bind(this)}
        />
        <Button
          variant="primary"
          disabled={this.state.isLoading}
          onClick={this.handleSubmit.bind(this)}
        >
          {this.state.isLoading ? "发布中…" : "发布"}
        </Button>
        {this.state.submitSuccess && (
          <Alert variant="success">'发表成功'</Alert>
        )}
        {this.state.submitFailure && (
          <Alert variant="danger">'发表失败，请重试'</Alert>
        )}
      </div>
    );
  }
}
