// src/services/ai.service.ts
import fetch from "node-fetch";
export async function generateText(prompt: string) {
  const res = await fetch(
    "https://api-inference.huggingface.co/models/google/flan-t5-base",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    }
  );
  const j: any = await res.json();
  return (
    j?.[0]?.generated_text ||
    (Array.isArray(j) && j[0]?.generated_text) ||
    JSON.stringify(j)
  );
}
