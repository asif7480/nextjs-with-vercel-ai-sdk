"use client";

import { useState } from "react";

export default function GenerateText() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const generateOutput = async(e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setOutput("")
    try {
        const response = await fetch("http://localhost:3000/api/textGenerate", {
            method: "POST",
            headers: { "Content-type": "application/json"},
            body: JSON.stringify({ prompt })
        })

        const data = await response.json()
        setOutput(data.text)
    } catch (error) {
        error instanceof Error ? setError(error.message) : setError(`Something went wrong`)
        // console.log(`Error: `, error.message as Error)
    }finally{
        setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={generateOutput}>
        <input
          type="text"
          placeholder="Enter your prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit" disabled={loading}>
            { loading ? "Generating" : "Submit Prompt"}
        </button>
      </form>

      { error && <p className="text-red-500">{error}</p>}
      {/* { loading ? "loading.......": output ? <div>{output}</div> : null } */}
      { output && <div>{output}</div>}
    </div>
  );
}
