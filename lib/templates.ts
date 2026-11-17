export const templates = [
  { id: "one-on-one", icon: "🤝", name: "1:1 Meeting", desc: "One-on-one manager/direct report meeting", sections: ["Check-in", "Key Updates", "Challenges", "Goals", "Next Steps"] },
  { id: "client", icon: "🏢", name: "Client Meeting", desc: "External client meeting or project review", sections: ["Agenda", "Project Status", "Milestones", "Issues", "Requests", "Next Steps"] },
  { id: "interview", icon: "🎤", name: "Interview", desc: "Candidate interview template", sections: ["Candidate Background", "Technical Assessment", "Behavioral Questions", "Culture Fit", "Questions", "Decision"] },
  { id: "investor", icon: "💰", name: "Investor Meeting", desc: "Investor update or pitch meeting", sections: ["Business Overview", "Metrics & KPIs", "Progress Since Last Meeting", "Challenges", "Asks", "Next Steps", "Follow-ups"] },
  { id: "product", icon: "📱", name: "Product Meeting", desc: "Product planning and review session", sections: ["Context", "User Feedback", "Feature Discussion", "Prioritization", "Decisions", "Owners", "Timeline"] },
  { id: "sales", icon: "💼", name: "Sales Call", desc: "Template for sales discovery and demo calls", sections: ["Agenda", "Customer Pain Points", "Solution Presented", "Objections", "Pricing", "Next Steps"] },
  { id: "standup", icon: "⚡", name: "Project Standup", desc: "Daily or weekly team standup", sections: ["Yesterday", "Today", "Blockers", "Risks"] },
  { id: "board", icon: "🏛️", name: "Board Meeting", desc: "Board review and strategic decisions", sections: ["Financials", "Strategy", "Risks", "Decisions", "Commitments"] },
];

export const meetingTypes = templates.map((t) => ({ id: t.id, name: t.name }));

export function templateBody(id: string) {
  const t = templates.find((x) => x.id === id);
  return t ? t.sections.map((s) => `${s}:\n\n`).join("") : "";
}
