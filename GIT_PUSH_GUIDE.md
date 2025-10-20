# 📤 GitHub Push Guide - Harvest Basket

This document provides step-by-step instructions to push the latest npm-only build to GitHub.

## ✅ Pre-Push Checklist

Before pushing, verify these files are in place:

### Core Configuration Files
- [ ] `.nvmrc` - Node.js version 20.11.1
- [ ] `.node-version` - Alternative version file
- [ ] `.npmrc` - npm configuration
- [ ] `package.json` - Updated with harvest-basket metadata
- [ ] `package-lock.json` - Locked dependencies
- [ ] `vite.config.ts` - Vite build config
- [ ] `tsconfig.json` - TypeScript config
- [ ] `tailwind.config.js` - Tailwind CSS config
- [ ] `index.html` - HTML entry point

### Source Files (src/)
- [ ] `src/App.tsx` - Main app with routing
- [ ] `src/main.tsx` - React entry point
- [ ] `src/index.css` - Global styles

### Components (src/components/)
- [ ] `src/components/Header.tsx` - Navigation
- [ ] `src/components/AuthModal.tsx` - Authentication modal
- [ ] `src/components/PaymentForm.tsx` - Stripe payment form

### Pages (src/pages/)
- [ ] `src/pages/Shop.tsx` - Product catalog
- [ ] `src/pages/Cart.tsx` - Shopping cart
- [ ] `src/pages/SavedBaskets.tsx` - Saved baskets
- [ ] `src/pages/Profile.tsx` - User profile

### Admin Pages (src/pages/admin/)
- [ ] `src/pages/admin/AdminDashboard.tsx` - Admin dashboard
- [ ] `src/pages/admin/Inventory.tsx` - Inventory management
- [ ] `src/pages/admin/Farms.tsx` - Farm registry
- [ ] `src/pages/admin/DropOffPoints.tsx` - Drop-off points

### Context (src/context/)
- [ ] `src/context/StoreContext.tsx` - Shop state management
- [ ] `src/context/AuthContext.tsx` - Authentication context

### Utilities (src/utils/, src/lib/)
- [ ] `src/types/index.ts` - TypeScript interfaces
- [ ] `src/utils/validation.ts` - Form validation
- [ ] `src/utils/crypto.ts` - Password hashing
- [ ] `src/lib/utils.ts` - Tailwind utilities

### Documentation
- [ ] `README.md` - Project documentation
- [ ] `SETUP.md` - Setup instructions
- [ ] `CONTRIBUTING.md` - Contribution guidelines
- [ ] `CHANGELOG.md` - Version history
- [ ] `.github/npm-only.md` - npm specification

### GitHub Configuration
- [ ] `.github/workflows/build.yml` - CI/CD pipeline
- [ ] `.github/ISSUE_TEMPLATE/bug_report.md` - Bug template
- [ ] `.github/ISSUE_TEMPLATE/feature_request.md` - Feature template

### Git Configuration
- [ ] `.gitignore` - Git ignore rules
- [ ] `.env.example` - Environment template

---

## 🚀 Step-by-Step Push Instructions

### Step 1: Verify npm Installation Locally

```powershell
cd C:\Users\wille\OneDrive\Source\shipper\harvest-basket

# Check Node.js version
node --version
# Expected: v20.11.1

# Check npm version
npm --version
# Expected: 10.2.4 or higher

# Check NVM is set correctly
nvm current
# Expected: v20.11.1
```

### Step 2: Verify Node Modules Are Installed

```powershell
# Check if node_modules exists
ls node_modules | head

# If missing, install:
npm install
```

### Step 3: Clean Up Before Push

```powershell
# Remove unnecessary files
Remove-Item -Path dist -Recurse -Force -ErrorAction SilentlyContinue
rm -r .next -ErrorAction SilentlyContinue

# Clear npm cache (optional but recommended)
npm cache clean --force
```

### Step 4: Verify Build Works

```powershell
# Build the project
npm run build

# Check for errors - should see "dist/" folder created
ls dist
```

### Step 5: Stage All Changes

```powershell
# Check status
git status

# Add all files
git add .

# Verify staged files
git status
# Should show all modified/new files in green
```

### Step 6: Create Commit

