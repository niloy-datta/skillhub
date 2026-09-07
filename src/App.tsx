import { useState } from "react";
import {
  COMPANIES,
  WORKERS,
  SAMPLE_TASKS,
  BUSINESS_JOBS,
  COMPANY_REVIEWS,
  TASK_CATEGORIES,
  WORKER_SKILLS,
  LANGUAGES,
  TICKER_ITEMS,
  formatAgo,
  type Worker,
  type Company,
  type Task,
  type BusinessJob,
} from "./data";
import { Reveal, useScramble } from "./hooks";
import {
  LogoMark,
  IconSearch,
  IconPin,
  IconBookmark,
  IconArrow,
  IconClock,
  IconCheck,
  IconX,
  IconFilter,
  IconStar,
  IconBolt,
  IconChevron,
  CompanyMark,
  WorkerAvatar,
} from "./components/Icons";

type View =
  | "home"
  | "get-help"
  | "post-task"
  | "task-detail"
  | "hire-people"
  | "post-job"
  | "find-workers"
  | "worker-profile"
  | "company-profile"
  | "business-workspace";

export default function App() {
  const [view, setView] = useState<View>("home");
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const navigate = (v: View) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div id="top" className="min-h-screen bg-cream">
      <div className="noise-layer" aria-hidden="true" />
      <Nav view={view} navigate={navigate} />
      <main>
        {view === "home" && <Home navigate={navigate} />}
        {view === "get-help" && <GetHelp navigate={navigate} setSelectedTask={setSelectedTask} />}
        {view === "post-task" && <PostTask navigate={navigate} />}
        {view === "task-detail" && selectedTask && <TaskDetail task={selectedTask} navigate={navigate} />}
        {view === "hire-people" && <HirePeople navigate={navigate} setSelectedCompany={setSelectedCompany} />}
        {view === "post-job" && <PostJob navigate={navigate} />}
        {view === "find-workers" && <FindWorkers navigate={navigate} setSelectedWorker={setSelectedWorker} />}
        {view === "worker-profile" && selectedWorker && <WorkerProfile worker={selectedWorker} navigate={navigate} />}
        {view === "company-profile" && selectedCompany && <CompanyProfile company={selectedCompany} navigate={navigate} />}
        {view === "business-workspace" && <BusinessWorkspace navigate={navigate} />}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}

