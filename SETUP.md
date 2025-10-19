# Setup Guide - Harvest Basket

This guide will help you set up the Harvest Basket project using Node.js and NVM.

## Prerequisites

- **Git** - Version control
- **NVM** (Node Version Manager) - For managing Node.js versions
- **npm** - Comes with Node.js (or use yarn/pnpm if preferred)

## Installation Steps

### 1. Install NVM (if not already installed)

**macOS/Linux:**
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

Then reload your shell configuration:
```bash
source ~/.bashrc
# or for zsh
source ~/.zshrc
```

**Windows:**
Download and install from [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)

### 2. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/harvest-basket.git
cd harvest-basket
```

### 3. Install Node.js Using NVM

The project includes a `.nvmrc` file that specifies Node.js version 20.11.1 (LTS).

```bash
# Install the specified Node.js version
nvm install

# Use the specified Node.js version
nvm use
```

You should see output like:
```
Now using node v20.11.1 (npm 10.2.4)
```

### 4. Install Project Dependencies

```bash
npm install
```

This will:
- Install all dependencies from `package.json`
- Create a `node_modules` directory
- Generate `package-lock.json` for reproducible installs

### 5. Set Up Environment Variables

Copy the environment template:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_TEST_KEY_HERE
VITE_API_BASE_URL=http://localhost:3000/api
VITE_ENVIRONMENT=development
```

### 6. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm preview

# Run linter
npm run lint
```

## NVM Useful Commands

```bash
# List installed Node versions
nvm list

# Install a specific version
nvm install 20.11.1

# Use a specific version
nvm use 20.11.1

# Set default version
nvm alias default 20.11.1

# List available versions
nvm list-remote
```

## Troubleshooting

### "nvm command not found"
Make sure NVM is properly installed and your shell configuration file is sourced. Try restarting your terminal.

### "Node version mismatch"
Run `nvm use` to switch to the correct version:
```bash
nvm use
```

### "npm ERR! ERESOLVE unable to resolve dependency tree"
Try installing with legacy peer deps flag:
```bash
npm install --legacy-peer-deps
```

### Port 5173 already in use
Run on a different port:
```bash
npm run dev -- --port 3000
```

### Clear npm cache
```bash
npm cache clean --force
npm install
```

## Project Structure

```
harvest-basket/
├── .nvmrc                 # Node version specification for NVM
├── .npmrc                 # NPM configuration
├── package.json           # Project dependencies
├── package-lock.json      # Locked dependency versions
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── index.html             # HTML entry point
├── src/
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # React entry point
│   ├── index.css         # Global styles
│   ├── components/       # Reusable components
│   ├── pages/            # Page components
│   ├── context/          # React context providers
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   └── lib/              # Library utilities
└── README.md             # Project documentation
```

## Development Workflow

### For first-time setup:
```bash
# 1. Clone the repo
git clone <repo-url>
cd harvest-basket

# 2. Install Node.js version
nvm install

# 3. Install dependencies
npm install

# 4. Set up environment
cp .env.example .env.local

# 5. Start developing
npm run dev
```

### For subsequent sessions:
```bash
cd harvest-basket

# NVM automatically uses the version from .nvmrc
nvm use

# Start development
npm run dev
```

## Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

This locally serves the production build for testing.

## Continuous Integration

The project is configured for Node.js environments. Typical CI/CD setup:

```yaml
# .github/workflows/build.yml (example)
name: Build and Deploy
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: nvm-sh/action-setup@v3
        with:
          node-version-file: '.nvmrc'
      - run: npm ci
      - run: npm run build
```

## Performance Tips

- **Use `npm ci` in CI/CD** instead of `npm install` for faster, more reliable builds
- **Cache node_modules** in CI/CD pipelines
- **Use `.npmrc`** for consistent npm configurations across team

## Next Steps

1. Review the [README.md](./README.md) for project features
2. Check [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines
3. Explore the codebase in `src/` directory

## Support

For issues or questions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include your `node --version` and `npm --version` output

---

**Ready to start?** Run `npm run dev` and visit `http://localhost:5173`! 🚀
