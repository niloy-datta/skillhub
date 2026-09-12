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
import { WorkerMap, TaskMap, CompanyMap } from "./components/Map";
import { lazy, Suspense } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { ErrorBoundary } from "./components/ui/ErrorBoundary";

// Lazy load pages for code splitting
const HomePage = lazy(() => import("./components/pages/HomePage").then(m => ({ default: m.HomePage })));
const MissionCompilerPage = lazy(() => import("./components/pages/MissionCompilerPage").then(m => ({ default: m.MissionCompilerPage })));
const ExecutionDashboard = lazy(() => import("./components/pages/ExecutionDashboard").then(m => ({ default: m.ExecutionDashboard })));
const LoginPage = lazy(() => import("./components/pages/LoginPage").then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import("./components/pages/RegisterPage").then(m => ({ default: m.RegisterPage })));
const SettingsPage = lazy(() => import("./components/pages/SettingsPage").then(m => ({ default: m.SettingsPage })));
const NotFoundPage = lazy(() => import("./components/pages/NotFoundPage").then(m => ({ default: m.NotFoundPage })));
const ChatPage = lazy(() => import("./components/pages/ChatPage").then(m => ({ default: m.ChatPage })));
const LinkedInProfilePage = lazy(() => import("./components/pages/LinkedInProfilePage").then(m => ({ default: m.LinkedInProfilePage })));

// Loading component
function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-midnight via-charcoal to-midnight">
      <div className="text-center">
        <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-indigo"></div>
        <p className="text-white/60">Loading...</p>
      </div>
    </div>
  );
}

type View =
  | "home"
  | "login"
  | "register"
  | "forgot-password"
  | "settings"
  | "chat"
  | "linkedin-profile"
  | "mission-compiler"
  | "execution-dashboard"
  | "outcome-graph"
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
  | "help-center"
  | "verification"
  | "disputes"
  | "referrals"
  | "achievements"
  | "social-sharing"
  | "coupons"
  | "loyalty"
  | "leaderboard"
  | "team"
  | "video-call"
  | "language"
  | "forecasting"
  | "trends"
  | "insights"
  | "404";

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
}

