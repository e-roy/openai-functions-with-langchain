"use client";

import { useState, FormEvent } from "react";
import { MarkdownViewer, LoadingSpinner } from ".";
import { useChat } from "ai/react";

export const Langchain = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "api/news-langchain",
    onResponse: () => setLoading(false),
  });

  const handlePrompt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    handleSubmit(e);
  };

  return (
    <div className="flex flex-col space-y-4 w-full">
      <form onSubmit={handlePrompt} className={`flex flex-col space-y-4 w-ful`}>
        <label className={``}>
          Langchain - Ask a question about space
          <input
            className="border w-full p-1 rounded"
            placeholder={`latest news about SpaceX`}
            required
            value={input}
            onChange={handleInputChange}
          />
        </label>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <button
            className="border py-1 px-3 rounded bg-blue-400 hover:bg-blue-600 text-white w-full"
            type="submit"
            disabled={loading}
          >
            Ask
          </button>
        )}
      </form>
      {messages[1] && <MarkdownViewer text={messages[1].content} />}
    </div>
  );
};
