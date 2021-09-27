import { makeStyles, Typography, useTheme } from "@material-ui/core"
import { EditorState } from "draft-js"
// @ts-ignore
import { stateToMarkdown } from "draft-js-export-markdown"
// @ts-ignore
import { stateFromMarkdown } from "draft-js-import-markdown"
import React, { useMemo } from "react"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const useStyles = makeStyles(theme => ({
  root: {
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
          theme.palette.type === "dark" ? `brightness(0) invert(1)` : undefined,
      },
    },
    "& .public-DraftEditor-content": {
      minHeight: 100,
    },
  },
  wrapper: {
    borderRadius: 3,
    boxShadow: "0 0 0 1px #c4c4c4",
    paddingTop: 10,
    marginTop: 7,
    "&.focus": {
      boxShadow: "0 0 0 2px " + theme.palette.primary.main,
    },
  },
  editor: {
    paddingLeft: 20,
    paddingRight: 20,
    borderTop: `1px solid ${theme.palette.divider}`,
    backgroundColor: "#ffffff",
    color: "#000000",
  },
  label: {
    color: theme.palette.text.secondary,
    position: "absolute",
    backgroundColor: (props: RichTextEditorProps) =>
      props.onPaper
        ? theme.palette.background.paper
        : theme.palette.background.default,
    paddingLeft: 4,
    paddingRight: 4,
    left: 10,
    top: -9,
    "&.focus": {
      color: theme.palette.primary.main,
    },
  },
  toolbar: {},
}))

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
  const classes = useStyles(props)

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
    <div className={classes.root}>
      {props.label !== undefined ? (
        <Typography
          className={classes.label + focusCss}
          style={{
            backgroundColor: props.onPaper
              ? theme.palette.background.paper
              : undefined,
          }}
          variant="caption"
        >
          {label} {props.required && "*"}
          {charLength > 1000 ? ` (${charLength} characters)` : ""}
        </Typography>
      ) : null}
      <Typography component="div">
        <Editor
          editorState={editorState}
          wrapperClassName={classes.wrapper + focusCss}
          editorClassName={classes.editor}
          onEditorStateChange={onEditorStateChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          toolbar={toolbar}
          toolbarClassName={classes.toolbar}
        />
      </Typography>
    </div>
  )
}
