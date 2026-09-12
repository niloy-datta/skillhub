# Contributing to Skillhub

Thank you for your interest in contributing to Skillhub! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)
- [Feature Requests](#feature-requests)

## Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project team.

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+ or yarn 1.22+
- Git
- A code editor (VS Code recommended)

### Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/skillhub.git
   cd skillhub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## Development Workflow

### Branch Naming

Use descriptive branch names:
- `feature/add-worker-profile` - New features
- `fix/resolve-login-issue` - Bug fixes
- `docs/update-readme` - Documentation updates
- `refactor/optimize-performance` - Code refactoring

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add worker profile page
fix: resolve authentication issue
docs: update API documentation
refactor: optimize search performance
test: add unit tests for auth module
chore: update dependencies
```

### Development Process

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, documented code
   - Follow the code style guide
   - Add tests for new functionality
   - Update documentation as needed

3. **Test your changes**
   ```bash
   npm run typecheck
   npm run lint
   npm run build
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**

## Code Style

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type when possible
- Use type inference when appropriate

### React

- Use functional components with hooks
- Keep components small and focused
- Use proper prop types
- Implement error boundaries

### Styling

- Use Tailwind CSS utility classes
- Follow the design system
- Ensure responsive design
- Maintain accessibility standards

### File Organization

```
src/
├── features/
│   └── feature-name/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── types.ts
│       └── index.ts
```

### Naming Conventions

- **Components**: PascalCase (`WorkerProfile.tsx`)
- **Hooks**: camelCase with `use` prefix (`useWorker.ts`)
- **Services**: camelCase (`workerService.ts`)
- **Types**: PascalCase (`Worker.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS`)

## Pull Request Process

### Before Submitting

1. **Ensure your code passes all checks**
   ```bash
   npm run typecheck
   npm run lint
   npm run build
   ```

2. **Update documentation**
   - Update README if needed
   - Add JSDoc comments
   - Update API documentation

3. **Add tests**
   - Unit tests for new functions
   - Integration tests for features
   - Ensure test coverage

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Added new tests
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests added/updated
```

### Review Process

1. **Automated checks** must pass
2. **Code review** by at least one maintainer
3. **Address feedback** and push updates
4. **Merge** after approval

## Reporting Issues

### Bug Reports

Use the issue template and include:
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Screenshots if applicable

### Security Issues

For security vulnerabilities, please email the maintainers directly instead of opening a public issue.

## Feature Requests

### Before Requesting

1. Check existing issues and discussions
2. Ensure it aligns with project goals
3. Consider if it's a good fit for the project

### Request Format

```markdown
## Feature Description
Clear description of the feature

## Use Case
Why is this feature needed?

## Proposed Solution
How should it work?

## Alternatives
Other solutions considered

## Additional Context
Any other relevant information
```

## Development Tips

### Useful Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Quality
npm run typecheck    # Type checking
npm run lint         # Lint code
npm run lint:fix     # Auto-fix lint issues

# Testing
npm test             # Run tests
npm run test:watch   # Watch mode
npm run test:coverage # Coverage report
```

### Debugging

- Use React DevTools
- Use browser developer tools
- Check console for errors
- Use debugger statements

### Performance

- Use React.memo for expensive components
- Implement lazy loading
- Optimize re-renders
- Monitor bundle size

## Documentation

### Code Documentation

- Add JSDoc comments for functions
- Document complex logic
- Keep comments up-to-date

### User Documentation

- Update README for user-facing changes
- Update API documentation
- Add examples and tutorials

## Community

- Be respectful and inclusive
- Help other contributors
- Share knowledge
- Celebrate successes

## Questions?

- Check existing documentation
- Search existing issues
- Ask in discussions
- Contact maintainers

---

Thank you for contributing to Skillhub! 🎉
