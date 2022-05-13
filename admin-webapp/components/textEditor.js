import { ContentState, convertToRaw, EditorState } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

export default function TextEditor({ style, onChangeEvent, keyObj, reset, handleSetReset, content }) {
  let htmlToDraft = null;
  let contentBlock;
  let contentState;
  let newEditorState;
  if (typeof window === 'object' && content) {
    htmlToDraft = require('html-to-draftjs').default
    contentBlock = htmlToDraft(content);
    contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    newEditorState = EditorState.createWithContent(contentState);
  }
  const [editorState, setEditorState] = useState(content ? newEditorState : EditorState.createEmpty());
  useEffect(() => {
    if (reset){
      setEditorState(EditorState.createEmpty())
    }
  }, [reset]);

  if (typeof window === "undefined") {
    return null; //return nothing on the server-side
  }

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    handleSetReset(false);
    onChangeEvent(draftToHtml(convertToRaw(editorState.getCurrentContent())), keyObj);
  };
  return (
    <>
    <Editor
      wrapperClassName="demo-wrapper"
      editorClassName="demo-editor"
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      // onContentStateChange={onContentStateChange}
      wrapperStyle={{
        border: "1px dashed #7B61FF",
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        ...style
      }}
    />
</>
  );
}