```powershell
git commit -m "feat: Update npm build environment - add Stripe, Leaflet, and complete Harvest Basket implementation

- Update package.json with harvest-basket metadata
- Add all required dependencies (react-router-dom, @stripe/*, leaflet, date-fns)
- Enforce npm-only build environment (no bun/yarn)
- Add .nvmrc for Node.js v20.11.1 LTS
- Configure .npmrc for npm settings
- Update GitHub Actions workflow for npm CI/CD
- Include comprehensive documentation for npm setup
- All source files and components ready for production"
```

### Step 7: Verify Remote is Set Correctly

```powershell
# Check remote
git remote -v

# Should show:
# origin  https://github.com/YOUR_USERNAME/harvest-basket.git (fetch)
# origin  https://github.com/YOUR_USERNAME/harvest-basket.git (push)
```

### Step 8: Push to GitHub

```powershell
# Push to main branch
git push origin main

# If you get authentication error, use Personal Access Token:
# 1. Go to GitHub Settings → Developer settings → Personal access tokens
# 2. Create token with 'repo' scope
# 3. Copy token and paste when prompted for password
```

### Step 9: Verify on GitHub

Go to `https://github.com/YOUR_USERNAME/harvest-basket`

Verify:
- ✅ All files are visible
- ✅ Latest commit message shows
- ✅ `.nvmrc` contains "20.11.1"
- ✅ `package.json` has "harvest-basket" as name
- ✅ All src/ files are present
- ✅ GitHub Actions workflow file exists

---

## 🔄 Complete Command Sequence

Copy-paste this entire block to do everything at once:

```powershell
# Navigate to project
cd C:\Users\wille\OneDrive\Source\shipper\harvest-basket

# Verify environment
nvm use
node --version
npm --version

# Install dependencies if needed
npm install

# Build
npm run build

# Stage and commit
git add .
git commit -m "feat: Update npm build environment - add Stripe, Leaflet, and complete Harvest Basket implementation

- Update package.json with harvest-basket metadata
- Add all required dependencies (react-router-dom, @stripe/*, leaflet, date-fns)
- Enforce npm-only build environment (no bun/yarn)
- Add .nvmrc for Node.js v20.11.1 LTS
- Configure .npmrc for npm settings
- Update GitHub Actions workflow for npm CI/CD
- Include comprehensive documentation for npm setup
- All source files and components ready for production"

# Push
git push origin main

# Verify
git log -1
git remote -v
```

---

## 🐛 Troubleshooting

### Error: "fatal: not a git repository"
```powershell
git init
git remote add origin https://github.com/YOUR_USERNAME/harvest-basket.git
```

### Error: "fatal: remote origin already exists"
```powershell
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/harvest-basket.git
```

### Error: "Could not read Username"
Use Personal Access Token instead of password when prompted

### Error: "rejected... (unknown reason)"
```powershell
git pull origin main --allow-unrelated-histories
git push origin main
```

### Build fails with missing dependencies
```powershell
npm cache clean --force
rm -r node_modules
npm install
npm run build
```

### Node version wrong
```powershell
nvm list
nvm install 20.11.1
nvm use 20.11.1
```

---

## ✨ After Push

1. **GitHub Actions will automatically run**
   - CI/CD pipeline will execute
   - Build will run with npm
   - Artifacts will be archived

2. **Monitor the build**
   - Go to Actions tab on GitHub
   - Click on latest workflow run
   - Verify it passes

3. **Clone to verify**
   ```powershell
   cd C:\test
   git clone https://github.com/YOUR_USERNAME/harvest-basket.git
   cd harvest-basket
   nvm use
   npm install
   npm run dev
   ```

---

## 📋 Git Commit Message Template

For future commits, use this format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style
- `refactor` - Code reorganization
- `test` - Testing
- `chore` - Build, dependencies, tooling

**Example:**
```
feat(auth): Add two-factor authentication

- Implement TOTP-based 2FA
- Add recovery codes
- Update user profile settings

Closes #123
```

---

## 🎉 You're Done!

Once the push is complete:
- ✅ Latest build is on GitHub
- ✅ npm is the only package manager
- ✅ All dependencies are locked
- ✅ CI/CD pipeline is active
- ✅ Ready for team collaboration

**Happy coding!** 🚀
