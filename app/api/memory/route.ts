import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { geminiText } from "@/lib/gemini";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { question } = await req.json();
  if (!question) return NextResponse.json({ error: "Ask a question." }, { status: 400 });

  const { data: meetings } = await supabase
    .from("meetings")
    .select("id,title,created_at,analysis")
    .order("created_at", { ascending: false })
    .limit(60);

  if (!meetings?.length)
    return NextResponse.json({ answer: "No meetings indexed yet. Analyze a meeting first.", sources: [] });

  const context = meetings
    .map((m) => `[${m.title} | ${m.created_at.slice(0, 10)}] ${JSON.stringify(m.analysis)}`)
    .join("\n");

  try {
    const answer = await geminiText(
      `You are the Executive Memory Agent. Answer the question using ONLY the meeting records below. Cite meetings by title in parentheses. If the records do not contain the answer, say so.

QUESTION: ${question}

RECORDS:
${context}`
    );
    return NextResponse.json({
      answer,
      sources: meetings.filter((m) => answer.includes(m.title)).map((m) => ({ id: m.id, title: m.title })),
    });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
