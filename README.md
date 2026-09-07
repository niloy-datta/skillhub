# Skillhub — The Two-Sided Hiring Platform

A modern, professional hiring platform for both individuals and businesses. Built with React, TypeScript, and Tailwind CSS. Features task posting for individuals and job/shift/crew posting for businesses.

## ✨ Two-Sided Platform

### 🛠️ For Individuals — "Get Help"
Post tasks and get matched with verified workers nearby.

**Task Categories:**
- Cleaning (house cleaning, deep cleaning)
- Plumbing
- Moving & Packing
- Painting
- Gardening
- Repair (general, appliance)
- Caregiving (elderly, child care)
- Household Help
- Electrical
- Cooking
- Laundry

**Individual Flow:**
1. **Post a Task** — Describe what you need, when, budget, location
2. **Get Matched** — See verified workers nearby with ratings and rates
3. **Receive Offers** — Workers send offers, you choose the best fit
4. **Invite Workers** — Or directly invite workers you like

**Example Task:**
> "I need someone to clean my apartment tomorrow. 2-bedroom, deep clean. Budget: ¥18,000. Shinjuku, Tokyo."

→ Matched with 7 workers nearby, all with 4.5+ ratings

---

### 🏢 For Businesses — "Hire People"
Post jobs, shifts, or build crews for your business.

**Business Types:**
- Restaurants & Cafés
- Hotels & Hospitality
- Warehouses & Logistics
- Retail Stores
- Factories & Manufacturing
- Cleaning Companies
- Construction Companies
- Care Providers

**Three Posting Options:**

#### 1. Regular Job
Ongoing position with regular schedule.
- Role, location, monthly/hourly pay
- Schedule (full-time, part-time, contract)
- Requirements, experience, languages
- Number of positions

#### 2. Single Shift
One-time shift for a specific date/time.
- Role, location, date, start/end time
- Number of workers needed
- Hourly rate, estimated total pay
- Uniform, meal, transport provided

#### 3. Build Crew
Need multiple workers for a day?
- Example: "Need 15 warehouse workers, tomorrow, 08:00–17:00, Dhaka"
- Display: Workers required / Matched nearby / Verified available / Backup workers
- One-click crew building

**Business Flow:**
1. **Post Job/Shift/Crew** — Fill simple form
2. **Receive Applications** — Workers apply with profiles
3. **Review & Invite** — See ratings, skills, availability
4. **Hire** — Confirm workers, manage shifts

---

## 🌍 Realistic Worldwide Examples

### Workers (12 verified workers)
- **Rahim Uddin** — Gazipur, Bangladesh (Warehouse, Forklift) — ৳280/h
- **Yuki Tanaka** — Shinjuku, Tokyo (Housekeeping, Cooking) — ¥2,200/h
- **Ahmed Hassan** — Deira, Dubai (Construction, Electrical) — AED 45/h
- **Maria Silva** — Alfama, Lisbon (Cooking, Cleaning) — €12/h
- **Priya Sharma** — Andheri, Mumbai (Caregiving, Elderly Care) — ₹350/h
- **João Santos** — São Paulo, Brazil (Driving, Moving) — R$35/h
- **Fatima Al-Zahra** — Maadi, Cairo (Deep Cleaning) — EGP 120/h
- **Chen Wei** — Little India, Singapore (Cooking, Kitchen) — S$22/h
- **Kwame Asante** — Osu, Accra, Ghana (Plumbing, Electrical) — GHS 65/h
- **Sofia Rossi** — Trastevere, Rome (Cooking, Cleaning) — €18/h
- **Arjun Patel** — Ahmedabad, India (Gardening) — ₹250/h
- **Linh Nguyen** — District 1, Ho Chi Minh (Cleaning, Cooking) — ₫85,000/h

### Companies (8 verified employers)
- **Shinjuku Grand Hotel** — Tokyo, Japan (Hospitality) — 4.8★ worker rating
- **Al Fardan Warehouse** — Jebel Ali, Dubai (Logistics) — 4.6★
- **Café Central** — Chiado, Lisbon (Restaurant) — 4.9★
- **GreenLeaf Restaurant** — Sukhumvit, Bangkok (Restaurant) — 4.7★
- **Portside Logistics** — Rotterdam, Netherlands (Logistics) — 4.5★
- **Bella Cucina** — Trastevere, Rome (Restaurant) — 4.8★
- **CareFirst Home Services** — Didsbury, Manchester (Care) — 4.6★
- **BuildPro Construction** — Vila Olímpia, São Paulo (Construction) — 4.4★

### Sample Tasks (6 individual tasks)
- Deep clean 2-bedroom apartment — Tokyo, ¥18,000
- Fix leaking kitchen tap — Lisbon, €45
- Help moving to new flat — São Paulo, R$280
- Paint living room walls — Manchester, £120
- Elderly care - 3 day shift — Mumbai, ₹4,500
- Garden cleanup and mowing — Rotterdam, €95

