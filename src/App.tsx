import { useMemo, useState } from "react";
import { JOBS, type Job } from "./data";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { JobBoard } from "./components/JobBoard";
import { JobModal } from "./components/JobModal";
import {
  AlertBand,
  CompanySpotlight,
  HowItWorks,
  SalaryExplorer,
  Testimonials,
} from "./components/Sections";
import { Footer } from "./components/Footer";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}

export default function App() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("All");
  const [modes, setModes] = useState<Set<string>>(new Set());
  const [salaryFloor, setSalaryFloor] = useState(30);
  const [savedOnly, setSavedOnly] = useState(false);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [activeJob, setActiveJob] = useState<Job | null>(null);

  const featured = useMemo(() => JOBS.filter((j) => j.featured), []);

  const handleSearch = (q: string, loc: string) => {
    setQuery(q);
    setLocation(loc);
    setSavedOnly(false);
    scrollToId("jobs");
  };

  const handleChip = (chip: string) => {
    if (chip === "Remote") {
      setModes(new Set(["Remote"]));
      setCategory("All");
    } else if (chip === "€100k+") {
      setSalaryFloor(100);
    } else {
      setCategory(chip);
      setModes(new Set());
    }
    setSavedOnly(false);
    scrollToId("jobs");
  };

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const browseCompany = (name: string) => {
    setQuery(name);
    setLocation("");
    setCategory("All");
    setSavedOnly(false);
    scrollToId("jobs");
  };

  return (
    <div id="top" className="min-h-screen">
      <div className="noise-layer" aria-hidden="true" />

      <Header
        savedCount={savedIds.size}
        onSavedClick={() => {
          setSavedOnly(true);
          scrollToId("jobs");
        }}
      />

      <main>
        <Hero
          featured={featured}
          onSearch={handleSearch}
          onChip={handleChip}
          onOpen={setActiveJob}
        />
        <Stats />
        <JobBoard
          query={query}
          setQuery={setQuery}
          location={location}
          setLocation={setLocation}
          category={category}
          setCategory={setCategory}
          modes={modes}
          setModes={setModes}
          salaryFloor={salaryFloor}
          setSalaryFloor={setSalaryFloor}
          savedOnly={savedOnly}
          setSavedOnly={setSavedOnly}
          savedIds={savedIds}
          onToggleSave={toggleSave}
          onOpen={setActiveJob}
        />
        <CompanySpotlight onBrowse={browseCompany} />
        <SalaryExplorer />
        <HowItWorks />
        <Testimonials />
        <AlertBand />
      </main>

      <Footer />

      {activeJob && (
        <JobModal
          key={activeJob.id}
          job={activeJob}
          saved={savedIds.has(activeJob.id)}
          onSave={() => toggleSave(activeJob.id)}
          onClose={() => setActiveJob(null)}
        />
      )}
    </div>
  );
}
