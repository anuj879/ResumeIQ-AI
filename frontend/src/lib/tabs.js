
import {
  LayoutDashboard,
  FileSearch,
  Gauge,
  Briefcase,
  Wand2,
  History,
} from "lucide-react";

export const TABS = [
  {
    id: "overview",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "analysis",
    label: "Resume Analyzer",
    icon: FileSearch,
    blurb: "Analyze your resume and discover its strengths and improvement areas.",
  },
  {
    id: "ats",
    label: "Analysis Dashboard",
    icon: Gauge,
    blurb: "Review your resume analysis and ATS compatibility.",
  },
  {
    id: "improve",
    label: "Resume Improvement",
    icon: Wand2,
    blurb: "Improve your resume summary, experience and content.",
  },
  {
    id: "match",
    label: "Job Matching",
    icon: Briefcase,
    job: true,
    blurb: "Compare your resume with a specific job description.",
  },
  {
    id: "history",
    label: "History & Reports",
    icon: History,
  },
];

export const TOOL_TABS = TABS.filter((t) => t.blurb);

