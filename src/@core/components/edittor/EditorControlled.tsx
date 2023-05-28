// ** React Imports
import { useState } from 'react'

// ** Third Party Imports
import { EditorState } from 'draft-js'

// ** Component Import
import ReactDraftWysiwyg from '@/@core/components/react-draft-wysiwyg'

// ** Styled Component Import
import { EditorWrapper } from '@/@core/styles/libs/react-draft-wysiwyg'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const EditorControlled = () => {
  // ** State
  const [value, setValue] = useState(EditorState.createEmpty())

  return (
    <EditorWrapper>
      <ReactDraftWysiwyg editorState={value} onEditorStateChange={data => setValue(data)} />
    </EditorWrapper>
  )
}

export default EditorControlled
