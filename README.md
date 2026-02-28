# SK Mobile Center — Web Application Documentation

> **A full-stack React web application** for SK Mobile Center, a CSC-authorized shop offering mobile accessories, mobile repair services, digital government services (Jan Seva Kendra), and more — located in Khurpiya, Kichha, Uttarakhand.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Folder Structure](#2-folder-structure)
3. [Components Documentation](#3-components-documentation)
4. [Pages Documentation](#4-pages-documentation)
5. [Styling System](#5-styling-system)
6. [Routing](#6-routing)
7. [State Management](#7-state-management)
8. [Reusable Components](#8-reusable-components)
9. [CSS Classes & Utilities](#9-css-classes--utilities)
10. [Dependencies](#10-dependencies)
11. [How to Run the Project](#11-how-to-run-the-project)
12. [Future Improvements](#12-future-improvements)

---

## 1. Project Overview

### Project Name
**SK Mobile Center Web** (`sk_mobile_shop`)

### Purpose
A business website for **SK Mobile Center** — a CSC (Common Service Center) authorized shop. The application allows customers to explore services, view products, and contact the business. A protected admin panel allows staff to manage all content (services, accessories, repair listings) directly through the UI.

### Main Features
- 🏠 **Home Page** — Hero section, service highlights, trust badges, about section, and CTA
- 🖥️ **CSC / Jan Seva Kendra Services** — Government digital services listing with category filtering and service detail modals
- 📱 **Mobile Accessories** — Product listing with discount and stock status display, category filtering
- 🔧 **Mobile Repairing** — Repair service listings fetched from the backend
- 📞 **Contact Page** — Contact form, map/address, business hours, and social links
- 🔐 **Admin Panel** — JWT-protected dashboard to Create, Read, Update, Delete (CRUD) all data categories
- 🌐 **Netlify Functions** — Serverless backend deployed as Netlify Functions with PostgreSQL database

### Technologies Used

| Category | Technology |
|---|---|
| Frontend Framework | React 18 |
| Build Tool | Vite 4 |
| Routing | React Router DOM v7 |
| Styling | Tailwind CSS v3 |
| UI Components | Radix UI (headless primitives) |
| Animations | Framer Motion |
| Icons | Lucide React |
| Backend/API | Netlify Functions (serverless) |
| Database | PostgreSQL (`pg`) |
| Auth | JSON Web Token (`jsonwebtoken`) + `bcryptjs` |
| SEO | `react-helmet` |
| Utility | `clsx`, `tailwind-merge`, `class-variance-authority` |

---

## 2. Folder Structure

```
sk_mobile_center_web/
│
├── index.html                  # App entry HTML — mounts React at #root
├── vite.config.js              # Vite build configuration with path aliases
├── tailwind.config.js          # Tailwind CSS configuration and custom tokens
├── postcss.config.js           # PostCSS configuration for Tailwind
├── netlify.toml                # Netlify deployment configuration
├── package.json                # Project dependencies and scripts
├── .env.example                # Example environment variable definitions
│
├── public/                     # Static assets (served as-is)
│
├── database/                   # Database setup and migration scripts
│   └── init-db.js              # PostgreSQL schema initialization script
│
├── netlify/                    # Netlify serverless function handlers
│   └── functions/              # Backend API endpoints (admin-login, csc-services, etc.)
│
└── src/                        # Main application source code
    ├── main.jsx                # React root — mounts <App /> into #root
    ├── App.jsx                 # Root component — sets up routing and global providers
    ├── index.css               # Global styles, CSS variables, Tailwind directives
    │
    ├── layouts/
    │   └── MainLayout.jsx      # Shared layout: Header + <Outlet /> + Footer
    │
    ├── pages/
    │   ├── HomePage.jsx        # Landing page with hero and service sections
    │   ├── CSCServicesPage.jsx # CSC / Jan Seva Kendra services listing
    │   ├── MobileAccessoriesPage.jsx   # Mobile accessories with filtering
    │   ├── MobileRepairingPage.jsx     # Mobile repair services listing
    │   ├── ContactPage.jsx     # Contact form and shop info
    │   └── admin/
    │       ├── AdminLogin.jsx          # Admin login form (JWT auth)
    │       ├── AdminDashboard.jsx      # Protected dashboard shell with tabs
    │       ├── AdminCSCServices.jsx    # CRUD for CSC services
    │       ├── AdminMobileAccessories.jsx  # CRUD for accessories
    │       └── AdminMobileRepairing.jsx    # CRUD for repair listings
    │
    ├── components/
    │   ├── Header.jsx          # Sticky navigation header with mobile menu
    │   ├── Footer.jsx          # Footer with contact info and quick links
    │   ├── ProductCard.jsx     # Animated product card with price & discount
    │   ├── ProductModal.jsx    # Full product detail modal dialog
    │   ├── ServiceDetailModal.jsx  # CSC service detail modal
    │   ├── DeleteConfirmation.jsx  # Animated delete confirmation dialog
    │   ├── ProtectedRoute.jsx  # Auth guard — redirects to /admin/login
    │   ├── ErrorBoundary.jsx   # React class-based global error handler
    │   ├── ScrollToTop.jsx     # Scrolls to top on route change
    │   ├── admin/
    │   │   ├── AdminForm.jsx   # Generic reusable admin CRUD form
    │   │   └── AdminTable.jsx  # Reusable data table for admin lists
    │   └── ui/
    │       ├── button.jsx      # Radix-based Button with CVA variants
    │       ├── toast.jsx       # Radix Toast notification primitives
    │       ├── toaster.jsx     # Toast renderer connected to hook
    │       ├── use-toast.js    # Custom hook for showing toasts
    │       ├── HeroSection.jsx # Reusable page hero banner component
    │       ├── GlassCard.jsx   # Glassmorphism styled card wrapper
    │       ├── GlassButton.jsx # Glassmorphism styled button
    │       ├── CategoryChips.jsx   # Filter chips for service/product categories
    │       └── TrustBadge.jsx  # Trust/credential badge display card
    │
    ├── context/
    │   └── AdminContext.jsx    # Global admin auth context (login, logout, state)
    │
    ├── hooks/
    │   └── useLocalStorage.js  # Custom hook for localStorage-synced state
    │
    ├── services/
    │   └── api.js              # All API calls to Netlify Functions (organized by resource)
    │
    └── lib/
        └── utils.js            # `cn()` utility — merges Tailwind classes safely
```

---

## 3. Components Documentation

### Core Layout Components

#### `Header.jsx`
- **Purpose:** Sticky top navigation bar with the brand logo, nav links, and CTA buttons (Call & WhatsApp).
- **Props:** None (reads route via `useLocation`)
- **Behavior:** Renders a hamburger menu for mobile (`< xl`). Mobile menu animates in/out using Framer Motion `AnimatePresence`.
- **Dependencies:** `framer-motion`, `lucide-react`, `react-router-dom`

#### `Footer.jsx`
- **Purpose:** Full-width footer with business branding, contact details, business hours, address, and quick nav links.
- **Props:** None
- **Sections:** Branding, Contact (phone/WhatsApp/email/Instagram), Business Hours, Quick Links

#### `MainLayout.jsx`
- **Purpose:** Shell layout that wraps all public pages. Renders `<Header />`, the nested `<Outlet />` (page content), and `<Footer />`.
- **Props:** None

---

### Product & Service Components

#### `ProductCard.jsx`
- **Purpose:** Displays a single product with image, discount badge, stock status, and computed final price.
- **Props:**
  | Prop | Type | Description |
  |---|---|---|
  | `product` | Object | `{ name, image, originalPrice, discount, status }` |
  | `onEdit` | Function | Callback when admin clicks edit |
  | `onDelete` | Function | Callback when admin clicks delete |
- **Features:** Hover overlay with edit/delete buttons, animated with Framer Motion `whileHover`.

#### `ProductModal.jsx`
- **Purpose:** Full-screen modal showing complete product details.
- **Props:** `isOpen`, `onClose`, `product`

#### `ServiceDetailModal.jsx`
- **Purpose:** Modal that displays full details for a CSC service entry.
- **Props:** `isOpen`, `onClose`, `service`

#### `DeleteConfirmation.jsx`
- **Purpose:** Animated confirmation dialog before deleting any item.
- **Props:**
  | Prop | Type | Description |
  |---|---|---|
  | `isOpen` | Boolean | Controls modal visibility |
  | `onClose` | Function | Called on cancel |
  | `onConfirm` | Function | Called on confirm delete |
  | `productName` | String | Name shown in the message |

---

### Utility & Guard Components

#### `ProtectedRoute.jsx`
- **Purpose:** Route guard that redirects unauthenticated users to `/admin/login`.
- **Props:** `children`
- **Logic:** Reads `isLoggedIn` from `AdminContext`. If false, redirects via `<Navigate>`.

#### `ErrorBoundary.jsx`
- **Purpose:** React class component that catches runtime errors in the component tree and shows a friendly error screen with a reload button.
- **Dev mode:** Shows error stack trace when `import.meta.env.DEV` is true.
- **Props:** `children`

#### `ScrollToTop.jsx`
- **Purpose:** Invisible utility component that scrolls the window to the top on every route change.
- **Mechanism:** `useLayoutEffect` on `location.pathname`

---

### Admin Components

#### `admin/AdminForm.jsx`
- **Purpose:** Generic, field-driven form used for creating and editing records across all admin sections.
- **Props:**
  | Prop | Type | Description |
  |---|---|---|
  | `fields` | Array | Field definitions `{ name, label, type, required, options, placeholder }` |
  | `onSubmit` | Function | Called with form data on valid submit |
  | `onCancel` | Function | Called when cancel is clicked |
  | `initialValues` | Object | Pre-filled data for editing |
  | `title` | String | Form heading title |
- **Supports:** `text`, `number`, `textarea`, `select` field types with built-in validation.

#### `admin/AdminTable.jsx`
- **Purpose:** Reusable data table for admin listing views.
- **Props:** Column definitions, data rows, actions.

---

### UI Library Components (`components/ui/`)

#### `button.jsx`
- **Purpose:** A styled `<Button>` component built on Radix UI Slot + CVA (class-variance-authority).
- **Variants:** `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
- **Sizes:** `default`, `sm`, `lg`, `icon`

#### `toast.jsx` / `toaster.jsx` / `use-toast.js`
- **Purpose:** A complete toast notification system using Radix UI Toast primitives.
- **Usage:** Call `useToast()` hook in any component, then `toast({ title, description, variant })`.

#### `HeroSection.jsx`
- **Purpose:** Reusable hero banner with background image, gradient overlay, badge, title, subtitle, and two CTA buttons.
- **Props:** `title`, `subtitle`, `badge`, `backgroundImage`, `gradientOverlay`, `primaryAction`, `secondaryAction`

#### `GlassCard.jsx`
- **Purpose:** Card container with glassmorphism styling (blurred semi-transparent background).

#### `GlassButton.jsx`
- **Purpose:** CTA button with glassmorphism styling. Supports `primary` and `secondary` variants.

#### `CategoryChips.jsx`
- **Purpose:** Horizontal scrollable filter chips for selecting a service/product category.
- **Props:** `categories` (array), `activeCategory` (string), `onCategoryChange` (function)

#### `TrustBadge.jsx`
- **Purpose:** Small card displaying a trust indicator (icon + title + description).
- **Props:** `icon`, `title`, `description`

---

## 4. Pages Documentation

### Public Pages

#### `HomePage.jsx` → `/`
- **Purpose:** Main landing page showcasing the business.
- **Sections:**
  1. **Hero** — Full-viewport background image with animated headline, subtext, and CTA buttons
  2. **Trust Badges** — 4 animated badge cards (CSC Authorized, Genuine Parts, Expert Technicians, 1000+ Customers)
  3. **Services Overview** — 4 gradient service cards linking to respective pages
  4. **About** — Business stats (5+ years, 1000+ customers, 24/7 WhatsApp support)
  5. **CTA** — "Get in Touch" section
- **Components Used:** `Button`, Framer Motion animations, `react-helmet` for SEO
- **SEO:** Sets page title and meta description via `<Helmet>`

#### `CSCServicesPage.jsx` → `/csc-services`
- **Purpose:** Lists all CSC/Jan Seva Kendra services fetched from the backend API.
- **Features:** Dynamic category filtering via `CategoryChips`, service detail modal on click, loading/error states.
- **Components Used:** `HeroSection`, `CategoryChips`, `GlassCard`, `TrustBadge`, `ServiceDetailModal`
- **Data:** Fetched via `cscServicesAPI.getAll()` from Netlify Function

#### `MobileAccessoriesPage.jsx` → `/mobile-accessories`
- **Purpose:** Displays mobile accessories available in the shop.
- **Features:** Category filter chips, product grid, stock availability, discount display, product detail modal.
- **Components Used:** `HeroSection`, `CategoryChips`, `ProductCard`, `ProductModal`
- **Data:** Fetched via `accessoriesAPI.getAll()`

#### `MobileRepairingPage.jsx` → `/mobile-repairing`
- **Purpose:** Lists mobile repair services with pricing and device compatibility.
- **Components Used:** `HeroSection`, `GlassCard`, `TrustBadge`
- **Data:** Fetched via `repairingAPI.getAll()`

#### `ContactPage.jsx` → `/contact`
- **Purpose:** Contact form, shop address, business hours, phone/WhatsApp links.
- **Features:** Form submission via Netlify function, Google Maps embed or address display.

---

### Admin Pages

#### `admin/AdminLogin.jsx` → `/admin/login`
- **Purpose:** Login page for admin authentication.
- **Behavior:** Calls `login()` from `AdminContext` which hits the `admin-login` Netlify function. On success, JWT token is stored in `localStorage` and admin is redirected to dashboard.

#### `admin/AdminDashboard.jsx` → `/admin/dashboard` *(Protected)*
- **Purpose:** Main admin panel shell with a sidebar navigation (tabs) and animated content area.
- **Sections:** CSC Services tab, Mobile Accessories tab, Repairing Services tab
- **Guards:** Wrapped in `<ProtectedRoute>` in `App.jsx`

#### `admin/AdminCSCServices.jsx`
- **Purpose:** Full CRUD interface for CSC service entries.
- **Uses:** `AdminForm`, `AdminTable`, `cscServicesAPI`

#### `admin/AdminMobileAccessories.jsx`
- **Purpose:** Full CRUD interface for mobile accessory products.
- **Uses:** `AdminForm`, `AdminTable`, `accessoriesAPI`

#### `admin/AdminMobileRepairing.jsx`
- **Purpose:** Full CRUD interface for mobile repair listings.
- **Uses:** `AdminForm`, `AdminTable`, `repairingAPI`

---

## 5. Styling System

The project uses **Tailwind CSS** as its primary styling engine, extended with custom CSS variables for design tokens.

### `src/index.css`

#### Global Styles
- Imports **Google Fonts**: `Manrope` and `Poppins`
- Applies Tailwind directives: `@tailwind base`, `@tailwind components`, `@tailwind utilities`
- Sets an animated gradient background on `<body>` (`gradientBG` keyframe animation cycling blue → green → orange → purple)

#### CSS Variables (Design Tokens)

Defined in `:root` and overridden in `.dark`:

| Variable | Purpose |
|---|---|
| `--primary-gradient` | Blue → Green diagonal gradient |
| `--secondary-gradient` | Cyan → Blue diagonal gradient |
| `--glass-bg` | Semi-transparent white for glassmorphism |
| `--glass-border` | Subtle white border for glass effect |
| `--shadow-soft` / `--shadow-medium` | Layered shadow definitions |
| `--shadow-glow` | Blue glow effect for highlighted elements |
| `--radius-lg/md/sm` | Border radius scale (24px / 16px / 12px) |
| `--transition` | Smooth easing curve: `cubic-bezier(0.4, 0, 0.2, 1)` |
| `--background`, `--foreground` | Background and text base colors |
| `--primary`, `--destructive`, etc. | Radix UI compatible color tokens (in HSL) |

#### Custom Utility Classes

```css
.glass-card       /* Glassmorphism card: blur + semi-transparent bg + soft shadow */
.glass-button-primary  /* Gradient primary button style */
.text-shadow      /* Subtle text shadow for hero headings */
```

### `tailwind.config.js`

- Extends Tailwind theme with custom:
  - Font families (`font-display` for headings)
  - Animation keyframes (`gradient-x`, `float`, `fadeInUp`, etc.)
  - Custom shadow and border radius values
  - Color palette tokens mapped to CSS variables for Radix UI compatibility

---

## 6. Routing

The app uses **React Router DOM v7** with a nested route structure.

```
App (BrowserRouter)
│
├── / (MainLayout — Header + Footer wrapper)
│   ├── index          → HomePage
│   ├── csc-services   → CSCServicesPage
│   ├── mobile-accessories → MobileAccessoriesPage
│   ├── mobile-repairing   → MobileRepairingPage
│   └── contact        → ContactPage
│
├── /admin/login       → AdminLogin (public)
└── /admin/dashboard   → ProtectedRoute → AdminDashboard (JWT-protected)
```

### Route Details

| Path | Component | Access |
|---|---|---|
| `/` | `HomePage` | Public |
| `/csc-services` | `CSCServicesPage` | Public |
| `/mobile-accessories` | `MobileAccessoriesPage` | Public |
| `/mobile-repairing` | `MobileRepairingPage` | Public |
| `/contact` | `ContactPage` | Public |
| `/admin/login` | `AdminLogin` | Public |
| `/admin/dashboard` | `AdminDashboard` | 🔐 Protected (JWT) |

> **`ScrollToTop`** is rendered inside `BrowserRouter` to ensure every navigation resets scroll position to the top.

> **`Toaster`** is rendered globally inside `BrowserRouter` to make toast notifications available app-wide.

---

## 7. State Management

The application uses a **combination of React Context, local component state, and localStorage** — no external state management library (like Redux) is used.

### Global State — `AdminContext` (`src/context/AdminContext.jsx`)

Manages admin authentication state globally.

**State shape:**
```javascript
{
  isLoggedIn: Boolean,   // Whether admin is authenticated
  adminName: String,     // Username of the logged-in admin
  user: Object | null,   // Full user object from API
  loading: Boolean,      // API call in progress
  error: String | null,  // Login error message
}
```

**Actions exposed via context:**
- `login(username, password)` — Authenticates via `adminAPI.login()`, stores JWT in `localStorage`
- `logout()` — Clears token from `localStorage`, resets auth state

**Token persistence:** On initial load, the context reads `adminToken` and `adminUser` from `localStorage` to restore session across page refreshes.

**Consumer hook:** `useAdmin()` — any component can call `const { isLoggedIn, adminName, login, logout } = useAdmin();`

---

### Local Page State

Each data page manages its own state using `useState` + `useEffect`:

```javascript
const [items, setItems]       = useState([]);  // Data list
const [loading, setLoading]   = useState(true);
const [error, setError]       = useState(null);
const [activeCategory, ...]   = useState('All');
const [selectedItem, ...]     = useState(null);
const [isModalOpen, ...]      = useState(false);
```

Data is fetched on mount via `useEffect` calling the relevant API service.

---

### Custom Hook — `useLocalStorage` (`src/hooks/useLocalStorage.js`)

A utility hook that wraps `useState` and syncs values with `localStorage`.

```javascript
const [value, setValue] = useLocalStorage('key', defaultValue);
```

Available for use wherever persistent browser-side storage is needed.

---

## 8. Reusable Components

These components are designed to be generic and are used across multiple pages:

| Component | Used In | Purpose |
|---|---|---|
| `HeroSection` | `CSCServicesPage`, `MobileAccessoriesPage`, `MobileRepairingPage` | Reusable page banner with title, subtitle, badge, and CTAs |
| `GlassCard` | `CSCServicesPage`, `MobileRepairingPage` | Glassmorphism card container |
| `GlassButton` | Via `HeroSection` | Styled CTA button |
| `CategoryChips` | `CSCServicesPage`, `MobileAccessoriesPage` | Category filter tabs |
| `TrustBadge` | `CSCServicesPage`, `MobileRepairingPage`, `HomePage` | Credential/trust indicator card |
| `ProductCard` | `MobileAccessoriesPage` + Admin | Animated product display with admin controls |
| `AdminForm` | All 3 admin sub-pages | Generic CRUD form driven by field config |
| `AdminTable` | All 3 admin sub-pages | Generic data table for admin views |
| `DeleteConfirmation` | All admin sub-pages | Animated delete confirmation modal |
| `Button` (ui) | Throughout app | Consistent button with variant support |
| `useToast` + `Toaster` | Throughout app | In-app notifications |
| `ErrorBoundary` | App root | Catches and displays React render errors |
| `ScrollToTop` | App root | Resets scroll on route navigation |
| `ProtectedRoute` | Admin Dashboard | Guards routes behind authentication |

---

## 9. CSS Classes & Utilities

### Shared Utility — `cn()` (`src/lib/utils.js`)

```javascript
import { cn } from '@/lib/utils';

// Usage — merges Tailwind classes, resolves conflicts correctly
cn('px-4 py-2', isActive && 'bg-white text-blue-700', 'rounded-lg')
```

Uses `clsx` for conditional class merging and `tailwind-merge` to deduplicate/override conflicting Tailwind classes.

---

### Important Custom CSS Classes

| Class | Purpose |
|---|---|
| `.glass-card` | Glassmorphism: blurred semi-transparent white background + soft shadow |
| `.glass-button-primary` | Blue-to-green gradient button background |
| `.text-shadow` | Subtle text shadow for legibility on images |
| `font-display` | Applies custom display font (Poppins) via Tailwind config |
| `font-sans` | Applies base font (Manrope) via Tailwind config |
| `shadow-glow` | Blue glow shadow defined in `tailwind.config.js` |
| `animate-spin` | Used on loading spinners (Tailwind built-in) |
| `backdrop-blur-*` | Applied throughout for glassmorphism and overlay effects |

### Tailwind Patterns Used
- `bg-gradient-to-r from-blue-600 to-green-600` — Brand gradient
- `hover:scale-105 transition-all duration-300` — Hover scale interaction
- `min-h-screen flex flex-col` — Full-height flex layout
- `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` — Standard centered container
- `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4` — Responsive grid system
- `fixed inset-0 z-50` — Full-screen overlay/modal positioning

---

## 10. Dependencies

### Production Dependencies

| Package | Version | Purpose |
|---|---|---|
| `react` | ^18.3.1 | Core UI library |
| `react-dom` | ^18.3.1 | React DOM renderer |
| `react-router-dom` | ^7.1.1 | Client-side routing |
| `framer-motion` | ^11.15.0 | Animations and transitions |
| `lucide-react` | ^0.469.0 | SVG icon library |
| `react-helmet` | ^6.1.0 | SEO meta tag management |
| `@radix-ui/react-*` | various | Accessible headless UI primitives (Dialog, Toast, Button, etc.) |
| `class-variance-authority` | ^0.7.1 | Component variant management (used in `button.jsx`) |
| `clsx` | ^2.1.1 | Conditional CSS class utility |
| `tailwind-merge` | ^2.6.0 | Merges Tailwind class conflicts safely |
| `tailwindcss-animate` | ^1.0.7 | CSS animation utilities for Tailwind |
| `pg` | ^8.18.0 | PostgreSQL client (used in Netlify Functions) |
| `jsonwebtoken` | ^9.0.3 | JWT creation and verification (admin auth) |
| `bcryptjs` | ^3.0.3 | Password hashing for admin accounts |
| `dotenv` | ^17.2.4 | Loads environment variables in serverless functions |

### Development Dependencies

| Package | Purpose |
|---|---|
| `vite` | Fast build tool and dev server |
| `@vitejs/plugin-react` | Vite React plugin (Babel-based HMR) |
| `tailwindcss` | CSS utility framework |
| `postcss` + `autoprefixer` | CSS transforms and vendor prefixing |
| `eslint` + plugins | Code linting (rules for React, hooks, imports) |
| `@babel/parser` + `traverse` | Used by `tools/generate-llms.js` build tool |
| `terser` | JavaScript minification for production builds |
| `@types/react` + `@types/react-dom` | TypeScript type definitions |

---

## 11. How to Run the Project

### Prerequisites
- **Node.js** v18 or higher
- **npm** v9 or higher
- **Netlify CLI** (for local backend function emulation): `npm install -g netlify-cli`

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd sk_mobile_center_web

# Install all dependencies
npm install
```

### Environment Variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

Required variables (see `.env.example`):
```env
DATABASE_URL=postgresql://user:password@host:port/dbname
JWT_SECRET=your_jwt_secret_key
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=bcrypt_hashed_password
```

### Database Setup

```bash
# Initialize the PostgreSQL database schema
npm run init-db
```

### Running Locally (with Netlify Functions)

```bash
# Start the full dev environment (Vite + Netlify Functions)
netlify dev
```

Or to run frontend only (without backend functions):

```bash
npm run dev
```

The app runs at: **`http://localhost:3000`**
Netlify Functions available at: **`http://localhost:8888/.netlify/functions/`**

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint        # Errors only
npm run lint:warn   # Errors and warnings
```

---

## 12. Future Improvements

### 🚀 Performance
- **Image optimization** — Replace `<img>` with a `<picture>` element using WebP format and responsive `srcset` for all product and hero images
- **Code splitting** — Lazy-load admin pages with `React.lazy` and `<Suspense>` since they are never needed by public visitors
- **Skeleton loading** — Replace spinner loaders with skeleton screens for better perceived performance
- **Memoization** — Add `React.memo` and `useMemo` to expensive list renderings (product grids, category filtering)

### 📁 Structure
- **TypeScript migration** — Add `.tsx` types for component props, API response shapes, and context values to improve maintainability
- **Custom hooks** — Extract data-fetching logic from pages into dedicated hooks (e.g., `useCSCServices`, `useAccessories`)
- **Barrel exports** — Add `index.js` files to `components/`, `pages/`, and `ui/` for cleaner imports
- **Environment config** — Move hardcoded phone numbers and WhatsApp links to `.env` variables

### ♻️ Reusability
- **Generic list page** — `CSCServicesPage`, `MobileAccessoriesPage`, and `MobileRepairingPage` share nearly identical patterns; extract a `DataListPage` template component
- **Form validation library** — Integrate `react-hook-form` + `zod` for more robust, schema-based form validation in both `AdminForm` and `ContactPage`
- **Admin section pattern** — `AdminCSCServices`, `AdminMobileAccessories`, and `AdminMobileRepairing` are nearly identical; generalize into a single `AdminEntityManager` component

### 🎨 Styling
- **Dark mode** — CSS variables for `.dark` are partially defined; fully implement a theme toggle with `localStorage` persistence using the `useLocalStorage` hook
- **Design system** — Formalize design tokens in `tailwind.config.js` (spacing scale, typography scale, color palette) for more consistent styling
- **Responsive admin** — Improve tablet (`md`) breakpoints in `AdminDashboard` sidebar navigation
- **Accessibility** — Audit interactive elements for ARIA labels, keyboard navigation, and color contrast ratios

### 🔒 Security
- **Token refresh** — Implement JWT refresh token flow to avoid forcing admins to re-login every session
- **Rate limiting** — Add rate limiting to Netlify Function endpoints to prevent abuse
- **Input sanitization** — Add server-side sanitization of all incoming form data in Netlify Functions

---

*Documentation generated on 2026-02-28. Maintainer: SK Mobile Center Development Team.*
