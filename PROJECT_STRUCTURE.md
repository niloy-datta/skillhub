# 🏗️ Skillhub - সুপার মেইনটেইনেবল প্রজেক্ট স্ট্রাকচার

এই ডকুমেন্টেশন প্রজেক্টের ফাইল স্ট্রাকচার এবং আর্কিটেকচার ব্যাখ্যা করে।

## 📂 ফোল্ডার স্ট্রাকচার

```
src/
├── types/              # TypeScript type definitions
│   └── index.ts       # সব types এবং interfaces
│
├── constants/          # Static data এবং constants
│   └── index.ts       # Navigation items, skills, categories, etc.
│
├── data/              # Sample data এবং mock API responses
│   └── index.ts       # Workers, companies, tasks, jobs
│
├── utils/             # Utility functions
│   └── index.ts       # formatAgo, calculateAverage, debounce, etc.
│
├── hooks/             # Custom React hooks
│   └── index.tsx      # useLocalStorage, useDebounce, useMediaQuery, etc.
│
├── components/        # React components (ভবিষ্যতে তৈরি হবে)
│   ├── layout/        # Layout components (Nav, Footer, etc.)
│   ├── common/        # Reusable UI components
│   ├── home/          # Home page components
│   ├── individual/    # Individual flow components
│   ├── business/      # Business flow components
│   ├── workers/       # Worker-related components
│   ├── companies/     # Company-related components
│   ├── account/       # Account management components
│   ├── finance/       # Payment & finance components
│   ├── trust/         # Trust & safety components
│   ├── engagement/    # Gamification components
│   ├── business-tools/ # Business tools components
│   └── intelligence/  # Analytics & insights components
│
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## 🎯 আর্কিটেকচার প্রিন্সিপলস

### 1. **Separation of Concerns**
- **Types**: শুধুমাত্র type definitions
- **Constants**: Static data যা change হয় না
- **Data**: Sample data এবং mock responses
- **Utils**: Pure functions যেগুলো stateless
- **Hooks**: Reusable logic with state
- **Components**: UI rendering

### 2. **Single Responsibility**
প্রতিটি ফাইলের একটি নির্দিষ্ট দায়িত্ব আছে:
- `types/index.ts` → শুধুমাত্র types
- `utils/index.ts` → শুধুমাত্র utility functions
- `hooks/index.tsx` → শুধুমাত্র custom hooks

### 3. **Reusability**
- Constants গুলো multiple জায়গায় ব্যবহার করা যায়
- Utils functions pure এবং testable
- Hooks গুলো different components এ reuse করা যায়

### 4. **Type Safety**
- সব data এবং props typed
- TypeScript strict mode enabled
- No `any` types allowed

## 📋 ফাইল বিবরণ

### `src/types/index.ts`
সব TypeScript type definitions এই ফাইলে আছে:
- `View` - সব page routes
- `Worker`, `Company`, `Task`, `BusinessJob` - Data models
- Component prop types
- Enum types

**ব্যবহার:**
```typescript
import type { Worker, View } from "../types";
```

### `src/constants/index.ts`
Static data এবং configuration:
- Navigation items
- Worker skills
- Task categories
- Languages
- UI configurations

**ব্যবহার:**
```typescript
import { NAV_ITEMS, WORKER_SKILLS } from "../constants";
```

### `src/data/index.ts`
Sample data এবং mock API responses:
- Sample workers
- Sample companies
- Sample tasks
- Sample business jobs
- Sample reviews

**ব্যবহার:**
```typescript
import { WORKERS, COMPANIES, SAMPLE_TASKS } from "../data";
```

### `src/utils/index.ts`
Pure utility functions:
- `formatAgo()` - Time formatting
- `formatCurrency()` - Currency formatting
- `calculateAverageRating()` - Math calculations
- `debounce()` - Performance optimization
- `throttle()` - Performance optimization
- `copyToClipboard()` - Clipboard operations
- `scrollToTop()` - Navigation
- `isMobile()` - Device detection
- `formatDate()`, `formatTime()` - Date/time formatting
- `calculatePercentage()` - Math calculations
- `getRandomItem()`, `shuffleArray()` - Array operations
- `groupBy()`, `unique()`, `sortBy()` - Array utilities
- `isEmpty()` - Validation
- `parseQueryString()`, `buildQueryString()` - URL operations

**ব্যবহার:**
```typescript
import { formatAgo, debounce, copyToClipboard } from "../utils";
```

### `src/hooks/index.tsx`
Custom React hooks:
- `usePrefersReducedMotion()` - Accessibility
- `Reveal` - Scroll animation component
- `useCountUp()` - Number animation
- `useScramble()` - Text animation
- `useLocalStorage()` - Persistent state
- `useDebounce()` - Input debouncing
- `useMediaQuery()` - Responsive design
- `useClickOutside()` - Click detection
- `useIntersectionObserver()` - Visibility detection
- `usePrevious()` - Previous value tracking
- `useToggle()` - Boolean toggle
- `useWindowSize()` - Window dimensions

**ব্যবহার:**
```typescript
import { Reveal, useLocalStorage, useDebounce } from "../hooks";
```

## 🚀 Benefits of This Structure

### 1. **Maintainability**
- কোড খুঁজে পাওয়া সহজ
- প্রতিটি ফাইলের size ছোট
- Clear separation of concerns

### 2. **Scalability**
- নতুন features add করা সহজ
- Team collaboration সহজ
- Code review সহজ

### 3. **Testability**
- Pure functions test করা সহজ
- Components isolate করা সহজ
- Mock data আলাদা

### 4. **Performance**
- Tree shaking effective
- Bundle size optimized
- Lazy loading ready

### 5. **Developer Experience**
- IntelliSense works better
- Imports are clear
- Documentation is inline

## 📝 Best Practices

### 1. **Imports**
```typescript
// ✅ Good - Specific imports
import { Worker, formatAgo } from "../types";

