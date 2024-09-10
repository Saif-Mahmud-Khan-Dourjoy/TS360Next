import React, { useMemo, useRef, useState } from "react"
import JoditEditor from "jodit-react"

export default function EditorHook() {
  const editor = useRef(null)
  const [content, setContent] = useState("")

  return (
    <>
      <JoditEditor
        ref={editor}
        value={content}
        onChange={(newContent) => {
          setContent(newContent)
        }}
      />
      <div>{content}</div>
    </>
  )
}
