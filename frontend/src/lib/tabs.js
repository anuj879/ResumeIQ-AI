import { LayoutDashboard, FileSearch, Gauge, Briefcase, Target, Wand2, MessageSquare, FileText } from "lucide-react";
export const TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "analysis", label: "Resume analyzer", icon: FileSearch, blurb: "A full evaluation of your resume: strengths, gaps and next steps." },
  { id: "ats", label: "ATS checker", icon: Gauge, blurb: "An estimated ATS compatibility score. It is an estimate, not a guarantee." },
  { id: "match", label: "Job matcher", icon: Briefcase, job: true, blurb: "See how well your resume fits a specific job description." },
  { id: "skills", label: "Skill gap analysis", icon: Target, job: true, blurb: "Compare the skills on your resume with what the job asks for." },
  { id: "improve", label: "Resume improver", icon: Wand2, blurb: "Reworded bullets and summary. Your facts stay unchanged." },
  { id: "interview", label: "Interview prep", icon: MessageSquare, blurb: "Questions and answer points based on your resume." },
  { id: "report", label: "Reports", icon: FileText },
];
export const TOOL_TABS = TABS.filter((t) => t.blurb);
