This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

1. Navigate to Project Directory & Install Dependencies
   cd ulaman-clone

```bash
npm install
# atau
yarn install
# atau
pnpm install
# atau
bun install
```

2. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# Front End Implementation

## 1. Component Structure

In my project, I implemented a **well-organized Atomic Design structure** to ensure reusability and maintainability across all components.

### 🧩 Component Hierarchy

```
components/
├── ui/                    # Atomic components (Button-level)
│   ├── UnderlineLink.tsx
│   └── GridImages.tsx
├── animations/            # Reusable animation wrappers
│   ├── BeanieReveal.tsx
│   ├── SplitImageReveal.tsx
│   └── PageTransition.tsx
├── sections/              # Page-level sections (Organisms)
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Footer.tsx
│   └── Testimonials.tsx
├── room_sections/         # Feature-specific sections
│   ├── Description.tsx
│   ├── VillaDetails.tsx
│   └── Facilities.tsx
└── about_sections/        # Page-specific sections
    ├── Awards.tsx
    └── OurValues.tsx
```

### 🔁 Reusability Principles Applied

#### 1. Props-driven Components

All components are designed to receive props for maximum flexibility and scalability.

```typescript
interface DescriptionProps {
	title: string;
	subtitle: string;
	paragraphs: string[];
	buttonText?: string;
	buttonLink?: string;
}
```

#### 2. Composition Pattern

Components are designed to be nested using the **composition pattern**, allowing dynamic content insertion.

```tsx
<SplitImageReveal leftImage={...} rightImage={...}>
  <h2>Custom Content</h2>
</SplitImageReveal>
```

#### 3. Shared UI Components

Generic UI components like `UnderlineLink` are reused in multiple places (10+ instances across the site).

```tsx
<UnderlineLink href="#discover">DISCOVER</UnderlineLink>
```

#### 4. Generic Containers

Components like `GridImages` can be reused for any gallery structure or page.

```tsx
<GridImages
	images={galleryImages}
	columns={{ mobile: 2, tablet: 3, desktop: 3 }}
/>
```

## 2. State Management

### 🎯 Strategy Overview

The project adopts a **local-first state management strategy**, as each page operates independently without shared global data (e.g., no global theme, authentication, or cart logic).

| Type              | Scope            | Implementation              | Example                          |
| ----------------- | ---------------- | --------------------------- | -------------------------------- |
| **Local State**   | Component-level  | `useState`                  | Carousel index, form inputs      |
| **Scroll State**  | Section-level    | `useScroll` (Framer Motion) | Animation triggers               |
| **Ref State**     | DOM manipulation | `useRef`                    | Scroll containers, timeline refs |
| **Derived State** | Computed values  | `useMemo`, `useTransform`   | Scroll progress calculations     |

---

### ⚙️ Decision Matrix (Code Example)

```typescript
// ✅ LOCAL STATE: UI-only, not shared across components
const [currentSlide, setCurrentSlide] = useState(0);

// ✅ REF STATE: For DOM manipulation
const scrollContainerRef = useRef<HTMLDivElement>(null);

// ✅ DERIVED STATE: Computed from scroll progress
const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

// ❌ NO GLOBAL STATE: Not required since each page is self-contained
// Example: Theme, auth, or cart would require Zustand/Context in larger apps
```

---

### 🧠 Decision Rationale

- **Local state** is sufficient because UI data (like active slide or animation trigger) doesn’t need to persist between pages.
- **Framer Motion’s `useScroll`** and **React `useRef`** are used for scroll-based animation control.
- **Derived states** are computed dynamically to enhance performance without overcomplicating state handling.

---

### ✅ Summary

- The entire application uses **local and derived states only**.
- The decision avoids unnecessary complexity while ensuring **performance and maintainability**.
- Future scalability (e.g., global theme or auth) could integrate **Context API** or **Zustand** if needed.

## 3. Responsive Strategy

### 📱 Multi-Layer Responsive Approach

To ensure consistency across all screen sizes, I implemented a **multi-layer responsive strategy** using Tailwind CSS, container constraints, and viewport-based logic.

---

### 1. Tailwind Breakpoints

Responsive typography and layout adjustments are managed using Tailwind’s breakpoint utilities.

```typescript
className="
  text-[25px]      // Mobile base
  sm:text-[30px]   // 640px+
  md:text-[40px]   // 768px+
  lg:text-[50px]   // 1024px+
"
```

---

### 2. Container Queries

Centralized width and padding control for consistent spacing across all devices.

```typescript
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	{/* Content automatically adjusts */}
</div>
```

---

### 3. Aspect Ratio Control

Maintains image or video proportions consistently across devices.

