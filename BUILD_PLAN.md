# Build Plan - Step by Step 📋

**We'll build ONE thing at a time. Each session = Something that WORKS.**

---

## Session 1: Hello World (30 mins)

**Goal:** See React running on screen

**Files we'll create:**
- `src/main.tsx` - Render React to the page
- `src/App.tsx` - Show "Hello World"

**What you'll learn:**
- How React renders to the DOM
- JSX basics
- Component structure

**Result:** Browser shows "Hello World" ✅

---

## Session 2: Login Form (60 mins)

**Goal:** Working login that calls your backend

**Files we'll create:**
- `src/pages/LoginPage.tsx` - Login form
- `src/api/axios.ts` - Axios setup

**What you'll learn:**
- useState for form inputs
- Handle form submit
- Make API calls with axios
- Save tokens to localStorage

**Result:** Can login and see token in localStorage ✅

---

## Session 3: Show User After Login (45 mins)

**Goal:** Show user info when logged in

**What we'll add:**
- Check localStorage on app load
- Show user name/email
- Logout button (clears localStorage)

**What you'll learn:**
- useEffect for component mount
- Conditional rendering
- localStorage read/write

**Result:** After login, shows "Welcome, Benz!" ✅

---

## Session 4: Basic Routing (45 mins)

**Goal:** Navigate between pages

**Files we'll create:**
- Update `App.tsx` with routes
- `src/pages/TasksPage.tsx` - Tasks page (placeholder)

**What you'll learn:**
- React Router basics
- Navigate between pages
- Redirect after login

**Result:** Can navigate /login → /tasks ✅

---

## Session 5: Protected Routes (30 mins)

**Goal:** Redirect to login if not authenticated

**Files we'll create:**
- `src/components/ProtectedRoute.tsx` - Auth guard

**What you'll learn:**
- Route protection
- Conditional redirects
- Token validation

**Result:** Can't access /tasks without logging in ✅

---

## Session 6: Fetch & Display Tasks (60 mins)

**Goal:** Show real tasks from backend

**What we'll add:**
- Fetch tasks from API
- Map over array to display
- Loading state
- Error handling

**What you'll learn:**
- useEffect for data fetching
- Array mapping in JSX
- Async/await in React
- Loading patterns

**Result:** See your tasks from the database! ✅

---

## Session 7: Create a Task (45 mins)

**Goal:** Add new tasks

**What we'll add:**
- Task creation form
- POST to backend
- Add to list without refetching

**What you'll learn:**
- Form handling
- Optimistic UI updates
- State management

**Result:** Can create tasks! ✅

---

## 🎓 After These Sessions:

**You'll understand:**
- ✅ How React renders
- ✅ Component structure
- ✅ useState & useEffect
- ✅ Form handling
- ✅ API calls with axios
- ✅ Routing
- ✅ Protected routes
- ✅ localStorage
- ✅ Conditional rendering
- ✅ List rendering

**You'll have a working app that:**
- ✅ Logs in
- ✅ Shows tasks
- ✅ Creates tasks
- ✅ Has protected routes

**THEN we can talk about:**
- Redux (if you need global state)
- React Query (if you want automatic caching)
- Form libraries (if forms get complex)

---

**But first, let's build the basics and OWN them!** 💪
