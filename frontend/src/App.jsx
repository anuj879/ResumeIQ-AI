
import { useState, useEffect } from "react";
import { Menu, X, Sparkles, ArrowUpRight } from "lucide-react";
import { health } from "./api";
import { TABS } from "./lib/tabs";
import Landing from "./pages/Landing";
import Overview from "./pages/Overview";
import Tool from "./pages/Tool";
import Report from "./pages/Report";
import Upload from "./pages/upload";

function useRoute() {
  const get = () => (location.hash || "#/").replace(/^#\/?/, "");
  const [route, setRoute] = useState(get);

  useEffect(() => {
    const handleRoute = () => {
      setRoute(get());
      window.scrollTo(0, 0);
    };

    window.addEventListener("hashchange", handleRoute);
    return () => window.removeEventListener("hashchange", handleRoute);
  }, []);

  return route;
}

export default function App() {
  const route = useRoute();

  const [resume, setResume] = useState(null);
  const [job, setJob] = useState("");
  const [results, setResults] = useState({});
  const [cfg, setCfg] = useState(null);
  const [nav, setNav] = useState(false);

  useEffect(() => {
    health()
      .then((response) => setCfg(response.aiConfigured))
      .catch(() => setCfg(false));
  }, []);

  useEffect(() => {
    setResults({});
  }, [resume?.id]);

  if (route === "app/upload") {
    return (
      <Upload
        resume={resume}
        setResume={setResume}
        onContinue={() => {
          window.location.hash = "#/app/analysis";
        }}
      />
    );
  }

  if (!route.startsWith("app")) {
    return <Landing />;
  }

  const tabId = route.split("/")[1];
  const tab = TABS.find((item) => item.id === tabId) || TABS[0];
  const closeNav = () => setNav(false);

  const page =
    tab.id === "overview" ? (
      <Overview {...{ resume, setResume, results, cfg }} />
    ) : tab.id === "history" ? (
      <Report results={results} resume={resume} />
    ) : (
      <Tool
        key={tab.id}
        {...{ tab, resume, job, setJob, results, setResults }}
      />
    );

  return (
    <div className="workspace-shell min-h-screen md:flex">
      <header className="no-print sticky top-0 z-40 flex items-center justify-between border-b border-white/[0.08] bg-[#090b18]/90 px-5 py-4 text-white backdrop-blur-2xl md:hidden">
        <a href="#/" className="flex items-center gap-2 text-lg font-bold">
          <span className="brand-mark">
            <Sparkles size={17} />
          </span>
          ResumeIQ <span className="text-violet-300">AI</span>
        </a>

        <button
          aria-label="Toggle navigation"
          onClick={() => setNav(!nav)}
          className="rounded-xl border border-white/10 bg-white/[0.05] p-2"
        >
          {nav ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      {nav && (
        <button
          aria-label="Close navigation"
          onClick={closeNav}
          className="fixed inset-0 z-20 bg-black/70 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={`no-print fixed inset-y-0 left-0 z-30 flex w-[278px] flex-col border-r border-white/[0.08] bg-[#0b0d1c]/95 p-5 text-white backdrop-blur-2xl transition-transform duration-300 md:sticky md:top-0 md:h-screen md:translate-x-0 ${
          nav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <a href="#/" className="mb-10 flex items-center gap-3 px-2">
          <span className="brand-mark">
            <Sparkles size={19} />
          </span>
          <span className="text-xl font-bold tracking-tight">
            ResumeIQ <span className="text-violet-300">AI</span>
          </span>
        </a>

        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
          Workspace
        </p>

        <nav className="flex flex-col gap-1.5">
          {TABS.map((item) => {
            const Icon = item.icon;
            const active = item.id === tab.id;

            return (
              <a
                key={item.id}
                href={`#/app/${item.id}`}
                onClick={closeNav}
                className={`nav-link flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm transition-all ${
                  active ? "nav-link-active" : ""
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_10px_rgba(196,181,253,.9)]" />
                )}
              </a>
            );
          })}
        </nav>

        <div className="mt-auto rounded-2xl border border-violet-300/15 bg-gradient-to-br from-violet-500/[0.12] to-blue-500/[0.06] p-4">
          <div className="mb-3 flex items-center gap-2 text-violet-200">
            <Sparkles size={15} />
            <span className="text-xs font-semibold">AI Career Workspace</span>
          </div>
          <p className="text-[11px] leading-5 text-white/40">
            Your career journey, intelligently organized.
          </p>
          <a
            href="#/"
            className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-violet-200 transition hover:text-white"
          >
            Back to home <ArrowUpRight size={13} />
          </a>
        </div>
      </aside>

      <main className="min-w-0 flex-1 text-white">
        <div className="mx-auto w-full max-w-[1500px] px-5 py-7 md:px-9 md:py-10 xl:px-12">
          {page}
        </div>
      </main>
    </div>
  );
}


