import {
  Box,
  Container,
  //   createTheme,
  CssBaseline,
  //   Paper,
  TextField,
  ThemeProvider,
  useTheme,
} from "@mui/material"
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
  //   const myTheme = createTheme({
  //     palette: { mode: "dark", background: { paper: "green" } },
  //   })
  return <ThemeProvider theme={myTheme}>{props.children}</ThemeProvider>
}

function MyExample() {
  const [value, setValue] = React.useState("**hello** test")
  const theme = useTheme()
  return (
    <>
      <TextField variant="outlined" label="hello" value="test" />
      <Spacer />
      default = {theme.palette.background.default}
      paper = {theme.palette.background.paper}
      <Box padding={4} sx={{ backgroundColor: theme.palette.background.paper }}>
        <RichTextEditor
          onPaper
          value={value}
          onChange={v => setValue(v)}
          label="Hello World"
        />
      </Box>
    </>
  )
}