---

## 🎨 Features

### Premium Design
- **Modern dark hero** with gradient overlays and animated elements
- **Glassmorphic UI** with backdrop blur and subtle transparency
- **Animated gradients** (indigo → violet → amber) throughout
- **Professional typography** with Inter font family
- **Premium shadows** and smooth hover effects
- **Scroll reveals** and micro-interactions

### Individual Features
- Task posting with full details (category, description, location, date, time, budget, duration, workers needed, photos, special requirements)
- Matched workers display with ratings, skills, availability
- Worker profiles with verified badges, completed work, response time
- Invite, message, save workers
- Real-time notifications (simulated)

### Business Features
- Three posting types: Regular Job, Single Shift, Build Crew
- Business workspace with tabs:
  - **Open Work** — Active jobs and shifts
  - **Applicants** — Worker applications with quick actions
  - **Upcoming Shifts** — Scheduled shifts with details
  - **Workers** — All workers who've worked for you
  - **Trusted Workers** — Verified, reliable workers
  - **Crews** — Built crews with stats (required/matched/verified/backup)
- Company profiles with worker reviews
- Review dimensions: Payment reliability, Job accuracy, Work environment, Communication, Safety
- Verified work badges on reviews
- Community comments on reviews

### Worker Discovery
- Advanced filters: skills, languages, availability, rating, location
- Worker cards with:
  - Available now indicator
  - Distance from location
  - Skills with verified badges
  - Rating and completed work
  - Expected hourly rate
  - Quick actions: Invite, Message, Save

### Company Profiles
- Business verification badge
- Industry, locations, active jobs/shifts
- Worker rating (overall)
- Detailed ratings: Payment reliability, Job accuracy, Work environment, Communication, Safety
- Response rate, repeat worker rate
- Worker reviews with verified work badges
- Active positions listing

---

## 💰 Multi-Currency Support

All salaries and rates shown in local currencies:
- ৳ BDT (Bangladeshi Taka)
- ¥ JPY (Japanese Yen)
- AED (UAE Dirham)
- € EUR (Euro)
- ₹ INR (Indian Rupee)
- R$ BRL (Brazilian Real)
- EGP (Egyptian Pound)
- S$ SGD (Singapore Dollar)
- GHS (Ghanaian Cedi)
- £ GBP (British Pound)
- ₫ VND (Vietnamese Dong)

---

## 🎯 Key Pages

1. **Home** — Landing with two CTAs: "Get Help" and "Hire People"
2. **Get Help** — Individual task posting and browsing
3. **Post Task** — Full task creation form
4. **Task Detail** — Task info + matched workers sidebar
5. **Hire People** — Business hub with company listings
6. **Post Job** — Three-tab form (Regular/Shift/Crew)
7. **Find Workers** — Worker discovery with filters
8. **Worker Profile** — Full worker details
9. **Company Profile** — Business info + worker reviews
10. **Business Workspace** — Management dashboard with 6 tabs

---

## 🚀 Tech Stack

- **React 18** — UI framework
- **TypeScript** — Type safety
- **Tailwind CSS v4** — Utility-first styling
- **Vite** — Build tool
- **Custom hooks** — Scroll reveal, count-up, text scramble

---

## 📦 Installation

```bash
npm install
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

---

## 🎭 Animations

All animations respect `prefers-reduced-motion`:
- Scroll reveals with staggered delays
- Text scramble decode effect
- Card entrance animations
- Hover scale and glow effects
- Marquee ticker
- Pulse dots for live indicators

---

## 🌟 Key Differentiators

### For Individuals
- ✅ Verified workers only
- ✅ Real ratings and reviews
- ✅ Transparent pricing
- ✅ Quick matching
- ✅ No agent fees

### For Businesses
- ✅ Three posting types (job/shift/crew)
- ✅ Worker reviews about your company
- ✅ Trusted worker program
- ✅ Crew building with stats
- ✅ Simple, mobile-friendly workspace

### For Workers
- ✅ Choose your jobs
- ✅ Set your rates
- ✅ Build reputation
- ✅ Get verified
- ✅ Work when you want

---

## 📱 Responsive

Fully responsive across all breakpoints:
- Mobile: Single column, stacked layouts
- Tablet: Two-column grids
- Desktop: Full multi-column layouts

---

## 🎨 Design System

### Colors
- **Midnight** `#0a0a0b` — Primary dark
- **Charcoal** `#1a1a1f` — Surface dark
- **Cream** `#faf9f6` — Primary light
- **Indigo** `#6366f1` — Primary accent
- **Violet** `#8b5cf6` — Secondary accent
- **Amber** `#f59e0b` — Warm accent
- **Emerald** `#10b981` — Success state

### Typography
- **Display**: Inter (300-900 weights)
- **Mono**: JetBrains Mono for technical elements

---

Built with ❤️ for everyone who needs help or is hiring.
