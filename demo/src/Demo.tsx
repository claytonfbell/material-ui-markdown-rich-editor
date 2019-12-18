import { RichTextEditor } from "material-ui-markdown-rich-editor"
import React from "react"

export function Demo() {
  const [value, setValue] = React.useState("**hello** test")
  return (
    <>
      <RichTextEditor value={value} onChange={v => setValue(v)} label="Hello" />
    </>
  )
}