function AppContent() {
  const [view, setView] = useState<View>("home");
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [savedWorkers, setSavedWorkers] = useState<Set<string>>(new Set());
  const [savedTasks, setSavedTasks] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [darkMode, setDarkMode] = useState(false);

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
    <div id="top" className={`min-h-screen ${darkMode ? "bg-midnight" : "bg-cream"}`}>
      <div className="noise-layer" aria-hidden="true" />
      <Nav view={view} navigate={navigate} savedCount={savedWorkers.size + savedTasks.size} unreadNotifications={unreadNotifications} darkMode={darkMode} setDarkMode={setDarkMode} />
      <Toast toast={toast} />
      <main>
        <Suspense fallback={<PageLoader />}>
          {view === "home" && <HomePage onNavigate={navigate} />}
          {view === "login" && <LoginPage onNavigate={navigate} />}
          {view === "register" && <RegisterPage onNavigate={navigate} />}
          {view === "settings" && <SettingsPage onNavigate={navigate} />}
          {view === "mission-compiler" && <MissionCompilerPage onNavigate={navigate} />}
          {view === "execution-dashboard" && <ExecutionDashboard onNavigate={navigate} />}
          {view === "404" && <NotFoundPage onNavigate={navigate} />}
          {view === "chat" && <ChatPage onNavigate={navigate} />}
          {view === "linkedin-profile" && <LinkedInProfilePage onNavigate={navigate} />}
        </Suspense>
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
        {view === "verification" && <Verification navigate={navigate} showToast={showToast} />}
        {view === "disputes" && <Disputes navigate={navigate} showToast={showToast} />}
        {view === "referrals" && <Referrals navigate={navigate} showToast={showToast} />}
        {view === "achievements" && <Achievements navigate={navigate} />}
        {view === "social-sharing" && <SocialSharing navigate={navigate} showToast={showToast} />}
        {view === "coupons" && <CouponSystem navigate={navigate} showToast={showToast} />}
        {view === "loyalty" && <LoyaltyProgram navigate={navigate} />}
        {view === "leaderboard" && <Leaderboard navigate={navigate} />}
        {view === "team" && <TeamManagement navigate={navigate} showToast={showToast} />}
        {view === "video-call" && <VideoCallIntegration navigate={navigate} showToast={showToast} />}
        {view === "language" && <MultiLanguageSupport navigate={navigate} showToast={showToast} />}
        {view === "forecasting" && <RevenueForecasting navigate={navigate} />}
        {view === "trends" && <MarketTrends navigate={navigate} />}
        {view === "insights" && <CustomerInsights navigate={navigate} />}
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
function Nav({ view, navigate, savedCount, unreadNotifications, darkMode, setDarkMode }: { view: View; navigate: (v: View) => void; savedCount: number; unreadNotifications: number; darkMode: boolean; setDarkMode: (v: boolean) => void }) {
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
              { label: "Mission Compiler", view: "mission-compiler" as View },
              { label: "Execution", view: "execution-dashboard" as View },
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
              onClick={() => setDarkMode(!darkMode)}
              className="hidden rounded-full bg-white/10 p-2.5 text-white transition-all hover:bg-white/20 md:block"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
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
              { label: "Mission Compiler", view: "mission-compiler" as View, icon: "🧠" },
              { label: "Execution Dashboard", view: "execution-dashboard" as View, icon: "⚡" },
              { label: "Chat", view: "chat" as View, icon: "💬" },
              { label: "LinkedIn Profile", view: "linkedin-profile" as View, icon: "💼" },
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
              { label: "Coupons", view: "coupons" as View, icon: "🎫" },
              { label: "Loyalty", view: "loyalty" as View, icon: "🏆" },
              { label: "Leaderboard", view: "leaderboard" as View, icon: "🥇" },
              { label: "Team", view: "team" as View, icon: "👥" },
              { label: "Video Call", view: "video-call" as View, icon: "📹" },
              { label: "Language", view: "language" as View, icon: "🌍" },
              { label: "Market Trends", view: "trends" as View, icon: "📊" },
              { label: "Insights", view: "insights" as View, icon: "💡" },
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
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  
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
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-display text-3xl font-bold">Recent tasks</h2>
            <div className="flex items-center gap-4">
              <p className="font-mono text-sm text-midnight/60">{SAMPLE_TASKS.length} tasks available</p>
              <div className="flex gap-2 rounded-full border-2 border-midnight/10 bg-white p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`rounded-full px-4 py-2 font-mono text-sm font-semibold transition-all ${
                    viewMode === 'list' 
                      ? 'bg-indigo text-white' 
                      : 'text-midnight/60 hover:bg-mist'
                  }`}
                >
                  📋 List
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`rounded-full px-4 py-2 font-mono text-sm font-semibold transition-all ${
                    viewMode === 'map' 
                      ? 'bg-indigo text-white' 
                      : 'text-midnight/60 hover:bg-mist'
                  }`}
                >
                  🗺️ Map
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Map View */}
        {viewMode === 'map' && (
          <Reveal delay={250}>
            <div className="mb-8 overflow-hidden rounded-3xl border-2 border-midnight/10 shadow-xl">
              <TaskMap tasks={SAMPLE_TASKS} height="600px" />
            </div>
          </Reveal>
        )}

        {/* List View */}
        {viewMode === 'list' && (
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
        )}
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
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  
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
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-display text-3xl font-bold">Companies hiring now</h2>
            <div className="flex items-center gap-4">
              <p className="font-mono text-sm text-midnight/60">{COMPANIES.length} verified employers</p>
              <div className="flex gap-2 rounded-full border-2 border-midnight/10 bg-white p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`rounded-full px-4 py-2 font-mono text-sm font-semibold transition-all ${
                    viewMode === 'list' 
                      ? 'bg-indigo text-white' 
                      : 'text-midnight/60 hover:bg-mist'
                  }`}
                >
                  📋 List
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`rounded-full px-4 py-2 font-mono text-sm font-semibold transition-all ${
                    viewMode === 'map' 
                      ? 'bg-indigo text-white' 
                      : 'text-midnight/60 hover:bg-mist'
                  }`}
                >
                  🗺️ Map
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Map View */}
        {viewMode === 'map' && (
          <Reveal delay={200}>
            <div className="mb-8 overflow-hidden rounded-3xl border-2 border-midnight/10 shadow-xl">
              <CompanyMap companies={COMPANIES} height="600px" />
            </div>
          </Reveal>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {COMPANIES.map((company, i) => (
              <Reveal key={company.id} delay={200 + i * 50}>
                <CompanyCard company={company} onClick={() => openCompany(company)} />
              </Reveal>
            ))}
          </div>
        )}
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
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  
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

        {/* View Toggle */}
        <Reveal delay={200}>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-display text-3xl font-bold">Verified workers</h2>
            <div className="flex items-center gap-4">
              <p className="font-mono text-sm text-midnight/60">{WORKERS.length} workers available</p>
              <div className="flex gap-2 rounded-full border-2 border-midnight/10 bg-white p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`rounded-full px-4 py-2 font-mono text-sm font-semibold transition-all ${
                    viewMode === 'list' 
                      ? 'bg-indigo text-white' 
                      : 'text-midnight/60 hover:bg-mist'
                  }`}
                >
                  📋 List
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`rounded-full px-4 py-2 font-mono text-sm font-semibold transition-all ${
                    viewMode === 'map' 
                      ? 'bg-indigo text-white' 
                      : 'text-midnight/60 hover:bg-mist'
                  }`}
                >
                  🗺️ Map
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Map View */}
        {viewMode === 'map' && (
          <Reveal delay={250}>
            <div className="mb-8 overflow-hidden rounded-3xl border-2 border-midnight/10 shadow-xl">
              <WorkerMap workers={WORKERS} height="600px" />
            </div>
          </Reveal>
        )}

        {/* List View */}
        {viewMode === 'list' && (
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
        )}
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

// ===== VERIFICATION =====
function Verification({ navigate, showToast }: { navigate: (v: View) => void; showToast: (message: string, type?: "success" | "error" | "info") => void }) {
  const [step, setStep] = useState(1);
  const [verificationData, setVerificationData] = useState({
    idType: "",
    idNumber: "",
    phone: "",
    address: "",
    skills: [] as string[],
    experience: "",
    education: "",
    references: "",
  });

  const verificationSteps = [
    { num: 1, title: "Identity", icon: "🆔" },
    { num: 2, title: "Contact", icon: "📱" },
    { num: 3, title: "Skills", icon: "🛠️" },
    { num: 4, title: "Review", icon: "✓" },
  ];

  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <Reveal>
          <div className="mb-8">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-indigo">// Verification</p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">Get Verified</h1>
            <p className="mt-3 text-lg text-midnight/60">Complete verification to unlock premium features and earn more</p>
          </div>
        </Reveal>

        {/* Progress Steps */}
        <Reveal delay={100}>
          <div className="mb-8 flex items-center justify-between">
            {verificationSteps.map((s, i) => (
              <div key={s.num} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-xl transition-all ${
                      step >= s.num
                        ? "bg-gradient-to-br from-indigo to-violet text-white shadow-lg"
                        : "bg-mist text-midnight/40"
                    }`}
                  >
                    {step > s.num ? <IconCheck className="h-6 w-6" /> : s.icon}
                  </div>
                  <p className={`mt-2 font-mono text-xs ${step >= s.num ? "text-indigo font-semibold" : "text-midnight/40"}`}>
                    {s.title}
                  </p>
                </div>
                {i < verificationSteps.length - 1 && (
                  <div className={`mx-2 h-1 flex-1 rounded-full ${step > s.num ? "bg-indigo" : "bg-mist"}`} />
                )}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="rounded-3xl border-2 border-midnight/10 bg-white p-8 shadow-xl md:p-10">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold">Identity Verification</h2>
                  <p className="mt-2 text-midnight/60">Upload your government-issued ID</p>
                </div>
                <div>
                  <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                    ID Type *
                  </label>
                  <select
                    value={verificationData.idType}
                    onChange={(e) => setVerificationData({ ...verificationData, idType: e.target.value })}
                    className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-3 outline-none focus:border-indigo"
                  >
                    <option value="">Select ID type</option>
                    <option value="passport">Passport</option>
                    <option value="national-id">National ID</option>
                    <option value="drivers-license">Driver's License</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                    ID Number *
                  </label>
                  <input
                    type="text"
                    value={verificationData.idNumber}
                    onChange={(e) => setVerificationData({ ...verificationData, idNumber: e.target.value })}
                    placeholder="Enter your ID number"
                    className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-3 outline-none focus:border-indigo"
                  />
                </div>
                <div>
                  <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                    Upload ID Photo *
                  </label>
                  <div className="rounded-2xl border-2 border-dashed border-midnight/20 bg-cream p-8 text-center">
                    <p className="text-4xl">📷</p>
                    <p className="mt-2 font-semibold">Click to upload or drag and drop</p>
                    <p className="mt-1 font-mono text-xs text-midnight/40">PNG, JPG up to 5MB</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (verificationData.idType && verificationData.idNumber) {
                      setStep(2);
                    } else {
                      showToast("Please fill all required fields", "error");
                    }
                  }}
                  className="w-full rounded-2xl bg-gradient-to-r from-indigo to-violet py-4 font-semibold text-white shadow-lg transition-all hover:scale-[1.02]"
                >
                  Continue →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold">Contact Verification</h2>
                  <p className="mt-2 text-midnight/60">Verify your phone and address</p>
                </div>
                <div>
                  <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={verificationData.phone}
                    onChange={(e) => setVerificationData({ ...verificationData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-3 outline-none focus:border-indigo"
                  />
                  <button
                    onClick={() => showToast("Verification code sent!", "success")}
                    className="mt-2 font-mono text-sm text-indigo hover:underline"
                  >
                    Send verification code
                  </button>
                </div>
                <div>
                  <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                    Address *
                  </label>
                  <textarea
                    value={verificationData.address}
                    onChange={(e) => setVerificationData({ ...verificationData, address: e.target.value })}
                    placeholder="Enter your full address"
                    rows={3}
                    className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-3 outline-none focus:border-indigo resize-none"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 rounded-2xl border-2 border-midnight/20 py-4 font-semibold text-midnight transition-all hover:bg-mist"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => {
                      if (verificationData.phone && verificationData.address) {
                        setStep(3);
                      } else {
                        showToast("Please fill all required fields", "error");
                      }
                    }}
                    className="flex-1 rounded-2xl bg-gradient-to-r from-indigo to-violet py-4 font-semibold text-white shadow-lg transition-all hover:scale-[1.02]"
                  >
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold">Skills & Experience</h2>
                  <p className="mt-2 text-midnight/60">Tell us about your skills and experience</p>
                </div>
                <div>
                  <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                    Skills *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {WORKER_SKILLS.slice(0, 12).map((skill) => (
                      <button
                        key={skill}
                        onClick={() => {
                          const skills = verificationData.skills.includes(skill)
                            ? verificationData.skills.filter((s) => s !== skill)
                            : [...verificationData.skills, skill];
                          setVerificationData({ ...verificationData, skills });
                        }}
                        className={`rounded-full border-2 px-4 py-2 font-medium transition-all ${
                          verificationData.skills.includes(skill)
                            ? "border-indigo bg-indigo text-white"
                            : "border-midnight/20 bg-white text-midnight hover:border-indigo"
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                    Years of Experience *
                  </label>
                  <select
                    value={verificationData.experience}
                    onChange={(e) => setVerificationData({ ...verificationData, experience: e.target.value })}
                    className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-3 outline-none focus:border-indigo"
                  >
                    <option value="">Select experience</option>
                    <option value="0-1">Less than 1 year</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5+">5+ years</option>
                  </select>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 rounded-2xl border-2 border-midnight/20 py-4 font-semibold text-midnight transition-all hover:bg-mist"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => {
                      if (verificationData.skills.length > 0 && verificationData.experience) {
                        setStep(4);
                      } else {
                        showToast("Please fill all required fields", "error");
                      }
                    }}
                    className="flex-1 rounded-2xl bg-gradient-to-r from-indigo to-violet py-4 font-semibold text-white shadow-lg transition-all hover:scale-[1.02]"
                  >
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold">Review & Submit</h2>
                  <p className="mt-2 text-midnight/60">Review your information before submitting</p>
                </div>
                <div className="space-y-4 rounded-2xl bg-cream p-6">
                  <div>
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">Identity</p>
                    <p className="mt-1 font-semibold">{verificationData.idType} - {verificationData.idNumber}</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">Contact</p>
                    <p className="mt-1 font-semibold">{verificationData.phone}</p>
                    <p className="text-sm text-midnight/60">{verificationData.address}</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">Skills</p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {verificationData.skills.map((skill) => (
                        <span key={skill} className="rounded-full bg-indigo/10 px-3 py-1 font-mono text-xs font-semibold text-indigo">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">Experience</p>
                    <p className="mt-1 font-semibold">{verificationData.experience} years</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 rounded-2xl border-2 border-midnight/20 py-4 font-semibold text-midnight transition-all hover:bg-mist"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => {
                      showToast("Verification submitted! We'll review within 48 hours.", "success");
                      navigate("my-profile");
                    }}
                    className="flex-1 rounded-2xl bg-gradient-to-r from-indigo to-violet py-4 font-semibold text-white shadow-lg transition-all hover:scale-[1.02]"
                  >
                    Submit Verification ✓
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

// ===== DISPUTES =====
function Disputes({ navigate, showToast }: { navigate: (v: View) => void; showToast: (message: string, type?: "success" | "error" | "info") => void }) {
  const [activeTab, setActiveTab] = useState<"open" | "resolved" | "new">("open");
  const [newDispute, setNewDispute] = useState({
    taskId: "",
    reason: "",
    description: "",
    evidence: "",
  });

  const openDisputes = [
    {
      id: "DSP-001",
      task: "Deep clean apartment",
      worker: "Yuki Tanaka",
      reason: "Work not completed as agreed",
      status: "Under Review",
      date: "Dec 10, 2024",
      amount: "¥18,000",
    },
    {
      id: "DSP-002",
      task: "Plumbing repair",
      worker: "Ahmed Hassan",
      reason: "Damage to property",
      status: "Mediation",
      date: "Dec 8, 2024",
      amount: "¥12,500",
    },
  ];

  const resolvedDisputes = [
    {
      id: "DSP-003",
      task: "Moving help",
      worker: "João Santos",
      reason: "Late arrival",
      resolution: "Partial refund issued",
      date: "Dec 5, 2024",
      amount: "¥8,000",
    },
  ];

  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <Reveal>
          <div className="mb-8">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-indigo">// Disputes</p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">Dispute Resolution</h1>
            <p className="mt-3 text-lg text-midnight/60">Resolve issues fairly and quickly</p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mb-8 flex gap-2 overflow-x-auto rounded-2xl border-2 border-midnight/10 bg-white p-2">
            {[
              { id: "open" as const, label: "Open Disputes", count: openDisputes.length },
              { id: "resolved" as const, label: "Resolved", count: resolvedDisputes.length },
              { id: "new" as const, label: "File New Dispute" },
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
                {t.label}
                {"count" in t && (
                  <span className={`rounded-full px-2 py-0.5 text-xs ${activeTab === t.id ? "bg-white/20" : "bg-mist"}`}>
                    {t.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="rounded-3xl border-2 border-midnight/10 bg-white p-8 shadow-xl">
            {activeTab === "open" && (
              <div>
                <h2 className="font-display text-2xl font-bold">Open Disputes</h2>
                <div className="mt-6 space-y-4">
                  {openDisputes.map((dispute) => (
                    <div key={dispute.id} className="rounded-2xl border-2 border-amber/30 bg-amber/5 p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="rounded-full bg-amber/10 px-3 py-1 font-mono text-xs font-semibold text-amber">
                              {dispute.status}
                            </span>
                            <span className="font-mono text-xs text-midnight/40">{dispute.id}</span>
                          </div>
                          <h3 className="mt-2 font-display text-lg font-bold">{dispute.task}</h3>
                          <p className="mt-1 font-mono text-sm text-midnight/60">Worker: {dispute.worker}</p>
                        </div>
                        <p className="font-display text-xl font-bold">{dispute.amount}</p>
                      </div>
                      <p className="mt-4 text-midnight/70">{dispute.reason}</p>
                      <div className="mt-4 flex items-center justify-between border-t border-midnight/10 pt-4">
                        <p className="font-mono text-xs text-midnight/40">{dispute.date}</p>
                        <button className="rounded-full border border-midnight/20 px-4 py-2 font-mono text-xs font-semibold text-midnight hover:bg-mist">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "resolved" && (
              <div>
                <h2 className="font-display text-2xl font-bold">Resolved Disputes</h2>
                <div className="mt-6 space-y-4">
                  {resolvedDisputes.map((dispute) => (
                    <div key={dispute.id} className="rounded-2xl border-2 border-emerald/30 bg-emerald/5 p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="rounded-full bg-emerald/10 px-3 py-1 font-mono text-xs font-semibold text-emerald">
                              Resolved
                            </span>
                            <span className="font-mono text-xs text-midnight/40">{dispute.id}</span>
                          </div>
                          <h3 className="mt-2 font-display text-lg font-bold">{dispute.task}</h3>
                          <p className="mt-1 font-mono text-sm text-midnight/60">Worker: {dispute.worker}</p>
                        </div>
                        <p className="font-display text-xl font-bold">{dispute.amount}</p>
                      </div>
                      <p className="mt-4 text-midnight/70">{dispute.resolution}</p>
                      <div className="mt-4 flex items-center justify-between border-t border-midnight/10 pt-4">
                        <p className="font-mono text-xs text-midnight/40">{dispute.date}</p>
                        <button className="rounded-full border border-midnight/20 px-4 py-2 font-mono text-xs font-semibold text-midnight hover:bg-mist">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "new" && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold">File New Dispute</h2>
                  <p className="mt-2 text-midnight/60">Tell us about the issue you're experiencing</p>
                </div>
                <div>
                  <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                    Task ID *
                  </label>
                  <input
                    type="text"
                    value={newDispute.taskId}
                    onChange={(e) => setNewDispute({ ...newDispute, taskId: e.target.value })}
                    placeholder="e.g., TASK-12345"
                    className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-3 outline-none focus:border-indigo"
                  />
                </div>
                <div>
                  <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                    Reason *
                  </label>
                  <select
                    value={newDispute.reason}
                    onChange={(e) => setNewDispute({ ...newDispute, reason: e.target.value })}
                    className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-3 outline-none focus:border-indigo"
                  >
                    <option value="">Select reason</option>
                    <option value="not-completed">Work not completed</option>
                    <option value="poor-quality">Poor quality work</option>
                    <option value="damage">Property damage</option>
                    <option value="no-show">Worker didn't show up</option>
                    <option value="overcharge">Overcharged</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                    Description *
                  </label>
                  <textarea
                    value={newDispute.description}
                    onChange={(e) => setNewDispute({ ...newDispute, description: e.target.value })}
                    placeholder="Describe the issue in detail..."
                    rows={5}
                    className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-3 outline-none focus:border-indigo resize-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                    Evidence (Optional)
                  </label>
                  <div className="rounded-2xl border-2 border-dashed border-midnight/20 bg-cream p-6 text-center">
                    <p className="text-3xl">📎</p>
                    <p className="mt-2 font-semibold">Upload photos or documents</p>
                    <p className="mt-1 font-mono text-xs text-midnight/40">PNG, JPG, PDF up to 10MB</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (newDispute.taskId && newDispute.reason && newDispute.description) {
                      showToast("Dispute filed successfully! We'll review within 24 hours.", "success");
                      setActiveTab("open");
                    } else {
                      showToast("Please fill all required fields", "error");
                    }
                  }}
                  className="w-full rounded-2xl bg-gradient-to-r from-indigo to-violet py-4 font-semibold text-white shadow-lg transition-all hover:scale-[1.02]"
                >
                  Submit Dispute
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ===== REFERRALS =====
function Referrals({ navigate, showToast }: { navigate: (v: View) => void; showToast: (message: string, type?: "success" | "error" | "info") => void }) {
  const referralCode = "SKILL-JOHN2024";
  const referralLink = "https://skillhub.com/ref/SKILL-JOHN2024";

  const referralStats = [
    { label: "Total Referrals", value: "12", icon: "👥" },
    { label: "Successful", value: "8", icon: "✓" },
    { label: "Earnings", value: "¥24,000", icon: "💰" },
    { label: "Pending", value: "4", icon: "⏳" },
  ];

  const referrals = [
    { name: "Maria Silva", status: "Completed", earned: "¥3,000", date: "Dec 10, 2024" },
    { name: "Ahmed Hassan", status: "Completed", earned: "¥3,000", date: "Dec 8, 2024" },
    { name: "João Santos", status: "Pending", earned: "¥3,000", date: "Dec 5, 2024" },
    { name: "Priya Sharma", status: "Pending", earned: "¥3,000", date: "Dec 3, 2024" },
  ];

  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <Reveal>
          <div className="mb-8">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-indigo">// Referrals</p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">Refer & Earn</h1>
            <p className="mt-3 text-lg text-midnight/60">Earn ¥3,000 for every friend who joins and completes a task</p>
          </div>
        </Reveal>

        {/* Referral Code Card */}
        <Reveal delay={100}>
          <div className="rounded-3xl bg-gradient-to-br from-indigo via-violet to-amber p-8 text-white shadow-2xl md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-mono text-sm uppercase tracking-[0.2em] text-white/70">Your Referral Code</p>
                <p className="mt-2 font-display text-4xl font-black md:text-5xl">{referralCode}</p>
                <p className="mt-3 font-mono text-sm text-white/70">Share this code with friends</p>
              </div>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(referralCode);
                    showToast("Referral code copied!", "success");
                  }}
                  className="rounded-full bg-white px-6 py-3 font-semibold text-midnight shadow-lg transition-all hover:scale-105"
                >
                  📋 Copy Code
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(referralLink);
                    showToast("Referral link copied!", "success");
                  }}
                  className="rounded-full border-2 border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  🔗 Copy Link
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Stats */}
        <Reveal delay={150}>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {referralStats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border-2 border-midnight/10 bg-white p-6 text-center shadow-xl">
                <span className="text-4xl">{stat.icon}</span>
                <p className="mt-3 font-display text-3xl font-black">{stat.value}</p>
                <p className="mt-1 font-mono text-sm text-midnight/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Referral History */}
        <Reveal delay={200}>
          <div className="mt-8 rounded-3xl border-2 border-midnight/10 bg-white p-8 shadow-xl">
            <h2 className="font-display text-2xl font-bold">Referral History</h2>
            <div className="mt-6 space-y-3">
              {referrals.map((ref, i) => (
                <div key={i} className="flex items-center justify-between rounded-2xl border border-midnight/10 bg-cream p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo to-violet text-xl">
                      👤
                    </div>
                    <div>
                      <p className="font-semibold">{ref.name}</p>
                      <p className="font-mono text-xs text-midnight/50">{ref.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-bold">{ref.earned}</p>
                    <span className={`rounded-full px-3 py-1 font-mono text-xs font-semibold ${
                      ref.status === "Completed" ? "bg-emerald/10 text-emerald" : "bg-amber/10 text-amber"
                    }`}>
                      {ref.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* How it Works */}
        <Reveal delay={250}>
          <div className="mt-8 rounded-3xl border-2 border-midnight/10 bg-white p-8 shadow-xl">
            <h2 className="font-display text-2xl font-bold">How It Works</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {[
                { step: "1", title: "Share Your Code", desc: "Send your referral code to friends", icon: "📤" },
                { step: "2", title: "Friend Joins", desc: "They sign up using your code", icon: "👥" },
                { step: "3", title: "Earn Rewards", desc: "Get ¥3,000 when they complete a task", icon: "💰" },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo to-violet text-3xl">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold">Step {item.step}: {item.title}</h3>
                  <p className="mt-2 text-midnight/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ===== ACHIEVEMENTS =====
function Achievements({ navigate }: { navigate: (v: View) => void }) {
  const achievements = [
    { id: 1, title: "First Task", desc: "Complete your first task", icon: "🎯", progress: 100, unlocked: true },
    { id: 2, title: "Task Master", desc: "Complete 10 tasks", icon: "⭐", progress: 80, unlocked: false },
    { id: 3, title: "High Roller", desc: "Spend ¥100,000", icon: "💎", progress: 60, unlocked: false },
    { id: 4, title: "Social Butterfly", desc: "Refer 5 friends", icon: "🦋", progress: 40, unlocked: false },
    { id: 5, title: "Top Rater", desc: "Leave 20 reviews", icon: "📝", progress: 90, unlocked: false },
    { id: 6, title: "Loyal Customer", desc: "Member for 1 year", icon: "🏆", progress: 100, unlocked: true },
    { id: 7, title: "Quick Responder", desc: "Respond within 1 hour", icon: "⚡", progress: 70, unlocked: false },
    { id: 8, title: "Power User", desc: "Use all platform features", icon: "🚀", progress: 50, unlocked: false },
  ];

  const badges = [
    { name: "Verified User", icon: "✓", color: "from-emerald to-indigo" },
    { name: "Top Rater", icon: "⭐", color: "from-amber to-violet" },
    { name: "Fast Payer", icon: "💰", color: "from-indigo to-violet" },
    { name: "Referral King", icon: "👑", color: "from-violet to-amber" },
  ];

  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="mb-8">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-indigo">// Achievements</p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">Your Achievements</h1>
            <p className="mt-3 text-lg text-midnight/60">Unlock badges and rewards as you use the platform</p>
          </div>
        </Reveal>

        {/* Badges */}
        <Reveal delay={100}>
          <div className="rounded-3xl border-2 border-midnight/10 bg-white p-8 shadow-xl">
            <h2 className="font-display text-2xl font-bold">Your Badges</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {badges.map((badge) => (
                <div key={badge.name} className="text-center">
                  <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${badge.color} text-3xl shadow-lg`}>
                    {badge.icon}
                  </div>
                  <p className="mt-3 font-semibold">{badge.name}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Achievements */}
        <Reveal delay={150}>
          <div className="mt-8 rounded-3xl border-2 border-midnight/10 bg-white p-8 shadow-xl">
            <h2 className="font-display text-2xl font-bold">Achievements</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`rounded-2xl border-2 p-6 ${
                    achievement.unlocked
                      ? "border-emerald/30 bg-emerald/5"
                      : "border-midnight/10 bg-cream"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl text-3xl ${
                      achievement.unlocked
                        ? "bg-gradient-to-br from-emerald to-indigo"
                        : "bg-mist"
                    }`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-lg font-bold">{achievement.title}</h3>
                        {achievement.unlocked && (
                          <span className="rounded-full bg-emerald/10 px-2 py-0.5 font-mono text-xs font-semibold text-emerald">
                            Unlocked
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-midnight/60">{achievement.desc}</p>
                      <div className="mt-3">
                        <div className="flex items-center justify-between font-mono text-xs">
                          <span>{achievement.progress}%</span>
                          <span>{achievement.progress}/100</span>
                        </div>
                        <div className="mt-1 h-2 overflow-hidden rounded-full bg-mist">
                          <div
                            className={`h-full rounded-full ${
                              achievement.unlocked
                                ? "bg-gradient-to-r from-emerald to-indigo"
                                : "bg-gradient-to-r from-indigo to-violet"
                            }`}
                            style={{ width: `${achievement.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Rewards */}
        <Reveal delay={200}>
          <div className="mt-8 rounded-3xl bg-gradient-to-r from-indigo via-violet to-amber p-8 text-white shadow-2xl">
            <h2 className="font-display text-2xl font-bold">Unlock More Rewards</h2>
            <p className="mt-2 text-white/80">Complete more tasks and achievements to unlock exclusive rewards</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                { title: "Premium Support", desc: "Priority customer support", icon: "🎧" },
                { title: "Lower Fees", desc: "Reduced platform fees", icon: "💸" },
                { title: "Exclusive Features", desc: "Access to beta features", icon: "🚀" },
              ].map((reward) => (
                <div key={reward.title} className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                  <span className="text-3xl">{reward.icon}</span>
                  <h3 className="mt-3 font-bold">{reward.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{reward.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ===== SOCIAL SHARING =====
function SocialSharing({ navigate, showToast }: { navigate: (v: View) => void; showToast: (message: string, type?: "success" | "error" | "info") => void }) {
  const [shareUrl, setShareUrl] = useState("https://skillhub.com/user/john-doe");
  const [shareText, setShareText] = useState("Check out my profile on Skillhub! I'm hiring for cleaning and plumbing tasks.");

  const socialPlatforms = [
    { name: "Facebook", icon: "📘", color: "from-blue-600 to-blue-700" },
    { name: "Twitter", icon: "🐦", color: "from-sky-400 to-sky-500" },
    { name: "LinkedIn", icon: "💼", color: "from-blue-700 to-blue-800" },
    { name: "WhatsApp", icon: "💬", color: "from-green-500 to-green-600" },
    { name: "Telegram", icon: "✈️", color: "from-blue-400 to-blue-500" },
    { name: "Email", icon: "📧", color: "from-red-500 to-red-600" },
  ];

  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <Reveal>
          <div className="mb-8">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-indigo">// Social Sharing</p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">Share & Connect</h1>
            <p className="mt-3 text-lg text-midnight/60">Share your profile and tasks with your network</p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="rounded-3xl border-2 border-midnight/10 bg-white p-8 shadow-xl">
            <h2 className="font-display text-2xl font-bold">Share Your Profile</h2>
            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                  Share URL
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={shareUrl}
                    onChange={(e) => setShareUrl(e.target.value)}
                    className="flex-1 rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-3 outline-none focus:border-indigo"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(shareUrl);
                      showToast("URL copied to clipboard!", "success");
                    }}
                    className="rounded-2xl bg-gradient-to-r from-indigo to-violet px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105"
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div>
                <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                  Share Message
                </label>
                <textarea
                  value={shareText}
                  onChange={(e) => setShareText(e.target.value)}
                  rows={4}
                  className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-3 outline-none focus:border-indigo resize-none"
                />
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-display text-xl font-bold">Share on Social Media</h3>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {socialPlatforms.map((platform) => (
                  <button
                    key={platform.name}
                    onClick={() => showToast(`Shared on ${platform.name}!`, "success")}
                    className={`flex items-center gap-3 rounded-2xl bg-gradient-to-r ${platform.color} p-4 text-white shadow-lg transition-all hover:scale-105`}
                  >
                    <span className="text-2xl">{platform.icon}</span>
                    <span className="font-semibold">{platform.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ===== COUPON SYSTEM =====
function CouponSystem({ navigate, showToast }: { navigate: (v: View) => void; showToast: (message: string, type?: "success" | "error" | "info") => void }) {
  const [couponCode, setCouponCode] = useState("");

  const availableCoupons = [
    { code: "WELCOME20", discount: "20% off", desc: "First task discount", expiry: "Dec 31, 2024", minSpend: "¥5,000" },
    { code: "REFER10", discount: "¥1,000 off", desc: "Referral bonus", expiry: "Jan 15, 2025", minSpend: "¥10,000" },
    { code: "LOYALTY15", discount: "15% off", desc: "Loyalty reward", expiry: "Feb 28, 2025", minSpend: "¥8,000" },
  ];

  const myCoupons = [
    { code: "BDAY25", discount: "25% off", desc: "Birthday special", used: false, expiry: "Dec 20, 2024" },
    { code: "WELCOME20", discount: "20% off", desc: "First task", used: true, expiry: "Dec 31, 2024" },
  ];

  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <Reveal>
          <div className="mb-8">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-indigo">// Coupons</p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">Coupons & Discounts</h1>
            <p className="mt-3 text-lg text-midnight/60">Save more with exclusive coupons</p>
          </div>
        </Reveal>

        {/* Apply Coupon */}
        <Reveal delay={100}>
          <div className="rounded-3xl bg-gradient-to-r from-indigo via-violet to-amber p-8 text-white shadow-2xl">
            <h2 className="font-display text-2xl font-bold">Apply Coupon Code</h2>
            <div className="mt-4 flex gap-3">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="flex-1 rounded-2xl bg-white/20 px-5 py-3 text-white placeholder:text-white/50 outline-none backdrop-blur-sm"
              />
              <button
                onClick={() => {
                  if (couponCode) {
                    showToast("Coupon applied successfully!", "success");
                    setCouponCode("");
                  } else {
                    showToast("Please enter a coupon code", "error");
                  }
                }}
                className="rounded-2xl bg-white px-6 py-3 font-semibold text-midnight shadow-lg transition-all hover:scale-105"
              >
                Apply
              </button>
            </div>
          </div>
        </Reveal>

        {/* Available Coupons */}
        <Reveal delay={150}>
          <div className="mt-8 rounded-3xl border-2 border-midnight/10 bg-white p-8 shadow-xl">
            <h2 className="font-display text-2xl font-bold">Available Coupons</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {availableCoupons.map((coupon) => (
                <div key={coupon.code} className="rounded-2xl border-2 border-indigo/30 bg-indigo/5 p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-indigo">{coupon.desc}</p>
                      <p className="mt-2 font-display text-3xl font-black text-indigo">{coupon.discount}</p>
                    </div>
                    <span className="rounded-full bg-indigo/10 px-3 py-1 font-mono text-xs font-semibold text-indigo">
                      {coupon.code}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-midnight/10 pt-4">
                    <div>
                      <p className="font-mono text-xs text-midnight/60">Min. spend: {coupon.minSpend}</p>
                      <p className="font-mono text-xs text-midnight/40">Expires: {coupon.expiry}</p>
                    </div>
                    <button
                      onClick={() => {
                        setCouponCode(coupon.code);
                        showToast("Coupon code copied!", "success");
                      }}
                      className="rounded-full bg-indigo px-4 py-2 font-mono text-xs font-semibold text-white"
                    >
                      Use
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* My Coupons */}
        <Reveal delay={200}>
          <div className="mt-8 rounded-3xl border-2 border-midnight/10 bg-white p-8 shadow-xl">
            <h2 className="font-display text-2xl font-bold">My Coupons</h2>
            <div className="mt-6 space-y-4">
              {myCoupons.map((coupon) => (
                <div key={coupon.code} className={`rounded-2xl border-2 p-6 ${coupon.used ? "border-midnight/10 bg-mist/50 opacity-60" : "border-emerald/30 bg-emerald/5"}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-emerald/10 px-3 py-1 font-mono text-xs font-semibold text-emerald">
                          {coupon.code}
                        </span>
                        {coupon.used && (
                          <span className="rounded-full bg-midnight/10 px-3 py-1 font-mono text-xs font-semibold text-midnight/60">
                            Used
                          </span>
                        )}
                      </div>
                      <p className="mt-2 font-display text-2xl font-bold">{coupon.discount}</p>
                      <p className="mt-1 text-sm text-midnight/60">{coupon.desc}</p>
                    </div>
                    <p className="font-mono text-xs text-midnight/40">Expires: {coupon.expiry}</p>
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

// ===== LOYALTY PROGRAM =====
function LoyaltyProgram({ navigate }: { navigate: (v: View) => void }) {
  const currentTier = "Gold";
  const points = 2450;
  const nextTier = "Platinum";
  const pointsToNext = 550;

  const tiers = [
    { name: "Bronze", points: 0, benefits: ["Basic support", "Standard fees"], color: "from-amber-700 to-amber-800" },
    { name: "Silver", points: 1000, benefits: ["Priority support", "5% fee discount", "Early access"], color: "from-gray-400 to-gray-500" },
    { name: "Gold", points: 2000, benefits: ["VIP support", "10% fee discount", "Exclusive features", "Free referrals"], color: "from-amber-400 to-amber-500" },
    { name: "Platinum", points: 3000, benefits: ["24/7 dedicated support", "15% fee discount", "All Gold benefits", "Custom solutions"], color: "from-indigo to-violet" },
  ];

  const recentActivity = [
    { action: "Completed task", points: "+100", date: "Dec 10, 2024" },
    { action: "Left review", points: "+50", date: "Dec 8, 2024" },
    { action: "Referred friend", points: "+200", date: "Dec 5, 2024" },
    { action: "Redeemed coupon", points: "-150", date: "Dec 3, 2024" },
  ];

  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="mb-8">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-indigo">// Loyalty</p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">Loyalty Program</h1>
            <p className="mt-3 text-lg text-midnight/60">Earn points and unlock exclusive benefits</p>
          </div>
        </Reveal>

        {/* Current Status */}
        <Reveal delay={100}>
          <div className="rounded-3xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-8 text-white shadow-2xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-mono text-sm uppercase tracking-[0.2em] text-white/70">Current Tier</p>
                <p className="mt-2 font-display text-5xl font-black">{currentTier}</p>
                <p className="mt-3 font-mono text-sm text-white/80">{points.toLocaleString()} points</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-sm text-white/70">Next tier: {nextTier}</p>
                <p className="mt-2 font-display text-3xl font-bold">{pointsToNext} points to go</p>
                <div className="mt-3 h-2 w-48 overflow-hidden rounded-full bg-white/20">
                  <div className="h-full rounded-full bg-white" style={{ width: `${(points / 3000) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Tiers */}
        <Reveal delay={150}>
          <div className="mt-8 rounded-3xl border-2 border-midnight/10 bg-white p-8 shadow-xl">
            <h2 className="font-display text-2xl font-bold">Membership Tiers</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`rounded-2xl border-2 p-6 ${
                    tier.name === currentTier ? "border-amber bg-amber/5" : "border-midnight/10"
                  }`}
                >
                  <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${tier.color} text-2xl font-bold text-white`}>
                    {tier.name.charAt(0)}
                  </div>
                  <h3 className="font-display text-xl font-bold">{tier.name}</h3>
                  <p className="mt-1 font-mono text-sm text-midnight/60">{tier.points}+ points</p>
                  <ul className="mt-4 space-y-2">
                    {tier.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2 text-sm text-midnight/70">
                        <IconCheck className="h-4 w-4 text-emerald" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  {tier.name === currentTier && (
                    <span className="mt-4 inline-block rounded-full bg-amber px-3 py-1 font-mono text-xs font-semibold text-white">
                      Current Tier
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Recent Activity */}
        <Reveal delay={200}>
          <div className="mt-8 rounded-3xl border-2 border-midnight/10 bg-white p-8 shadow-xl">
            <h2 className="font-display text-2xl font-bold">Recent Activity</h2>
            <div className="mt-6 space-y-3">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-center justify-between rounded-2xl border border-midnight/10 bg-cream p-4">
                  <div>
                    <p className="font-semibold">{activity.action}</p>
                    <p className="font-mono text-xs text-midnight/50">{activity.date}</p>
                  </div>
                  <p className={`font-display text-xl font-bold ${activity.points.startsWith("+") ? "text-emerald" : "text-rose"}`}>
                    {activity.points}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ===== LEADERBOARD =====
function Leaderboard({ navigate }: { navigate: (v: View) => void }) {
  const [timeframe, setTimeframe] = useState<"week" | "month" | "all">("month");

  const topWorkers = [
    { rank: 1, name: "Yuki Tanaka", rating: 5.0, tasks: 389, earnings: "¥856,000", avatar: "👩" },
    { rank: 2, name: "Ahmed Hassan", rating: 4.9, tasks: 203, earnings: "¥456,000", avatar: "👨‍🔧" },
    { rank: 3, name: "Maria Silva", rating: 4.8, tasks: 156, earnings: "¥312,000", avatar: "👩‍🍳" },
    { rank: 4, name: "Priya Sharma", rating: 4.9, tasks: 245, earnings: "¥512,000", avatar: "👩‍⚕️" },
    { rank: 5, name: "Fatima Al-Zahra", rating: 4.9, tasks: 312, earnings: "¥624,000", avatar: "🧹" },
  ];

  const topClients = [
    { rank: 1, name: "Shinjuku Grand Hotel", tasks: 156, spent: "¥2,340,000", rating: 4.8, avatar: "🏨" },
    { rank: 2, name: "Al Fardan Warehouse", tasks: 98, spent: "¥1,560,000", rating: 4.6, avatar: "📦" },
    { rank: 3, name: "Café Central", tasks: 67, spent: "¥890,000", rating: 4.9, avatar: "☕" },
    { rank: 4, name: "GreenLeaf Restaurant", tasks: 54, spent: "¥720,000", rating: 4.7, avatar: "🌿" },
    { rank: 5, name: "Portside Logistics", tasks: 89, spent: "¥1,230,000", rating: 4.5, avatar: "🚢" },
  ];

  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-indigo">// Leaderboard</p>
              <h1 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">Top Performers</h1>
              <p className="mt-3 text-lg text-midnight/60">See who's leading the platform</p>
            </div>
            <div className="flex gap-2 rounded-2xl border-2 border-midnight/10 bg-white p-2">
              {[
                { id: "week" as const, label: "This Week" },
                { id: "month" as const, label: "This Month" },
                { id: "all" as const, label: "All Time" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTimeframe(t.id)}
                  className={`rounded-xl px-4 py-2 font-semibold transition-all ${
                    timeframe === t.id ? "bg-gradient-to-r from-indigo to-violet text-white" : "text-midnight/60 hover:bg-mist"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Top Workers */}
        <Reveal delay={100}>
          <div className="rounded-3xl border-2 border-midnight/10 bg-white p-8 shadow-xl">
            <h2 className="font-display text-2xl font-bold">🏆 Top Workers</h2>
            <div className="mt-6 space-y-3">
              {topWorkers.map((worker) => (
                <div
                  key={worker.rank}
                  className={`flex items-center gap-4 rounded-2xl border-2 p-5 ${
                    worker.rank === 1
                      ? "border-amber bg-amber/5"
                      : worker.rank === 2
                        ? "border-gray-400 bg-gray-50"
                        : worker.rank === 3
                          ? "border-amber-700 bg-amber-50"
                          : "border-midnight/10 bg-cream"
                  }`}
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl ${
                    worker.rank === 1 ? "bg-amber" : worker.rank === 2 ? "bg-gray-400" : worker.rank === 3 ? "bg-amber-700" : "bg-mist"
                  }`}>
                    {worker.rank <= 3 ? "🏆" : `#${worker.rank}`}
                  </div>
                  <span className="text-3xl">{worker.avatar}</span>
                  <div className="flex-1">
                    <p className="font-display text-lg font-bold">{worker.name}</p>
                    <div className="mt-1 flex items-center gap-3 font-mono text-sm">
                      <span className="flex items-center gap-1">
                        <IconStar className="h-4 w-4 text-amber" />
                        {worker.rating}
                      </span>
                      <span className="text-midnight/40">·</span>
                      <span>{worker.tasks} tasks</span>
                    </div>
                  </div>
                  <p className="font-display text-xl font-bold">{worker.earnings}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Top Clients */}
        <Reveal delay={150}>
          <div className="mt-8 rounded-3xl border-2 border-midnight/10 bg-white p-8 shadow-xl">
            <h2 className="font-display text-2xl font-bold">💼 Top Clients</h2>
            <div className="mt-6 space-y-3">
              {topClients.map((client) => (
                <div key={client.rank} className="flex items-center gap-4 rounded-2xl border-2 border-midnight/10 bg-cream p-5">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl ${
                    client.rank === 1 ? "bg-amber" : client.rank === 2 ? "bg-gray-400" : client.rank === 3 ? "bg-amber-700" : "bg-mist"
                  }`}>
                    {client.rank <= 3 ? "🏆" : `#${client.rank}`}
                  </div>
                  <span className="text-3xl">{client.avatar}</span>
                  <div className="flex-1">
                    <p className="font-display text-lg font-bold">{client.name}</p>
                    <div className="mt-1 flex items-center gap-3 font-mono text-sm">
                      <span>{client.tasks} tasks posted</span>
                      <span className="text-midnight/40">·</span>
                      <span className="flex items-center gap-1">
                        <IconStar className="h-4 w-4 text-amber" />
                        {client.rating}
                      </span>
                    </div>
                  </div>
                  <p className="font-display text-xl font-bold">{client.spent}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ===== TEAM MANAGEMENT =====
function TeamManagement({ navigate, showToast }: { navigate: (v: View) => void; showToast: (message: string, type?: "success" | "error" | "info") => void }) {
  const [showInviteModal, setShowInviteModal] = useState(false);

  const teamMembers = [
    { id: 1, name: "John Doe", role: "Owner", email: "john@example.com", status: "Active", avatar: "👨‍💼" },
    { id: 2, name: "Sarah Johnson", role: "Manager", email: "sarah@example.com", status: "Active", avatar: "👩‍💼" },
    { id: 3, name: "Mike Chen", role: "Admin", email: "mike@example.com", status: "Active", avatar: "👨‍💻" },
    { id: 4, name: "Emily Davis", role: "Member", email: "emily@example.com", status: "Pending", avatar: "👩‍🎨" },
  ];

  const roles = [
    { name: "Owner", permissions: ["Full access", "Manage billing", "Delete account"] },
    { name: "Manager", permissions: ["Manage team", "View analytics", "Approve tasks"] },
    { name: "Admin", permissions: ["Post tasks", "View reports", "Manage workers"] },
    { name: "Member", permissions: ["Post tasks", "View own tasks", "Basic analytics"] },
  ];

  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-indigo">// Team</p>
              <h1 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">Team Management</h1>
              <p className="mt-3 text-lg text-midnight/60">Manage your team members and permissions</p>
            </div>
            <button
              onClick={() => setShowInviteModal(true)}
              className="rounded-full bg-gradient-to-r from-indigo to-violet px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105"
            >
              + Invite Member
            </button>
          </div>
        </Reveal>

        {/* Team Members */}
        <Reveal delay={100}>
          <div className="rounded-3xl border-2 border-midnight/10 bg-white p-8 shadow-xl">
            <h2 className="font-display text-2xl font-bold">Team Members ({teamMembers.length})</h2>
            <div className="mt-6 space-y-3">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center gap-4 rounded-2xl border border-midnight/10 bg-cream p-5">
                  <span className="text-4xl">{member.avatar}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-display text-lg font-bold">{member.name}</p>
                      <span className={`rounded-full px-3 py-1 font-mono text-xs font-semibold ${
                        member.status === "Active" ? "bg-emerald/10 text-emerald" : "bg-amber/10 text-amber"
                      }`}>
                        {member.status}
                      </span>
                    </div>
                    <p className="font-mono text-sm text-midnight/60">{member.email}</p>
                    <p className="mt-1 font-mono text-xs text-midnight/40">Role: {member.role}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="rounded-full border border-midnight/20 px-4 py-2 font-mono text-xs font-semibold text-midnight hover:bg-mist">
                      Edit
                    </button>
                    {member.role !== "Owner" && (
                      <button className="rounded-full border border-rose/30 px-4 py-2 font-mono text-xs font-semibold text-rose hover:bg-rose/5">
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Roles & Permissions */}
        <Reveal delay={150}>
          <div className="mt-8 rounded-3xl border-2 border-midnight/10 bg-white p-8 shadow-xl">
            <h2 className="font-display text-2xl font-bold">Roles & Permissions</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {roles.map((role) => (
                <div key={role.name} className="rounded-2xl border-2 border-midnight/10 bg-cream p-6">
                  <h3 className="font-display text-xl font-bold">{role.name}</h3>
                  <ul className="mt-4 space-y-2">
                    {role.permissions.map((permission) => (
                      <li key={permission} className="flex items-center gap-2 text-sm text-midnight/70">
                        <IconCheck className="h-4 w-4 text-emerald" />
                        {permission}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Invite Modal */}
        {showInviteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/80 p-5">
            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
              <h2 className="font-display text-2xl font-bold">Invite Team Member</h2>
              <div className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="colleague@example.com"
                    className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-3 outline-none focus:border-indigo"
                  />
                </div>
                <div>
                  <label className="mb-2 block font-mono text-sm font-semibold uppercase tracking-[0.18em] text-midnight/60">
                    Role
                  </label>
                  <select className="w-full rounded-2xl border-2 border-midnight/20 bg-cream px-5 py-3 outline-none focus:border-indigo">
                    <option>Member</option>
                    <option>Admin</option>
                    <option>Manager</option>
                  </select>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowInviteModal(false)}
                    className="flex-1 rounded-2xl border-2 border-midnight/20 py-3 font-semibold text-midnight transition-all hover:bg-mist"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      showToast("Invitation sent!", "success");
                      setShowInviteModal(false);
                    }}
                    className="flex-1 rounded-2xl bg-gradient-to-r from-indigo to-violet py-3 font-semibold text-white shadow-lg transition-all hover:scale-105"
                  >
                    Send Invite
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ===== VIDEO CALL INTEGRATION =====
function VideoCallIntegration({ navigate, showToast }: { navigate: (v: View) => void; showToast: (message: string, type?: "success" | "error" | "info") => void }) {
  const [inCall, setInCall] = useState(false);

  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <Reveal>
          <div className="mb-8">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-indigo">// Video Calls</p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">Video Consultations</h1>
            <p className="mt-3 text-lg text-midnight/60">Connect with workers face-to-face before hiring</p>
          </div>
        </Reveal>

        {/* Call Interface */}
        <Reveal delay={100}>
          <div className="rounded-3xl border-2 border-midnight/10 bg-white p-8 shadow-xl">
            {inCall ? (
              <div className="space-y-6">
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-indigo to-violet">
                  <div className="absolute inset-0 flex items-center justify-center text-9xl">
                    👩
                  </div>
                  <div className="absolute bottom-4 left-4 rounded-full bg-midnight/50 px-4 py-2 text-sm text-white backdrop-blur-sm">
                    Yuki Tanaka
                  </div>
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <button
                      onClick={() => showToast("Microphone muted", "info")}
                      className="rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/30"
                    >
                      🎤
                    </button>
                    <button
                      onClick={() => showToast("Camera off", "info")}
                      className="rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/30"
                    >
                      📹
                    </button>
                    <button
                      onClick={() => {
                        setInCall(false);
                        showToast("Call ended", "info");
                      }}
                      className="rounded-full bg-rose p-3 text-white transition-all hover:bg-rose/80"
                    >
                      📞
                    </button>
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-mono text-sm text-midnight/60">Call duration: 2:34</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <span className="text-6xl">📹</span>
                  <h2 className="mt-4 font-display text-2xl font-bold">Start a Video Call</h2>
                  <p className="mt-2 text-midnight/60">Schedule or start an instant call with workers</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <button
                    onClick={() => {
                      setInCall(true);
                      showToast("Connecting to Yuki Tanaka...", "info");
                    }}
                    className="rounded-2xl bg-gradient-to-r from-indigo to-violet p-6 text-white shadow-lg transition-all hover:scale-105"
                  >
                    <span className="text-4xl">📞</span>
                    <p className="mt-3 font-semibold">Instant Call</p>
                    <p className="mt-1 text-sm text-white/70">Call available workers now</p>
                  </button>
                  <button
                    onClick={() => showToast("Schedule feature coming soon!", "info")}
                    className="rounded-2xl border-2 border-midnight/20 p-6 transition-all hover:bg-mist"
                  >
                    <span className="text-4xl">📅</span>
                    <p className="mt-3 font-semibold">Schedule Call</p>
                    <p className="mt-1 text-sm text-midnight/60">Book a time with workers</p>
                  </button>
                </div>
                <div className="rounded-2xl bg-cream p-6">
                  <h3 className="font-display text-lg font-bold">Recent Calls</h3>
                  <div className="mt-4 space-y-3">
                    {[
                      { worker: "Yuki Tanaka", date: "Dec 10, 2024", duration: "15 min" },
                      { worker: "Ahmed Hassan", date: "Dec 8, 2024", duration: "10 min" },
                    ].map((call, i) => (
                      <div key={i} className="flex items-center justify-between rounded-xl bg-white p-4">
                        <div>
                          <p className="font-semibold">{call.worker}</p>
                          <p className="font-mono text-xs text-midnight/50">{call.date} · {call.duration}</p>
                        </div>
                        <button className="rounded-full bg-indigo/10 px-4 py-2 font-mono text-xs font-semibold text-indigo">
                          Call Again
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ===== MULTI-LANGUAGE SUPPORT =====
function MultiLanguageSupport({ navigate, showToast }: { navigate: (v: View) => void; showToast: (message: string, type?: "success" | "error" | "info") => void }) {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸", native: "English" },
    { code: "bn", name: "Bengali", flag: "🇧🇩", native: "বাংলা" },
    { code: "ja", name: "Japanese", flag: "🇯🇵", native: "日本語" },
    { code: "es", name: "Spanish", flag: "🇪🇸", native: "Español" },
    { code: "fr", name: "French", flag: "🇫🇷", native: "Français" },
    { code: "de", name: "German", flag: "🇩🇪", native: "Deutsch" },
    { code: "zh", name: "Chinese", flag: "🇨🇳", native: "中文" },
    { code: "ar", name: "Arabic", flag: "🇸🇦", native: "العربية" },
    { code: "pt", name: "Portuguese", flag: "🇵🇹", native: "Português" },
    { code: "hi", name: "Hindi", flag: "🇮🇳", native: "हिन्दी" },
  ];

  const translations = {
    en: { welcome: "Welcome", getStarted: "Get Started", learnMore: "Learn More" },
    bn: { welcome: "স্বাগতম", getStarted: "শুরু করুন", learnMore: "আরও জানুন" },
    ja: { welcome: "ようこそ", getStarted: "始める", learnMore: "詳細" },
    es: { welcome: "Bienvenido", getStarted: "Comenzar", learnMore: "Más información" },
    fr: { welcome: "Bienvenue", getStarted: "Commencer", learnMore: "En savoir plus" },
    de: { welcome: "Willkommen", getStarted: "Loslegen", learnMore: "Mehr erfahren" },
    zh: { welcome: "欢迎", getStarted: "开始", learnMore: "了解更多" },
    ar: { welcome: "أهلاً", getStarted: "ابدأ", learnMore: "اعرف المزيد" },
    pt: { welcome: "Bem-vindo", getStarted: "Começar", learnMore: "Saiba mais" },
    hi: { welcome: "स्वागत", getStarted: "शुरू करें", learnMore: "और जानें" },
  };

  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <Reveal>
          <div className="mb-8">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-indigo">// Language</p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">
              {translations[currentLanguage as keyof typeof translations].welcome}
            </h1>
            <p className="mt-3 text-lg text-midnight/60">Choose your preferred language</p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="rounded-3xl border-2 border-midnight/10 bg-white p-8 shadow-xl">
            <h2 className="font-display text-2xl font-bold">Available Languages</h2>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setCurrentLanguage(lang.code);
                    showToast(`Language changed to ${lang.name}!`, "success");
                  }}
                  className={`flex items-center gap-4 rounded-2xl border-2 p-5 text-left transition-all hover:scale-[1.02] ${
                    currentLanguage === lang.code
                      ? "border-indigo bg-indigo/5"
                      : "border-midnight/10 bg-cream hover:border-indigo"
                  }`}
                >
                  <span className="text-4xl">{lang.flag}</span>
                  <div className="flex-1">
                    <p className="font-display text-lg font-bold">{lang.name}</p>
                    <p className="font-mono text-sm text-midnight/60">{lang.native}</p>
                  </div>
                  {currentLanguage === lang.code && (
                    <IconCheck className="h-6 w-6 text-indigo" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Preview */}
        <Reveal delay={150}>
          <div className="mt-8 rounded-3xl bg-gradient-to-r from-indigo via-violet to-amber p-8 text-white shadow-2xl">
            <h2 className="font-display text-2xl font-bold">Preview</h2>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                <p className="font-mono text-sm text-white/70">Welcome Message</p>
                <p className="mt-2 font-display text-2xl font-bold">
                  {translations[currentLanguage as keyof typeof translations].welcome}
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                  <p className="font-mono text-sm text-white/70">Button 1</p>
                  <p className="mt-2 font-semibold">
                    {translations[currentLanguage as keyof typeof translations].getStarted}
                  </p>
                </div>
                <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                  <p className="font-mono text-sm text-white/70">Button 2</p>
                  <p className="mt-2 font-semibold">
                    {translations[currentLanguage as keyof typeof translations].learnMore}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ===== REVENUE FORECASTING =====
function RevenueForecasting({ navigate }: { navigate: (v: View) => void }) {
  const currentRevenue = 285400;
  const forecastedRevenue = 425000;
  const growth = 48.9;

  const monthlyData = [
    { month: "Jul", actual: 180000, forecast: 195000 },
    { month: "Aug", actual: 220000, forecast: 235000 },
    { month: "Sep", actual: 195000, forecast: 210000 },
    { month: "Oct", actual: 280000, forecast: 295000 },
    { month: "Nov", actual: 245000, forecast: 260000 },
    { month: "Dec", actual: 285400, forecast: 300000 },
    { month: "Jan", actual: null, forecast: 320000 },
    { month: "Feb", actual: null, forecast: 345000 },
    { month: "Mar", actual: null, forecast: 380000 },
    { month: "Apr", actual: null, forecast: 410000 },
    { month: "May", actual: null, forecast: 425000 },
  ];

  const insights = [
    { title: "Strong Growth", desc: "Revenue increased 48.9% compared to last quarter", icon: "📈", color: "text-emerald" },
    { title: "Seasonal Peak", desc: "Expect 25% increase during holiday season", icon: "🎄", color: "text-amber" },
    { title: "New Markets", desc: "Expansion to 3 new cities could add ¥150k/month", icon: "🌍", color: "text-indigo" },
  ];

  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="mb-8">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-indigo">// Forecasting</p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">Revenue Forecasting</h1>
            <p className="mt-3 text-lg text-midnight/60">AI-powered predictions and insights</p>
          </div>
        </Reveal>

        {/* Key Metrics */}
        <Reveal delay={100}>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border-2 border-midnight/10 bg-white p-6 shadow-xl">
              <p className="font-mono text-sm text-midnight/60">Current Revenue</p>
              <p className="mt-2 font-display text-4xl font-black">¥{currentRevenue.toLocaleString()}</p>
              <p className="mt-2 font-mono text-sm text-midnight/50">This month</p>
            </div>
            <div className="rounded-3xl border-2 border-emerald/30 bg-emerald/5 p-6 shadow-xl">
              <p className="font-mono text-sm text-midnight/60">Forecasted (5 months)</p>
              <p className="mt-2 font-display text-4xl font-black text-emerald">¥{forecastedRevenue.toLocaleString()}</p>
              <p className="mt-2 font-mono text-sm text-emerald">+{growth}% growth</p>
            </div>
            <div className="rounded-3xl border-2 border-indigo/30 bg-indigo/5 p-6 shadow-xl">
              <p className="font-mono text-sm text-midnight/60">Confidence Level</p>
              <p className="mt-2 font-display text-4xl font-black text-indigo">87%</p>
              <p className="mt-2 font-mono text-sm text-midnight/50">AI prediction accuracy</p>
            </div>
          </div>
        </Reveal>

        {/* Chart */}
        <Reveal delay={150}>
          <div className="mt-8 rounded-3xl border-2 border-midnight/10 bg-white p-8 shadow-xl">
            <h2 className="font-display text-2xl font-bold">Revenue Trend & Forecast</h2>
            <div className="mt-6 flex h-64 items-end justify-between gap-2">
              {monthlyData.map((data, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex w-full flex-col gap-1" style={{ height: "100%" }}>
                    {data.actual && (
                      <div
                        className="flex-1 rounded-t-lg bg-gradient-to-t from-indigo to-violet"
                        style={{ height: `${(data.actual / 450000) * 100}%` }}
                      />
                    )}
                    {data.forecast && (
                      <div
                        className={`flex-1 rounded-t-lg ${data.actual ? "bg-gradient-to-t from-amber/50 to-amber/30" : "bg-gradient-to-t from-amber to-amber/70"}`}
                        style={{ height: `${(data.forecast / 450000) * 100}%` }}
                      />
                    )}
                  </div>
                  <span className="font-mono text-xs text-midnight/40">{data.month}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-gradient-to-r from-indigo to-violet" />
                <span className="font-mono text-sm text-midnight/60">Actual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-gradient-to-r from-amber to-amber/70" />
                <span className="font-mono text-sm text-midnight/60">Forecast</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Insights */}
        <Reveal delay={200}>
          <div className="mt-8 rounded-3xl border-2 border-midnight/10 bg-white p-8 shadow-xl">
            <h2 className="font-display text-2xl font-bold">AI Insights</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {insights.map((insight) => (
                <div key={insight.title} className="rounded-2xl border-2 border-midnight/10 bg-cream p-6">
                  <span className="text-4xl">{insight.icon}</span>
                  <h3 className={`mt-4 font-display text-lg font-bold ${insight.color}`}>{insight.title}</h3>
                  <p className="mt-2 text-sm text-midnight/70">{insight.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ===== MARKET TRENDS =====
function MarketTrends({ navigate }: { navigate: (v: View) => void }) {
  const trends = [
    { category: "Cleaning", demand: "+35%", avgRate: "¥2,200/hr", topSkills: ["Deep Cleaning", "Eco-friendly"], color: "from-indigo to-violet" },
    { category: "Plumbing", demand: "+28%", avgRate: "¥3,500/hr", topSkills: ["Pipe Repair", "Installation"], color: "from-violet to-amber" },
    { category: "Moving", demand: "+42%", avgRate: "¥2,800/hr", topSkills: ["Packing", "Heavy Lifting"], color: "from-amber to-emerald" },
    { category: "Caregiving", demand: "+55%", avgRate: "¥2,500/hr", topSkills: ["Elderly Care", "First Aid"], color: "from-emerald to-indigo" },
  ];

  const hotSkills = [
    { skill: "Deep Cleaning", demand: 95, growth: "+45%" },
    { skill: "Elderly Care", demand: 88, growth: "+52%" },
    { skill: "Eco-friendly Cleaning", demand: 82, growth: "+38%" },
    { skill: "Mobile Repair", demand: 78, growth: "+35%" },
    { skill: "Pet Care", demand: 75, growth: "+42%" },
  ];

  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="mb-8">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-indigo">// Market Trends</p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">Market Intelligence</h1>
            <p className="mt-3 text-lg text-midnight/60">Stay ahead with real-time market data</p>
          </div>
        </Reveal>

        {/* Category Trends */}
        <Reveal delay={100}>
          <div className="rounded-3xl border-2 border-midnight/10 bg-white p-8 shadow-xl">
            <h2 className="font-display text-2xl font-bold">Category Trends</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {trends.map((trend) => (
                <div key={trend.category} className="rounded-2xl border-2 border-midnight/10 bg-cream p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-xl font-bold">{trend.category}</h3>
                      <p className="mt-1 font-mono text-sm text-midnight/60">Avg: {trend.avgRate}</p>
                    </div>
                    <span className="rounded-full bg-emerald/10 px-3 py-1 font-mono text-xs font-semibold text-emerald">
                      {trend.demand}
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-midnight/60">Top Skills</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {trend.topSkills.map((skill) => (
                        <span key={skill} className="rounded-full bg-indigo/10 px-3 py-1 font-mono text-xs font-semibold text-indigo">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Hot Skills */}
        <Reveal delay={150}>
          <div className="mt-8 rounded-3xl border-2 border-midnight/10 bg-white p-8 shadow-xl">
            <h2 className="font-display text-2xl font-bold">🔥 Hot Skills</h2>
            <div className="mt-6 space-y-4">
              {hotSkills.map((skill, i) => (
                <div key={skill.skill} className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo to-violet font-bold text-white">
                    #{i + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{skill.skill}</p>
                      <span className="rounded-full bg-emerald/10 px-3 py-1 font-mono text-xs font-semibold text-emerald">
                        {skill.growth}
                      </span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-mist">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo to-violet"
                        style={{ width: `${skill.demand}%` }}
                      />
                    </div>
                    <p className="mt-1 font-mono text-xs text-midnight/50">Demand Score: {skill.demand}/100</p>
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

// ===== CUSTOMER INSIGHTS =====
function CustomerInsights({ navigate }: { navigate: (v: View) => void }) {
  const demographics = [
    { segment: "Young Professionals", percentage: 35, age: "25-34", icon: "💼" },
    { segment: "Families", percentage: 28, age: "35-44", icon: "👨‍👩‍👧" },
    { segment: "Seniors", percentage: 22, age: "55+", icon: "👴" },
    { segment: "Students", percentage: 15, age: "18-24", icon: "🎓" },
  ];

  const behavior = [
    { metric: "Avg. Tasks/Month", value: "3.2", change: "+12%", icon: "📊" },
    { metric: "Avg. Spend/Task", value: "¥18,500", change: "+8%", icon: "💰" },
    { metric: "Repeat Rate", value: "68%", change: "+15%", icon: "🔄" },
    { metric: "Satisfaction", value: "4.8/5", change: "+0.2", icon: "⭐" },
  ];

  const preferences = [
    { preference: "Same-day service", percentage: 72 },
    { preference: "Verified workers only", percentage: 89 },
    { preference: "Mobile booking", percentage: 85 },
    { preference: "Video consultation", percentage: 45 },
    { preference: "Eco-friendly options", percentage: 58 },
  ];

  return (
    <section className="relative bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="mb-8">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-indigo">// Insights</p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">Customer Insights</h1>
            <p className="mt-3 text-lg text-midnight/60">Understand your customers better</p>
          </div>
        </Reveal>

        {/* Demographics */}
        <Reveal delay={100}>
          <div className="rounded-3xl border-2 border-midnight/10 bg-white p-8 shadow-xl">
            <h2 className="font-display text-2xl font-bold">Customer Demographics</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {demographics.map((demo) => (
                <div key={demo.segment} className="rounded-2xl border-2 border-midnight/10 bg-cream p-6 text-center">
                  <span className="text-5xl">{demo.icon}</span>
                  <p className="mt-4 font-display text-3xl font-black">{demo.percentage}%</p>
                  <p className="mt-2 font-semibold">{demo.segment}</p>
                  <p className="mt-1 font-mono text-xs text-midnight/60">Age: {demo.age}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Behavior Metrics */}
        <Reveal delay={150}>
          <div className="mt-8 rounded-3xl border-2 border-midnight/10 bg-white p-8 shadow-xl">
            <h2 className="font-display text-2xl font-bold">Behavior Metrics</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {behavior.map((metric) => (
                <div key={metric.metric} className="rounded-2xl border-2 border-midnight/10 bg-cream p-6">
                  <span className="text-4xl">{metric.icon}</span>
                  <p className="mt-4 font-display text-3xl font-black">{metric.value}</p>
                  <p className="mt-2 font-semibold">{metric.metric}</p>
                  <p className="mt-1 font-mono text-xs text-emerald">{metric.change}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Preferences */}
        <Reveal delay={200}>
          <div className="mt-8 rounded-3xl border-2 border-midnight/10 bg-white p-8 shadow-xl">
            <h2 className="font-display text-2xl font-bold">Customer Preferences</h2>
            <div className="mt-6 space-y-4">
              {preferences.map((pref) => (
                <div key={pref.preference}>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{pref.preference}</p>
                    <span className="font-mono text-sm font-bold text-indigo">{pref.percentage}%</span>
                  </div>
                  <div className="mt-2 h-3 overflow-hidden rounded-full bg-mist">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo to-violet"
                      style={{ width: `${pref.percentage}%` }}
                    />
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
