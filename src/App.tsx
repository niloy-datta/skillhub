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

// ===== VIEW TYPES =====
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

      {/* Navigation */}
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
    <header className="fixed top-0 z-50 w-full glass-dark">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <button onClick={() => navigate("home")} className="flex items-center gap-3 group">
          <div className="relative">
            <LogoMark className="h-7 w-7 text-indigo transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 blur-lg bg-indigo/30 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-white">
            Skillhub
          </span>
        </button>

        <nav className="hidden items-center gap-6 md:flex">
          <button
            onClick={() => navigate("get-help")}
            className={`font-medium text-sm transition-colors ${
              view === "get-help" ? "text-indigo" : "text-white/70 hover:text-white"
            }`}
          >
            Get Help
          </button>
          <button
            onClick={() => navigate("hire-people")}
            className={`font-medium text-sm transition-colors ${
              view === "hire-people" ? "text-indigo" : "text-white/70 hover:text-white"
            }`}
          >
            Hire People
          </button>
          <button
            onClick={() => navigate("find-workers")}
            className={`font-medium text-sm transition-colors ${
              view === "find-workers" ? "text-indigo" : "text-white/70 hover:text-white"
            }`}
          >
            Find Workers
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("post-task")}
            className="rounded-full bg-gradient-to-r from-indigo to-violet px-5 py-2 text-sm font-semibold text-white shadow-glow transition-all hover:scale-105"
          >
            Post a task
          </button>
        </div>
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
        <div className="bg-hero-grid absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/60 via-midnight/80 to-midnight" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-40 md:px-8 md:pt-48">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur-sm">
            <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-emerald" />
            <span className="font-mono text-xs font-medium text-white/80">
              2,847 workers available now
            </span>
          </div>

          <h1 className="mt-8 font-display text-[clamp(3rem,9vw,7rem)] font-black leading-[0.9] tracking-tight">
            <span className="block">{line1}</span>
            <span className="block gradient-text">{line2}</span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
            The two-sided hiring platform. Post a task and get matched with verified workers nearby,
            or hire people for your business — restaurants, warehouses, hotels, and more.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Reveal delay={100}>
              <button
                onClick={() => navigate("get-help")}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 text-left backdrop-blur-xl transition-all hover:border-indigo/50 hover:bg-white/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo/10 to-violet/10 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo to-violet text-2xl">
                    🛠️
                  </div>
                  <h3 className="font-display text-2xl font-bold">I need help</h3>
                  <p className="mt-2 text-white/60">
                    Cleaning, plumbing, moving, caregiving — post a task and get matched with verified workers nearby
                  </p>
                  <div className="mt-6 flex items-center gap-2 font-semibold text-indigo">
                    Get Help <IconArrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </button>
            </Reveal>

            <Reveal delay={200}>
              <button
                onClick={() => navigate("hire-people")}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 text-left backdrop-blur-xl transition-all hover:border-amber/50 hover:bg-white/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber/10 to-violet/10 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber to-violet text-2xl">
                    🏢
                  </div>
                  <h3 className="font-display text-2xl font-bold">I'm hiring</h3>
                  <p className="mt-2 text-white/60">
                    Restaurant, warehouse, hotel, cleaning company — post jobs, shifts, or build crews
                  </p>
                  <div className="mt-6 flex items-center gap-2 font-semibold text-amber">
                    Hire People <IconArrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </button>
            </Reveal>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-24 grid gap-6 md:grid-cols-4">
          {[
            { value: "2,847", label: "workers available", gradient: "from-indigo to-violet" },
            { value: "8", label: "verified companies", gradient: "from-violet to-amber" },
            { value: "24h", label: "avg. response time", gradient: "from-amber to-emerald" },
            { value: "100%", label: "real salary shown", gradient: "from-emerald to-indigo" },
          ].map((stat, i) => (
            <Reveal key={stat.label} delay={i * 100}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <p className={`font-display text-4xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
                <p className="mt-2 font-mono text-sm text-white/60">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Ticker */}
        <div className="marquee mt-24 border-t border-white/10 py-5" aria-hidden="true">
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
          <div className="mb-12">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
              // Get Help
            </p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">
              What do you need help with?
            </h1>
            <p className="mt-3 text-lg text-midnight/60">
              Post a task and get matched with verified workers nearby
            </p>
          </div>
        </Reveal>

        {/* Task categories */}
        <Reveal delay={100}>
          <div className="mb-12">
            <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">
              Popular categories
            </p>
            <div className="flex flex-wrap gap-3">
              {TASK_CATEGORIES.slice(0, 8).map((cat) => (
                <button
                  key={cat}
                  className="rounded-full border border-midnight/20 bg-white px-5 py-2.5 font-medium text-midnight transition-all hover:border-indigo hover:bg-indigo/5 hover:text-indigo"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Recent tasks */}
        <Reveal delay={200}>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold">Recent tasks near you</h2>
            <button
              onClick={() => navigate("post-task")}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo to-violet px-5 py-2.5 font-semibold text-white shadow-glow transition-all hover:scale-105"
            >
              Post a task <IconArrow className="h-4 w-4" />
            </button>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SAMPLE_TASKS.map((task, i) => (
            <Reveal key={task.id} delay={i * 80}>
              <button
                onClick={() => openTask(task)}
                className="group w-full rounded-2xl border border-midnight/10 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-indigo/30 hover:shadow-premium"
              >
                <div className="mb-4 flex items-start justify-between">
                  <span className="rounded-full bg-indigo/10 px-3 py-1 font-mono text-xs font-semibold text-indigo">
                    {task.category}
                  </span>
                  <span className="font-mono text-xs text-midnight/50">{formatAgo(task.postedHours)}</span>
                </div>
                <h3 className="font-display text-lg font-bold leading-tight transition-colors group-hover:text-indigo">
                  {task.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-midnight/60">{task.description}</p>
                <div className="mt-4 flex flex-wrap gap-2 font-mono text-xs">
                  <span className="flex items-center gap-1 rounded-full bg-mist/50 px-3 py-1 text-midnight/70">
                    <IconPin className="h-3 w-3" />
                    {task.area}, {task.city}
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-mist/50 px-3 py-1 text-midnight/70">
                    <IconClock className="h-3 w-3" />
                    {task.date}
                  </span>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-midnight/10 pt-4">
                  <p className="font-display text-xl font-bold">
                    {task.currency}
                    {task.budget.toLocaleString()}
                  </p>
                  <span className="flex items-center gap-1.5 font-mono text-xs font-semibold text-indigo opacity-0 transition-opacity group-hover:opacity-100">
                    {task.offersCount} offers <IconArrow className="h-3 w-3" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== POST TASK =====
function PostTask({ navigate }: { navigate: (v: View) => void }) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <section className="relative bg-cream pt-32 pb-24">
        <div className="mx-auto max-w-2xl px-5 text-center md:px-8">
          <div className="rounded-3xl bg-white p-12 shadow-premium">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald to-indigo text-4xl">
              <IconCheck className="h-10 w-10 text-white" />
            </div>
            <h2 className="font-display text-3xl font-black">Task posted!</h2>
            <p className="mt-4 text-lg text-midnight/60">
              Workers nearby will see your task and send offers. You'll get notifications as they come in.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => navigate("get-help")}
                className="flex-1 rounded-full bg-gradient-to-r from-indigo to-violet px-6 py-3 font-semibold text-white shadow-glow transition-all hover:scale-105"
              >
                View matched workers
              </button>
              <button
                onClick={() => navigate("home")}
                className="flex-1 rounded-full border border-midnight/20 px-6 py-3 font-semibold text-midnight transition-all hover:border-midnight"
              >
                Back to home
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <Reveal>
          <div className="mb-8">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
              // Post a task
            </p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">
              What needs to be done?
            </h1>
          </div>
        </Reveal>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="space-y-6 rounded-3xl bg-white p-8 shadow-premium md:p-12"
        >
          <div>
            <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">
              What needs to be done? *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Deep clean my apartment"
              className="w-full rounded-xl border border-midnight/20 bg-cream px-4 py-3 text-base outline-none transition-all focus:border-indigo"
            />
          </div>

          <div>
            <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">
              Category *
            </label>
            <select
              required
              className="w-full rounded-xl border border-midnight/20 bg-cream px-4 py-3 text-base outline-none transition-all focus:border-indigo"
            >
              <option value="">Select category</option>
              {TASK_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">
              Description *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Describe what you need in detail..."
              className="w-full resize-none rounded-xl border border-midnight/20 bg-cream px-4 py-3 text-base outline-none transition-all focus:border-indigo"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">
                Country *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Japan"
                className="w-full rounded-xl border border-midnight/20 bg-cream px-4 py-3 text-base outline-none transition-all focus:border-indigo"
              />
            </div>
            <div>
              <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">
                City *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Tokyo"
                className="w-full rounded-xl border border-midnight/20 bg-cream px-4 py-3 text-base outline-none transition-all focus:border-indigo"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">
              Area / Neighborhood
            </label>
            <input
              type="text"
              placeholder="e.g., Shinjuku"
              className="w-full rounded-xl border border-midnight/20 bg-cream px-4 py-3 text-base outline-none transition-all focus:border-indigo"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">
                Date *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Tomorrow, Saturday"
                className="w-full rounded-xl border border-midnight/20 bg-cream px-4 py-3 text-base outline-none transition-all focus:border-indigo"
              />
            </div>
            <div>
              <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">
                Time
              </label>
              <input
                type="text"
                placeholder="e.g., 09:00"
                className="w-full rounded-xl border border-midnight/20 bg-cream px-4 py-3 text-base outline-none transition-all focus:border-indigo"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">
                Budget *
              </label>
              <input
                type="number"
                required
                placeholder="e.g., 18000"
                className="w-full rounded-xl border border-midnight/20 bg-cream px-4 py-3 text-base outline-none transition-all focus:border-indigo"
              />
            </div>
            <div>
              <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">
                Estimated duration
              </label>
              <input
                type="text"
                placeholder="e.g., 5-6 hours"
                className="w-full rounded-xl border border-midnight/20 bg-cream px-4 py-3 text-base outline-none transition-all focus:border-indigo"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">
              Number of workers needed
            </label>
            <input
              type="number"
              min="1"
              defaultValue="1"
              className="w-full rounded-xl border border-midnight/20 bg-cream px-4 py-3 text-base outline-none transition-all focus:border-indigo"
            />
          </div>

          <div>
            <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">
              Photos
            </label>
            <div className="rounded-xl border-2 border-dashed border-midnight/20 bg-cream p-8 text-center">
              <p className="font-mono text-sm text-midnight/60">Click to upload or drag and drop</p>
              <p className="mt-1 font-mono text-xs text-midnight/40">PNG, JPG up to 10MB</p>
            </div>
          </div>

          <div>
            <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">
              Special requirements
            </label>
            <input
              type="text"
              placeholder="e.g., Bring own supplies, Pet-friendly"
              className="w-full rounded-xl border border-midnight/20 bg-cream px-4 py-3 text-base outline-none transition-all focus:border-indigo"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-indigo to-violet px-8 py-4 font-semibold text-white shadow-glow transition-all hover:scale-105"
          >
            Post task and find workers
          </button>
        </form>
      </div>
    </section>
  );
}

// ===== TASK DETAIL =====
function TaskDetail({ task, navigate }: { task: Task; navigate: (v: View) => void }) {
  const matchedWorkers = WORKERS.filter((w) => w.skills.some((s) => task.category.includes(s) || s.includes(task.category))).slice(0, 6);

  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <button onClick={() => navigate("get-help")} className="mb-6 flex items-center gap-2 font-mono text-sm text-indigo hover:underline">
          ← Back to tasks
        </button>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Task details */}
          <div>
            <div className="rounded-3xl bg-white p-8 shadow-premium md:p-12">
              <div className="mb-6 flex items-start justify-between">
                <span className="rounded-full bg-indigo/10 px-4 py-2 font-mono text-sm font-semibold text-indigo">
                  {task.category}
                </span>
                <span className="font-mono text-sm text-midnight/50">{formatAgo(task.postedHours)}</span>
              </div>

              <h1 className="font-display text-3xl font-black md:text-4xl">{task.title}</h1>

              <div className="mt-6 flex flex-wrap gap-3 font-mono text-sm">
                <span className="flex items-center gap-2 rounded-full bg-mist/50 px-4 py-2">
                  <IconPin className="h-4 w-4" />
                  {task.area}, {task.city}, {task.country}
                </span>
                <span className="flex items-center gap-2 rounded-full bg-mist/50 px-4 py-2">
                  <IconClock className="h-4 w-4" />
                  {task.date} at {task.time}
                </span>
                <span className="rounded-full bg-mist/50 px-4 py-2">Duration: {task.duration}</span>
                <span className="rounded-full bg-mist/50 px-4 py-2">{task.workersNeeded} worker{task.workersNeeded > 1 ? "s" : ""}</span>
              </div>

              <div className="mt-8">
                <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo">Description</h3>
                <p className="mt-3 text-lg leading-relaxed text-midnight/75">{task.description}</p>
              </div>

              {task.specialRequirements.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo">Special requirements</h3>
                  <ul className="mt-3 space-y-2">
                    {task.specialRequirements.map((req) => (
                      <li key={req} className="flex gap-2 text-base text-midnight/75">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-indigo" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8 rounded-2xl bg-gradient-to-r from-indigo/10 to-violet/10 p-6">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo">Budget</p>
                <p className="mt-2 font-display text-4xl font-black">
                  {task.currency}
                  {task.budget.toLocaleString()}
                </p>
                <p className="mt-1 text-sm text-midnight/60">{task.offersCount} workers have sent offers</p>
              </div>
            </div>
          </div>

          {/* Matched workers */}
          <div>
            <div className="sticky top-28 rounded-3xl bg-white p-6 shadow-premium">
              <h3 className="font-display text-xl font-bold">Matched workers nearby</h3>
              <p className="mt-1 font-mono text-sm text-midnight/60">{matchedWorkers.length} available</p>

              <div className="mt-6 space-y-4">
                {matchedWorkers.map((worker) => (
                  <button
                    key={worker.id}
                    onClick={() => {
                      navigate("worker-profile");
                    }}
                    className="group flex w-full items-start gap-3 rounded-xl border border-midnight/10 p-3 text-left transition-all hover:border-indigo/30 hover:bg-indigo/5"
                  >
                    <WorkerAvatar worker={worker} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold transition-colors group-hover:text-indigo">{worker.name}</p>
                      <p className="font-mono text-xs text-midnight/60">{worker.city}</p>
                      <div className="mt-1 flex items-center gap-2 font-mono text-xs">
                        <span className="flex items-center gap-1">
                          <IconStar className="h-3 w-3 text-amber" />
                          {worker.rating}
                        </span>
                        <span className="text-midnight/40">·</span>
                        <span>{worker.expectedRate}{worker.currency}/h</span>
                      </div>
                    </div>
                    {worker.availableNow && (
                      <span className="rounded-full bg-emerald/10 px-2 py-1 font-mono text-xs font-semibold text-emerald">
                        Available
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <button
                onClick={() => navigate("find-workers")}
                className="mt-6 w-full rounded-full border border-indigo px-4 py-3 font-semibold text-indigo transition-all hover:bg-indigo hover:text-white"
              >
                Browse all workers
              </button>
            </div>
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
          <div className="mb-12">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
              // Hire People
            </p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">
              Find reliable workers for your business
            </h1>
            <p className="mt-3 text-lg text-midnight/60">
              Restaurants, warehouses, hotels, cleaning companies — post jobs, shifts, or build crews
            </p>
          </div>
        </Reveal>

        {/* Quick actions */}
        <Reveal delay={100}>
          <div className="mb-12 grid gap-6 md:grid-cols-3">
            <button
              onClick={() => navigate("post-job")}
              className="group rounded-2xl border border-midnight/10 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-indigo/30 hover:shadow-premium"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo to-violet text-xl">
                📋
              </div>
              <h3 className="font-display text-lg font-bold">Post a job</h3>
              <p className="mt-1 text-sm text-midnight/60">Regular position, ongoing work</p>
            </button>

            <button
              onClick={() => navigate("post-job")}
              className="group rounded-2xl border border-midnight/10 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-amber/30 hover:shadow-premium"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber to-violet text-xl">
                ⏰
              </div>
              <h3 className="font-display text-lg font-bold">Post a shift</h3>
              <p className="mt-1 text-sm text-midnight/60">Single shift, specific date/time</p>
            </button>

            <button
              onClick={() => navigate("post-job")}
              className="group rounded-2xl border border-midnight/10 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-emerald/30 hover:shadow-premium"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald to-indigo text-xl">
                👥
              </div>
              <h3 className="font-display text-lg font-bold">Build a crew</h3>
              <p className="mt-1 text-sm text-midnight/60">Need multiple workers for a day</p>
            </button>
          </div>
        </Reveal>

        {/* Verified companies */}
        <Reveal delay={200}>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold">Verified employers hiring now</h2>
            <button
              onClick={() => navigate("find-workers")}
              className="flex items-center gap-2 font-mono text-sm font-semibold text-indigo hover:underline"
            >
              Find workers →
            </button>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {COMPANIES.map((company, i) => (
            <Reveal key={company.id} delay={i * 80}>
              <button
                onClick={() => openCompany(company)}
                className="group w-full rounded-2xl border border-midnight/10 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-indigo/30 hover:shadow-premium"
              >
                <div className="flex items-start gap-4">
                  <CompanyMark company={company} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-lg font-bold transition-colors group-hover:text-indigo">
                        {company.name}
                      </h3>
                      {company.verified && (
                        <span className="rounded-full bg-emerald/10 px-2 py-0.5 font-mono text-xs font-semibold text-emerald">
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="mt-1 font-mono text-sm text-midnight/60">{company.industry}</p>
                    <p className="mt-1 flex items-center gap-1 font-mono text-xs text-midnight/50">
                      <IconPin className="h-3 w-3" />
                      {company.city}
                    </p>
                  </div>
                </div>

                <p className="mt-4 line-clamp-2 text-sm text-midnight/70">{company.tagline}</p>

                <div className="mt-4 grid grid-cols-3 gap-3 border-t border-midnight/10 pt-4">
                  <div>
                    <p className="font-display text-lg font-bold">{company.activeJobs}</p>
                    <p className="font-mono text-xs text-midnight/50">Jobs</p>
                  </div>
                  <div>
                    <p className="font-display text-lg font-bold">{company.activeShifts}</p>
                    <p className="font-mono text-xs text-midnight/50">Shifts</p>
                  </div>
                  <div>
                    <p className="flex items-center gap-1 font-display text-lg font-bold">
                      <IconStar className="h-4 w-4 text-amber" />
                      {company.workerRating}
                    </p>
                    <p className="font-mono text-xs text-midnight/50">Rating</p>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {/* Business workspace CTA */}
        <Reveal delay={400}>
          <div className="mt-16 rounded-3xl bg-gradient-to-r from-indigo via-violet to-amber p-12 text-center shadow-glow">
            <h3 className="font-display text-3xl font-black text-white">Manage your hiring</h3>
            <p className="mt-3 text-lg text-white/90">
              View applicants, manage shifts, track workers — all in one simple workspace
            </p>
            <button
              onClick={() => navigate("business-workspace")}
              className="mt-8 rounded-full bg-white px-8 py-4 font-semibold text-midnight shadow-premium transition-all hover:scale-105"
            >
              Open workspace →
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ===== POST JOB (Business Flow) =====
function PostJob({ navigate }: { navigate: (v: View) => void }) {
  const [tab, setTab] = useState<"regular" | "shift" | "crew">("regular");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <section className="relative bg-cream pt-32 pb-24">
        <div className="mx-auto max-w-2xl px-5 text-center md:px-8">
          <div className="rounded-3xl bg-white p-12 shadow-premium">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald to-indigo text-4xl">
              <IconCheck className="h-10 w-10 text-white" />
            </div>
            <h2 className="font-display text-3xl font-black">
              {tab === "crew" ? "Crew request posted!" : tab === "shift" ? "Shift posted!" : "Job posted!"}
            </h2>
            <p className="mt-4 text-lg text-midnight/60">
              Workers will see your posting and apply. You'll get notifications as they come in.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => navigate("business-workspace")}
                className="flex-1 rounded-full bg-gradient-to-r from-indigo to-violet px-6 py-3 font-semibold text-white shadow-glow transition-all hover:scale-105"
              >
                View applicants
              </button>
              <button
                onClick={() => navigate("hire-people")}
                className="flex-1 rounded-full border border-midnight/20 px-6 py-3 font-semibold text-midnight transition-all hover:border-midnight"
              >
                Back to hiring
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <Reveal>
          <div className="mb-8">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
              // Post for your business
            </p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">
              What do you need?
            </h1>
          </div>
        </Reveal>

        {/* Tabs */}
        <Reveal delay={100}>
          <div className="mb-8 flex gap-2 rounded-full border border-midnight/20 bg-white p-1.5">
            {(["regular", "shift", "crew"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 rounded-full px-4 py-2.5 font-mono text-sm font-semibold capitalize transition-all ${
                  tab === t ? "bg-midnight text-white" : "text-midnight/60 hover:text-midnight"
                }`}
              >
                {t === "regular" ? "Regular Job" : t === "shift" ? "Single Shift" : "Build Crew"}
              </button>
            ))}
          </div>
        </Reveal>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="space-y-6 rounded-3xl bg-white p-8 shadow-premium md:p-12"
        >
          {tab === "regular" && (
            <>
              <div>
                <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">Role *</label>
                <input type="text" required placeholder="e.g., Housekeeping Staff" className="w-full rounded-xl border border-midnight/20 bg-cream px-4 py-3 outline-none focus:border-indigo" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">Location *</label>
                  <input type="text" required placeholder="e.g., Shinjuku, Tokyo" className="w-full rounded-xl border border-midnight/20 bg-cream px-4 py-3 outline-none focus:border-indigo" />
                </div>
                <div>
                  <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">Monthly / hourly pay *</label>
                  <input type="text" required placeholder="e.g., ¥1,400/hour" className="w-full rounded-xl border border-midnight/20 bg-cream px-4 py-3 outline-none focus:border-indigo" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">Schedule</label>
                  <input type="text" placeholder="e.g., Flexible shifts, 6h minimum" className="w-full rounded-xl border border-midnight/20 bg-cream px-4 py-3 outline-none focus:border-indigo" />
                </div>
                <div>
                  <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">Full-time / Part-time *</label>
                  <select required className="w-full rounded-xl border border-midnight/20 bg-cream px-4 py-3 outline-none focus:border-indigo">
                    <option value="">Select</option>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">Number of positions *</label>
                <input type="number" min="1" required defaultValue="1" className="w-full rounded-xl border border-midnight/20 bg-cream px-4 py-3 outline-none focus:border-indigo" />
              </div>
              <div>
                <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">Requirements</label>
                <textarea rows={3} placeholder="e.g., Housekeeping experience, Japanese basic, Reliable" className="w-full resize-none rounded-xl border border-midnight/20 bg-cream px-4 py-3 outline-none focus:border-indigo" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">Experience</label>
                  <input type="text" placeholder="e.g., 1+ year" className="w-full rounded-xl border border-midnight/20 bg-cream px-4 py-3 outline-none focus:border-indigo" />
                </div>
                <div>
                  <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">Languages</label>
                  <input type="text" placeholder="e.g., Japanese, English" className="w-full rounded-xl border border-midnight/20 bg-cream px-4 py-3 outline-none focus:border-indigo" />
                </div>
              </div>
            </>
          )}

          {tab === "shift" && (
            <>
              <div>
                <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">Role *</label>
                <input type="text" required placeholder="e.g., Banquet Server" className="w-full rounded-xl border border-midnight/20 bg-cream px-4 py-3 outline-none focus:border-indigo" />
              </div>
              <div>
                <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">Location *</label>
                <input type="text" required placeholder="e.g., Shinjuku, Tokyo" className="w-full rounded-xl border border-midnight/20 bg-cream px-4 py-3 outline-none focus:border-indigo" />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">Date *</label>
                  <input type="text" required placeholder="e.g., Saturday, Dec 14" className="w-full rounded-xl border border-midnight/20 bg-cream px-4 py-3 outline-none focus:border-indigo" />
                </div>
                <div>
                  <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">Start time *</label>
                  <input type="text" required placeholder="e.g., 17:00" className="w-full rounded-xl border border-midnight/20 bg-cream px-4 py-3 outline-none focus:border-indigo" />
                </div>
                <div>
                  <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">End time *</label>
                  <input type="text" required placeholder="e.g., 23:00" className="w-full rounded-xl border border-midnight/20 bg-cream px-4 py-3 outline-none focus:border-indigo" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">Number of workers *</label>
                  <input type="number" min="1" required defaultValue="1" className="w-full rounded-xl border border-midnight/20 bg-cream px-4 py-3 outline-none focus:border-indigo" />
                </div>
                <div>
                  <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">Hourly rate *</label>
                  <input type="text" required placeholder="e.g., ¥1,600" className="w-full rounded-xl border border-midnight/20 bg-cream px-4 py-3 outline-none focus:border-indigo" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">Uniform</label>
                  <input type="text" placeholder="e.g., Black suit" className="w-full rounded-xl border border-midnight/20 bg-cream px-4 py-3 outline-none focus:border-indigo" />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 pb-3">
                    <input type="checkbox" className="h-4 w-4 rounded" />
                    <span className="text-sm">Meal provided</span>
                  </label>
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 pb-3">
                    <input type="checkbox" className="h-4 w-4 rounded" />
                    <span className="text-sm">Transport covered</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">Requirements</label>
                <textarea rows={3} placeholder="e.g., Serving experience, Presentable, Punctual" className="w-full resize-none rounded-xl border border-midnight/20 bg-cream px-4 py-3 outline-none focus:border-indigo" />
              </div>
            </>
          )}

          {tab === "crew" && (
            <>
              <div className="rounded-2xl bg-gradient-to-r from-emerald/10 to-indigo/10 p-6">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo">Crew request</p>
                <p className="mt-2 text-sm text-midnight/70">Need multiple workers for a single day? We'll match you with verified workers nearby.</p>
              </div>
              <div>
                <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">What role? *</label>
                <input type="text" required placeholder="e.g., Warehouse Workers" className="w-full rounded-xl border border-midnight/20 bg-cream px-4 py-3 outline-none focus:border-indigo" />
              </div>
              <div>
                <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">How many workers? *</label>
                <input type="number" min="2" required defaultValue="15" className="w-full rounded-xl border border-midnight/20 bg-cream px-4 py-3 outline-none focus:border-indigo" />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">Date *</label>
                  <input type="text" required placeholder="e.g., Tomorrow" className="w-full rounded-xl border border-midnight/20 bg-cream px-4 py-3 outline-none focus:border-indigo" />
                </div>
                <div>
                  <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">Start time *</label>
                  <input type="text" required placeholder="e.g., 08:00" className="w-full rounded-xl border border-midnight/20 bg-cream px-4 py-3 outline-none focus:border-indigo" />
                </div>
                <div>
                  <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">End time *</label>
                  <input type="text" required placeholder="e.g., 17:00" className="w-full rounded-xl border border-midnight/20 bg-cream px-4 py-3 outline-none focus:border-indigo" />
                </div>
              </div>
              <div>
                <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">Location *</label>
                <input type="text" required placeholder="e.g., Dhaka" className="w-full rounded-xl border border-midnight/20 bg-cream px-4 py-3 outline-none focus:border-indigo" />
              </div>
              <div>
                <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">Hourly rate *</label>
                <input type="text" required placeholder="e.g., AED 35" className="w-full rounded-xl border border-midnight/20 bg-cream px-4 py-3 outline-none focus:border-indigo" />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-indigo to-violet px-8 py-4 font-semibold text-white shadow-glow transition-all hover:scale-105"
          >
            {tab === "crew" ? "Build Crew" : tab === "shift" ? "Post Shift" : "Post Job"}
          </button>
        </form>
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
  const [showFilters, setShowFilters] = useState(false);

  const openWorker = (worker: Worker) => {
    setSelectedWorker(worker);
    navigate("worker-profile");
  };

  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
                // Find Workers
              </p>
              <h1 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">
                What kind of people do you need?
              </h1>
              <p className="mt-3 text-lg text-midnight/60">
                {WORKERS.length} verified workers available
              </p>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 rounded-full border px-5 py-2.5 font-mono text-sm font-semibold transition-all ${
                showFilters ? "border-indigo bg-indigo/10 text-indigo" : "border-midnight/20 text-midnight/70 hover:border-midnight"
              }`}
            >
              <IconFilter className="h-4 w-4" />
              Filters
            </button>
          </div>
        </Reveal>

        {/* Search */}
        <Reveal delay={100}>
          <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-midnight/10 bg-white p-3 shadow-sm md:flex-row">
            <label className="flex flex-1 items-center gap-3 rounded-xl bg-cream px-4">
              <IconSearch className="h-5 w-5 text-midnight/40" />
              <input placeholder="Search by name, skill, or location..." className="w-full bg-transparent py-3 outline-none placeholder:text-midnight/40" />
            </label>
            <label className="flex items-center gap-3 rounded-xl bg-cream px-4 md:w-64">
              <IconPin className="h-5 w-5 text-midnight/40" />
              <input placeholder="Location" className="w-full bg-transparent py-3 outline-none placeholder:text-midnight/40" />
            </label>
          </div>
        </Reveal>

        {/* Filters */}
        {showFilters && (
          <Reveal delay={150}>
            <div className="mb-8 rounded-2xl border border-midnight/10 bg-white p-6 shadow-sm">
              <div className="space-y-6">
                <div>
                  <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {WORKER_SKILLS.slice(0, 12).map((skill) => (
                      <button key={skill} className="rounded-full border border-midnight/20 px-4 py-2 font-mono text-sm transition-all hover:border-indigo hover:bg-indigo/5 hover:text-indigo">
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">Languages</p>
                  <div className="flex flex-wrap gap-2">
                    {LANGUAGES.slice(0, 8).map((lang) => (
                      <button key={lang} className="rounded-full border border-midnight/20 px-4 py-2 font-mono text-sm transition-all hover:border-indigo hover:bg-indigo/5 hover:text-indigo">
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">Availability</p>
                  <div className="flex gap-2">
                    <button className="rounded-full border border-midnight/20 px-4 py-2 font-mono text-sm transition-all hover:border-indigo">Available now</button>
                    <button className="rounded-full border border-midnight/20 px-4 py-2 font-mono text-sm transition-all hover:border-indigo">This week</button>
                    <button className="rounded-full border border-midnight/20 px-4 py-2 font-mono text-sm transition-all hover:border-indigo">Next week</button>
                  </div>
                </div>
                <div>
                  <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">Minimum rating</p>
                  <div className="flex gap-2">
                    {["4.5+", "4.0+", "3.5+", "Any"].map((r) => (
                      <button key={r} className="rounded-full border border-midnight/20 px-4 py-2 font-mono text-sm transition-all hover:border-indigo">{r}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Worker grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {WORKERS.map((worker, i) => (
            <Reveal key={worker.id} delay={i * 60}>
              <button
                onClick={() => openWorker(worker)}
                className="group w-full rounded-2xl border border-midnight/10 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-indigo/30 hover:shadow-premium"
              >
                <div className="flex items-start gap-4">
                  <WorkerAvatar worker={worker} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-lg font-bold transition-colors group-hover:text-indigo">{worker.name}</h3>
                      {worker.humanVerified && (
                        <span className="rounded-full bg-emerald/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald">Verified</span>
                      )}
                    </div>
                    <p className="mt-0.5 flex items-center gap-1 font-mono text-xs text-midnight/60">
                      <IconPin className="h-3 w-3" />
                      {worker.city}, {worker.country}
                      {worker.distanceKm && <span> · {worker.distanceKm}km</span>}
                    </p>
                  </div>
                </div>

                {worker.availableNow ? (
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald/10 px-3 py-1 font-mono text-xs font-semibold text-emerald">
                    <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-emerald" />
                    Available now
                  </span>
                ) : (
                  <span className="mt-3 inline-block rounded-full bg-amber/10 px-3 py-1 font-mono text-xs font-semibold text-amber">
                    {worker.nextAvailable}
                  </span>
                )}

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {worker.skills.slice(0, 4).map((skill) => (
                    <span key={skill} className="rounded-md border border-midnight/10 bg-cream px-2 py-1 font-mono text-xs text-midnight/60">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-midnight/10 pt-4">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 font-mono text-sm">
                      <IconStar className="h-4 w-4 text-amber" />
                      <span className="font-bold">{worker.rating}</span>
                      <span className="text-midnight/40">({worker.reviews})</span>
                    </span>
                    <span className="font-mono text-xs text-midnight/50">{worker.completedWork} jobs</span>
                  </div>
                  <p className="font-display text-lg font-bold">
                    {worker.currency}{worker.expectedRate}
                    <span className="ml-0.5 text-xs font-medium text-midnight/50">/h</span>
                  </p>
                </div>

                <div className="mt-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="flex-1 rounded-full bg-gradient-to-r from-indigo to-violet py-2 text-center font-mono text-xs font-semibold text-white">Invite</span>
                  <span className="rounded-full border border-midnight/20 px-3 py-2 font-mono text-xs">Message</span>
                  <span className="rounded-full border border-midnight/20 px-3 py-2 font-mono text-xs">Save</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== WORKER PROFILE =====
function WorkerProfile({ worker, navigate }: { worker: Worker; navigate: (v: View) => void }) {
  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <button onClick={() => navigate("find-workers")} className="mb-6 flex items-center gap-2 font-mono text-sm text-indigo hover:underline">
          ← Back to workers
        </button>

        <div className="rounded-3xl bg-white p-8 shadow-premium md:p-12">
          <div className="flex flex-col items-start gap-6 md:flex-row">
            <WorkerAvatar worker={worker} size="lg" />
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="font-display text-3xl font-black md:text-4xl">{worker.name}</h1>
                {worker.humanVerified && (
                  <span className="rounded-full bg-emerald/10 px-3 py-1 font-mono text-xs font-semibold text-emerald">Human Verified</span>
                )}
              </div>
              <p className="mt-2 flex items-center gap-2 font-mono text-midnight/60">
                <IconPin className="h-4 w-4" />
                {worker.city}, {worker.country}
                {worker.distanceKm && <span>· {worker.distanceKm}km away</span>}
              </p>
              {worker.availableNow ? (
                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald/10 px-4 py-1.5 font-mono text-sm font-semibold text-emerald">
                  <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-emerald" />
                  Available now
                </span>
              ) : (
                <span className="mt-3 inline-block rounded-full bg-amber/10 px-4 py-1.5 font-mono text-sm font-semibold text-amber">
                  Next available: {worker.nextAvailable}
                </span>
              )}
            </div>
            <div className="text-right">
              <p className="font-display text-4xl font-black">
                {worker.currency}{worker.expectedRate}
                <span className="ml-1 text-base font-medium text-midnight/50">/hour</span>
              </p>
              <p className="mt-1 font-mono text-xs text-midnight/50">Expected rate</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl bg-cream p-4 text-center">
              <p className="flex items-center justify-center gap-1 font-display text-2xl font-bold">
                <IconStar className="h-5 w-5 text-amber" />
                {worker.rating}
              </p>
              <p className="mt-1 font-mono text-xs text-midnight/60">{worker.reviews} reviews</p>
            </div>
            <div className="rounded-2xl bg-cream p-4 text-center">
              <p className="font-display text-2xl font-bold">{worker.completedWork}</p>
              <p className="mt-1 font-mono text-xs text-midnight/60">Jobs completed</p>
            </div>
            <div className="rounded-2xl bg-cream p-4 text-center">
              <p className="font-display text-2xl font-bold">{worker.responseTime}</p>
              <p className="mt-1 font-mono text-xs text-midnight/60">Response time</p>
            </div>
            <div className="rounded-2xl bg-cream p-4 text-center">
              <p className="font-display text-2xl font-bold">{worker.joinedYear}</p>
              <p className="mt-1 font-mono text-xs text-midnight/60">Member since</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo">About</h3>
            <p className="mt-3 text-lg leading-relaxed text-midnight/75">{worker.bio}</p>
          </div>

          <div className="mt-8">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo">Skills</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {worker.skills.map((skill) => (
                <span key={skill} className={`rounded-full px-4 py-2 font-mono text-sm ${worker.verifiedSkills.includes(skill) ? "bg-emerald/10 font-semibold text-emerald" : "border border-midnight/15 bg-cream text-midnight/70"}`}>
                  {skill} {worker.verifiedSkills.includes(skill) && "✓"}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo">Languages</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {worker.languages.map((lang) => (
                <span key={lang} className="rounded-full border border-midnight/15 bg-cream px-4 py-2 font-mono text-sm text-midnight/70">
                  {lang}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 border-t border-midnight/10 pt-8">
            <button className="flex-1 rounded-full bg-gradient-to-r from-indigo to-violet px-6 py-3.5 font-semibold text-white shadow-glow transition-all hover:scale-105">
              Invite to job
            </button>
            <button className="rounded-full border border-midnight/20 px-6 py-3.5 font-semibold text-midnight transition-all hover:border-midnight">
              Message
            </button>
            <button className="rounded-full border border-midnight/20 px-6 py-3.5 font-semibold text-midnight transition-all hover:border-midnight">
              <IconBookmark className="inline h-4 w-4" /> Save
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== COMPANY PROFILE =====
function CompanyProfile({ company, navigate }: { company: Company; navigate: (v: View) => void }) {
  const reviews = COMPANY_REVIEWS.filter((r) => r.companyId === company.id);
  const jobs = BUSINESS_JOBS.filter((j) => j.companyId === company.id);

  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <button onClick={() => navigate("hire-people")} className="mb-6 flex items-center gap-2 font-mono text-sm text-indigo hover:underline">
          ← Back to employers
        </button>

        {/* Header */}
        <div className="rounded-3xl bg-gradient-to-br from-indigo via-violet to-amber p-8 text-white shadow-premium md:p-12">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <CompanyMark company={company} size="lg" />
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="font-display text-3xl font-black md:text-4xl">{company.name}</h1>
                {company.verified && (
                  <span className="rounded-full bg-white/20 px-3 py-1 font-mono text-xs font-semibold backdrop-blur-sm">Business Verified</span>
                )}
              </div>
              <p className="mt-2 flex items-center gap-2 font-mono text-sm text-white/80">
                <IconPin className="h-4 w-4" />
                {company.city}, {company.country}
              </p>
              <p className="mt-3 max-w-xl text-white/80">{company.tagline}</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
            {[
              { label: "Active Jobs", value: company.activeJobs },
              { label: "Active Shifts", value: company.activeShifts },
              { label: "Worker Rating", value: company.workerRating },
              { label: "Payment", value: `${company.paymentReliability}/5` },
              { label: "Response Rate", value: `${company.responseRate}%` },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                <p className="font-display text-2xl font-bold">{s.value}</p>
                <p className="mt-1 font-mono text-xs text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="mt-8 rounded-3xl bg-white p-8 shadow-premium">
          <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo">About</h3>
          <p className="mt-3 text-lg leading-relaxed text-midnight/75">{company.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {company.perks.map((perk) => (
              <span key={perk} className="rounded-full bg-emerald/10 px-4 py-2 font-mono text-sm font-medium text-emerald">
                ✓ {perk}
              </span>
            ))}
          </div>
        </div>

        {/* Worker reviews */}
        <div className="mt-8 rounded-3xl bg-white p-8 shadow-premium">
          <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo">Reviews from workers</h3>
          <p className="mt-1 text-sm text-midnight/60">Verified reviews from workers who actually worked here</p>

          <div className="mt-6 grid gap-4 md:grid-cols-5">
            {[
              { label: "Payment reliability", value: company.paymentReliability },
              { label: "Job accuracy", value: company.jobAccuracy },
              { label: "Work environment", value: company.workEnvironment },
              { label: "Communication", value: company.communication },
              { label: "Safety", value: company.safety },
            ].map((d) => (
              <div key={d.label}>
                <p className="font-mono text-xs text-midnight/60">{d.label}</p>
                <p className="mt-1 flex items-center gap-1 font-display text-xl font-bold">
                  <IconStar className="h-4 w-4 text-amber" />
                  {d.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-6">
            {reviews.length > 0 ? reviews.map((review) => (
              <div key={review.id} className="rounded-2xl border border-midnight/10 bg-cream p-6">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-indigo/10 text-lg">{review.workerAvatar}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{review.workerName}</p>
                      {review.verifiedWork && (
                        <span className="rounded-full bg-emerald/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald">Verified work</span>
                      )}
                      <span className="font-mono text-xs text-midnight/40">{review.date}</span>
                    </div>
                    <p className="mt-0.5 font-mono text-xs text-midnight/60">{review.role}</p>
                  </div>
                </div>
                <p className="mt-4 leading-relaxed text-midnight/75">"{review.comment}"</p>
                <div className="mt-4 flex flex-wrap gap-3 font-mono text-xs">
                  <span>Payment: {review.paymentReliability}/5</span>
                  <span>Accuracy: {review.jobAccuracy}/5</span>
                  <span>Environment: {review.workEnvironment}/5</span>
                </div>
                <p className="mt-3 font-mono text-xs text-indigo">{review.communityComments} community comments</p>
              </div>
            )) : (
              <p className="text-midnight/60">No reviews yet. Be the first to review after working here!</p>
            )}
          </div>
        </div>

        {/* Active jobs */}
        {jobs.length > 0 && (
          <div className="mt-8 rounded-3xl bg-white p-8 shadow-premium">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo">Active positions</h3>
            <div className="mt-6 space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between rounded-2xl border border-midnight/10 bg-cream p-5">
                  <div>
                    <p className="font-display text-lg font-bold">{job.role}</p>
                    <p className="mt-1 font-mono text-sm text-midnight/60">{job.location} · {job.employment} · {job.positions} position{job.positions > 1 ? "s" : ""}</p>
                    <p className="mt-1 font-mono text-sm font-semibold text-indigo">{job.pay}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm text-midnight/60">{job.applicants} applicants</p>
                    <p className="mt-1 font-mono text-xs text-midnight/40">{formatAgo(job.postedHours)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ===== BUSINESS WORKSPACE =====
function BusinessWorkspace({ navigate }: { navigate: (v: View) => void }) {
  const [tab, setTab] = useState("open-work");
  const tabs = [
    { id: "open-work", label: "Open Work", count: BUSINESS_JOBS.filter((j) => j.status === "active").length },
    { id: "applicants", label: "Applicants", count: 147 },
    { id: "shifts", label: "Upcoming Shifts", count: 8 },
    { id: "workers", label: "Workers", count: 34 },
    { id: "trusted", label: "Trusted Workers", count: 12 },
    { id: "crews", label: "Crews", count: 3 },
  ];

  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo">// Business Workspace</p>
              <h1 className="mt-2 font-display text-3xl font-black md:text-4xl">Shinjuku Grand Hotel</h1>
              <p className="mt-1 font-mono text-sm text-midnight/60">Shinjuku, Tokyo · Hospitality</p>
            </div>
            <button
              onClick={() => navigate("post-job")}
              className="rounded-full bg-gradient-to-r from-indigo to-violet px-6 py-3 font-semibold text-white shadow-glow transition-all hover:scale-105"
            >
              + Post new
            </button>
          </div>
        </Reveal>

        {/* Tabs */}
        <Reveal delay={100}>
          <div className="scroll-row mb-8 flex gap-2 overflow-x-auto rounded-2xl border border-midnight/10 bg-white p-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-sm font-semibold transition-all ${
                  tab === t.id ? "bg-midnight text-white" : "text-midnight/60 hover:text-midnight"
                }`}
              >
                {t.label}
                <span className={`rounded-full px-2 py-0.5 text-xs ${tab === t.id ? "bg-white/20" : "bg-mist"}`}>{t.count}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Content */}
        <Reveal delay={200}>
          <div className="rounded-3xl bg-white p-6 shadow-premium md:p-8">
            {tab === "open-work" && (
              <div className="space-y-4">
                {BUSINESS_JOBS.filter((j) => j.companyId === "c1" || j.companyId === "c3").map((job) => (
                  <div key={job.id} className="flex items-center justify-between rounded-2xl border border-midnight/10 bg-cream p-5">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`rounded-full px-3 py-1 font-mono text-xs font-semibold ${job.type === "crew" ? "bg-emerald/10 text-emerald" : job.type === "shift" ? "bg-amber/10 text-amber" : "bg-indigo/10 text-indigo"}`}>
                          {job.type === "regular" ? "Job" : job.type === "shift" ? "Shift" : "Crew"}
                        </span>
                        <span className="rounded-full bg-emerald/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald">Active</span>
                      </div>
                      <p className="mt-2 font-display text-lg font-bold">{job.role}</p>
                      <p className="mt-1 font-mono text-sm text-midnight/60">{job.location} · {job.employment} · {job.positions} position{job.positions > 1 ? "s" : ""}</p>
                      <p className="mt-1 font-mono text-sm font-semibold text-indigo">{job.pay}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-2xl font-bold">{job.applicants}</p>
                      <p className="font-mono text-xs text-midnight/60">applicants</p>
                      <p className="mt-2 font-mono text-xs text-midnight/40">{formatAgo(job.postedHours)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "applicants" && (
              <div className="space-y-3">
                {WORKERS.slice(0, 8).map((worker) => (
                  <div key={worker.id} className="flex items-center gap-4 rounded-2xl border border-midnight/10 bg-cream p-4">
                    <WorkerAvatar worker={worker} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">{worker.name}</p>
                      <p className="font-mono text-xs text-midnight/60">{worker.city} · {worker.skills.slice(0, 2).join(", ")}</p>
                    </div>
                    <div className="flex items-center gap-1 font-mono text-sm">
                      <IconStar className="h-3.5 w-3.5 text-amber" />
                      {worker.rating}
                    </div>
                    <div className="flex gap-2">
                      <button className="rounded-full bg-indigo px-4 py-1.5 font-mono text-xs font-semibold text-white">Invite</button>
                      <button className="rounded-full border border-midnight/20 px-3 py-1.5 font-mono text-xs">Message</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "shifts" && (
              <div className="space-y-4">
                {BUSINESS_JOBS.filter((j) => j.type === "shift").map((job) => (
                  <div key={job.id} className="rounded-2xl border border-midnight/10 bg-cream p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-display text-lg font-bold">{job.role}</p>
                        <p className="mt-1 font-mono text-sm text-midnight/60">{job.location}</p>
                      </div>
                      <span className="rounded-full bg-amber/10 px-3 py-1 font-mono text-xs font-semibold text-amber">Upcoming</span>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                      <div>
                        <p className="font-mono text-xs text-midnight/50">Date</p>
                        <p className="font-semibold">{job.date}</p>
                      </div>
                      <div>
                        <p className="font-mono text-xs text-midnight/50">Time</p>
                        <p className="font-semibold">{job.startTime}–{job.endTime}</p>
                      </div>
                      <div>
                        <p className="font-mono text-xs text-midnight/50">Workers</p>
                        <p className="font-semibold">{job.positions} needed</p>
                      </div>
                      <div>
                        <p className="font-mono text-xs text-midnight/50">Rate</p>
                        <p className="font-semibold">{job.pay}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "workers" && (
              <div className="grid gap-4 md:grid-cols-2">
                {WORKERS.slice(0, 6).map((worker) => (
                  <div key={worker.id} className="flex items-center gap-4 rounded-2xl border border-midnight/10 bg-cream p-4">
                    <WorkerAvatar worker={worker} />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">{worker.name}</p>
                      <p className="font-mono text-xs text-midnight/60">{worker.completedWork} shifts · {worker.currency}{worker.expectedRate}/h</p>
                      <div className="mt-1 flex items-center gap-1 font-mono text-xs">
                        <IconStar className="h-3 w-3 text-amber" />
                        {worker.rating}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "trusted" && (
              <div className="grid gap-4 md:grid-cols-2">
                {WORKERS.filter((w) => w.humanVerified).slice(0, 4).map((worker) => (
                  <div key={worker.id} className="flex items-center gap-4 rounded-2xl border border-emerald/20 bg-emerald/5 p-4">
                    <WorkerAvatar worker={worker} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{worker.name}</p>
                        <span className="rounded-full bg-emerald/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald">Trusted</span>
                      </div>
                      <p className="font-mono text-xs text-midnight/60">{worker.completedWork} shifts completed</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "crews" && (
              <div className="space-y-4">
                {BUSINESS_JOBS.filter((j) => j.type === "crew").map((job) => (
                  <div key={job.id} className="rounded-2xl border border-midnight/10 bg-cream p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-display text-lg font-bold">{job.role}</p>
                        <p className="mt-1 font-mono text-sm text-midnight/60">{job.location} · {job.date}</p>
                      </div>
                      <span className="rounded-full bg-emerald/10 px-3 py-1 font-mono text-xs font-semibold text-emerald">Built</span>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                      <div className="rounded-xl bg-white p-3 text-center">
                        <p className="font-display text-2xl font-bold">{job.positions}</p>
                        <p className="font-mono text-xs text-midnight/50">Required</p>
                      </div>
                      <div className="rounded-xl bg-white p-3 text-center">
                        <p className="font-display text-2xl font-bold text-indigo">{Math.floor(job.positions * 2.5)}</p>
                        <p className="font-mono text-xs text-midnight/50">Matched</p>
                      </div>
                      <div className="rounded-xl bg-white p-3 text-center">
                        <p className="font-display text-2xl font-bold text-emerald">{Math.floor(job.positions * 1.6)}</p>
                        <p className="font-mono text-xs text-midnight/50">Verified</p>
                      </div>
                      <div className="rounded-xl bg-white p-3 text-center">
                        <p className="font-display text-2xl font-bold text-amber">{Math.floor(job.positions * 0.3)}</p>
                        <p className="font-mono text-xs text-midnight/50">Backup</p>
                      </div>
                    </div>
                  </div>
                ))}
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
            <div className="flex items-center gap-3">
              <LogoMark className="h-6 w-6 text-indigo" />
              <span className="font-display text-lg font-bold">Skillhub</span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              The two-sided hiring platform. For individuals who need help and businesses who need workers.
            </p>
            <p className="mt-7 flex items-center gap-2.5 font-mono text-xs text-emerald">
              <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-emerald" />
              2,847 workers online now
            </p>
          </div>

          <nav>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-white/40">For Individuals</p>
            <button onClick={() => navigate("get-help")} className="block py-1.5 text-sm text-white/70 hover:text-indigo">Get Help</button>
            <button onClick={() => navigate("post-task")} className="block py-1.5 text-sm text-white/70 hover:text-indigo">Post a Task</button>
            <button onClick={() => navigate("find-workers")} className="block py-1.5 text-sm text-white/70 hover:text-indigo">Find Workers</button>
          </nav>

          <nav>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-white/40">For Businesses</p>
            <button onClick={() => navigate("hire-people")} className="block py-1.5 text-sm text-white/70 hover:text-indigo">Hire People</button>
            <button onClick={() => navigate("post-job")} className="block py-1.5 text-sm text-white/70 hover:text-indigo">Post a Job</button>
            <button onClick={() => navigate("business-workspace")} className="block py-1.5 text-sm text-white/70 hover:text-indigo">Workspace</button>
          </nav>

          <nav>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-white/40">About</p>
            <a href="#top" className="block py-1.5 text-sm text-white/70 hover:text-indigo">How it works</a>
            <a href="#top" className="block py-1.5 text-sm text-white/70 hover:text-indigo">Trust & safety</a>
            <a href="#top" className="block py-1.5 text-sm text-white/70 hover:text-indigo">Support</a>
          </nav>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 font-mono text-xs text-white/40 md:flex-row">
          <p>© 2026 Skillhub — The hiring platform for everyone.</p>
          <p className="tracking-[0.18em]">TOKYO · DUBAI · LISBON · DHAKA · WORLDWIDE</p>
          <div className="flex gap-5">
            <a href="#top" className="hover:text-indigo">Privacy</a>
            <a href="#top" className="hover:text-indigo">Terms</a>
            <a href="#top" className="hover:text-indigo">Help</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
