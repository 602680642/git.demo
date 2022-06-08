import React,{useState,useEffect} from 'react'
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs'
import { convertToRaw ,ContentState,EditorState} from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


export default function NewDraft(props) {

  const [editorState,seteditorState] = useState('')

  useEffect(()=>{

    const html = props.content
    if(html===)
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      seteditorState(editorState)
    }

  },[props.content])  
  return (
    <div>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={(editorState => seteditorState(editorState))}
        onBlur = {()=>{

          props.getdata(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        }}
      />
    </div>
  )
}
