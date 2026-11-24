import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { health } from "./api";
import { TABS } from "./lib/tabs";
import Landing from "./pages/Landing";
import Overview from "./pages/Overview";
import Tool from "./pages/Tool";
import Report from "./pages/Report";

function useRoute() {
  const get = () => (location.hash || "#/").replace(/^#\/?/, "");
  const [r, setR] = useState(get);
  useEffect(() => { const f = () => { setR(get()); window.scrollTo(0, 0); }; addEventListener("hashchange", f); return () => removeEventListener("hashchange", f); }, []);
  return r;
}

export default function App() {
  const route = useRoute();
  const [resume, setResume] = useState(null), [job, setJob] = useState(""), [results, setResults] = useState({}), [cfg, setCfg] = useState(null), [nav, setNav] = useState(false);
  useEffect(() => { health().then((h) => setCfg(h.aiConfigured)).catch(() => setCfg(false)); }, []);
  useEffect(() => { setResults({}); }, [resume?.id]);
  if (!route.startsWith("app")) return <Landing />;
  const tab = TABS.find((t) => t.id === route.split("/")[1]) || TABS[0];
  return <div className="min-h-screen md:flex">
    <header className="no-print sticky top-0 z-30 flex items-center justify-between bg-navy px-4 py-3 text-white md:hidden">
      <a href="#/" className="font-heading font-extrabold">ResumeIQ AI</a><button aria-label="Menu" aria-expanded={nav} onClick={() => setNav(!nav)}>{nav ? <X /> : <Menu />}</button></header>
    <aside className={`no-print ${nav ? "block" : "hidden"} fixed inset-x-0 top-[52px] z-20 bg-navy p-4 text-white md:sticky md:top-0 md:block md:h-screen md:w-64 md:shrink-0`}>
      <a href="#/" className="mb-6 hidden font-heading text-lg font-extrabold md:block">ResumeIQ AI</a>
      <nav className="flex flex-col gap-1">{TABS.map((t) => <a key={t.id} href={`#/app/${t.id}`} onClick={() => setNav(false)}
        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${t.id === tab.id ? "bg-lime text-navy" : "hover:bg-white/10"}`}><t.icon size={17} />{t.label}{results[t.id] && t.id !== tab.id && <span className="ml-auto h-2 w-2 rounded-full bg-lime" />}</a>)}</nav>
    </aside>
    <main className="mx-auto w-full max-w-5xl flex-1 p-5 md:p-8">
      {tab.id === "overview" ? <Overview {...{ resume, setResume, results, cfg }} />
        : tab.id === "report" ? <Report results={results} resume={resume} />
        : <Tool key={tab.id} {...{ tab, resume, job, setJob, results, setResults }} />}
    </main>
  </div>;
}
