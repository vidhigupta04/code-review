// components/CodeEditor.jsx
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

export default function CodeEditor({ code, setCode }) {
  return (
    <div className="code-editor">
      <Editor
        value={code}
        onValueChange={(code) => setCode(code)}
        highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
        padding={10}
        style={{
          fontFamily: '"Fira Code", monospace',
          fontSize: 16,
          height: "100%",
          width: "100%",
        }}
      />
    </div>
  );
}