// ❌ Bad - Importing everything
import * as types from "../types";
```

### 2. **File Naming**
```typescript
// ✅ Good - Descriptive names
formatCurrency.ts
useLocalStorage.tsx

// ❌ Bad - Generic names
utils.ts
helpers.ts
```

### 3. **Component Organization**
```typescript
// ✅ Good - One component per file
// WorkerCard.tsx
export function WorkerCard() { ... }

// ❌ Bad - Multiple components in one file
// Components.tsx
export function WorkerCard() { ... }
export function CompanyCard() { ... }
export function TaskCard() { ... }
```

### 4. **Type Definitions**
```typescript
// ✅ Good - Explicit types
interface Worker {
  id: string;
  name: string;
  rating: number;
}

// ❌ Bad - Implicit any
function process(data: any) { ... }
```

## 🔄 Migration Guide

যদি আপনি পুরানো structure থেকে migrate করতে চান:

### Step 1: Types Move করুন
```typescript
// Old: App.tsx
type View = "home" | "get-help" | ...

// New: types/index.ts
export type View = "home" | "get-help" | ...
```

### Step 2: Constants Move করুন
```typescript
// Old: App.tsx
const NAV_ITEMS = [...]

// New: constants/index.ts
export const NAV_ITEMS = [...]
```

### Step 3: Data Move করুন
```typescript
// Old: App.tsx
const WORKERS = [...]

// New: data/index.ts
export const WORKERS = [...]
```

### Step 4: Utils Extract করুন
```typescript
// Old: App.tsx
function formatAgo(hours: number) { ... }

// New: utils/index.ts
export function formatAgo(hours: number) { ... }
```

### Step 5: Hooks Extract করুন
```typescript
// Old: App.tsx
function useLocalStorage<T>(...) { ... }

// New: hooks/index.tsx
export function useLocalStorage<T>(...) { ... }
```

## 📊 Current Status

✅ **Completed:**
- Types separated
- Constants separated
- Data separated
- Utils separated
- Hooks separated
- Documentation created

🔄 **Next Steps:**
- Components আলাদা ফাইলে move করা
- App.tsx কে slim করা
- Component-level testing setup
- Storybook integration

## 🎯 Future Improvements

1. **Component Library**
   - Atomic design pattern
   - Storybook documentation
   - Visual regression testing

2. **State Management**
   - Context API for global state
   - React Query for server state
   - Zustand for complex state

3. **Testing**
   - Unit tests for utils
   - Integration tests for hooks
   - E2E tests for flows

4. **Performance**
   - Code splitting
   - Lazy loading
   - Image optimization

5. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support

---

**এই structure অনুসরণ করলে প্রজেক্ট সুপার মেইনটেইনেবল এবং scalable হবে!** 🚀
