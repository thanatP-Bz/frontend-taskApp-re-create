# TaskApp - Minimal Starter 🚀

**This is a clean slate - we'll build everything together, step by step!**

---

## 📦 What's Included

### ✅ Tools (in package.json)
- React 18 + TypeScript
- Vite (dev server)
- React Router (for routing)
- Axios (for API calls)
- Tailwind CSS (for styling)

### ✅ Config Files (you can ignore these - they just work!)
- `tsconfig.json` - TypeScript config
- `vite.config.ts` - Vite config
- `tailwind.config.js` - Tailwind config
- `postcss.config.js` - PostCSS config

### ✅ Folder Structure
```
src/
├── pages/          # Your pages (Login, Tasks, etc.)
├── components/     # Reusable components
├── api/            # API setup (axios)
├── main.tsx        # Entry point (EMPTY - we'll build it!)
├── App.tsx         # Main app (EMPTY - we'll build it!)
└── index.css       # Tailwind imports
```

---

## 🎯 What We'll Build Together

### Session 1: Hello World
- Fill in `main.tsx`
- Fill in `App.tsx`
- See "Hello World" on screen

### Session 2: Login Page
- Build `LoginPage.tsx`
- useState for email/password
- Handle form submit
- Call your backend API
- Save token to localStorage

### Session 3: Show User Info
- Read token from localStorage
- Show user name when logged in
- Add logout button

### Session 4: Protected Routes
- Create TasksPage
- Only show if logged in
- Redirect to login if not

### Session 5: Fetch Tasks
- Call GET /api/tasks
- Display tasks in a list
- Handle loading state

---

## 🚀 Getting Started

1. **Install dependencies:**
```bash
npm install
```

2. **Create .env file:**
```bash
cp .env.example .env
```

3. **Make sure your backend is running on port 5000**

4. **Start dev server:**
```bash
npm run dev
```

App will run on http://localhost:3000

---

## 📝 Next Steps

**Ready to build?** We'll start with Session 1: Hello World!

We'll write the code together, line by line, so you understand every single piece.

---

**No Redux yet. No React Query yet. Just plain React, TypeScript, and Axios.**

We'll add the fancy stuff ONLY when you actually need it! 💪
