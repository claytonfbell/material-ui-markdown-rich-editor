import {
  Box,
  Container,
  CssBaseline,
  Paper,
  TextField,
} from "@material-ui/core"
import { ThemeProvider } from "@material-ui/core/styles"
import { RichTextEditor } from "material-ui-markdown-rich-editor"
import {
  DarkModeProvider,
  DarkModeToggle,
  Spacer,
  useDarkMode,
} from "material-ui-pack"
import React from "react"

export function Demo() {
  return (
    <DarkModeProvider>
      <MyThemeProvider>
        <CssBaseline />
        <Container>
          <Spacer />
          <Spacer />
          <DarkModeToggle />
          <Spacer />
          <Spacer />
          <MyExample />
        </Container>
      </MyThemeProvider>
    </DarkModeProvider>
  )
}

function MyThemeProvider(props: { children: React.ReactNode }) {
  const { createMuiThemeWithDarkMode } = useDarkMode()
  const myTheme = createMuiThemeWithDarkMode({
    palette: { secondary: { main: "#009900" } },
  })
  return <ThemeProvider theme={myTheme}>{props.children}</ThemeProvider>
}

function MyExample() {
  const [value, setValue] = React.useState("**hello** test")
  return (
    <>
      <TextField variant="outlined" label="hello" value="test" />
      <Spacer />
      <Paper>
        <Box padding={4}>
          <RichTextEditor
            onPaper
            value={value}
            onChange={v => setValue(v)}
            label="Hello World"
          />
        </Box>
      </Paper>
    </>
  )
}
