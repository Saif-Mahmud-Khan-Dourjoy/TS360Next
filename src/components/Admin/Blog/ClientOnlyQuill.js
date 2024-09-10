import "client-only"
import React, { useEffect, useState } from "react"
import ReactQuill, { Quill } from "react-quill"
import "react-quill/dist/quill.snow.css"
import ImageResize from "quill-image-resize-module-react"
import hljs from "highlight.js"
import "../../../../public/css/quillEditor.css"
import "highlight.js/styles/github.css" // You can choose any other style
import { useSession } from "next-auth/react"

// Register the image resize module
Quill.register("modules/imageResize", ImageResize)

// Register languages with highlight.js
import javascript from "highlight.js/lib/languages/javascript"
import python from "highlight.js/lib/languages/python"
import xml from "highlight.js/lib/languages/xml" // For HTML
import { UploadPublicImage } from "@/API/Admin/BlogApi"
import ComponentLoader from "@/components/Custom/ComponentLoader"
hljs.registerLanguage("javascript", javascript)
hljs.registerLanguage("python", python)
hljs.registerLanguage("xml", xml)

// Custom highlight.js language support
window.hljs = hljs
const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video", "code-block"],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],
      ["clean"],
    ],
    handlers: {
      image: imageHandler,
    },
  },
  clipboard: {
    matchVisual: false,
  },
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value,
  },
  imageResize: {
    parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize"],
  },
}

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "code-block",
  "align",
]

function imageHandler() {
  const input = document.createElement("input")
  input.setAttribute("type", "file")
  input.setAttribute("accept", "image/*")
  input.click()

  input.onchange = async () => {
    const file = input.files[0]
    const formData = new FormData()
    formData.append("file", file)

    UploadPublicImage(formData).then((res) => {
      if (res?.[0]) {
        console.log(res?.[0])
        const quill = this.quill
        const range = quill.getSelection()
        quill.insertEmbed(range.index, "image", res?.[0])
        quill.setSelection(range.index + 1) // Move the cursor after the image
      } else {
        showErrorAlert("Something went wrong on adding image", "center", 2000)
      }
    })
  }
}

export default function ClientOnlyQuill({ value, quillText }) {
  const { data: session } = useSession()
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(true) // Initialize loading state

  useEffect(() => {
    // Simulate a delay for component rendering (like data fetching)
    const timer = setTimeout(() => {
      setLoading(false) // Set loading to false when the component is rendered
    }, 500) // You can adjust the delay or remove it for real scenarios

    return () => clearTimeout(timer) // Cleanup timer on component unmount
  }, [])
  useEffect(() => {
    hljs.highlightAll()
  }, [text])
  const handleChange = (value) => {
    setText(value)
    quillText(value)
  }
  return (
    <>
      {/* {loading && <ComponentLoader />} */}
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder="Write Blog Content Here..."
      />
    </>
  )
}
