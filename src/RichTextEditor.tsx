import { Box, Typography, useTheme } from "@mui/material"
import { EditorState } from "draft-js"
// @ts-ignore
import { stateToMarkdown } from "draft-js-export-markdown"
// @ts-ignore
import { stateFromMarkdown } from "draft-js-import-markdown"
import React, { useMemo } from "react"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

export interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  label?: string
  required?: boolean
  onPaper?: boolean
  includeLink?: boolean
  includeUnderline?: boolean
}
export const RichTextEditor = (props: RichTextEditorProps) => {
  let value = props.value
  value = value === undefined ? "" : value
  const label = props.label
  const [hasFocus, setHasFocus] = React.useState(false)
  const [editorState, setEditorState] = React.useState(
    getEditorStateWithMarkdown(value)
  )
  const [charLength, setCharLength] = React.useState(0)
  React.useEffect(() => {
    setEditorState(getEditorStateWithMarkdown(value))
  }, [value])

  function getEditorStateWithMarkdown(md: string) {
    md = md === null ? "" : md
    const contentState = stateFromMarkdown(md)
    const editorState = EditorState.createWithContent(contentState)
    return editorState
  }
  function onEditorStateChange(es: EditorState) {
    setCharLength(stateToMarkdown(editorState.getCurrentContent()).length)
    setEditorState(es)
  }
  function handleFocus() {
    setHasFocus(true)
  }
  function handleBlur() {
    setHasFocus(false)
    const md = stateToMarkdown(editorState.getCurrentContent())
    props.onChange(md)
  }
  let focusCss = hasFocus ? " focus" : ""

  const theme = useTheme()

  const toolbar = useMemo(() => {
    const options = ["bold", "italic", "underline", "monospace"]
    if (props.includeUnderline !== true) {
      options.splice(2, 1)
    }

    const toolbarOptions = {
      options: ["inline", "list"],
      inline: {
        options,
      },
      list: {
        options: ["unordered", "ordered"],
      },
    }
    if (props.includeLink) {
      toolbarOptions.options.push("link")
    }
    return toolbarOptions
  }, [props.includeLink, props.includeUnderline])

  return (
    <Box
      sx={{
        position: "relative",
        "& .rdw-editor-toolbar": {
          border: 0,
          backgroundColor: `rgba(0, 0, 0, 0) !important`,
        },
        "& .rdw-link-modal": {
          backgroundColor: theme.palette.background.paper,
        },
        "& .rdw-option-wrapper": {
          background: `rgba(0, 0, 0, 0) !important`,
          "& img": {
            filter:
              theme.palette.mode === "dark"
                ? `brightness(0) invert(1)`
                : undefined,
          },
        },
        "& .public-DraftEditor-content": {
          minHeight: 100,
        },
      }}
    >
      {props.label !== undefined ? (
        <Typography
          sx={{
            color: theme.palette.text.secondary,
            position: "absolute",
            backgroundColor: props.onPaper
              ? theme.palette.background.paper
              : theme.palette.background.default,
            paddingLeft: 0.5,
            paddingRight: 0.5,
            left: 10,
            top: -9,
            "&.focus": {
              color: theme.palette.primary.main,
            },
          }}
          className={focusCss}
          variant="caption"
        >
          {label} {props.required && "*"}
          {charLength > 1000 ? ` (${charLength} characters)` : ""}
        </Typography>
      ) : null}
      <Typography component="div">
        <Editor
          editorState={editorState}
          wrapperStyle={{
            borderRadius: 3,
            boxShadow: "0 0 0 1px #c4c4c4",
            paddingTop: 10,
            marginTop: 7,
            ...(hasFocus
              ? {
                  boxShadow: "0 0 0 2px " + theme.palette.primary.main,
                }
              : {}),
          }}
          editorStyle={{
            paddingLeft: 20,
            paddingRight: 20,
            borderTop: `1px solid ${theme.palette.divider}`,
            backgroundColor: "#ffffff",
            color: "#000000",
          }}
          onEditorStateChange={onEditorStateChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          toolbar={toolbar}
        />
      </Typography>
    </Box>
  )
}