// ===== NAVIGATION =====
function Nav({ view, navigate }: { view: View; navigate: (v: View) => void }) {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-midnight/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <button onClick={() => navigate("home")} className="flex items-center gap-3 group">
          <LogoMark className="h-8 w-8 text-indigo transition-transform group-hover:scale-110" />
          <span className="font-display text-xl font-bold tracking-tight text-white">
            Skillhub
          </span>
        </button>

        <nav className="hidden items-center gap-2 md:flex">
          {[
            { label: "Get Help", view: "get-help" as View },
            { label: "Hire People", view: "hire-people" as View },
            { label: "Find Workers", view: "find-workers" as View },
          ].map((item) => (
            <button
              key={item.view}
              onClick={() => navigate(item.view)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                view === item.view
                  ? "bg-indigo text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => navigate("post-task")}
          className="rounded-full bg-gradient-to-r from-indigo to-violet px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
        >
          Post Task
        </button>
      </div>
    </header>
  );
}

// ===== HOME =====
function Home({ navigate }: { navigate: (v: View) => void }) {
  const line1 = useScramble("NEED HELP?", 200);
  const line2 = useScramble("OR HIRING?", 650);

  return (
    <section className="relative min-h-screen overflow-hidden bg-midnight text-white">
      <div className="absolute inset-0">
        <div className="bg-hero-grid absolute inset-0 opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/40 via-midnight/60 to-midnight" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-40 md:px-8 md:pt-48">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-emerald/30 bg-emerald/10 px-5 py-2 backdrop-blur-sm">
            <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-emerald" />
            <span className="font-mono text-sm font-medium text-emerald">
              2,847 workers available now
            </span>
          </div>

          <h1 className="mt-10 font-display text-[clamp(3.5rem,10vw,8rem)] font-black leading-[0.85] tracking-tight">
            <span className="block">{line1}</span>
            <span className="block gradient-text">{line2}</span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-white/70">
            The two-sided hiring platform. Post a task and get matched with verified workers nearby,
            or hire people for your business.
          </p>

          <div className="mt-14 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            <Reveal delay={100}>
              <button
                onClick={() => navigate("get-help")}
                className="group relative overflow-hidden rounded-3xl border-2 border-white/20 bg-white/5 p-10 text-left backdrop-blur-xl transition-all hover:border-indigo hover:bg-white/10 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo/20 to-violet/20 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo to-violet text-3xl shadow-xl">
                    🛠️
                  </div>
                  <h3 className="font-display text-3xl font-bold">I need help</h3>
                  <p className="mt-3 text-lg text-white/60 leading-relaxed">
                    Cleaning, plumbing, moving, caregiving — post a task and get matched with verified workers nearby
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-lg font-semibold text-indigo">
                    Get Help <IconArrow className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </button>
            </Reveal>

            <Reveal delay={200}>
              <button
                onClick={() => navigate("hire-people")}
                className="group relative overflow-hidden rounded-3xl border-2 border-white/20 bg-white/5 p-10 text-left backdrop-blur-xl transition-all hover:border-amber hover:bg-white/10 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber/20 to-violet/20 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber to-violet text-3xl shadow-xl">
                    🏢
                  </div>
                  <h3 className="font-display text-3xl font-bold">I'm hiring</h3>
                  <p className="mt-3 text-lg text-white/60 leading-relaxed">
                    Restaurant, warehouse, hotel, cleaning company — post jobs, shifts, or build crews
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-lg font-semibold text-amber">
                    Hire People <IconArrow className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </button>
            </Reveal>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-28 grid gap-6 md:grid-cols-4">
          {[
            { value: "2,847", label: "workers available", gradient: "from-indigo to-violet" },
            { value: "8", label: "verified companies", gradient: "from-violet to-amber" },
            { value: "24h", label: "avg. response time", gradient: "from-amber to-emerald" },
            { value: "100%", label: "real salary shown", gradient: "from-emerald to-indigo" },
          ].map((stat, i) => (
            <Reveal key={stat.label} delay={i * 100}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm hover:bg-white/10 transition-all">
                <p className={`font-display text-5xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
                <p className="mt-3 font-mono text-sm text-white/60">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Ticker */}
        <div className="marquee mt-28 border-t border-white/10 py-6" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0">
                {TICKER_ITEMS.map((item) => (
                  <span key={`${dup}-${item}`} className="flex items-center font-mono text-sm text-white/50">
                    <span className="mx-8 text-indigo">◆</span>
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== GET HELP (Individual Flow) =====
function GetHelp({
  navigate,
  setSelectedTask,
}: {
  navigate: (v: View) => void;
  setSelectedTask: (t: Task) => void;
}) {
  const openTask = (task: Task) => {
    setSelectedTask(task);
    navigate("task-detail");
  };

  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mb-14">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-indigo">
              // Get Help
            </p>
            <h1 className="mt-3 font-display text-5xl font-black tracking-tight md:text-6xl">
              What do you need help with?
            </h1>
            <p className="mt-4 text-xl text-midnight/60">
              Post a task and get matched with verified workers nearby
            </p>
          </div>
        </Reveal>

        {/* Task categories */}
        <Reveal delay={100}>
          <div className="mb-14">
            <p className="mb-5 font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
              Popular categories
            </p>
            <div className="flex flex-wrap gap-3">
              {TASK_CATEGORIES.slice(0, 8).map((cat) => (
                <button
                  key={cat}
                  className="rounded-full border-2 border-midnight/20 bg-white px-6 py-3 font-medium text-midnight transition-all hover:border-indigo hover:bg-indigo hover:text-white hover:scale-105"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={150}>
          <div className="mb-14 rounded-3xl bg-gradient-to-r from-indigo via-violet to-amber p-10 text-center shadow-2xl">
            <h2 className="font-display text-3xl font-bold text-white">Ready to post your task?</h2>
            <p className="mt-3 text-lg text-white/90">Get matched with verified workers in minutes</p>
            <button
              onClick={() => navigate("post-task")}
              className="mt-8 rounded-full bg-white px-8 py-4 text-lg font-semibold text-midnight shadow-xl transition-all hover:scale-105"
            >
              Post a Task →
            </button>
          </div>
        </Reveal>

        {/* Sample tasks */}
        <Reveal delay={200}>
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="font-display text-3xl font-bold">Recent tasks</h2>
            <p className="font-mono text-sm text-midnight/60">{SAMPLE_TASKS.length} tasks available</p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SAMPLE_TASKS.map((task, i) => (
            <Reveal key={task.id} delay={250 + i * 50}>
              <TaskCard task={task} onClick={() => openTask(task)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TaskCard({ task, onClick }: { task: Task; onClick: () => void }) {
  return (
    <article
      onClick={onClick}
      className="group cursor-pointer rounded-3xl border-2 border-midnight/10 bg-white p-7 shadow-sm transition-all hover:-translate-y-2 hover:border-indigo hover:shadow-2xl"
    >
      <div className="mb-4 flex items-start justify-between">
        <span className="rounded-full bg-indigo/10 px-4 py-1.5 font-mono text-xs font-semibold text-indigo">
          {task.category}
        </span>
        <span className="flex items-center gap-1.5 font-mono text-xs text-midnight/50">
          <IconClock className="h-3.5 w-3.5" />
          {formatAgo(task.postedHours)}
        </span>
      </div>

      <h3 className="font-display text-xl font-bold leading-tight group-hover:text-indigo transition-colors">
        {task.title}
      </h3>

      <p className="mt-3 text-sm text-midnight/60 line-clamp-2">{task.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="flex items-center gap-1.5 rounded-full bg-mist/50 px-3 py-1.5 font-mono text-xs text-midnight/70">
          <IconPin className="h-3 w-3" />
          {task.city}
        </span>
        <span className="rounded-full bg-mist/50 px-3 py-1.5 font-mono text-xs text-midnight/70">
          {task.date}
        </span>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-midnight/10 pt-5">
        <p className="font-display text-2xl font-bold">
          {task.currency}
          {task.budget.toLocaleString()}
        </p>
        <span className="flex items-center gap-1.5 font-mono text-xs font-semibold text-indigo opacity-0 transition-opacity group-hover:opacity-100">
          View details <IconArrow className="h-3.5 w-3.5" />
        </span>
      </div>
    </article>
  );
}

// ===== POST TASK =====
function PostTask({ navigate }: { navigate: (v: View) => void }) {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");
  const [workers, setWorkers] = useState("1");
  const [requirements, setRequirements] = useState("");

  const handleSubmit = () => {
    navigate("get-help");
  };

  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <Reveal>
          <div className="mb-10">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-indigo">
              // Post a Task
            </p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">
              Tell us what you need
            </h1>
            <p className="mt-3 text-lg text-midnight/60">
              Fill in the details and we'll match you with verified workers
            </p>
          </div>
        </Reveal>

        {/* Progress */}
        <Reveal delay={100}>
          <div className="mb-10 flex items-center gap-3">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-3 flex-1">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full font-bold transition-all ${
                    step >= s ? "bg-indigo text-white" : "bg-mist text-midnight/40"
                  }`}
                >
                  {step > s ? <IconCheck className="h-5 w-5" /> : s}
                </div>
                {s < 3 && <div className={`h-1 flex-1 rounded-full ${step > s ? "bg-indigo" : "bg-mist"}`} />}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="rounded-3xl border-2 border-midnight/10 bg-white p-8 shadow-xl md:p-10">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-4 text-base outline-none transition-all focus:border-indigo"
                  >
                    <option value="">Select a category</option>
                    {TASK_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                    Task title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Deep clean 2-bedroom apartment"
                    className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-4 text-base outline-none transition-all focus:border-indigo"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                    Description *
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what you need in detail..."
                    rows={5}
                    className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-4 text-base outline-none transition-all focus:border-indigo resize-none"
                  />
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!category || !title || !description}
                  className="w-full rounded-2xl bg-gradient-to-r from-indigo to-violet py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                      Country *
                    </label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="e.g., Japan"
                      className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-4 text-base outline-none transition-all focus:border-indigo"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                      City *
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g., Tokyo"
                      className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-4 text-base outline-none transition-all focus:border-indigo"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                    Area / Neighborhood
                  </label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g., Shinjuku"
                    className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-4 text-base outline-none transition-all focus:border-indigo"
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                      Date *
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-4 text-base outline-none transition-all focus:border-indigo"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                      Time
                    </label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-4 text-base outline-none transition-all focus:border-indigo"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 rounded-2xl border-2 border-midnight/20 py-4 text-lg font-semibold text-midnight transition-all hover:bg-mist"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!country || !city || !date}
                    className="flex-1 rounded-2xl bg-gradient-to-r from-indigo to-violet py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                    Budget *
                  </label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g., 18000"
                    className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-4 text-base outline-none transition-all focus:border-indigo"
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                      Estimated duration
                    </label>
                    <input
                      type="text"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="e.g., 3 hours"
                      className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-4 text-base outline-none transition-all focus:border-indigo"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                      Number of workers
                    </label>
                    <input
                      type="number"
                      value={workers}
                      onChange={(e) => setWorkers(e.target.value)}
                      min="1"
                      className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-4 text-base outline-none transition-all focus:border-indigo"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                    Special requirements
                  </label>
                  <textarea
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    placeholder="Any special requirements or notes..."
                    rows={4}
                    className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-4 text-base outline-none transition-all focus:border-indigo resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 rounded-2xl border-2 border-midnight/20 py-4 text-lg font-semibold text-midnight transition-all hover:bg-mist"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!budget}
                    className="flex-1 rounded-2xl bg-gradient-to-r from-indigo to-violet py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Post Task ✓
                  </button>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ===== TASK DETAIL =====
function TaskDetail({ task, navigate }: { task: Task; navigate: (v: View) => void }) {
  const matchedWorkers = WORKERS.slice(0, 5);

  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <button
          onClick={() => navigate("get-help")}
          className="mb-8 flex items-center gap-2 font-mono text-sm font-semibold text-indigo hover:underline"
        >
          ← Back to tasks
        </button>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Task details */}
          <div>
            <Reveal>
              <div className="rounded-3xl border-2 border-midnight/10 bg-white p-8 shadow-xl md:p-10">
                <div className="mb-6 flex items-start justify-between">
                  <span className="rounded-full bg-indigo/10 px-5 py-2 font-mono text-sm font-semibold text-indigo">
                    {task.category}
                  </span>
                  <span className="flex items-center gap-2 font-mono text-sm text-midnight/50">
                    <IconClock className="h-4 w-4" />
                    Posted {formatAgo(task.postedHours)}
                  </span>
                </div>

                <h1 className="font-display text-4xl font-black leading-tight">{task.title}</h1>

                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="flex items-center gap-2 rounded-full bg-mist/50 px-4 py-2 font-mono text-sm text-midnight/70">
                    <IconPin className="h-4 w-4" />
                    {task.city}, {task.country}
                  </span>
                  <span className="rounded-full bg-mist/50 px-4 py-2 font-mono text-sm text-midnight/70">
                    {task.date}
                  </span>
                  {task.time && (
                    <span className="rounded-full bg-mist/50 px-4 py-2 font-mono text-sm text-midnight/70">
                      {task.time}
                    </span>
                  )}
                </div>

                <div className="mt-8 border-t border-midnight/10 pt-8">
                  <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                    Description
                  </h3>
                  <p className="mt-3 text-lg leading-relaxed text-midnight/75">{task.description}</p>
                </div>

                <div className="mt-8 border-t border-midnight/10 pt-8">
                  <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                    Budget
                  </h3>
                  <p className="mt-3 font-display text-4xl font-black">
                    {task.currency}
                    {task.budget.toLocaleString()}
                  </p>
                </div>

                {task.specialRequirements && (
                  <div className="mt-8 border-t border-midnight/10 pt-8">
                    <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                      Special requirements
                    </h3>
                    <p className="mt-3 text-lg leading-relaxed text-midnight/75">
                      {task.specialRequirements}
                    </p>
                  </div>
                )}
              </div>
            </Reveal>
          </div>

          {/* Matched workers */}
          <div>
            <Reveal delay={150}>
              <div className="sticky top-32 rounded-3xl border-2 border-midnight/10 bg-white p-7 shadow-xl">
                <h3 className="font-display text-2xl font-bold">Matched workers nearby</h3>
                <p className="mt-2 font-mono text-sm text-midnight/60">
                  {matchedWorkers.length} verified workers available
                </p>

                <div className="mt-6 space-y-4">
                  {matchedWorkers.map((worker) => (
                    <div
                      key={worker.id}
                      className="rounded-2xl border border-midnight/10 bg-cream p-4 transition-all hover:border-indigo hover:bg-white"
                    >
                      <div className="flex items-start gap-4">
                        <WorkerAvatar worker={worker} size="sm" />
                        <div className="min-w-0 flex-1">
                          <p className="font-display font-bold">{worker.name}</p>
                          <div className="mt-1 flex items-center gap-2 font-mono text-xs text-midnight/60">
                            <IconStar className="h-3 w-3 text-amber" />
                            {worker.rating} · {worker.completedWork} jobs
                          </div>
                          <p className="mt-2 font-mono text-xs text-midnight/50">
                            {worker.currency}{worker.expectedRate}/hr
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => navigate("find-workers")}
                  className="mt-6 w-full rounded-2xl bg-gradient-to-r from-indigo to-violet py-3.5 font-semibold text-white shadow-lg transition-all hover:scale-[1.02]"
                >
                  View all workers →
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== HIRE PEOPLE (Business Flow) =====
function HirePeople({
  navigate,
  setSelectedCompany,
}: {
  navigate: (v: View) => void;
  setSelectedCompany: (c: Company) => void;
}) {
  const openCompany = (company: Company) => {
    setSelectedCompany(company);
    navigate("company-profile");
  };

  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mb-14">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-amber">
              // Hire People
            </p>
            <h1 className="mt-3 font-display text-5xl font-black tracking-tight md:text-6xl">
              Verified employers
            </h1>
            <p className="mt-4 text-xl text-midnight/60">
              Browse companies hiring now or post your own job
            </p>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={100}>
          <div className="mb-14 rounded-3xl bg-gradient-to-r from-amber via-violet to-indigo p-10 text-center shadow-2xl">
            <h2 className="font-display text-3xl font-bold text-white">Ready to hire?</h2>
            <p className="mt-3 text-lg text-white/90">Post jobs, shifts, or build crews for your business</p>
            <button
              onClick={() => navigate("post-job")}
              className="mt-8 rounded-full bg-white px-8 py-4 text-lg font-semibold text-midnight shadow-xl transition-all hover:scale-105"
            >
              Post a Job →
            </button>
          </div>
        </Reveal>

        {/* Companies */}
        <Reveal delay={150}>
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="font-display text-3xl font-bold">Companies hiring now</h2>
            <p className="font-mono text-sm text-midnight/60">{COMPANIES.length} verified employers</p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {COMPANIES.map((company, i) => (
            <Reveal key={company.id} delay={200 + i * 50}>
              <CompanyCard company={company} onClick={() => openCompany(company)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CompanyCard({ company, onClick }: { company: Company; onClick: () => void }) {
  return (
    <article
      onClick={onClick}
      className="group cursor-pointer rounded-3xl border-2 border-midnight/10 bg-white p-7 shadow-sm transition-all hover:-translate-y-2 hover:border-amber hover:shadow-2xl"
    >
      <div className="mb-4 flex items-start justify-between">
        <CompanyMark company={company} />
        {company.verified && (
          <span className="flex items-center gap-1.5 rounded-full bg-emerald/10 px-3 py-1.5 font-mono text-xs font-semibold text-emerald">
            <IconCheck className="h-3 w-3" />
            Verified
          </span>
        )}
      </div>

      <h3 className="font-display text-xl font-bold group-hover:text-amber transition-colors">
        {company.name}
      </h3>
      <p className="mt-1 font-mono text-sm text-midnight/60">{company.tagline}</p>

      <div className="mt-5 flex items-center gap-2 font-mono text-sm">
        <IconStar className="h-4 w-4 text-amber" />
        <span className="font-bold">{company.workerRating}</span>
        <span className="text-midnight/50">worker rating</span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-full bg-mist/50 px-3 py-1.5 font-mono text-xs text-midnight/70">
          {company.industry}
        </span>
        <span className="rounded-full bg-mist/50 px-3 py-1.5 font-mono text-xs text-midnight/70">
          {company.city}, {company.country}
        </span>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-midnight/10 pt-5">
        <p className="font-mono text-sm text-midnight/60">
          {company.activeJobs} jobs · {company.activeShifts} shifts
        </p>
        <span className="flex items-center gap-1.5 font-mono text-xs font-semibold text-amber opacity-0 transition-opacity group-hover:opacity-100">
          View company <IconArrow className="h-3.5 w-3.5" />
        </span>
      </div>
    </article>
  );
}

// ===== POST JOB =====
function PostJob({ navigate }: { navigate: (v: View) => void }) {
  const [tab, setTab] = useState<"job" | "shift" | "crew">("job");

  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <Reveal>
          <div className="mb-10">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-amber">
              // Post a Job
            </p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">
              What do you need?
            </h1>
            <p className="mt-3 text-lg text-midnight/60">
              Choose the type of posting that fits your needs
            </p>
          </div>
        </Reveal>

        {/* Tabs */}
        <Reveal delay={100}>
          <div className="mb-8 flex gap-2 rounded-2xl border-2 border-midnight/10 bg-white p-2">
            {[
              { id: "job" as const, label: "Regular Job", icon: "💼" },
              { id: "shift" as const, label: "Single Shift", icon: "📅" },
              { id: "crew" as const, label: "Build Crew", icon: "👥" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 rounded-xl px-6 py-4 font-semibold transition-all ${
                  tab === t.id
                    ? "bg-gradient-to-r from-amber to-violet text-white shadow-lg"
                    : "text-midnight/60 hover:bg-mist"
                }`}
              >
                <span className="mr-2">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="rounded-3xl border-2 border-midnight/10 bg-white p-8 shadow-xl md:p-10">
            {tab === "job" && (
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                    Role title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Warehouse Worker"
                    className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-4 text-base outline-none transition-all focus:border-amber"
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                      Location *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Dhaka, Bangladesh"
                      className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-4 text-base outline-none transition-all focus:border-amber"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                      Number of positions
                    </label>
                    <input
                      type="number"
                      defaultValue="1"
                      min="1"
                      className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-4 text-base outline-none transition-all focus:border-amber"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                      Monthly pay
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., ৳15,000"
                      className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-4 text-base outline-none transition-all focus:border-amber"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                      Employment type
                    </label>
                    <select className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-4 text-base outline-none transition-all focus:border-amber">
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                    Requirements
                  </label>
                  <textarea
                    placeholder="Describe requirements, experience needed..."
                    rows={4}
                    className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-4 text-base outline-none transition-all focus:border-amber resize-none"
                  />
                </div>

                <button
                  onClick={() => navigate("hire-people")}
                  className="w-full rounded-2xl bg-gradient-to-r from-amber to-violet py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-[1.02]"
                >
                  Post Job ✓
                </button>
              </div>
            )}

            {tab === "shift" && (
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                    Role *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Kitchen Helper"
                    className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-4 text-base outline-none transition-all focus:border-amber"
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                      Date *
                    </label>
                    <input
                      type="date"
                      className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-4 text-base outline-none transition-all focus:border-amber"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                      Number of workers
                    </label>
                    <input
                      type="number"
                      defaultValue="1"
                      min="1"
                      className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-4 text-base outline-none transition-all focus:border-amber"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                      Start time
                    </label>
                    <input
                      type="time"
                      className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-4 text-base outline-none transition-all focus:border-amber"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                      End time
                    </label>
                    <input
                      type="time"
                      className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-4 text-base outline-none transition-all focus:border-amber"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                    Hourly rate
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., ৳280/hr"
                    className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-4 text-base outline-none transition-all focus:border-amber"
                  />
                </div>

                <button
                  onClick={() => navigate("hire-people")}
                  className="w-full rounded-2xl bg-gradient-to-r from-amber to-violet py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-[1.02]"
                >
                  Post Shift ✓
                </button>
              </div>
            )}

            {tab === "crew" && (
              <div className="space-y-6">
                <div className="rounded-2xl bg-gradient-to-r from-amber/10 to-violet/10 p-6">
                  <p className="font-mono text-sm font-semibold text-midnight/70">
                    💡 Example: Need 15 warehouse workers, tomorrow, 08:00–17:00, Dhaka
                  </p>
                </div>

                <div>
                  <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                    Role *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Warehouse Worker"
                    className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-4 text-base outline-none transition-all focus:border-amber"
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                      Number of workers *
                    </label>
                    <input
                      type="number"
                      defaultValue="15"
                      min="1"
                      className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-4 text-base outline-none transition-all focus:border-amber"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                      Date *
                    </label>
                    <input
                      type="date"
                      className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-4 text-base outline-none transition-all focus:border-amber"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                    Location *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Dhaka, Bangladesh"
                    className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-4 text-base outline-none transition-all focus:border-amber"
                  />
                </div>

                <button
                  onClick={() => navigate("business-workspace")}
                  className="w-full rounded-2xl bg-gradient-to-r from-amber to-violet py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-[1.02]"
                >
                  Build Crew →
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ===== FIND WORKERS =====
function FindWorkers({
  navigate,
  setSelectedWorker,
}: {
  navigate: (v: View) => void;
  setSelectedWorker: (w: Worker) => void;
}) {
  const openWorker = (worker: Worker) => {
    setSelectedWorker(worker);
    navigate("worker-profile");
  };

  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mb-14">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-indigo">
              // Find Workers
            </p>
            <h1 className="mt-3 font-display text-5xl font-black tracking-tight md:text-6xl">
              What kind of people do you need?
            </h1>
            <p className="mt-4 text-xl text-midnight/60">
              Browse verified workers with real ratings and reviews
            </p>
          </div>
        </Reveal>

        {/* Search */}
        <Reveal delay={100}>
          <div className="mb-10 flex flex-col gap-3 rounded-3xl border-2 border-midnight/10 bg-white p-3 shadow-xl md:flex-row">
            <label className="flex flex-1 items-center gap-3 rounded-2xl bg-cream px-5">
              <IconSearch className="h-5 w-5 text-midnight/40" />
              <input
                type="text"
                placeholder="Search by skill, name, or location..."
                className="w-full bg-transparent py-4 text-base outline-none placeholder:text-midnight/40"
              />
            </label>
            <label className="flex items-center gap-3 rounded-2xl bg-cream px-5 md:w-64">
              <IconPin className="h-5 w-5 text-midnight/40" />
              <input
                type="text"
                placeholder="Location"
                className="w-full bg-transparent py-4 text-base outline-none placeholder:text-midnight/40"
              />
            </label>
          </div>
        </Reveal>

        {/* Filters */}
        <Reveal delay={150}>
          <div className="mb-10 flex flex-wrap gap-3">
            {WORKER_SKILLS.slice(0, 10).map((skill) => (
              <button
                key={skill}
                className="rounded-full border-2 border-midnight/20 bg-white px-5 py-2.5 font-medium text-midnight transition-all hover:border-indigo hover:bg-indigo hover:text-white hover:scale-105"
              >
                {skill}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Workers */}
        <Reveal delay={200}>
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="font-display text-3xl font-bold">Verified workers</h2>
            <p className="font-mono text-sm text-midnight/60">{WORKERS.length} workers available</p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {WORKERS.map((worker, i) => (
            <Reveal key={worker.id} delay={250 + i * 50}>
              <WorkerCard worker={worker} onClick={() => openWorker(worker)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkerCard({ worker, onClick }: { worker: Worker; onClick: () => void }) {
  return (
    <article
      onClick={onClick}
      className="group cursor-pointer rounded-3xl border-2 border-midnight/10 bg-white p-7 shadow-sm transition-all hover:-translate-y-2 hover:border-indigo hover:shadow-2xl"
    >
      <div className="mb-4 flex items-start justify-between">
        <WorkerAvatar worker={worker} />
        {worker.humanVerified && (
          <span className="flex items-center gap-1.5 rounded-full bg-emerald/10 px-3 py-1.5 font-mono text-xs font-semibold text-emerald">
            <IconCheck className="h-3 w-3" />
            Verified
          </span>
        )}
      </div>

      <h3 className="font-display text-xl font-bold group-hover:text-indigo transition-colors">
        {worker.name}
      </h3>
      <p className="mt-1 font-mono text-sm text-midnight/60">
        {worker.city}, {worker.country}
      </p>

      <div className="mt-4 flex items-center gap-2 font-mono text-sm">
        <IconStar className="h-4 w-4 text-amber" />
        <span className="font-bold">{worker.rating}</span>
        <span className="text-midnight/50">· {worker.completedWork} jobs</span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {worker.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-mist/50 px-3 py-1.5 font-mono text-xs text-midnight/70"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-midnight/10 pt-5">
        <p className="font-display text-2xl font-bold">
          {worker.currency}
          {worker.expectedRate}
          <span className="ml-1 text-xs font-medium text-midnight/50">/hr</span>
        </p>
        <span className="flex items-center gap-1.5 font-mono text-xs font-semibold text-indigo opacity-0 transition-opacity group-hover:opacity-100">
          View profile <IconArrow className="h-3.5 w-3.5" />
        </span>
      </div>
    </article>
  );
}

// ===== WORKER PROFILE =====
function WorkerProfile({ worker, navigate }: { worker: Worker; navigate: (v: View) => void }) {
  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <button
          onClick={() => navigate("find-workers")}
          className="mb-8 flex items-center gap-2 font-mono text-sm font-semibold text-indigo hover:underline"
        >
          ← Back to workers
        </button>

        <Reveal>
          <div className="rounded-3xl border-2 border-midnight/10 bg-white p-8 shadow-xl md:p-10">
            <div className="mb-6 flex items-start justify-between">
              <WorkerAvatar worker={worker} size="lg" />
              {worker.humanVerified && (
                <span className="flex items-center gap-2 rounded-full bg-emerald/10 px-5 py-2 font-mono text-sm font-semibold text-emerald">
                  <IconCheck className="h-4 w-4" />
                  Human Verified
                </span>
              )}
            </div>

            <h1 className="font-display text-4xl font-black">{worker.name}</h1>
            <p className="mt-2 font-mono text-lg text-midnight/60">
              {worker.city}, {worker.country}
            </p>

            <div className="mt-6 flex items-center gap-3 font-mono text-lg">
              <IconStar className="h-5 w-5 text-amber" />
              <span className="font-bold">{worker.rating}</span>
              <span className="text-midnight/50">· {worker.reviews} reviews</span>
              <span className="text-midnight/50">· {worker.completedWork} jobs completed</span>
            </div>

            <div className="mt-8 border-t border-midnight/10 pt-8">
              <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                Skills
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {worker.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-mist/50 px-4 py-2 font-mono text-sm text-midnight/70"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 border-t border-midnight/10 pt-8">
              <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                Languages
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {worker.languages.map((lang) => (
                  <span
                    key={lang}
                    className="rounded-full bg-mist/50 px-4 py-2 font-mono text-sm text-midnight/70"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 border-t border-midnight/10 pt-8">
              <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                Expected rate
              </h3>
              <p className="mt-3 font-display text-5xl font-black">
                {worker.currency}
                {worker.expectedRate}
                <span className="ml-2 text-xl font-medium text-midnight/50">/hour</span>
              </p>
            </div>

            <div className="mt-10 flex gap-3">
              <button className="flex-1 rounded-2xl bg-gradient-to-r from-indigo to-violet py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-[1.02]">
                Invite to job
              </button>
              <button className="flex-1 rounded-2xl border-2 border-midnight/20 py-4 text-lg font-semibold text-midnight transition-all hover:bg-mist">
                Message
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ===== COMPANY PROFILE =====
function CompanyProfile({ company, navigate }: { company: Company; navigate: (v: View) => void }) {
  const reviews = COMPANY_REVIEWS.filter((r) => r.companyId === company.id).slice(0, 3);

  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <button
          onClick={() => navigate("hire-people")}
          className="mb-8 flex items-center gap-2 font-mono text-sm font-semibold text-amber hover:underline"
        >
          ← Back to companies
        </button>

        <Reveal>
          <div className="rounded-3xl border-2 border-midnight/10 bg-white p-8 shadow-xl md:p-10">
            <div className="mb-6 flex items-start justify-between">
              <CompanyMark company={company} size="lg" />
              {company.verified && (
                <span className="flex items-center gap-2 rounded-full bg-emerald/10 px-5 py-2 font-mono text-sm font-semibold text-emerald">
                  <IconCheck className="h-4 w-4" />
                  Business Verified
                </span>
              )}
            </div>

            <h1 className="font-display text-4xl font-black">{company.name}</h1>
            <p className="mt-2 font-mono text-lg text-midnight/60">{company.tagline}</p>
            <p className="mt-1 font-mono text-midnight/60">
              {company.city}, {company.country}
            </p>

            <div className="mt-6 flex items-center gap-3 font-mono text-lg">
              <IconStar className="h-5 w-5 text-amber" />
              <span className="font-bold">{company.workerRating}</span>
              <span className="text-midnight/50">worker rating</span>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl bg-cream p-5">
                <p className="font-mono text-sm text-midnight/60">Active jobs</p>
                <p className="mt-2 font-display text-3xl font-black">{company.activeJobs}</p>
              </div>
              <div className="rounded-2xl bg-cream p-5">
                <p className="font-mono text-sm text-midnight/60">Active shifts</p>
                <p className="mt-2 font-display text-3xl font-black">{company.activeShifts}</p>
              </div>
              <div className="rounded-2xl bg-cream p-5">
                <p className="font-mono text-sm text-midnight/60">Response rate</p>
                <p className="mt-2 font-display text-3xl font-black">{company.responseRate}%</p>
              </div>
            </div>

            {reviews.length > 0 && (
              <div className="mt-10 border-t border-midnight/10 pt-10">
                <h3 className="font-display text-2xl font-bold">Worker reviews</h3>
                <div className="mt-6 space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="rounded-2xl border border-midnight/10 bg-cream p-6">
                      <div className="flex items-center gap-2 font-mono text-sm">
                        <IconStar className="h-4 w-4 text-amber" />
                        <span className="font-bold">{review.paymentReliability}/5</span>
                        <span className="text-midnight/50">· {review.workerName}</span>
                      </div>
                      <p className="mt-3 text-midnight/75">{review.comment || `${review.role} · ${review.date}`}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 flex gap-3">
              <button className="flex-1 rounded-2xl bg-gradient-to-r from-amber to-violet py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-[1.02]">
                View open positions
              </button>
              <button className="flex-1 rounded-2xl border-2 border-midnight/20 py-4 text-lg font-semibold text-midnight transition-all hover:bg-mist">
                Follow company
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ===== BUSINESS WORKSPACE =====
function BusinessWorkspace({ navigate }: { navigate: (v: View) => void }) {
  const [tab, setTab] = useState<"open" | "applicants" | "shifts" | "workers" | "trusted" | "crews">("open");

  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mb-10">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-amber">
              // Business Workspace
            </p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">
              Your dashboard
            </h1>
          </div>
        </Reveal>

        {/* Tabs */}
        <Reveal delay={100}>
          <div className="mb-8 flex gap-2 overflow-x-auto rounded-2xl border-2 border-midnight/10 bg-white p-2">
            {[
              { id: "open" as const, label: "Open Work", count: 3 },
              { id: "applicants" as const, label: "Applicants", count: 12 },
              { id: "shifts" as const, label: "Upcoming Shifts", count: 5 },
              { id: "workers" as const, label: "Workers", count: 28 },
              { id: "trusted" as const, label: "Trusted Workers", count: 8 },
              { id: "crews" as const, label: "Crews", count: 2 },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-5 py-3 font-semibold transition-all ${
                  tab === t.id
                    ? "bg-gradient-to-r from-amber to-violet text-white shadow-lg"
                    : "text-midnight/60 hover:bg-mist"
                }`}
              >
                {t.label}
                <span className={`rounded-full px-2 py-0.5 text-xs ${
                  tab === t.id ? "bg-white/20" : "bg-mist"
                }`}>
                  {t.count}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="rounded-3xl border-2 border-midnight/10 bg-white p-8 shadow-xl">
            {tab === "open" && (
              <div>
                <h2 className="font-display text-2xl font-bold">Open positions</h2>
                <div className="mt-6 space-y-4">
                  {BUSINESS_JOBS.slice(0, 3).map((job) => (
                    <div key={job.id} className="rounded-2xl border border-midnight/10 bg-cream p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-display text-xl font-bold">{job.role}</h3>
                          <p className="mt-1 font-mono text-sm text-midnight/60">{job.location}</p>
                        </div>
                        <span className="rounded-full bg-indigo/10 px-4 py-1.5 font-mono text-xs font-semibold text-indigo">
                          {job.type}
                        </span>
                      </div>
                      <div className="mt-4 flex items-center gap-4 font-mono text-sm text-midnight/60">
                        <span>{job.applicants} applicants</span>
                        <span>·</span>
                        <span>{job.currency}{job.pay}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "applicants" && (
              <div>
                <h2 className="font-display text-2xl font-bold">Recent applicants</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {WORKERS.slice(0, 6).map((worker) => (
                    <div key={worker.id} className="rounded-2xl border border-midnight/10 bg-cream p-5">
                      <div className="flex items-start gap-4">
                        <WorkerAvatar worker={worker} size="sm" />
                        <div className="min-w-0 flex-1">
                          <p className="font-display font-bold">{worker.name}</p>
                          <p className="mt-1 font-mono text-xs text-midnight/60">{worker.city}</p>
                          <div className="mt-2 flex items-center gap-2 font-mono text-xs">
                            <IconStar className="h-3 w-3 text-amber" />
                            {worker.rating}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <button className="flex-1 rounded-full bg-indigo py-2 text-xs font-semibold text-white">
                          Invite
                        </button>
                        <button className="flex-1 rounded-full border border-midnight/20 py-2 text-xs font-semibold text-midnight">
                          Message
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "shifts" && (
              <div>
                <h2 className="font-display text-2xl font-bold">Upcoming shifts</h2>
                <p className="mt-3 text-midnight/60">5 shifts scheduled</p>
              </div>
            )}

            {tab === "workers" && (
              <div>
                <h2 className="font-display text-2xl font-bold">All workers</h2>
                <p className="mt-3 text-midnight/60">28 workers have worked for you</p>
              </div>
            )}

            {tab === "trusted" && (
              <div>
                <h2 className="font-display text-2xl font-bold">Trusted workers</h2>
                <p className="mt-3 text-midnight/60">8 verified, reliable workers</p>
              </div>
            )}

            {tab === "crews" && (
              <div>
                <h2 className="font-display text-2xl font-bold">Built crews</h2>
                <p className="mt-3 text-midnight/60">2 crews created</p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ===== FOOTER =====
function Footer({ navigate }: { navigate: (v: View) => void }) {
  return (
    <footer className="bg-midnight text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <button onClick={() => navigate("home")} className="flex items-center gap-3 group">
              <LogoMark className="h-7 w-7 text-indigo transition-transform group-hover:scale-110" />
              <span className="font-display text-xl font-bold">Skillhub</span>
            </button>
            <p className="mt-5 text-white/60 leading-relaxed">
              The two-sided hiring platform. Post a task and get matched with verified workers nearby, or hire people for your business.
            </p>
          </div>

          <div>
            <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              For Individuals
            </p>
            <div className="space-y-2">
              <button onClick={() => navigate("get-help")} className="block text-white/70 hover:text-white transition-colors">
                Get Help
              </button>
              <button onClick={() => navigate("post-task")} className="block text-white/70 hover:text-white transition-colors">
                Post a Task
              </button>
              <button onClick={() => navigate("find-workers")} className="block text-white/70 hover:text-white transition-colors">
                Find Workers
              </button>
            </div>
          </div>

          <div>
            <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              For Businesses
            </p>
            <div className="space-y-2">
              <button onClick={() => navigate("hire-people")} className="block text-white/70 hover:text-white transition-colors">
                Hire People
              </button>
              <button onClick={() => navigate("post-job")} className="block text-white/70 hover:text-white transition-colors">
                Post a Job
              </button>
              <button onClick={() => navigate("business-workspace")} className="block text-white/70 hover:text-white transition-colors">
                Business Workspace
              </button>
            </div>
          </div>

          <div>
            <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              About
            </p>
            <div className="space-y-2">
              <a href="#top" className="block text-white/70 hover:text-white transition-colors">How it works</a>
              <a href="#top" className="block text-white/70 hover:text-white transition-colors">Trust & Safety</a>
              <a href="#top" className="block text-white/70 hover:text-white transition-colors">Support</a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 font-mono text-sm text-white/40 md:flex-row">
          <p>© 2026 Skillhub. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#top" className="hover:text-white transition-colors">Privacy</a>
            <a href="#top" className="hover:text-white transition-colors">Terms</a>
            <a href="#top" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
