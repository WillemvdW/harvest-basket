# Setup Guide - Harvest Basket

This guide will help you set up the Harvest Basket project using Node.js, NVM, and npm.

## Prerequisites

- **Git** - Version control
- **NVM** (Node Version Manager) - For managing Node.js versions
- **npm** - Comes with Node.js (v10.2.4+)

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

### 4. Install Project Dependencies with npm

```bash
npm ci
```

This will:
- Use the exact versions from `package-lock.json`
- Create a `node_modules` directory
- Ensure reproducible installs across machines

**Alternative (if package-lock.json is outdated):**
```bash
npm install
```

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

## Available npm Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
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

## Build Environment: npm

This project uses **npm** as the package manager:

- ✅ **Primary Package Manager**: npm
- ✅ **Node.js Version**: 20.11.1 (LTS)
- ✅ **Lock File**: package-lock.json (for reproducible installs)
- ✅ **Configuration**: .npmrc (npm settings)
- ✅ **Version Specification**: .nvmrc (NVM version)

### Why npm?

- **Standard**: npm is the default with Node.js
- **Consistent**: Better team compatibility
- **Reproducible**: package-lock.json ensures exact versions
- **Performance**: Fast dependency resolution

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

### "Cannot find module" errors
Delete node_modules and reinstall:
```bash
rm -r node_modules
npm ci
```

## Project Structure

```
harvest-basket/
├── .nvmrc                 # Node version for NVM (20.11.1)
├── .npmrc                 # npm configuration
├── package.json           # Project dependencies and metadata
├── package-lock.json      # Locked dependency versions
├── vite.config.ts         # Vite build configuration
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── index.html             # HTML entry point
├── src/
│   ├── App.tsx           # Main app component with routing
│   ├── main.tsx          # React entry point
│   ├── index.css         # Global styles (Tailwind)
│   ├── components/       # Reusable React components
│   ├── pages/            # Page components for routing
│   ├── context/          # React Context providers
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   └── lib/              # Library utilities
├── .github/
│   ├── workflows/
│   │   └── build.yml     # CI/CD pipeline with npm
│   └── ISSUE_TEMPLATE/
├── README.md             # Project documentation
├── SETUP.md              # This file
└── CHANGELOG.md          # Version history
```

## Development Workflow

### For first-time setup:
```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/harvest-basket.git
cd harvest-basket

# 2. Install Node.js version with NVM
nvm install

# 3. Install dependencies with npm
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

## Continuous Integration

The project uses GitHub Actions for CI/CD. The workflow:

1. Installs Node.js v20.11.1 using NVM
2. Installs dependencies with `npm ci`
3. Runs linting with `npm run lint`
4. Builds the project with `npm run build`
5. Archives build artifacts

See `.github/workflows/build.yml` for details.

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

### Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Deploy to Netlify
```bash
npm run build
# Then drag & drop the dist/ folder to Netlify
```

## Package Manager Comparison

| Feature | npm | Bun | Yarn |
|---------|-----|-----|------|
| Speed | ⚡⚡ | ⚡⚡⚡ | ⚡⚡ |
| Compatibility | ✅ Standard | ✅ Good | ✅ Good |
| Learning Curve | ✅ Easy | ⚠️ New | ⚠️ Different |
| Team Adoption | ✅ High | ⚠️ Lower | ✅ Medium |
| Production Ready | ✅ Yes | ⚠️ Newer | ✅ Yes |

**We use npm for maximum compatibility and team adoption.**

## Performance Tips

- **Use `npm ci`** in CI/CD instead of `npm install` for faster builds
- **Cache node_modules** in CI/CD pipelines
- **Use `.npmrc`** for consistent settings across team
- **Update dependencies** regularly but test thoroughly

## Next Steps

1. Review the [README.md](./README.md) for project features
2. Check [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines
3. Explore the codebase in `src/` directory
4. Start developing with `npm run dev`

## Support

For issues or questions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include your `node --version`, `npm --version`, and OS output

---

**Ready to start?** Run `npm run dev` and visit `http://localhost:5173`! 🚀
