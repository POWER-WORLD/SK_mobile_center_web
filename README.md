# SK Mobile Center — Web App Documentation

> Full-stack React web app for **SK Mobile Center** — a CSC-authorized shop in Khurpiya, Kichha, Uttarakhand offering digital government services, mobile accessories, and mobile repair.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Screenshots](#2-screenshots)
3. [Folder Structure](#3-folder-structure)
4. [Components](#4-components)
5. [Pages](#5-pages)
6. [Routing](#6-routing)
7. [State Management](#7-state-management)
8. [Styling System](#8-styling-system)
9. [Dependencies](#9-dependencies)
10. [How to Run](#10-how-to-run)
11. [Future Improvements](#11-future-improvements)

---

## 1. Project Overview

| Field | Details |
|---|---|
| **Project Name** | SK Mobile Center Web (`sk_mobile_shop`) |
| **Frontend** | React 18 + Vite 4 |
| **Styling** | Tailwind CSS v3 + Radix UI |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Routing** | React Router DOM v7 |
| **Backend** | Netlify Serverless Functions |
| **Database** | PostgreSQL (`pg`) |
| **Auth** | JWT (`jsonwebtoken`) + `bcryptjs` |
| **SEO** | `react-helmet` |

**Main Features:**
- 🏠 Home — Hero, trust badges, service overview, CTA
- 🖥️ CSC Services — Government services with category filtering & detail modal
- 📱 Mobile Accessories — Product grid with discount, stock status, and filtering
- 🔧 Mobile Repairing — Repair listings fetched from backend
- 📞 Contact — Contact form + shop info
- 🔐 Admin Panel — JWT-protected CRUD dashboard for all content

---

## 2. Screenshots

### 🏠 Home Page
![Home Page](public/images/Screenshot%202026-02-10%20212237.png)

### 🖥️ CSC Services Page
![CSC Services Page](public/images/Screenshot%202026-02-10%20212304.png)

### 📱 Mobile Accessories Page
![Mobile Accessories Page](public/images/Screenshot%202026-02-10%20212339.png)

### 🔧 Mobile Repairing Page
![Mobile Repairing Page](public/images/Screenshot%202026-02-10%20212352.png)

### 📞 Contact Page
![Contact Page](public/images/Screenshot%202026-02-10%20212612.png)

### 🔐 Admin — CSC Services Management
![Admin CSC Services](public/images/Screenshot%202026-02-28%20212519.png)

### 🔐 Admin — Mobile Accessories Management
![Admin Mobile Accessories](public/images/Screenshot%202026-02-28%20212530.png)

### 🔐 Admin — Mobile Repairing Management
![Admin Mobile Repairing](public/images/Screenshot%202026-02-28%20212541.png)


---

## 3. Components

| Component | Purpose | Key Props |
|---|---|---|
| `Header` | Sticky nav + mobile hamburger menu | — |
| `Footer` | Contact info, hours, quick links | — |
| `ProductCard` | Product image, price, discount, stock status | `product`, `onEdit`, `onDelete` |
| `ProductModal` | Full product detail modal | `isOpen`, `onClose`, `product` |
| `ServiceDetailModal` | CSC service detail modal | `isOpen`, `onClose`, `service` |
| `DeleteConfirmation` | Animated delete confirm dialog | `isOpen`, `onClose`, `onConfirm`, `productName` |
| `ProtectedRoute` | Redirects to login if not authenticated | `children` |
| `ErrorBoundary` | Catches React runtime errors | `children` |
| `ScrollToTop` | Scroll to top on route change | — |
| `AdminForm` | Generic CRUD form (text/number/select/textarea) | `fields`, `onSubmit`, `initialValues`, `title` |
| `AdminTable` | Admin data listing table | column defs, rows, actions |
| `HeroSection` | Page hero banner with CTA buttons | `title`, `subtitle`, `badge`, `backgroundImage`, `primaryAction`, `secondaryAction` |
| `GlassCard` | Glassmorphism card container | `className`, `children` |
| `GlassButton` | Glass-style CTA button | `variant`, `onClick` |
| `CategoryChips` | Filter chip row for categories | `categories`, `activeCategory`, `onCategoryChange` |
| `TrustBadge` | Credential/trust indicator card | `icon`, `title`, `description` |
| `Button` (ui) | Radix button with CVA variants | `variant`, `size` |
| `Toaster` + `useToast` | In-app toast notifications | `toast({ title, description, variant })` |

---

## 4. Pages

| Page | Route | Description | Components Used |
|---|---|---|---|
| `HomePage` | `/` | Hero, trust badges, service cards, about, CTA | `Button`, Framer Motion |
| `CSCServicesPage` | `/csc-services` | Gov. services with category filter + detail modal | `HeroSection`, `CategoryChips`, `GlassCard`, `TrustBadge`, `ServiceDetailModal` |
| `MobileAccessoriesPage` | `/mobile-accessories` | Product grid with filter, discount, stock status | `HeroSection`, `CategoryChips`, `ProductCard`, `ProductModal` |
| `MobileRepairingPage` | `/mobile-repairing` | Repair service listings | `HeroSection`, `GlassCard`, `TrustBadge` |
| `ContactPage` | `/contact` | Contact form + shop info | — |
| `AdminLogin` | `/admin/login` | JWT login form | — |
| `AdminDashboard` | `/admin/dashboard` 🔐 | Sidebar + animated tab content | `AdminCSCServices`, `AdminMobileAccessories`, `AdminMobileRepairing` |
| `AdminCSCServices` | (tab) | CRUD for CSC services | `AdminForm`, `AdminTable` |
| `AdminMobileAccessories` | (tab) | CRUD for accessories | `AdminForm`, `AdminTable` |
| `AdminMobileRepairing` | (tab) | CRUD for repair listings | `AdminForm`, `AdminTable` |

---

## 5. Routing

```
BrowserRouter
├── / → MainLayout (Header + Footer)
│   ├── index         → HomePage
│   ├── csc-services  → CSCServicesPage
│   ├── mobile-accessories → MobileAccessoriesPage
│   ├── mobile-repairing   → MobileRepairingPage
│   └── contact       → ContactPage
├── /admin/login      → AdminLogin
└── /admin/dashboard  → ProtectedRoute → AdminDashboard
```

- `ScrollToTop` runs on every route change (scrolls to top instantly)
- `Toaster` is rendered globally inside `BrowserRouter`

---

## 6. State Management

**No Redux.** Uses React Context + local state + localStorage.

### `AdminContext` — Global auth state
```js
// Available via: const { isLoggedIn, adminName, login, logout } = useAdmin();
{
  isLoggedIn: Boolean,  // Restored from localStorage on page load
  adminName: String,
  user: Object | null,
  loading: Boolean,
  error: String | null,
}
```
- `login(username, password)` — calls API, stores JWT in `localStorage`
- `logout()` — clears token, resets state

### Page-level state
Each data page uses `useState` + `useEffect` for: `items`, `loading`, `error`, `activeCategory`, `selectedItem`, `isModalOpen`.

### `useLocalStorage(key, defaultValue)`
Custom hook that syncs `useState` with `localStorage` automatically.

### `cn(...classes)` — `src/lib/utils.js`
```js
import { cn } from '@/lib/utils';
cn('px-4', isActive && 'bg-white', 'rounded-lg') // safe Tailwind merge
```

---

## 7. Styling System

### `src/index.css`
- **Fonts:** Google Fonts — `Manrope` (body) + `Poppins` (display)
- **Body:** Animated gradient background (`gradientBG` keyframe, 15s loop)
- **CSS Variables (`:root`):**

| Variable | Purpose |
|---|---|
| `--primary-gradient` | Blue → Green (135°) |
| `--glass-bg` | `rgba(255,255,255,0.7)` |
| `--shadow-glow` | Blue glow effect |
| `--radius-lg/md/sm` | 24px / 16px / 12px |
| `--primary`, `--destructive`, etc. | Radix UI HSL color tokens |

- **`.glass-card`** — backdrop blur + semi-transparent bg + soft shadow
- **`.glass-button-primary`** — gradient button
- **`.text-shadow`** — light text shadow for hero text

### `tailwind.config.js`
Extends Tailwind with `font-display` (Poppins), `shadow-glow`, custom keyframes (`float`, `fadeInUp`, `gradient-x`), and Radix UI color mapping.

---

## 8. Dependencies

| Package | Purpose |
|---|---|
| `react` + `react-dom` | Core UI |
| `react-router-dom` v7 | Client-side routing |
| `framer-motion` | Animations |
| `lucide-react` | Icons |
| `react-helmet` | SEO meta tags |
| `@radix-ui/react-*` | Accessible headless UI (Dialog, Toast, etc.) |
| `class-variance-authority` | Button variant system |
| `clsx` + `tailwind-merge` | Safe class merging |
| `tailwindcss-animate` | Animation utilities |
| `pg` | PostgreSQL client (Netlify Functions) |
| `jsonwebtoken` + `bcryptjs` | Admin JWT auth |
| `dotenv` | Env variables in functions |
| `vite` + `@vitejs/plugin-react` | Build + HMR |
| `tailwindcss` + `postcss` | CSS framework |
| `eslint` + plugins | Linting |

---

## 9. How to Run

```bash
# 1. Install dependencies
npm install

# 2. Run frontend only
npm run dev      # → http://localhost:3000

# 3. Build for production
npm run build

---

## 10. Future Improvements

- **Performance:** Lazy-load admin pages with `React.lazy`, add skeleton loaders, optimize images with WebP + `srcset`
- **Structure:** Migrate to TypeScript, extract data-fetching into custom hooks (`useCSCServices`, `useAccessories`)
- **Reusability:** Generalize the 3 identical data pages into a `DataListPage` template; unify 3 admin CRUD sections into `AdminEntityManager`
- **Styling:** Implement full dark mode toggle, improve tablet layout for admin sidebar
- **Security:** Add JWT refresh tokens, rate limiting on Netlify Functions, server-side input sanitization

---

*Documentation generated on 2026-02-28 · SK Mobile Center Development Team*
