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
  | "business-workspace"
  | "my-profile"
  | "messages"
  | "notifications"
  | "analytics"
  | "payments"
  | "help-center";

export default function App() {
  const [view, setView] = useState<View>("home");
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [savedWorkers, setSavedWorkers] = useState<Set<string>>(new Set());
  const [savedTasks, setSavedTasks] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const [unreadNotifications, setUnreadNotifications] = useState(3);

  const navigate = (v: View) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleSaveWorker = (workerId: string) => {
    setSavedWorkers((prev) => {
      const next = new Set(prev);
      if (next.has(workerId)) {
        next.delete(workerId);
        showToast("Worker removed from saved", "info");
      } else {
        next.add(workerId);
        showToast("Worker saved!", "success");
      }
      return next;
    });
  };

  const toggleSaveTask = (taskId: string) => {
    setSavedTasks((prev) => {
      const next = new Set(prev);
      if (next.has(taskId)) {
        next.delete(taskId);
        showToast("Task removed from saved", "info");
      } else {
        next.add(taskId);
        showToast("Task saved!", "success");
      }
      return next;
    });
  };

  return (
    <div id="top" className="min-h-screen bg-cream">
      <div className="noise-layer" aria-hidden="true" />
      <Nav view={view} navigate={navigate} savedCount={savedWorkers.size + savedTasks.size} unreadNotifications={unreadNotifications} />
      <Toast toast={toast} />
      <main>
        {view === "home" && <Home navigate={navigate} />}
        {view === "get-help" && <GetHelp navigate={navigate} setSelectedTask={setSelectedTask} savedTasks={savedTasks} toggleSaveTask={toggleSaveTask} />}
        {view === "post-task" && <PostTask navigate={navigate} showToast={showToast} />}
        {view === "task-detail" && selectedTask && <TaskDetail task={selectedTask} navigate={navigate} showToast={showToast} />}
        {view === "hire-people" && <HirePeople navigate={navigate} setSelectedCompany={setSelectedCompany} />}
        {view === "post-job" && <PostJob navigate={navigate} showToast={showToast} />}
        {view === "find-workers" && <FindWorkers navigate={navigate} setSelectedWorker={setSelectedWorker} savedWorkers={savedWorkers} toggleSaveWorker={toggleSaveWorker} showToast={showToast} />}
        {view === "worker-profile" && selectedWorker && <WorkerProfile worker={selectedWorker} navigate={navigate} saved={savedWorkers.has(selectedWorker.id)} toggleSave={() => toggleSaveWorker(selectedWorker.id)} showToast={showToast} />}
        {view === "company-profile" && selectedCompany && <CompanyProfile company={selectedCompany} navigate={navigate} />}
        {view === "business-workspace" && <BusinessWorkspace navigate={navigate} showToast={showToast} />}
        {view === "my-profile" && <MyProfile navigate={navigate} showToast={showToast} />}
        {view === "messages" && <Messages navigate={navigate} showToast={showToast} />}
        {view === "notifications" && <Notifications navigate={navigate} unreadCount={unreadNotifications} setUnreadCount={setUnreadNotifications} />}
        {view === "analytics" && <Analytics navigate={navigate} />}
        {view === "payments" && <Payments navigate={navigate} showToast={showToast} />}
        {view === "help-center" && <HelpCenter navigate={navigate} />}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}

// ===== TOAST =====
function Toast({ toast }: { toast: { message: string; type: "success" | "error" | "info" } | null }) {
  if (!toast) return null;
  const colors = {
    success: "bg-emerald text-white",
    error: "bg-rose text-white",
    info: "bg-indigo text-white",
  };
  return (
    <div className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 animate-[slideUp_0.3s_ease-out]">
      <div className={`rounded-2xl px-6 py-3 font-semibold shadow-2xl ${colors[toast.type]}`}>
        {toast.message}
      </div>
    </div>
  );
}

// ===== NAVIGATION =====
function Nav({ view, navigate, savedCount, unreadNotifications }: { view: View; navigate: (v: View) => void; savedCount: number; unreadNotifications: number }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
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

          <div className="flex items-center gap-3">
            {savedCount > 0 && (
              <span className="hidden rounded-full bg-white/10 px-3 py-1.5 font-mono text-xs text-white/80 md:block">
                {savedCount} saved
              </span>
            )}
            <button
              onClick={() => navigate("messages")}
              className="hidden rounded-full bg-white/10 p-2.5 text-white transition-all hover:bg-white/20 md:block"
              aria-label="Messages"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </button>
            <button
              onClick={() => navigate("notifications")}
              className="relative rounded-full bg-white/10 p-2.5 text-white transition-all hover:bg-white/20"
              aria-label="Notifications"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              {unreadNotifications > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose text-xs font-bold text-white">
                  {unreadNotifications}
                </span>
              )}
            </button>
            <button
              onClick={() => navigate("my-profile")}
              className="hidden rounded-full bg-gradient-to-r from-indigo to-violet p-0.5 transition-all hover:scale-105 md:block"
              aria-label="Profile"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-midnight text-sm font-bold text-white">
                JD
              </span>
            </button>
            <button
              onClick={() => navigate("post-task")}
              className="rounded-full bg-gradient-to-r from-indigo to-violet px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              Post Task
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden rounded-full bg-white/10 p-2.5 text-white"
              aria-label="Menu"
            >
              {mobileOpen ? <IconX className="h-5 w-5" /> : (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-midnight/98 pt-20 md:hidden">
          <nav className="flex flex-col gap-2 p-6">
            {[
              { label: "Get Help", view: "get-help" as View, icon: "🛠️" },
              { label: "Hire People", view: "hire-people" as View, icon: "🏢" },
              { label: "Find Workers", view: "find-workers" as View, icon: "👥" },
              { label: "Post Task", view: "post-task" as View, icon: "📝" },
              { label: "Post Job", view: "post-job" as View, icon: "💼" },
              { label: "Business Workspace", view: "business-workspace" as View, icon: "📊" },
              { label: "My Profile", view: "my-profile" as View, icon: "👤" },
              { label: "Messages", view: "messages" as View, icon: "💬" },
              { label: "Notifications", view: "notifications" as View, icon: "🔔" },
              { label: "Analytics", view: "analytics" as View, icon: "📈" },
            ].map((item) => (
              <button
                key={item.view}
                onClick={() => {
                  navigate(item.view);
                  setMobileOpen(false);
                }}
                className={`flex items-center gap-3 rounded-2xl px-5 py-4 text-left text-lg font-semibold transition-all ${
                  view === item.view
                    ? "bg-indigo text-white"
                    : "text-white/80 hover:bg-white/10"
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
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
  savedTasks,
  toggleSaveTask,
}: {
  navigate: (v: View) => void;
  setSelectedTask: (t: Task) => void;
  savedTasks: Set<string>;
  toggleSaveTask: (taskId: string) => void;
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
              <TaskCard
                task={task}
                onClick={() => openTask(task)}
                saved={savedTasks.has(task.id)}
                onToggleSave={() => toggleSaveTask(task.id)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TaskCard({ task, onClick, saved, onToggleSave }: { task: Task; onClick: () => void; saved: boolean; onToggleSave: () => void }) {
  return (
    <article
      onClick={onClick}
      className="group cursor-pointer rounded-3xl border-2 border-midnight/10 bg-white p-7 shadow-sm transition-all hover:-translate-y-2 hover:border-indigo hover:shadow-2xl"
    >
      <div className="mb-4 flex items-start justify-between">
        <span className="rounded-full bg-indigo/10 px-4 py-1.5 font-mono text-xs font-semibold text-indigo">
          {task.category}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave();
            }}
            className={`rounded-full p-2 transition-all ${
              saved ? "bg-indigo/10 text-indigo" : "text-midnight/30 hover:bg-mist hover:text-midnight"
            }`}
            aria-label={saved ? "Remove from saved" : "Save task"}
          >
            <IconBookmark className="h-4 w-4" filled={saved} />
          </button>
          <span className="flex items-center gap-1.5 font-mono text-xs text-midnight/50">
            <IconClock className="h-3.5 w-3.5" />
            {formatAgo(task.postedHours)}
          </span>
        </div>
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
function PostTask({ navigate, showToast }: { navigate: (v: View) => void; showToast: (message: string, type?: "success" | "error" | "info") => void }) {
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

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    showToast("Task posted successfully! Workers will see it soon.", "success");
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
          {submitted ? (
            <div className="rounded-3xl border-2 border-emerald/30 bg-white p-10 text-center shadow-xl md:p-16">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald/10">
                <IconCheck className="h-10 w-10 text-emerald" />
              </div>
              <h2 className="font-display text-3xl font-black">Task Posted!</h2>
              <p className="mt-4 text-lg text-midnight/60">
                Your task is now live. Verified workers nearby will see it and send you offers.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  onClick={() => navigate("get-help")}
                  className="rounded-2xl bg-gradient-to-r from-indigo to-violet px-8 py-4 font-semibold text-white shadow-lg transition-all hover:scale-[1.02]"
                >
                  View matched workers
                </button>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setStep(1);
                    setCategory("");
                    setTitle("");
                    setDescription("");
                  }}
                  className="rounded-2xl border-2 border-midnight/20 px-8 py-4 font-semibold text-midnight transition-all hover:bg-mist"
                >
                  Post another task
                </button>
              </div>
            </div>
          ) : (
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
          )}
        </Reveal>
      </div>
    </section>
  );
}

// ===== TASK DETAIL =====
function TaskDetail({ task, navigate, showToast }: { task: Task; navigate: (v: View) => void; showToast: (message: string, type?: "success" | "error" | "info") => void }) {
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
function PostJob({ navigate, showToast }: { navigate: (v: View) => void; showToast: (message: string, type?: "success" | "error" | "info") => void }) {
  const [tab, setTab] = useState<"job" | "shift" | "crew">("job");
  const [submitted, setSubmitted] = useState(false);

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
          {submitted ? (
            <div className="rounded-3xl border-2 border-emerald/30 bg-white p-10 text-center shadow-xl md:p-16">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald/10">
                <IconCheck className="h-10 w-10 text-emerald" />
              </div>
              <h2 className="font-display text-3xl font-black">Posted Successfully!</h2>
              <p className="mt-4 text-lg text-midnight/60">
                Your {tab === "crew" ? "crew request" : tab === "shift" ? "shift" : "job"} is now live. Workers will apply soon.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  onClick={() => navigate("business-workspace")}
                  className="rounded-2xl bg-gradient-to-r from-amber to-violet px-8 py-4 font-semibold text-white shadow-lg transition-all hover:scale-[1.02]"
                >
                  View applicants
                </button>
                <button
                  onClick={() => {
                    setSubmitted(false);
                  }}
                  className="rounded-2xl border-2 border-midnight/20 px-8 py-4 font-semibold text-midnight transition-all hover:bg-mist"
                >
                  Post another
                </button>
              </div>
            </div>
          ) : (
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
                  onClick={() => {
                    setSubmitted(true);
                    showToast("Job posted successfully!", "success");
                  }}
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
                  onClick={() => {
                    setSubmitted(true);
                    showToast("Shift posted successfully!", "success");
                  }}
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
                  onClick={() => {
                    setSubmitted(true);
                    showToast("Crew request submitted!", "success");
                  }}
                  className="w-full rounded-2xl bg-gradient-to-r from-amber to-violet py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-[1.02]"
                >
                  Build Crew →
                </button>
              </div>
            )}
          </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

// ===== FIND WORKERS =====
function FindWorkers({
  navigate,
  setSelectedWorker,
  savedWorkers,
  toggleSaveWorker,
  showToast,
}: {
  navigate: (v: View) => void;
  setSelectedWorker: (w: Worker) => void;
  savedWorkers: Set<string>;
  toggleSaveWorker: (workerId: string) => void;
  showToast: (message: string, type?: "success" | "error" | "info") => void;
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
              <WorkerCard
                worker={worker}
                onClick={() => openWorker(worker)}
                saved={savedWorkers.has(worker.id)}
                onToggleSave={() => toggleSaveWorker(worker.id)}
                onInvite={() => showToast(`Invitation sent to ${worker.name}!`, "success")}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkerCard({ worker, onClick, saved, onToggleSave, onInvite }: { worker: Worker; onClick: () => void; saved: boolean; onToggleSave: () => void; onInvite: () => void }) {
  return (
    <article
      onClick={onClick}
      className="group cursor-pointer rounded-3xl border-2 border-midnight/10 bg-white p-7 shadow-sm transition-all hover:-translate-y-2 hover:border-indigo hover:shadow-2xl"
    >
      <div className="mb-4 flex items-start justify-between">
        <WorkerAvatar worker={worker} />
        <div className="flex items-center gap-2">
          {worker.humanVerified && (
            <span className="flex items-center gap-1.5 rounded-full bg-emerald/10 px-3 py-1.5 font-mono text-xs font-semibold text-emerald">
              <IconCheck className="h-3 w-3" />
              Verified
            </span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave();
            }}
            className={`rounded-full p-2 transition-all ${
              saved ? "bg-indigo/10 text-indigo" : "text-midnight/30 hover:bg-mist hover:text-midnight"
            }`}
            aria-label={saved ? "Remove from saved" : "Save worker"}
          >
            <IconBookmark className="h-4 w-4" filled={saved} />
          </button>
        </div>
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
function WorkerProfile({ worker, navigate, saved, toggleSave, showToast }: { worker: Worker; navigate: (v: View) => void; saved: boolean; toggleSave: () => void; showToast: (message: string, type?: "success" | "error" | "info") => void }) {
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
              <button
                onClick={() => showToast(`Invitation sent to ${worker.name}!`, "success")}
                className="flex-1 rounded-2xl bg-gradient-to-r from-indigo to-violet py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-[1.02]"
              >
                Invite to job
              </button>
              <button
                onClick={() => showToast(`Message sent to ${worker.name}`, "success")}
                className="flex-1 rounded-2xl border-2 border-midnight/20 py-4 text-lg font-semibold text-midnight transition-all hover:bg-mist"
              >
                Message
              </button>
              <button
                onClick={toggleSave}
                className={`rounded-2xl border-2 px-6 py-4 font-semibold transition-all hover:scale-[1.02] ${
                  saved
                    ? "border-indigo bg-indigo/10 text-indigo"
                    : "border-midnight/20 text-midnight hover:bg-mist"
                }`}
              >
                <IconBookmark className="inline h-5 w-5" filled={saved} />
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
function BusinessWorkspace({ navigate, showToast }: { navigate: (v: View) => void; showToast: (message: string, type?: "success" | "error" | "info") => void }) {
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
                <div className="mt-6 space-y-4">
                  {BUSINESS_JOBS.filter((j) => j.type === "shift").slice(0, 4).map((job) => (
                    <div key={job.id} className="rounded-2xl border border-midnight/10 bg-cream p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-display text-xl font-bold">{job.role}</h3>
                          <p className="mt-1 font-mono text-sm text-midnight/60">{job.location}</p>
                        </div>
                        <span className="rounded-full bg-amber/10 px-4 py-1.5 font-mono text-xs font-semibold text-amber">
                          Upcoming
                        </span>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                        <div>
                          <p className="font-mono text-xs text-midnight/50">Date</p>
                          <p className="font-semibold">{job.date || "TBD"}</p>
                        </div>
                        <div>
                          <p className="font-mono text-xs text-midnight/50">Time</p>
                          <p className="font-semibold">{job.startTime || ""}–{job.endTime || ""}</p>
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
              </div>
            )}

            {tab === "workers" && (
              <div>
                <h2 className="font-display text-2xl font-bold">All workers</h2>
                <p className="mt-3 text-midnight/60">28 workers have worked for you</p>
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
                            {worker.rating} · {worker.completedWork} shifts
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "trusted" && (
              <div>
                <h2 className="font-display text-2xl font-bold">Trusted workers</h2>
                <p className="mt-3 text-midnight/60">8 verified, reliable workers</p>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {WORKERS.filter((w) => w.humanVerified).slice(0, 4).map((worker) => (
                    <div key={worker.id} className="rounded-2xl border border-emerald/20 bg-emerald/5 p-5">
                      <div className="flex items-start gap-4">
                        <WorkerAvatar worker={worker} size="sm" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-display font-bold">{worker.name}</p>
                            <span className="rounded-full bg-emerald/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald">Trusted</span>
                          </div>
                          <p className="mt-1 font-mono text-xs text-midnight/60">{worker.completedWork} shifts completed</p>
                          <div className="mt-2 flex items-center gap-2 font-mono text-xs">
                            <IconStar className="h-3 w-3 text-amber" />
                            {worker.rating}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "crews" && (
              <div>
                <h2 className="font-display text-2xl font-bold">Built crews</h2>
                <p className="mt-3 text-midnight/60">2 crews created</p>
                <div className="mt-6 space-y-4">
                  {BUSINESS_JOBS.filter((j) => j.type === "crew").map((job) => (
                    <div key={job.id} className="rounded-2xl border border-midnight/10 bg-cream p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-display text-xl font-bold">{job.role}</h3>
                          <p className="mt-1 font-mono text-sm text-midnight/60">{job.location} · {job.date || "TBD"}</p>
                        </div>
                        <span className="rounded-full bg-emerald/10 px-4 py-1.5 font-mono text-xs font-semibold text-emerald">
                          Built
                        </span>
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
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ===== MY PROFILE =====
function MyProfile({ navigate, showToast }: { navigate: (v: View) => void; showToast: (message: string, type?: "success" | "error" | "info") => void }) {
  const [activeTab, setActiveTab] = useState<"overview" | "tasks" | "jobs" | "reviews" | "settings">("overview");

  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          {/* Profile Header */}
          <div className="rounded-3xl bg-gradient-to-br from-indigo via-violet to-amber p-8 text-white shadow-2xl md:p-10">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20 text-4xl font-bold backdrop-blur-sm">
                JD
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h1 className="font-display text-3xl font-black md:text-4xl">John Doe</h1>
                  <span className="rounded-full bg-emerald/20 px-3 py-1 font-mono text-xs font-semibold text-emerald backdrop-blur-sm">
                    ✓ Verified
                  </span>
                </div>
                <p className="mt-2 font-mono text-white/80">john.doe@email.com · Member since 2024</p>
                <div className="mt-4 flex flex-wrap gap-3 font-mono text-sm">
                  <span className="rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm">📍 Tokyo, Japan</span>
                  <span className="rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm">⭐ 4.9 rating</span>
                  <span className="rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm">✓ 23 tasks completed</span>
                </div>
              </div>
              <button
                onClick={() => showToast("Profile updated!", "success")}
                className="rounded-full bg-white px-6 py-3 font-semibold text-midnight shadow-lg transition-all hover:scale-105"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </Reveal>

        {/* Tabs */}
        <Reveal delay={100}>
          <div className="mt-8 flex gap-2 overflow-x-auto rounded-2xl border-2 border-midnight/10 bg-white p-2">
            {[
              { id: "overview" as const, label: "Overview", icon: "📊" },
              { id: "tasks" as const, label: "My Tasks", icon: "📝" },
              { id: "jobs" as const, label: "My Jobs", icon: "💼" },
              { id: "reviews" as const, label: "Reviews", icon: "⭐" },
              { id: "settings" as const, label: "Settings", icon: "⚙️" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-5 py-3 font-semibold transition-all ${
                  activeTab === t.id
                    ? "bg-gradient-to-r from-indigo to-violet text-white shadow-lg"
                    : "text-midnight/60 hover:bg-mist"
                }`}
              >
                <span>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-8 rounded-3xl border-2 border-midnight/10 bg-white p-8 shadow-xl">
            {activeTab === "overview" && (
              <div>
                <h2 className="font-display text-2xl font-bold">Your Activity</h2>
                <div className="mt-6 grid gap-6 md:grid-cols-4">
                  {[
                    { label: "Tasks Posted", value: "12", icon: "📝", color: "from-indigo to-violet" },
                    { label: "Tasks Completed", value: "23", icon: "✓", color: "from-emerald to-indigo" },
                    { label: "Workers Hired", value: "18", icon: "👥", color: "from-amber to-violet" },
                    { label: "Total Spent", value: "¥285k", icon: "💰", color: "from-violet to-amber" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-2xl bg-cream p-5 text-center">
                      <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${stat.color} text-xl`}>
                        {stat.icon}
                      </div>
                      <p className="font-display text-3xl font-black">{stat.value}</p>
                      <p className="mt-1 font-mono text-xs text-midnight/60">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <h3 className="font-display text-xl font-bold">Recent Activity</h3>
                  <div className="mt-4 space-y-3">
                    {[
                      { action: "Posted task", detail: "Deep clean 2-bedroom apartment", time: "2 hours ago", icon: "📝" },
                      { action: "Hired worker", detail: "Yuki Tanaka for cleaning task", time: "Yesterday", icon: "✓" },
                      { action: "Left review", detail: "5★ for Ahmed Hassan", time: "3 days ago", icon: "⭐" },
                      { action: "Saved worker", detail: "Maria Silva added to saved", time: "1 week ago", icon: "💾" },
                    ].map((activity, i) => (
                      <div key={i} className="flex items-center gap-4 rounded-2xl border border-midnight/10 bg-cream p-4">
                        <span className="text-2xl">{activity.icon}</span>
                        <div className="flex-1">
                          <p className="font-semibold">{activity.action}</p>
                          <p className="text-sm text-midnight/60">{activity.detail}</p>
                        </div>
                        <span className="font-mono text-xs text-midnight/40">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "tasks" && (
              <div>
                <h2 className="font-display text-2xl font-bold">My Tasks</h2>
                <div className="mt-6 space-y-4">
                  {SAMPLE_TASKS.slice(0, 3).map((task) => (
                    <div key={task.id} className="rounded-2xl border border-midnight/10 bg-cream p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="rounded-full bg-indigo/10 px-3 py-1 font-mono text-xs font-semibold text-indigo">
                            {task.category}
                          </span>
                          <h3 className="mt-2 font-display text-lg font-bold">{task.title}</h3>
                          <p className="mt-1 font-mono text-sm text-midnight/60">{task.city} · {task.date}</p>
                        </div>
                        <span className="rounded-full bg-emerald/10 px-3 py-1 font-mono text-xs font-semibold text-emerald">
                          Active
                        </span>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <p className="font-display text-xl font-bold">{task.currency}{task.budget.toLocaleString()}</p>
                        <p className="font-mono text-sm text-midnight/60">{task.offersCount} offers</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "jobs" && (
              <div>
                <h2 className="font-display text-2xl font-bold">My Jobs</h2>
                <div className="mt-6 space-y-4">
                  {BUSINESS_JOBS.slice(0, 3).map((job) => (
                    <div key={job.id} className="rounded-2xl border border-midnight/10 bg-cream p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="rounded-full bg-amber/10 px-3 py-1 font-mono text-xs font-semibold text-amber">
                            {job.type}
                          </span>
                          <h3 className="mt-2 font-display text-lg font-bold">{job.role}</h3>
                          <p className="mt-1 font-mono text-sm text-midnight/60">{job.location}</p>
                        </div>
                        <span className="rounded-full bg-emerald/10 px-3 py-1 font-mono text-xs font-semibold text-emerald">
                          Active
                        </span>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <p className="font-display text-xl font-bold">{job.pay}</p>
                        <p className="font-mono text-sm text-midnight/60">{job.applicants} applicants</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <h2 className="font-display text-2xl font-bold">Reviews</h2>
                <p className="mt-3 text-midnight/60">Reviews you've received from workers</p>
                <div className="mt-6 space-y-4">
                  {WORKERS.slice(0, 3).map((worker) => (
                    <div key={worker.id} className="rounded-2xl border border-midnight/10 bg-cream p-5">
                      <div className="flex items-start gap-4">
                        <WorkerAvatar worker={worker} size="sm" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold">{worker.name}</p>
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <IconStar key={s} className="h-4 w-4 text-amber" />
                              ))}
                            </div>
                          </div>
                          <p className="mt-2 text-sm text-midnight/70">"Great client! Clear instructions and prompt payment. Would love to work again."</p>
                          <p className="mt-2 font-mono text-xs text-midnight/40">2 weeks ago</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <h2 className="font-display text-2xl font-bold">Settings</h2>
                <div className="mt-6 space-y-6">
                  <div>
                    <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue="john.doe@email.com"
                      className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-3 outline-none focus:border-indigo"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                      Phone
                    </label>
                    <input
                      type="tel"
                      defaultValue="+81 90-1234-5678"
                      className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-3 outline-none focus:border-indigo"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                      Notifications
                    </label>
                    <div className="space-y-3">
                      {["Email notifications", "SMS notifications", "Push notifications", "Marketing emails"].map((opt) => (
                        <label key={opt} className="flex items-center gap-3">
                          <input type="checkbox" defaultChecked className="h-5 w-5 rounded" />
                          <span className="text-midnight/70">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => showToast("Settings saved!", "success")}
                    className="rounded-2xl bg-gradient-to-r from-indigo to-violet px-8 py-3 font-semibold text-white shadow-lg transition-all hover:scale-[1.02]"
                  >
                    Save Changes
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

// ===== MESSAGES =====
function Messages({ navigate, showToast }: { navigate: (v: View) => void; showToast: (message: string, type?: "success" | "error" | "info") => void }) {
  const [selectedChat, setSelectedChat] = useState<string | null>("w2");
  const [newMessage, setNewMessage] = useState("");

  const conversations = [
    { id: "w2", worker: WORKERS[1], lastMessage: "Thanks for the opportunity! Let me know if you need anything else.", time: "2m", unread: 2 },
    { id: "w1", worker: WORKERS[0], lastMessage: "I can start tomorrow at 9am. Does that work?", time: "1h", unread: 0 },
    { id: "w4", worker: WORKERS[3], lastMessage: "Perfect, I'll bring my own supplies.", time: "3h", unread: 1 },
    { id: "w6", worker: WORKERS[5], lastMessage: "Looking forward to working with you!", time: "1d", unread: 0 },
  ];

  const messages = [
    { from: "them", text: "Hi! I saw your task for deep cleaning. I'm available tomorrow.", time: "10:30 AM" },
    { from: "me", text: "Great! What time works for you?", time: "10:32 AM" },
    { from: "them", text: "I can start at 9am and should finish by 3pm. Does that work?", time: "10:35 AM" },
    { from: "me", text: "Perfect! 9am works great. Will you bring your own supplies?", time: "10:38 AM" },
    { from: "them", text: "Yes, I bring all my own eco-friendly supplies. I specialize in deep cleaning.", time: "10:40 AM" },
    { from: "me", text: "Excellent! I'll confirm the booking now.", time: "10:42 AM" },
    { from: "them", text: "Thanks for the opportunity! Let me know if you need anything else.", time: "10:45 AM" },
  ];

  const sendMessage = () => {
    if (newMessage.trim()) {
      showToast("Message sent!", "success");
      setNewMessage("");
    }
  };

  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mb-8">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-indigo">// Messages</p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">Your conversations</h1>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid gap-6 lg:grid-cols-[350px_1fr]">
            {/* Conversations list */}
            <div className="rounded-3xl border-2 border-midnight/10 bg-white shadow-xl">
              <div className="border-b border-midnight/10 p-5">
                <div className="flex items-center gap-3 rounded-2xl bg-cream px-4 py-3">
                  <IconSearch className="h-5 w-5 text-midnight/40" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full bg-transparent outline-none placeholder:text-midnight/40"
                  />
                </div>
              </div>
              <div className="max-h-[600px] overflow-y-auto">
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedChat(conv.id)}
                    className={`flex w-full items-center gap-4 border-b border-midnight/5 p-4 text-left transition-all hover:bg-cream ${
                      selectedChat === conv.id ? "bg-indigo/5" : ""
                    }`}
                  >
                    <div className="relative">
                      <WorkerAvatar worker={conv.worker} size="sm" />
                      {conv.unread > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo text-xs font-bold text-white">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{conv.worker.name}</p>
                        <span className="font-mono text-xs text-midnight/40">{conv.time}</span>
                      </div>
                      <p className="mt-0.5 truncate text-sm text-midnight/60">{conv.lastMessage}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat area */}
            <div className="flex flex-col rounded-3xl border-2 border-midnight/10 bg-white shadow-xl">
              {/* Chat header */}
              <div className="flex items-center gap-4 border-b border-midnight/10 p-5">
                {selectedChat && (
                  <>
                    <WorkerAvatar worker={conversations.find((c) => c.id === selectedChat)?.worker || WORKERS[0]} />
                    <div>
                      <p className="font-display font-bold">{conversations.find((c) => c.id === selectedChat)?.worker.name}</p>
                      <p className="font-mono text-xs text-emerald">● Online</p>
                    </div>
                  </>
                )}
              </div>

              {/* Messages */}
              <div className="flex-1 space-y-4 overflow-y-auto p-6" style={{ maxHeight: "400px" }}>
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[70%] rounded-2xl px-5 py-3 ${
                      msg.from === "me"
                        ? "bg-gradient-to-r from-indigo to-violet text-white"
                        : "bg-cream text-midnight"
                    }`}>
                      <p>{msg.text}</p>
                      <p className={`mt-1 font-mono text-[10px] ${msg.from === "me" ? "text-white/60" : "text-midnight/40"}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message input */}
              <div className="border-t border-midnight/10 p-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-3 outline-none focus:border-indigo"
                  />
                  <button
                    onClick={sendMessage}
                    className="rounded-2xl bg-gradient-to-r from-indigo to-violet px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ===== NOTIFICATIONS =====
function Notifications({ navigate, unreadCount, setUnreadCount }: { navigate: (v: View) => void; unreadCount: number; setUnreadCount: (n: number) => void }) {
  const [filter, setFilter] = useState<"all" | "unread" | "tasks" | "jobs">("all");

  const notifications = [
    { id: 1, type: "task", title: "New offer received", message: "Yuki Tanaka sent you an offer for 'Deep clean apartment'", time: "2m ago", read: false, icon: "💼" },
    { id: 2, type: "job", title: "New applicant", message: "Rahim Uddin applied for your 'Warehouse Worker' position", time: "1h ago", read: false, icon: "👤" },
    { id: 3, type: "task", title: "Task completed", message: "Your cleaning task was completed successfully", time: "3h ago", read: false, icon: "✓" },
    { id: 4, type: "system", title: "Payment received", message: "¥18,000 has been transferred to Yuki Tanaka", time: "1d ago", read: true, icon: "💰" },
    { id: 5, type: "review", title: "New review", message: "Ahmed Hassan left you a 5-star review", time: "2d ago", read: true, icon: "⭐" },
    { id: 6, type: "job", title: "Shift reminder", message: "Your shift at Shinjuku Grand Hotel starts in 2 hours", time: "3d ago", read: true, icon: "⏰" },
  ];

  const filtered = filter === "all" ? notifications : filter === "unread" ? notifications.filter((n) => !n.read) : notifications.filter((n) => n.type === filter);

  const markAllRead = () => {
    setUnreadCount(0);
  };

  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-indigo">// Notifications</p>
              <h1 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">Stay updated</h1>
            </div>
            <button
              onClick={markAllRead}
              className="rounded-full border-2 border-midnight/20 px-5 py-2.5 font-semibold text-midnight transition-all hover:bg-mist"
            >
              Mark all as read
            </button>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mb-6 flex gap-2 overflow-x-auto rounded-2xl border-2 border-midnight/10 bg-white p-2">
            {[
              { id: "all" as const, label: "All", count: notifications.length },
              { id: "unread" as const, label: "Unread", count: unreadCount },
              { id: "tasks" as const, label: "Tasks", count: notifications.filter((n) => n.type === "task").length },
              { id: "jobs" as const, label: "Jobs", count: notifications.filter((n) => n.type === "job").length },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-5 py-3 font-semibold transition-all ${
                  filter === f.id
                    ? "bg-gradient-to-r from-indigo to-violet text-white shadow-lg"
                    : "text-midnight/60 hover:bg-mist"
                }`}
              >
                {f.label}
                <span className={`rounded-full px-2 py-0.5 text-xs ${filter === f.id ? "bg-white/20" : "bg-mist"}`}>
                  {f.count}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="space-y-3">
            {filtered.map((notif) => (
              <div
                key={notif.id}
                className={`flex items-start gap-4 rounded-2xl border-2 p-5 transition-all ${
                  notif.read
                    ? "border-midnight/10 bg-white"
                    : "border-indigo/30 bg-indigo/5"
                }`}
              >
                <span className="text-2xl">{notif.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-display font-bold">{notif.title}</p>
                    {!notif.read && (
                      <span className="h-2 w-2 rounded-full bg-indigo" />
                    )}
                  </div>
                  <p className="mt-1 text-sm text-midnight/70">{notif.message}</p>
                  <p className="mt-2 font-mono text-xs text-midnight/40">{notif.time}</p>
                </div>
                {!notif.read && (
                  <button
                    onClick={() => setUnreadCount(Math.max(0, unreadCount - 1))}
                    className="rounded-full border border-midnight/20 px-3 py-1.5 font-mono text-xs text-midnight/60 hover:bg-mist"
                  >
                    Mark read
                  </button>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ===== ANALYTICS =====
function Analytics({ navigate }: { navigate: (v: View) => void }) {
  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mb-8">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-indigo">// Analytics</p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">Your performance</h1>
            <p className="mt-3 text-lg text-midnight/60">Track your hiring activity and spending</p>
          </div>
        </Reveal>

        {/* Stats cards */}
        <Reveal delay={100}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Total Spent", value: "¥285,400", change: "+12%", icon: "💰", gradient: "from-indigo to-violet" },
              { label: "Tasks Posted", value: "12", change: "+3", icon: "📝", gradient: "from-violet to-amber" },
              { label: "Workers Hired", value: "18", change: "+5", icon: "👥", gradient: "from-amber to-emerald" },
              { label: "Avg. Rating", value: "4.9", change: "+0.1", icon: "⭐", gradient: "from-emerald to-indigo" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={150 + i * 50}>
                <div className="rounded-3xl border-2 border-midnight/10 bg-white p-6 shadow-xl">
                  <div className="flex items-start justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.gradient} text-xl`}>
                      {stat.icon}
                    </div>
                    <span className="rounded-full bg-emerald/10 px-3 py-1 font-mono text-xs font-semibold text-emerald">
                      {stat.change}
                    </span>
                  </div>
                  <p className="mt-4 font-display text-3xl font-black">{stat.value}</p>
                  <p className="mt-1 font-mono text-sm text-midnight/60">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        {/* Charts placeholder */}
        <Reveal delay={300}>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border-2 border-midnight/10 bg-white p-6 shadow-xl">
              <h3 className="font-display text-xl font-bold">Spending Overview</h3>
              <p className="mt-1 font-mono text-sm text-midnight/60">Last 6 months</p>
              <div className="mt-6 flex h-48 items-end justify-between gap-2">
                {[40, 65, 45, 80, 60, 90].map((h, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-xl bg-gradient-to-t from-indigo to-violet transition-all hover:opacity-80"
                      style={{ height: `${h}%` }}
                    />
                    <span className="font-mono text-xs text-midnight/40">
                      {["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border-2 border-midnight/10 bg-white p-6 shadow-xl">
              <h3 className="font-display text-xl font-bold">Task Categories</h3>
              <p className="mt-1 font-mono text-sm text-midnight/60">Distribution</p>
              <div className="mt-6 space-y-4">
                {[
                  { label: "Cleaning", percent: 40, color: "bg-indigo" },
                  { label: "Plumbing", percent: 25, color: "bg-violet" },
                  { label: "Moving", percent: 20, color: "bg-amber" },
                  { label: "Other", percent: 15, color: "bg-emerald" },
                ].map((cat) => (
                  <div key={cat.label}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{cat.label}</span>
                      <span className="font-mono text-sm text-midnight/60">{cat.percent}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-mist">
                      <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${cat.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Recent activity */}
        <Reveal delay={400}>
          <div className="mt-8 rounded-3xl border-2 border-midnight/10 bg-white p-6 shadow-xl">
            <h3 className="font-display text-xl font-bold">Recent Transactions</h3>
            <div className="mt-6 space-y-3">
              {[
                { desc: "Payment to Yuki Tanaka", amount: "-¥18,000", date: "Dec 10, 2024", status: "Completed" },
                { desc: "Payment to Ahmed Hassan", amount: "-¥12,500", date: "Dec 8, 2024", status: "Completed" },
                { desc: "Payment to Maria Silva", amount: "-¥8,000", date: "Dec 5, 2024", status: "Completed" },
                { desc: "Refund from cancelled task", amount: "+¥5,000", date: "Dec 3, 2024", status: "Refunded" },
              ].map((tx, i) => (
                <div key={i} className="flex items-center justify-between rounded-2xl border border-midnight/10 bg-cream p-4">
                  <div>
                    <p className="font-semibold">{tx.desc}</p>
                    <p className="font-mono text-xs text-midnight/50">{tx.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-display font-bold ${tx.amount.startsWith("+") ? "text-emerald" : "text-midnight"}`}>
                      {tx.amount}
                    </p>
                    <p className="font-mono text-xs text-midnight/50">{tx.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ===== PAYMENTS =====
function Payments({ navigate, showToast }: { navigate: (v: View) => void; showToast: (message: string, type?: "success" | "error" | "info") => void }) {
  const [activeTab, setActiveTab] = useState<"overview" | "transactions" | "methods" | "invoices">("overview");

  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="mb-8">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-indigo">// Payments</p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">Manage your payments</h1>
          </div>
        </Reveal>

        {/* Balance card */}
        <Reveal delay={100}>
          <div className="rounded-3xl bg-gradient-to-br from-indigo via-violet to-amber p-8 text-white shadow-2xl md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-mono text-sm uppercase tracking-[0.2em] text-white/70">Available Balance</p>
                <p className="mt-2 font-display text-5xl font-black md:text-6xl">¥285,400</p>
                <p className="mt-2 font-mono text-sm text-white/70">Last updated: 2 minutes ago</p>
              </div>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => showToast("Withdrawal initiated!", "success")}
                  className="rounded-full bg-white px-6 py-3 font-semibold text-midnight shadow-lg transition-all hover:scale-105"
                >
                  Withdraw Funds
                </button>
                <button
                  onClick={() => showToast("Top-up initiated!", "success")}
                  className="rounded-full border-2 border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  Add Funds
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Tabs */}
        <Reveal delay={150}>
          <div className="mt-8 flex gap-2 overflow-x-auto rounded-2xl border-2 border-midnight/10 bg-white p-2">
            {[
              { id: "overview" as const, label: "Overview", icon: "📊" },
              { id: "transactions" as const, label: "Transactions", icon: "💳" },
              { id: "methods" as const, label: "Payment Methods", icon: "🏦" },
              { id: "invoices" as const, label: "Invoices", icon: "📄" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-5 py-3 font-semibold transition-all ${
                  activeTab === t.id
                    ? "bg-gradient-to-r from-indigo to-violet text-white shadow-lg"
                    : "text-midnight/60 hover:bg-mist"
                }`}
              >
                <span>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-8 rounded-3xl border-2 border-midnight/10 bg-white p-8 shadow-xl">
            {activeTab === "overview" && (
              <div>
                <div className="grid gap-6 md:grid-cols-3">
                  {[
                    { label: "Total Spent", value: "¥285,400", icon: "💸", color: "from-indigo to-violet" },
                    { label: "Pending", value: "¥12,500", icon: "⏳", color: "from-amber to-violet" },
                    { label: "This Month", value: "¥45,200", icon: "📅", color: "from-emerald to-indigo" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-2xl bg-cream p-5 text-center">
                      <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${stat.color} text-xl`}>
                        {stat.icon}
                      </div>
                      <p className="font-display text-3xl font-black">{stat.value}</p>
                      <p className="mt-1 font-mono text-xs text-midnight/60">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <h3 className="font-display text-xl font-bold">Recent Activity</h3>
                  <div className="mt-4 space-y-3">
                    {[
                      { desc: "Payment to Yuki Tanaka", amount: "-¥18,000", date: "Dec 10", status: "Completed" },
                      { desc: "Payment to Ahmed Hassan", amount: "-¥12,500", date: "Dec 8", status: "Completed" },
                      { desc: "Refund received", amount: "+¥5,000", date: "Dec 5", status: "Refunded" },
                    ].map((tx, i) => (
                      <div key={i} className="flex items-center justify-between rounded-2xl border border-midnight/10 bg-cream p-4">
                        <div>
                          <p className="font-semibold">{tx.desc}</p>
                          <p className="font-mono text-xs text-midnight/50">{tx.date}</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-display font-bold ${tx.amount.startsWith("+") ? "text-emerald" : "text-midnight"}`}>
                            {tx.amount}
                          </p>
                          <p className="font-mono text-xs text-midnight/50">{tx.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "transactions" && (
              <div>
                <h3 className="font-display text-xl font-bold">All Transactions</h3>
                <div className="mt-6 space-y-3">
                  {[
                    { desc: "Deep clean apartment", worker: "Yuki Tanaka", amount: "-¥18,000", date: "Dec 10, 2024", status: "Completed" },
                    { desc: "Plumbing repair", worker: "Ahmed Hassan", amount: "-¥12,500", date: "Dec 8, 2024", status: "Completed" },
                    { desc: "Moving help", worker: "João Santos", amount: "-¥8,000", date: "Dec 5, 2024", status: "Completed" },
                    { desc: "Cancelled task refund", worker: "System", amount: "+¥5,000", date: "Dec 3, 2024", status: "Refunded" },
                    { desc: "Garden cleanup", worker: "Arjun Patel", amount: "-¥6,500", date: "Dec 1, 2024", status: "Completed" },
                  ].map((tx, i) => (
                    <div key={i} className="flex items-center justify-between rounded-2xl border border-midnight/10 bg-cream p-4">
                      <div>
                        <p className="font-semibold">{tx.desc}</p>
                        <p className="font-mono text-xs text-midnight/50">{tx.worker} · {tx.date}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-display font-bold ${tx.amount.startsWith("+") ? "text-emerald" : "text-midnight"}`}>
                          {tx.amount}
                        </p>
                        <p className="font-mono text-xs text-midnight/50">{tx.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "methods" && (
              <div>
                <h3 className="font-display text-xl font-bold">Payment Methods</h3>
                <div className="mt-6 space-y-4">
                  {[
                    { type: "Credit Card", detail: "•••• •••• •••• 4242", expiry: "12/26", default: true },
                    { type: "Bank Transfer", detail: "Mizuho Bank •••• 1234", expiry: "", default: false },
                    { type: "Digital Wallet", detail: "PayPay • john.doe@email.com", expiry: "", default: false },
                  ].map((method, i) => (
                    <div key={i} className="flex items-center justify-between rounded-2xl border-2 border-midnight/10 bg-cream p-5">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo to-violet text-xl">
                          💳
                        </div>
                        <div>
                          <p className="font-semibold">{method.type}</p>
                          <p className="font-mono text-sm text-midnight/60">{method.detail}</p>
                          {method.expiry && <p className="font-mono text-xs text-midnight/40">Expires {method.expiry}</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {method.default && (
                          <span className="rounded-full bg-emerald/10 px-3 py-1 font-mono text-xs font-semibold text-emerald">
                            Default
                          </span>
                        )}
                        <button className="rounded-full border border-midnight/20 px-4 py-2 font-mono text-xs text-midnight/60 hover:bg-mist">
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => showToast("Payment method added!", "success")}
                    className="w-full rounded-2xl border-2 border-dashed border-midnight/20 p-5 text-center font-semibold text-midnight/60 transition-all hover:border-indigo hover:bg-indigo/5 hover:text-indigo"
                  >
                    + Add Payment Method
                  </button>
                </div>
              </div>
            )}

            {activeTab === "invoices" && (
              <div>
                <h3 className="font-display text-xl font-bold">Invoices</h3>
                <div className="mt-6 space-y-3">
                  {[
                    { id: "INV-2024-001", date: "Dec 10, 2024", amount: "¥18,000", status: "Paid" },
                    { id: "INV-2024-002", date: "Dec 8, 2024", amount: "¥12,500", status: "Paid" },
                    { id: "INV-2024-003", date: "Dec 5, 2024", amount: "¥8,000", status: "Paid" },
                    { id: "INV-2024-004", date: "Dec 1, 2024", amount: "¥6,500", status: "Paid" },
                  ].map((inv, i) => (
                    <div key={i} className="flex items-center justify-between rounded-2xl border border-midnight/10 bg-cream p-4">
                      <div>
                        <p className="font-semibold">{inv.id}</p>
                        <p className="font-mono text-xs text-midnight/50">{inv.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-display font-bold">{inv.amount}</p>
                        <span className="rounded-full bg-emerald/10 px-3 py-1 font-mono text-xs font-semibold text-emerald">
                          {inv.status}
                        </span>
                        <button className="rounded-full border border-midnight/20 px-4 py-2 font-mono text-xs text-midnight/60 hover:bg-mist">
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ===== HELP CENTER =====
function HelpCenter({ navigate }: { navigate: (v: View) => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    { q: "How do I post a task?", a: "Click 'Post Task' in the navigation, fill in the details about what you need done, set your budget, and publish. Workers nearby will see your task and send offers." },
    { q: "How do I hire a worker?", a: "Browse worker profiles, check their ratings and reviews, then click 'Invite' or 'Message' to connect. Once you agree on terms, confirm the booking." },
    { q: "How does payment work?", a: "Payments are held securely until the task is completed. Once you confirm the work is done, funds are released to the worker. We support multiple payment methods." },
    { q: "What if I'm not satisfied with the work?", a: "Contact our support team within 24 hours. We'll mediate between you and the worker to find a solution, including potential refunds if needed." },
    { q: "How do I become a verified worker?", a: "Complete your profile, upload ID verification, pass skill assessments, and maintain a high rating. Our team will review your application within 48 hours." },
    { q: "Can I cancel a task?", a: "Yes, you can cancel before a worker accepts. After acceptance, cancellation fees may apply depending on timing. Check our cancellation policy for details." },
  ];

  const categories = [
    { title: "Getting Started", icon: "🚀", articles: 12 },
    { title: "Posting Tasks", icon: "📝", articles: 8 },
    { title: "Hiring Workers", icon: "👥", articles: 15 },
    { title: "Payments & Billing", icon: "💳", articles: 10 },
    { title: "Safety & Trust", icon: "🛡️", articles: 7 },
    { title: "Account Settings", icon: "⚙️", articles: 9 },
  ];

  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <Reveal>
          <div className="mb-8 text-center">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-indigo">// Help Center</p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight md:text-6xl">How can we help?</h1>
            <p className="mt-4 text-lg text-midnight/60">Find answers, guides, and support</p>
          </div>
        </Reveal>

        {/* Search */}
        <Reveal delay={100}>
          <div className="mx-auto max-w-2xl">
            <div className="flex items-center gap-3 rounded-3xl border-2 border-midnight/10 bg-white px-6 py-4 shadow-xl">
              <IconSearch className="h-6 w-6 text-midnight/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for help articles..."
                className="w-full bg-transparent text-lg outline-none placeholder:text-midnight/40"
              />
            </div>
          </div>
        </Reveal>

        {/* Categories */}
        <Reveal delay={150}>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <button
                key={cat.title}
                className="group rounded-3xl border-2 border-midnight/10 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-indigo hover:shadow-xl"
              >
                <span className="text-4xl">{cat.icon}</span>
                <h3 className="mt-4 font-display text-xl font-bold group-hover:text-indigo">{cat.title}</h3>
                <p className="mt-2 font-mono text-sm text-midnight/60">{cat.articles} articles</p>
              </button>
            ))}
          </div>
        </Reveal>

        {/* FAQs */}
        <Reveal delay={200}>
          <div className="mt-16">
            <h2 className="font-display text-3xl font-bold">Frequently Asked Questions</h2>
            <div className="mt-6 space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-2xl border-2 border-midnight/10 bg-white overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="flex w-full items-center justify-between p-5 text-left"
                  >
                    <span className="font-semibold">{faq.q}</span>
                    <IconChevron className={`h-5 w-5 transition-transform ${expandedFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {expandedFaq === i && (
                    <div className="border-t border-midnight/10 bg-cream p-5">
                      <p className="text-midnight/70">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Contact */}
        <Reveal delay={250}>
          <div className="mt-16 rounded-3xl bg-gradient-to-r from-indigo via-violet to-amber p-10 text-center text-white shadow-2xl">
            <h2 className="font-display text-3xl font-bold">Still need help?</h2>
            <p className="mt-3 text-lg text-white/90">Our support team is here 24/7</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button className="rounded-full bg-white px-8 py-4 font-semibold text-midnight shadow-lg transition-all hover:scale-105">
                💬 Live Chat
              </button>
              <button className="rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20">
                📧 Email Support
              </button>
            </div>
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
        <div className="grid gap-12 md:grid-cols-5">
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
              <button onClick={() => navigate("analytics")} className="block text-white/70 hover:text-white transition-colors">
                Analytics
              </button>
            </div>
          </div>

          <div>
            <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Account
            </p>
            <div className="space-y-2">
              <button onClick={() => navigate("my-profile")} className="block text-white/70 hover:text-white transition-colors">
                My Profile
              </button>
              <button onClick={() => navigate("messages")} className="block text-white/70 hover:text-white transition-colors">
                Messages
              </button>
              <button onClick={() => navigate("notifications")} className="block text-white/70 hover:text-white transition-colors">
                Notifications
              </button>
              <button onClick={() => navigate("payments")} className="block text-white/70 hover:text-white transition-colors">
                Payments
              </button>
            </div>
          </div>

          <div>
            <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Support
            </p>
            <div className="space-y-2">
              <button onClick={() => navigate("help-center")} className="block text-white/70 hover:text-white transition-colors">
                Help Center
              </button>
              <a href="#top" className="block text-white/70 hover:text-white transition-colors">Trust & Safety</a>
              <a href="#top" className="block text-white/70 hover:text-white transition-colors">Contact Us</a>
              <a href="#top" className="block text-white/70 hover:text-white transition-colors">Community Guidelines</a>
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