```typescript
<div className="aspect-[3/4] md:aspect-[4/3] lg:aspect-[16/9]">
	<Image fill className="object-cover" />
</div>
```

---

### 4. Grid Responsiveness

Uses responsive grid columns for automatic layout adjustment.

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
	{/* Auto-responsive columns */}
</div>
```

---

### 5. Viewport-Based Calculations

Dynamically adjusts layout elements (e.g., height) based on scroll or viewport.

```typescript
// Dynamic height based on scroll progress
const currentHeight = minHeight + scrollProgress * (maxHeight - minHeight);
```

---

### 6. Conditional Rendering

Conditionally render UI elements based on screen size.

```typescript
<br className="hidden lg:block" /> // Line break only visible on desktop
```

---

### 7. Image Optimization

Implements responsive image loading to reduce bandwidth and improve performance.

```typescript
<Image
	sizes="(max-width: 768px) 100vw, 33vw" // Responsive loading
	priority={imageIndex < 2} // Above-the-fold priority
/>
```

---

### ✅ Summary

By combining **Tailwind breakpoints**, **grid layout**, **aspect ratios**, and **responsive images**, the project achieves:

- Consistent design across mobile, tablet, and desktop
- Optimized performance and bandwidth efficiency
- Maintainable and scalable responsive layout

## 4. Performance Optimization

### ⚡ Comprehensive Next.js Optimization Strategy

To achieve minimal bundle size and rapid loading times, the project implements a **multi-faceted performance strategy** utilizing native Next.js features and modern web best practices.

---

### A. Image Optimization & Modern Formats

We leverage Next.js's built-in Image Component and configuration to ensure images are served efficiently and responsively.

```typescript
// next.config.ts
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

### B. Package Optimization:

// next.config.ts
experimental: {
optimizePackageImports: ['lucide-react', 'framer-motion'],
}

### C. Component-Level Dynamic Imports:

Non-critical or large components are loaded only when necessary using dynamic imports, enabling Code Splitting at the component level.

const GridImages = dynamic(() => import('@/components/ui/GridImages'), {
loading: () => <Skeleton />,
ssr: false
})

```

**. Code Splitting by Route:**
```

app/
├── page.tsx // Home bundle
├── about/page.tsx // About bundle
└── rooms/\*/page.tsx // Rooms bundle

## 5. Data Fetching: Data Structure for Scalability

### 📐 JSON Structure Strategy for Multiple Page Types

To ensure the local JSON data is **scalable** and can effectively support diverse page types (Home, About, Rooms, Facilities), the current fragmented structure is refactored into a unified, hierarchical content model.

---

### Current JSON Structure Analysis

The current structure suffers from **fragmentation** and **tight coupling**, making it difficult to scale and maintain.

```typescript
// gallery-images.json
{
  "home": GalleryImage[],      // Fragmented: Data is separated by concern
  "about": GalleryImage[],
  // ...
}
// locations.json
{
  "locations": Location[]     // Scattered: Content types are in separate files
}
```

### Scalable Structure Proposal: Unified content.json

The proposal moves towards a Page-Centric Content Model by consolidating all page-specific content into one primary file, structured by a clear hierarchy.
// data/content.json
{
"pages": {
"home": {
"meta": { title, description, keywords },
"hero": { image, title, subtitle },
"sections": [
{ type: "about", data: {...} },
{ type: "gallery", data: {...} }
]
},
"rooms": {
"floating-lake": {
"meta": {...},
"description": {...},
"facilities": [...],
"gallery": [...]
}
}
},
"shared": {
"footer": {...},
"navigation": {...}
}
}

### Type-Safe Data Layer Implementation (TypeScript)

A dedicated data layer is created to ensure type-safe access and abstract the raw JSON structure from the UI components.

// lib/types/content.ts
export interface PageContent {
meta: SEOMetadata
sections: Section[]
}

export interface Section {
type: 'hero' | 'gallery' | 'description' | 'testimonials'
data: unknown
}

// lib/data/index.ts
export function getPageContent(page: string): PageContent {
return contentData.pages[page]
}

## 6. Data Integration Strategy (Local JSON)

💾 Built-in Caching for Static Data
Since the project uses static local JSON data (no API, no explicit error handling,
no manual loading state), the data integrity and freshness are managed by leveraging Next.js's
native features.

## 7. Content Structure: Organizing Content Types

🚧 Current Structure Analysis (As Per Provided Files)
The project currently uses a fragmented and unscalable structure where content is not centrally organized:

Hardcoded Data: Content for Rooms/Packages (Rooms.tsx) and Facilities/Benefits (Facilities.tsx) is hardcoded directly within the React component files as default props.

