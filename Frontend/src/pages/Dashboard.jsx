// pages/Dashboard.jsx
import { useState } from "react";
import CodeEditor from "../components/CodeEditor";
import ReviewPanel from "../components/ReviewPanel";
import axios from "axios";

export default function Dashboard({ user }) {
  const [code, setCode] = useState(`function sum() {\n  return 1 + 1;\n}`);
  const [review, setReview] = useState("");

  const reviewCode = async () => {
    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", { code });
      setReview(response.data);
    } catch (err) {
      console.error(err);
      setReview("Error: Could not fetch review.");
    }
  };

  return (
    <div className="dashboard">
      <h2>Welcome, {user}</h2>
      <div className="editor-container">
        <div className="left">
          <CodeEditor code={code} setCode={setCode} />
          <button className="review-btn" onClick={reviewCode}>Review Code</button>
        </div>
        <div className="right">
          <ReviewPanel review={review} />
        </div>
      </div>
    </div>
  );
}
