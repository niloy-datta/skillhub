# Skillhub

A modern two-sided hiring and work marketplace platform connecting skilled workers with businesses and individuals.

## 🎯 Overview

Skillhub is a comprehensive marketplace platform that streamlines the hiring process for both workers and employers. Built with modern web technologies, it provides a seamless experience for posting jobs, discovering talent, managing applications, and processing payments.

### Key Features

- **For Workers**: Find jobs, showcase skills, apply to positions, track applications, manage earnings
- **For Employers**: Post jobs, discover talent, manage applications, hire workers, process payments
- **For Everyone**: Real-time messaging, secure payments, verified profiles, location-based search

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 9+ or yarn 1.22+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/niloy-datta/skillhub.git
cd skillhub

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
skillhub/
├── src/
│   ├── app/              # Application shell and routing
│   ├── features/         # Feature-specific modules
│   │   ├── auth/        # Authentication
│   │   ├── jobs/        # Job management
│   │   ├── tasks/       # Task management
│   │   ├── workers/     # Worker features
│   │   ├── companies/   # Company features
│   │   ├── messaging/   # Messaging system
│   │   ├── payments/    # Payment processing
│   │   └── ...
│   ├── pages/            # Page components
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API and business logic
│   ├── types/            # TypeScript definitions
│   ├── utils/            # Utility functions
│   └── constants/        # Constants and configuration
├── public/               # Static assets
├── docs/                 # Documentation
└── tests/                # Test files
```

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v6
- **State Management**: React Context + Custom Hooks
- **Backend**: Supabase (Auth, Database, Storage)
- **Maps**: Leaflet
- **Animations**: Framer Motion

## 📖 Documentation

- [Release Notes](./RELEASE.md) - Current release information
- [Deployment Guide](./docs/DEPLOYMENT.md) - How to deploy
- [Architecture](./docs/ARCHITECTURE.md) - System architecture
- [API Documentation](./docs/API.md) - API reference
- [Contributing](./CONTRIBUTING.md) - How to contribute

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### Docker

```bash
# Build image
docker build -t skillhub:latest .

# Run container
docker run -p 80:80 skillhub:latest
```

See [Deployment Guide](./docs/DEPLOYMENT.md) for detailed instructions.

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_MAPBOX_TOKEN=your_mapbox_token
```

### Build Configuration

The project uses Vite with optimized settings:
- Code splitting for optimal bundle sizes
- Tree shaking to remove unused code
- Asset optimization and compression

## 🧪 Testing

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Build verification
npm run build
```

## 📊 Performance

The application is optimized for performance:
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Bundle Size: < 200KB (gzipped)
- Lighthouse Score: > 90

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is proprietary software. All rights reserved.

## 🆘 Support

- **Documentation**: Check the [docs](./docs) folder
- **Issues**: [GitHub Issues](https://github.com/niloy-datta/skillhub/issues)
- **Discussions**: [GitHub Discussions](https://github.com/niloy-datta/skillhub/discussions)

## 📈 Roadmap

See our [Roadmap](./ROADMAP.md) for planned features and improvements.

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the fast build tool
- Tailwind CSS for the utility-first CSS framework
- Supabase for the backend infrastructure
- All contributors who have helped build this project

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Status**: Production Ready ✅

Made with ❤️ by the Skillhub team
