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
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

import { EditorState } from "draft-js";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function TextEditor({style}) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

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

  //return only on the client-side
  return (
    <Editor
    wrapperClassName="demo-wrapper"
    editorClassName="demo-editor"
      editorState={editorState}
      onEditorStateChange={setEditorState}
      wrapperStyle={{ border: "1px dashed #7B61FF", height: "100%", width: "100%", display: 'flex', flexDirection: 'column', ...style}}
    //   editorStyle={{ overflow: 'hidden' }}
    />
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
//         // onContentStateChange={onContentStateChange}
//       />
//       <textarea
//         disabled
//         value={JSON.stringify(contentState, null, 4)}
//       />
//     </div>
//   );
// }