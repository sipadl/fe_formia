import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class EditorConvertToHTML extends Component {
  constructor(props) {
    super(props);
    const contentBlock = htmlToDraft(props.content || '');
    const contentState = contentBlock ? ContentState.createFromBlockArray(contentBlock.contentBlocks) : ContentState.createEmpty();
    this.state = {
      editorState: EditorState.createWithContent(contentState),
    };

}

onEditorStateChange = (editorState) => {
    this.setState({ editorState });
    const htmlContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    this.props.onContentChange(this.props.name, htmlContent);
};

render() {
    const { editorState } = this.state;
    const toolbarOptions = {
        options: ['inline', 'blockType', 'list', 'textAlign'],
        inline: { 
          options: ['bold', 'italic', 'underline', 'strikethrough'],
        },
        textAlign: { 
          options: ['left', 'center', 'right', 'justify'],
        },
      };  
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor form-control"
          onEditorStateChange={this.onEditorStateChange}
          toolbar={toolbarOptions}
        />
        {/* <textarea
        //   value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
    );
  }
}

export default EditorConvertToHTML;
