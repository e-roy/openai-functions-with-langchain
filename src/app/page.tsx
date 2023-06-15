"use client";

import { OpenAI, Langchain } from "@/app/components";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-center">OpenAI Functions</h1>
        <p className="text-center py-4">
          {`This is a demo of OpenAI's Functions to interact with `}
          <a
            href="https://rapidapi.com/ai-practical-ai-practical-default/api/spaceflight-news2"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            Spaceflight News
          </a>
          {` on RapidAPI.  The left side uses just OpenAI, and the right side uses Langchain.`}
        </p>

        <div className={`grid grid-cols-2 gap-8 w-full mt-4`}>
          <OpenAI />
          <Langchain />
        </div>
      </div>
    </main>
  );
}
