import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { geminiText } from "@/lib/gemini";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { meetingId } = await req.json();
  const { data: m } = await supabase.from("meetings").select("*").eq("id", meetingId).single();
  if (!m) return NextResponse.json({ error: "Not found" }, { status: 404 });

  try {
    const email = await geminiText(
      `You are the Follow-Up Agent. Write a concise, professional follow-up email for the meeting "${m.title}".
Include: a short recap, decisions, commitments with owner and due date, and open risks. Plain text, with a Subject line first.

ANALYSIS JSON:
${JSON.stringify(m.analysis)}`
    );
    await supabase.from("meetings").update({ followup_email: email }).eq("id", meetingId);
    return NextResponse.json({ email });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
