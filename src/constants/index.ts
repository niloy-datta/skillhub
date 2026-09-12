import type { NavItem } from "../types";

// ===== NAVIGATION CONSTANTS =====

export const NAV_ITEMS: NavItem[] = [
  { label: "Get Help", view: "get-help", icon: "🛠️" },
  { label: "Hire People", view: "hire-people", icon: "🏢" },
  { label: "Find Workers", view: "find-workers", icon: "👥" },
  { label: "Post Task", view: "post-task", icon: "📝" },
  { label: "Post Job", view: "post-job", icon: "💼" },
  { label: "Business Workspace", view: "business-workspace", icon: "📊" },
  { label: "My Profile", view: "my-profile", icon: "👤" },
  { label: "Messages", view: "messages", icon: "💬" },
  { label: "Notifications", view: "notifications", icon: "🔔" },
  { label: "Analytics", view: "analytics", icon: "📈" },
  { label: "Coupons", view: "coupons", icon: "🎫" },
  { label: "Loyalty", view: "loyalty", icon: "🏆" },
  { label: "Leaderboard", view: "leaderboard", icon: "🥇" },
  { label: "Team", view: "team", icon: "👥" },
  { label: "Video Call", view: "video-call", icon: "📹" },
  { label: "Language", view: "language", icon: "🌍" },
  { label: "Market Trends", view: "trends", icon: "📊" },
  { label: "Insights", view: "insights", icon: "💡" },
];

// ===== WORKER SKILLS =====

export const WORKER_SKILLS = [
  "House Cleaning",
  "Deep Cleaning",
  "Plumbing",
  "Electrical",
  "Painting",
  "Carpentry",
  "Moving",
  "Packing",
  "Gardening",
  "Cooking",
  "Caregiving",
  "Elderly Care",
  "Child Care",
  "Warehouse",
  "Forklift",
  "Kitchen",
  "Serving",
  "Housekeeping",
  "Laundry",
  "Security",
  "Driving",
  "Delivery",
  "Construction",
  "Masonry",
  "Welding",
  "Repair",
] as const;

// ===== TASK CATEGORIES =====

export const TASK_CATEGORIES = [
  "Cleaning",
  "Plumbing",
  "Moving",
  "Painting",
  "Gardening",
  "Repair",
  "Caregiving",
  "Household Help",
  "Electrical",
  "Appliance Repair",
  "Cooking",
  "Laundry",
] as const;

// ===== LANGUAGES =====

export const LANGUAGES = [
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
] as const;

// ===== TICKER ITEMS =====

export const TICKER_ITEMS = [
  "Rahim in Gazipur just got hired — Warehouse Loader",
  "Yuki completed 389 jobs — 5.0 rating",
  "Shinjuku Grand Hotel posted 8 new roles",
  "Al Fardan needs 15 loaders tomorrow",
  "Café Central paying cash same-day",
  "24 verified workers available in Tokyo now",
  "Priya in Mumbai — Caregiver, 4.9★",
  "Portside Logistics — 56 shifts this week",
];

// ===== SOCIAL PLATFORMS =====

export const SOCIAL_PLATFORMS = [
  { name: "Facebook", icon: "📘", color: "from-blue-600 to-blue-700" },
  { name: "Twitter", icon: "🐦", color: "from-sky-400 to-sky-500" },
  { name: "LinkedIn", icon: "💼", color: "from-blue-700 to-blue-800" },
  { name: "WhatsApp", icon: "💬", color: "from-green-500 to-green-600" },
  { name: "Telegram", icon: "✈️", color: "from-blue-400 to-blue-500" },
  { name: "Email", icon: "📧", color: "from-red-500 to-red-600" },
];

// ===== LOYALTY TIERS =====

export const LOYALTY_TIERS = [
  {
    name: "Bronze",
    points: 0,
    benefits: ["Basic support", "Standard fees"],
    color: "from-amber-700 to-amber-800",
  },
  {
    name: "Silver",
    points: 1000,
    benefits: ["Priority support", "5% fee discount", "Early access"],
    color: "from-gray-400 to-gray-500",
  },
  {
    name: "Gold",
    points: 2000,
    benefits: ["VIP support", "10% fee discount", "Exclusive features", "Free referrals"],
    color: "from-amber-400 to-amber-500",
  },
  {
    name: "Platinum",
    points: 3000,
    benefits: [
      "24/7 dedicated support",
      "15% fee discount",
      "All Gold benefits",
      "Custom solutions",
    ],
    color: "from-indigo to-violet",
  },
];

// ===== VERIFICATION STEPS =====

export const VERIFICATION_STEPS = [
  { num: 1, title: "Identity", icon: "🆔" },
  { num: 2, title: "Contact", icon: "📱" },
  { num: 3, title: "Skills", icon: "🛠️" },
  { num: 4, title: "Review", icon: "✓" },
];

// ===== PROFILE TABS =====

export const PROFILE_TABS = [
  { id: "overview" as const, label: "Overview", icon: "📊" },
  { id: "tasks" as const, label: "My Tasks", icon: "📝" },
  { id: "jobs" as const, label: "My Jobs", icon: "💼" },
  { id: "reviews" as const, label: "Reviews", icon: "⭐" },
  { id: "settings" as const, label: "Settings", icon: "⚙️" },
];

// ===== PAYMENT TABS =====

export const PAYMENT_TABS = [
  { id: "overview" as const, label: "Overview", icon: "📊" },
  { id: "transactions" as const, label: "Transactions", icon: "💳" },
  { id: "methods" as const, label: "Payment Methods", icon: "🏦" },
  { id: "invoices" as const, label: "Invoices", icon: "📄" },
];

// ===== WORKSPACE TABS =====

export const WORKSPACE_TABS = [
  { id: "open" as const, label: "Open Work", count: 3 },
  { id: "applicants" as const, label: "Applicants", count: 12 },
  { id: "shifts" as const, label: "Upcoming Shifts", count: 5 },
  { id: "workers" as const, label: "Workers", count: 28 },
  { id: "trusted" as const, label: "Trusted Workers", count: 8 },
  { id: "crews" as const, label: "Crews", count: 2 },
];

// ===== JOB POSTING TABS =====

export const JOB_POSTING_TABS = [
  { id: "job" as const, label: "Regular Job", icon: "💼" },
  { id: "shift" as const, label: "Single Shift", icon: "📅" },
  { id: "crew" as const, label: "Build Crew", icon: "👥" },
];

// ===== NOTIFICATION FILTERS =====

export const NOTIFICATION_FILTERS = [
  { id: "all" as const, label: "All" },
  { id: "unread" as const, label: "Unread" },
  { id: "tasks" as const, label: "Tasks" },
  { id: "jobs" as const, label: "Jobs" },
];

// ===== DISPUTE TABS =====

export const DISPUTE_TABS = [
  { id: "open" as const, label: "Open Disputes" },
  { id: "resolved" as const, label: "Resolved" },
  { id: "new" as const, label: "File New Dispute" },
];

// ===== LEADERBOARD TIMEFRAMES =====

export const LEADERBOARD_TIMEFRAMES = [
  { id: "week" as const, label: "This Week" },
  { id: "month" as const, label: "This Month" },
  { id: "all" as const, label: "All Time" },
];

// ===== TRANSLATIONS =====

export const TRANSLATIONS = {
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
} as const;
