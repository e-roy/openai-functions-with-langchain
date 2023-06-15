# OpenAI Functions with Pinecone

This repo explores using OpenAI Functions with APIs, I'm using a RapidAPI endpoint to get news on spaceflights.

There are 2 versions here using OpenAI Functions. One version `<OpenAI />` and `api/news-openai` uses just OpenAI. Another `<Langchain />` and `api/news-langchain` with Langchain.

## Getting Started

Get API keys

[OpenAI](https://openai.com/)
[RapidAPI](https://rapidapi.com/ai-practical-ai-practical-default/api/spaceflight-news2)

Create a `.env` file and paste in your keys. There is an `.env.example` file that can be copied and pasted, don't put your API keys here, only in your `.env` file.

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [OpenAI](https://platform.openai.com/docs/api-reference)
- [Langchain](https://js.langchain.com/docs/)
- [RapidAPI](https://rapidapi.com/ai-practical-ai-practical-default/api/spaceflight-news2)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
