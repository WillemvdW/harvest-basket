# ⚡ Quick Start - Harvest Basket

Fast setup and development guide.

## 🚀 First Time Setup (5 minutes)

```bash
# 1. Navigate to project
cd harvest-basket

# 2. Install Node.js with NVM
nvm install

# 3. Install dependencies
npm install

# 4. Copy environment file
cp .env.example .env.local

# 5. Start development
npm run dev
```

Then open `http://localhost:5173` 🎉

---

## 📋 Essential Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm install` | Install/update dependencies |
| `npm ci` | Clean install (for CI/CD) |

---

## 🔑 Test Credentials

```
Email:    test@example.com
Password: TestPass123!
```

---

## 💳 Stripe Test Cards

| Card | Number | Expiry | CVC |
|------|--------|--------|-----|
| Visa | 4242 4242 4242 4242 | Any future | Any 3 digits |
| Visa | 4000 0025 0000 3155 | Any future | Any 3 digits |

---

## 📁 Project Structure

```
src/
├── App.tsx              - Main app & routing
├── components/          - Reusable components
├── pages/              - Page components
│   └── admin/         - Admin dashboard
├── context/           - State management
├── types/             - TypeScript types
├── utils/             - Utilities
└── lib/               - Library helpers
```

---

## 🔧 Troubleshooting

### Port 5173 in use?
```bash
npm run dev -- --port 3000
```

### Node version wrong?
```bash
nvm use
```

### Missing dependencies?
```bash
npm install
```

### Build failing?
```bash
npm cache clean --force
rm -r node_modules
npm install
npm run build
```

---

## 📚 Documentation

- **[SETUP.md](SETUP.md)** - Detailed setup guide
- **[README.md](README.md)** - Full documentation
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Development guidelines
- **[GIT_PUSH_GUIDE.md](GIT_PUSH_GUIDE.md)** - Push to GitHub
- **[.github/npm-only.md](.github/npm-only.md)** - npm specifications

---

## 🌐 Features

- ✅ Product catalog with search
- ✅ User authentication
- ✅ Shopping cart
- ✅ Saved baskets
- ✅ Stripe payments
- ✅ Admin dashboard
- ✅ Farm management
- ✅ Collection points map

---

## 🚀 Deploy

### Vercel
```bash
npm run build
# Upload dist/ to Vercel
```

### Netlify
```bash
npm run build
# Drag dist/ to Netlify
```

---

## 📞 Support

- 📖 Read [SETUP.md](SETUP.md)
- 🐛 Open GitHub issue
- 💬 Check [CONTRIBUTING.md](CONTRIBUTING.md)

---

**Ready to code?** Run `npm run dev` 🚀
