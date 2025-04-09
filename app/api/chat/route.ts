import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { NextRequest, NextResponse } from 'next/server';

const endpoint = "https://models.inference.ai.azure.com";
const modelName = "DeepSeek-V3-0324";

export async function POST(request: NextRequest) {
  // Ensure the token is available
  const token = process.env.AZURE_AI_KEY;
  if (!token) {
    return NextResponse.json(
      { error: "Azure AI key not configured" },
      { status: 500 }
    );
  }

  try {
    const { messages } = await request.json();

    // Validate input
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    const client = ModelClient(
      endpoint,
      new AzureKeyCredential(token),
    );

    const response = await client.path("/chat/completions").post({
      body: {
        messages,
        temperature: 1.0,
        top_p: 1.0,
        max_tokens: 1000,
        model: modelName
      }
    });

    if (isUnexpected(response)) {
      throw response.body.error;
    }

    return NextResponse.json(response.body.choices[0].message);
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}