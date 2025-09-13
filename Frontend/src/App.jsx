import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  // --- Login state ---
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")

  // --- Existing states ---
  const [code, setCode] = useState(`function sum() {\n  return 1 + 1\n}`)
  const [review, setReview] = useState(``)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code })
      setReview(response.data)
    } catch (err) {
      console.error(err)
      setReview("⚠️ Error: Could not fetch review")
    }
  }

  // --- Login handler ---
  const handleLogin = (e) => {
    e.preventDefault()
    if (username.trim()) setUser(username)
  }

  // --- Render login page if user is not logged in ---
  if (!user) {
    return (
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Welcome to Code Reviewer</h2>
          <input 
            type="text" 
            placeholder="Enter your name" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  // --- After login, show split layout ---
  return (
    <main>
      {/* LEFT SIDE → Code Editor */}
      <div className="left">
        <h3 className="section-title">Code Editor</h3>
        <div className="code">
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              borderRadius: "5px",
              height: "100%",
              width: "100%"
            }}
          />
        </div>
        <button className="review-btn" onClick={reviewCode}>Review</button>
      </div>

      {/* RIGHT SIDE → Suggestions */}
      <div className="right">
        <h3 className="section-title">AI Suggestions</h3>
        <Markdown rehypePlugins={[ rehypeHighlight ]}>
          {review || "💡 Click 'Review' to see suggestions here."}
        </Markdown>
      </div>
    </main>
  )
}

export default App
