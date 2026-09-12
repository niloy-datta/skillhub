// ===== NAVIGATION =====

export const NAV_ITEMS = [
  { label: 'Find Work', path: '/find-work', icon: '🔍' },
  { label: 'Hire Talent', path: '/hire-talent', icon: '👥' },
  { label: 'Post Work', path: '/post-work', icon: '📝' },
  { label: 'Messages', path: '/messages', icon: '💬' },
  { label: 'Dashboard', path: '/dashboard', icon: '📊' },
];

// ===== WORKER SKILLS =====

export const WORKER_SKILLS = [
  'Cleaning', 'Plumbing', 'Moving', 'Painting', 'Gardening',
  'Electrical', 'Cooking', 'Caregiving', 'Housekeeping', 'Driving',
] as const;

// ===== TASK CATEGORIES =====

export const TASK_CATEGORIES = [
  'Cleaning', 'Plumbing', 'Moving', 'Painting', 'Gardening',
  'Electrical', 'Cooking', 'Caregiving', 'Housekeeping', 'Laundry',
] as const;

// ===== LANGUAGES =====

export const LANGUAGES = [
  'English', 'Spanish', 'French', 'German', 'Portuguese',
  'Japanese', 'Chinese', 'Arabic', 'Hindi', 'Bengali',
] as const;
