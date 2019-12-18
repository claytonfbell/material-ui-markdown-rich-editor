import * as React from "react"
import * as ReactDOM from "react-dom"
import { RichTextEditor } from "../src"

describe("it", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(
      <RichTextEditor value="foo" onChange={() => {}} label="bar" />,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })
})