Fragmented JSON: The Gallery content (gallery-images.json) is separated into multiple, often redundant categories (home, about, wellness, aboutGalleryImages), leading to maintenance issues.

## 8. 🚀 Vercel Deployment: Optimal Performance ConfigurationOptimal performance is achieved by leveraging Next.js's native features, focusing on aggressive caching and static delivery.

### The optimal Vercel deployment relies on inherent Next.js performance features, given the use of static data.

``
Core Build Strategy: Pages are rendered to static HTML during build time (SSG) due to local data, ensuring instant loading (zero latency).

Edge Caching: All static assets are automatically cached and served via the Vercel Global CDN.

Data Freshness: The export const revalidate setting is used on server components to control when static pages are regenerated.

Asset Optimization: Next.js configuration manages aggressive, long-term caching for optimized images, and next/font ensures efficient, self-hosted font loading.
``

## 9. Environment Setup: How do you set up environment variables for development vs production?

However, to ensure Best Practices and future readiness:

Recommendation: If the project later adds an external API URL,
I would immediately implement the ENV structure (.env.local, .env.production) and
type-safe validation (Zod). This ensures a clean and secure separation between the Development and Production environments.

## 10. 🖼️ Asset Optimization Strategy

The asset optimization strategy is multi-layered, relying heavily on Next.js's native features to ensure the fastest possible loading times for images, fonts, and static resources.

---

### 1. Image Optimization Strategy

We implement component-level and configuration-level optimizations to minimize image file sizes and delivery latency.

- **Responsive Delivery:** Utilizing the **Next.js `Image` Component** with the **`sizes`** property ensures the browser downloads the **smallest optimal image size** based on the user's viewport, preventing unnecessary bandwidth consumption.
- **Modern Formats:** Configuration in `next.config.ts` enforces **automatic conversion** to modern, highly compressed formats (**AVIF** and **WebP**), significantly reducing file size compared to traditional formats (JPEG/PNG).

---

### 2. Font Optimization

Font loading is optimized to eliminate external requests and prevent layout shifts.

- **Self-Hosting & Performance:** We use **`next/font`** (for Google Fonts) and local `@font-face` declarations (for custom fonts). This strategy **eliminates third-party hosting requests** and latency.
- **FOIT Prevention:** Setting **`font-display: swap`** on all fonts ensures that content text remains visible (using a fallback font) while the custom web font loads in the background, preventing the **Flash of Invisible Text (FOIT)**.
- **Preloading:** Critical fonts are **preloaded** via the `next/font` configuration to initiate the download process as early as possible.

## 11. API Design:

"Not Applicable (N/A). This project does not implement a backend,
custom API, or Laravel Filament. All data consumption
is handled via Static Local JSON imports on the frontend, rendering an API design
strategy unnecessary."

## 12. Content Modeling:

N/A (Not Applicable).
This project does not implement a backend database (such as MySQL/PostgreSQL)
or a Content Management System (CMS).

## 13. Admin UX:

N/A (Not Applicable).
This project does not implement a backend or a Content Management System (CMS)
admin panel.

## 14. 📂 Code Organization:

The project structure adheres to the Next.js App Router convention combined with a
Domain-Centric Component Architecture to ensure clean separation of concerns,
easy collaboration, and clear pathways for future scalability.

### 1. Separation of Concerns (File Structure)

    The project is structured to strictly separate logic, data, and presentation:

- app/ Directory: Handles routing, metadata, and the core application layout.

- lib/data/ Directory: Centralized Data Layer. Stores all static JSON files (e.g., gallery-images.json, testimonials.json, experiences.json, locations.json), ensuring content is decoupled from the UI.

- components/ Directory: Contains all reusable UI components, divided by their role:

- sections/: Large, page-level components (e.g., Hero.tsx, Rooms.tsx, Gallery.tsx).

- room_sections/: Components specific to the Room pages (e.g., Facilities.tsx, GalleryRooms.tsx, VillaDetails.tsx).

- ui/: Small, highly reusable atomic components (e.g., GridImages.tsx, UnderlineLink.tsx).

### 2. Strategy for Collaboration

- Conventional Naming: Using clear, descriptive file and folder names (e.g., room_sections, animations) makes it easy for new collaborators to find specific code quickly.

- TypeScript: All components use TypeScript (.tsx) for type checking, ensuring data consistency and catching errors early during development.

## 15. ⚠️ Error Handling: Strategy

Since this project relies solely on static local data and does not involve network calls (APIs),
the error handling strategy is minimal and implicit.

Current Implicit Strategy
Fatal Data Errors: Malformed JSON or missing files will be caught and cause a Next.js build failure, preventing the deployment of a broken application.
