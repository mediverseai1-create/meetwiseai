import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { geminiJSON, ANALYZE_PROMPT, type Analysis } from "@/lib/gemini";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, transcript, type } = await req.json();
  if (!transcript || String(transcript).trim().length < 30)
    return NextResponse.json({ error: "Transcript is too short." }, { status: 400 });

  let analysis: Analysis;
  try {
    analysis = await geminiJSON<Analysis>(ANALYZE_PROMPT(String(transcript).slice(0, 60000)));
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }

  const { data: meeting, error } = await supabase
    .from("meetings")
    .insert({ user_id: user.id, title: title || "Untitled meeting", transcript, analysis, type: type || "general" })
    .select("id")
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const rows = (analysis.commitments ?? []).map((c) => ({
    user_id: user.id,
    meeting_id: meeting.id,
    text: c.text,
    owner: c.owner,
    due: c.due,
  }));
  if (rows.length) await supabase.from("actions").insert(rows);

  return NextResponse.json({ id: meeting.id });
}
