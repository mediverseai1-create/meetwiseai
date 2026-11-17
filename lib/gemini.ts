import { GoogleGenerativeAI } from "@google/generative-ai";

const MODELS = [
  process.env.GEMINI_MODEL || "gemini-flash-latest",
  "gemini-3.8-flash",
  "gemini-3.5-flash",
];

async function run(prompt: string, json: boolean): Promise<string> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY is not set");
  const ai = new GoogleGenerativeAI(key);
  let last: unknown;
  for (const name of MODELS) {
    try {
      const model = ai.getGenerativeModel({
        model: name,
        ...(json ? { generationConfig: { responseMimeType: "application/json" } } : {}),
      });
      return (await model.generateContent(prompt)).response.text();
    } catch (e) {
      last = e; // overloaded or retired model: try the next one
    }
  }
  throw last instanceof Error ? last : new Error("Gemini request failed");
}

export async function geminiJSON<T>(prompt: string): Promise<T> {
  return JSON.parse(await run(prompt, true)) as T;
}

export async function geminiText(prompt: string): Promise<string> {
  return run(prompt, false);
}

export type Analysis = {
  summary: string;
  decisions: { text: string; owner?: string }[];
  commitments: { text: string; owner: string; due?: string }[];
  risks: { text: string; severity: "low" | "medium" | "high"; category?: string }[];
  buying_signals: string[];
  objections: string[];
  open_issues: string[];
};

export const ANALYZE_PROMPT = (transcript: string) => `You are the Meeting Intelligence Agent. Analyze the business meeting transcript below.
Return ONLY JSON with this shape:
{"summary": string,
 "decisions":[{"text":string,"owner":string}],
 "commitments":[{"text":string,"owner":string,"due":string}],
 "risks":[{"text":string,"severity":"low"|"medium"|"high","category":"timeline"|"budget"|"relationship"|"technical"|"other"}],
 "buying_signals":[string], "objections":[string], "open_issues":[string]}
Use named owners and concrete dates when present in the transcript. Never invent facts.

TRANSCRIPT:
${transcript}`;
