"use client";

import { useState, useRef } from "react";
import { MarkdownViewer, LoadingSpinner } from ".";

export const Langchain = () => {
  const promptInput = useRef<HTMLInputElement>(null);
  const [reply, setReply] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handlePrompt = async () => {
    const prompt = promptInput.current?.value;
    if (!prompt) return;

    setLoading(true);
    const res = await fetch("/api/news-langchain", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    const data = await res.json();

    setReply(data.output);
    setLoading(false);
  };

  return (
    <div className="flex flex-col space-y-4 w-full">
      <div>Langchain - Ask a question</div>
      <input ref={promptInput} className="border w-full p-1 rounded" />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <button
          onClick={handlePrompt}
          className="border py-1 px-3 rounded bg-blue-400 hover:bg-blue-600 text-white"
          type="button"
          disabled={loading}
        >
          Ask
        </button>
      )}
      <MarkdownViewer text={reply} />
    </div>
  );
};
