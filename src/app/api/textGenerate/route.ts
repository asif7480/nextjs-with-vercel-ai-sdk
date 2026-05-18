import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return Response.json({ error: `Prompt is required` }, { status: 400 });
    }

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: prompt,
    });

    return Response.json({ text });
  } catch (error) {
    console.error(`API error: `,error)
    return Response.json(
        { error: `Failed to generate text` },
        { status: 500 }
    )
  }
}
