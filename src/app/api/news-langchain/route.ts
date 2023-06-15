import { NextResponse } from "next/server";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { DynamicTool } from "langchain/tools";

// break the app if the API key is missing
if (!process.env.RAPID_API_KEY) {
  throw new Error("Missing Environment Variable RAPID_API_KEY");
}

export const runtime = "edge";

const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo-0613",
  temperature: 0,
});

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const requestHeadersOpenAI: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
  };

  const requestHeadersSpaceAPI: Record<string, string> = {
    "Content-Type": "application/json",
    "X-RapidAPI-Key": process.env.RAPID_API_KEY as string,
    "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
  };

  // STEP 1 - OpenAI API call

  const bodyStep1 = {
    model: "gpt-3.5-turbo-0613",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0,
    functions: [
      {
        name: "get_news",
        description: "Get the latest news for a given subject",
        parameters: {
          type: "object",
          properties: {
            subject: {
              type: "string",
              description: "The subject to get the news for",
            },
          },
          required: ["subject"],
        },
      },
    ],
    function_call: "auto",
  };

  const resStep1 = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: requestHeadersOpenAI,
    method: "POST",
    body: JSON.stringify(bodyStep1),
  });

  const dataStep1 = await resStep1.json();

  const message = dataStep1.choices[0].message;

  if (message.function_call) {
    // STEP 2 - Third party API
    const userRequested = JSON.parse(message["function_call"]["arguments"]);

    const functionName = message.function_call?.name;

    const params = new URLSearchParams({
      q: userRequested.subject,
      pageNumber: "1",
      pageSize: "3",
      autoCorrect: "true",
      fromPublishedDate: "null",
      toPublishedDate: "null",
    }).toString();

    const url = `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?${params}`;

    const rapidAPITool = new DynamicTool({
      name: "RapidAPI",
      description: "Call this tool to make a request to a RapidAPI endpoint.",
      func: async (args: string) => {
        // Make the API request using the provided args
        const response = await fetch(url, {
          method: "GET",
          headers: requestHeadersSpaceAPI,
        });

        // Parse the response and return the result
        const result = await response.json();

        type FilteredValuesType = {
          id: string;
          title: string;
          url: string;
          description: string;
          body: string;
        };

        // Filter the response to only return the values we want to help reduce number of tokens used
        const filteredValues = result.value.map(
          ({ id, title, url, description, body }: FilteredValuesType) => ({
            id,
            title,
            url,
            description,
            body,
          })
        );

        return JSON.stringify(filteredValues);
      },
    });

    // STEP 3 - Langchain chain call
    const tools = [rapidAPITool];
    const executor = await initializeAgentExecutorWithOptions(tools, model, {
      agentType: "openai-functions",
      verbose: true,
    });

    const result = await executor.call({ input: prompt });

    return NextResponse.json(result);
  } else return NextResponse.json({ message });
}
