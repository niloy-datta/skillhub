# Skillhub

A focused two-sided hiring and work marketplace where individuals and businesses can post work, find workers, hire talent, communicate, manage work, and complete payments safely.

## 🎯 What is Skillhub?

Skillhub connects businesses and individuals looking to hire skilled professionals with talented workers seeking opportunities. Our platform streamlines the hiring process through an intuitive marketplace experience.

## 👥 Target Users

- **Businesses & Employers**: Organizations looking to hire talent for projects, tasks, or ongoing work
- **Workers & Freelancers**: Skilled professionals seeking work opportunities

## 🔄 Core Marketplace Workflow

1. User needs work done → Posts task or job
2. Suitable workers are discovered or matched
3. Applications or invitations happen
4. Communication occurs via integrated messaging
5. Worker is hired
6. Work is completed
7. Payment occurs securely through our platform
8. Both sides build reputation

## ✨ Core Features

### For Workers
- Browse available work opportunities
- Apply to jobs and tasks
- Manage applications and earnings
- Maintain professional profiles
- Communicate with potential employers

### For Businesses
- Post jobs and tasks
- Search and discover qualified workers
- Review applications and portfolios
- Manage hires and ongoing work
- Process secure payments

### Shared Features
- Real-time messaging and communication
- User verification systems
- Secure payment processing
- Dispute resolution
- Location-based matching
- Team management capabilities

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: React Context API
- **Data Fetching**: TanStack Query (React Query)

## 📁 Project Architecture

```
src/
├── app/                    # Application entry points
│   ├── App.tsx            # Main app component
│   ├── router.tsx         # Route definitions
│   └── providers.tsx      # Context providers
│
├── pages/                 # Page components
│   ├── Home/             # Landing page
│   ├── FindWork/         # Worker discovery
│   ├── HireTalent/       # Company discovery
│   ├── PostWork/         # Job/task posting
│   ├── Dashboard/        # User dashboard
│   ├── Messages/         # Messaging system
│   ├── Profile/          # User profiles
│   ├── Settings/         # Account settings
│   ├── Auth/             # Authentication
│   └── NotFound/         # 404 page
│
├── components/           # Reusable components
│   ├── layout/          # Layout components (Header, Footer)
│   └── ui/             # UI primitives
│
├── data/                # Mock data and constants
│   └── index.ts        # Sample workers, companies, tasks, jobs
│
├── types/              # TypeScript type definitions
│   └── index.ts       # Domain types
│
├── constants/         # Application constants
│   └── index.ts      # Navigation items, skills, categories
│
├── utils/            # Utility functions
│   └── index.ts     # Helper functions
│
└── main.tsx         # Application entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/niloy-datta/skillhub.git
cd skillhub
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📦 Build

Build the application for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 🧪 Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🏗️ Architecture Decisions

### Feature-Based Organization
The project follows a feature-based architecture where related code is grouped by business domain rather than technical type. This makes it easier to:
- Find related code
- Understand feature boundaries
- Scale the codebase
- Onboard new developers

### Role-Based Navigation
Navigation is tailored to user roles:
- **Workers**: Find work, saved jobs, applications, messages, earnings, profile
- **Businesses**: Post work, active jobs, applicants, workers, messages, payments

### Clean Separation of Concerns
- **Pages**: Route-level components
- **Components**: Reusable UI elements
- **Data**: Mock data and API integration
- **Types**: TypeScript definitions
- **Utils**: Helper functions

## 📋 Roadmap

### Phase 1: Core Marketplace (Current)
- ✅ User authentication
- ✅ Job/task posting
- ✅ Worker discovery
- ✅ Basic messaging
- ✅ Profile management

### Phase 2: Enhanced Features
- [ ] Advanced search and filtering
- [ ] Payment integration
- [ ] User verification system
- [ ] Notification system
- [ ] Review and rating system

### Phase 3: Advanced Features
- [ ] Real-time messaging
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Integration with external tools
- [ ] AI-powered matching

## 🤝 Contributing

Please read our contributing guidelines before submitting pull requests.

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for the future of work**
