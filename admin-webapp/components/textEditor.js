// import React, { Component } from 'react';
// import { EditorProps } from 'react-draft-wysiwyg';
// import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import dynamic from 'next/dynamic'

// const Editor = dynamic<EditorProps>(
//     () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
//     { ssr: false }
//   )

// // const EditorComponent = () => <Editor wrapperStyle={{ border: "1px dashed #7B61FF", height: '100%' }} />

// export default function TextEditor() {
//     return (
//         <Editor />
//         // <Editor wrapperStyle={{ border: "1px dashed #7B61FF", height: '100%'}} editorStyle={{height: '100%'}} />
//     );
// }












import React, { useState } from "react";
import dynamic from "next/dynamic";
// import htmlToDraft from 'html-to-draftjs';
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function TextEditor({ style, onChangeEvent, keyObj }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [contentState, setContentState] = useState('');
  // const [content, setContent] = useState('');
  //   const handleClick = async () => {
  //     const response = await fetch("/api/sendMail", {
  //       method: "POST",
  //       body: JSON.stringify({ editorState }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const data = await response.json();
  //     console.log(data.message);
  //   };

  if (typeof window === "undefined") {
    return null; //return nothing on the server-side
  }

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    onChangeEvent(draftToHtml(convertToRaw(editorState.getCurrentContent())), keyObj);
  };

  // const onContentStateChange = (contentState) => {
  //   console.log("contentState");
  //   setContentState(contentState);
  // };

  //return only on the client-side
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
   {/* <textarea
         disabled
         // value={JSON.stringify(contentState, null, 4)}
         value={content}
       /> */}
</>
//     <Editor
//   editorState={editorState}
//   toolbarClassName="toolbarClassName"
//   wrapperClassName="wrapperClassName"
//   editorClassName="editorClassName"
//   // onEditorStateChange={onEditorStateChange}
// />
      //   editorStyle={{ overflow: 'hidden' }}
  );
}







// import React, { useState } from "react";
// import dynamic from "next/dynamic";
// const Editor = dynamic(
//   () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
//   { ssr: false }
// );

// import { convertFromRaw } from 'draft-js';

// const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

// export default function TextEditor({style}) {
//     const [contentState, setContentState] = useState(convertFromRaw(content))
//   const onContentStateChange = (contentState) => {
//     console.log(JSON.stringify(contentState));
//     setContentState(contentState);
//   };
//   if (typeof window === "undefined") {
//     return null; //return nothing on the server-side
//   }

//   return (
//     <div>
//       <Editor
//         wrapperClassName="demo-wrapper"
//         editorClassName="demo-editor"
//         onContentStateChange={onContentStateChange}
//       />
//       <textarea
//         disabled
//         // value={JSON.stringify(contentState, null, 4)}
//         value={JSON.stringify(contentState)}
//       />
//     </div>
//   );
// }
