import parse from "html-react-parser"

import "../../../public/css/quillEditor.css"

export default function Description({ description }) {
  const content = String(description)
  return <div className="blog-content">{parse(content)}</div>
}
