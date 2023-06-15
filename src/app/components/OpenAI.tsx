"use client";

import { useState, useRef } from "react";
import { LoadingSpinner, MarkdownViewer } from "./";

interface ApiResponse {
  choices: [
    {
      message: {
        content: string;
      };
    }
  ];
}

export const OpenAI = () => {
  const promptInput = useRef<HTMLInputElement>(null);
  const [reply, setReply] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handlePrompt = async () => {
    const prompt = promptInput.current?.value;
    if (!prompt) return;

    setLoading(true);
    const res = await fetch("/api/news-openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    const data: ApiResponse = await res.json();
    setReply(data.choices[0].message.content);
    setLoading(false);
  };

  return (
    <div className="flex flex-col space-y-4 w-full">
      <div>OpenAI - Ask a question</div>
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
