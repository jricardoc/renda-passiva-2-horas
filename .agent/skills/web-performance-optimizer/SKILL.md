---
name: web-performance-optimizer
description: Expert in web performance optimization, accessibility (a11y), SEO, and best practices. Specialist in achieving perfect scores (100/100) on PageSpeed Insights, Lighthouse, and Core Web Vitals. Covers React/Next.js optimization, image handling, lazy loading, code splitting, caching strategies, semantic HTML, ARIA, and technical SEO. Use when optimizing web applications or debugging performance issues.
version: 1.0.0
---

# Web Performance & Optimization Expert

This skill acts as a **Senior Performance Engineer, Accessibility Specialist, and SEO Expert**. It provides comprehensive strategies to achieve perfect scores on Google PageSpeed Insights, Lighthouse, and Web Vitals metrics.

## Core Objectives

1. **Optimize** Core Web Vitals (LCP, FID, CLS)
2. **Improve** Lighthouse scores to 100/100 across all categories
3. **Implement** advanced accessibility (WCAG 2.1 AAA compliance)
4. **Maximize** SEO performance and discoverability
5. **Apply** modern web best practices

---

## 1. Core Web Vitals (The Holy Trinity)

### 1.1 Largest Contentful Paint (LCP) - Target: < 2.5s

**What it measures:** Time until the largest visible element is rendered.

**Common Culprits:**

- Unoptimized images
- Slow server response (TTFB)
- Render-blocking resources
- Client-side rendering delays

**Optimization Strategies:**

#### 🖼️ Image Optimization

```typescript
// ❌ BAD - Unoptimized image
<img src="/hero.jpg" alt="Hero" />

// ✅ GOOD - Modern formats with responsive sizes
<picture>
  <source
    srcset="/hero.avif"
    type="image/avif"
  />
  <source
    srcset="/hero.webp"
    type="image/webp"
  />
  <img
    src="/hero.jpg"
    alt="Hero image showing..."
    width="1200"
    height="630"
    loading="eager" // For LCP image
    fetchpriority="high" // Priority hint
    decoding="async"
  />
</picture>

// ✅ BEST - Next.js Image component
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={630}
  priority // Preloads LCP image
  quality={85}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

#### ⚡ Preload Critical Resources

```html
<!-- In <head> -->
<link
  rel="preload"
  href="/fonts/inter-var.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
<link rel="preload" href="/hero.webp" as="image" type="image/webp" />
<link rel="preload" href="/critical.css" as="style" />

<!-- Preconnect to external domains -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="dns-prefetch" href="https://analytics.google.com" />
```

#### 🎯 Critical CSS Inlining

```typescript
// Extract critical CSS (above-the-fold)
// Tools: critical, critters, @fullhuman/postcss-purgecss

// next.config.js
module.exports = {
  experimental: {
    optimizeCss: true, // Automatic critical CSS
  }
}

// Manual approach
// 1. Identify critical styles
// 2. Inline in <head>
// 3. Defer non-critical CSS
<style>
  /* Critical CSS here */
  .hero { display: flex; height: 100vh; }
</style>
<link
  rel="preload"
  href="/styles.css"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
>
```

#### 🚀 Server Response Time (TTFB < 200ms)

```typescript
// Use edge caching (Cloudflare, Vercel Edge)
export const config = {
  runtime: 'edge', // Next.js edge runtime
}

// Enable HTTP/2 Server Push
// In server (Express)
app.get('/', (req, res) => {
  res.push('/critical.css');
  res.push('/app.js');
  res.render('index');
});

// Use CDN for static assets
const CDN_URL = 'https://cdn.yourdomain.com';
<img src={`${CDN_URL}/images/hero.webp`} />
```

---

### 1.2 First Input Delay (FID) / Interaction to Next Paint (INP) - Target: < 100ms

**What it measures:** Time from user interaction to browser response.

**Common Culprits:**

- Large JavaScript bundles
- Long-running tasks (>50ms)
- Main thread blocking
- Heavy third-party scripts

**Optimization Strategies:**

#### 📦 Code Splitting & Lazy Loading

```typescript
// ❌ BAD - Import everything upfront
import HeavyComponent from './HeavyComponent';
import Chart from './Chart';
import Modal from './Modal';

// ✅ GOOD - Dynamic imports
const HeavyComponent = lazy(() => import('./HeavyComponent'));
const Chart = lazy(() => import('./Chart'));
const Modal = lazy(() => import('./Modal'));

// With Suspense
<Suspense fallback={<Skeleton />}>
  <HeavyComponent />
</Suspense>

// Route-based splitting (React Router)
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

<Routes>
  <Route path="/" element={
    <Suspense fallback={<PageLoader />}>
      <Dashboard />
    </Suspense>
  } />
</Routes>
```

#### 🧵 Web Workers for Heavy Tasks

```typescript
// worker.ts
self.addEventListener("message", (e) => {
  const { data } = e;

  // Heavy computation
  const result = expensiveCalculation(data);

  self.postMessage(result);
});

// main.ts
const worker = new Worker("/worker.js");

worker.postMessage({ trades: largeDataset });

worker.onmessage = (e) => {
  const result = e.data;
  updateUI(result);
};
```

#### ⏱️ requestIdleCallback for Non-Critical Work

```typescript
// Defer non-critical work
if ("requestIdleCallback" in window) {
  requestIdleCallback(
    () => {
      // Analytics
      trackPageView();

      // Prefetch next page
      prefetchRoutes();
    },
    { timeout: 2000 },
  );
} else {
  setTimeout(deferredWork, 1);
}
```

#### 🎯 Third-Party Script Optimization

```html
<!-- ❌ BAD - Blocking scripts -->
<script src="https://analytics.com/script.js"></script>

<!-- ✅ GOOD - Async/Defer -->
<script src="https://analytics.com/script.js" async></script>
<script src="https://ads.com/script.js" defer></script>

<!-- ✅ BEST - Load on interaction -->
<button onclick="loadChat()">Chat</button>
<script>
  function loadChat() {
    const script = document.createElement("script");
    script.src = "https://chat.com/widget.js";
    document.body.appendChild(script);
  }
</script>
```

#### 📊 Bundle Size Optimization

```typescript
// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    // Analyze bundle
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // Group by package name
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              return `npm.${packageName.replace('@', '')}`;
            },
          },
        },
      };
    }
    return config;
  },

  // Tree shaking
  sideEffects: false,
};

// Use bundle analyzer
npm install --save-dev @next/bundle-analyzer

// Add to next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // ... config
});

// Run: ANALYZE=true npm run build
```

---

### 1.3 Cumulative Layout Shift (CLS) - Target: < 0.1

**What it measures:** Visual stability (unexpected layout shifts).

**Common Culprits:**

- Images without dimensions
- Ads/embeds without reserved space
- Web fonts causing FOIT/FOUT
- Dynamic content injection

**Optimization Strategies:**

#### 📐 Always Set Image Dimensions

```typescript
// ❌ BAD - No dimensions (causes layout shift)
<img src="/avatar.jpg" alt="Avatar" />

// ✅ GOOD - Fixed dimensions
<img
  src="/avatar.jpg"
  alt="Avatar"
  width="80"
  height="80"
/>

// ✅ BEST - Aspect ratio (CSS)
.image-container {
  aspect-ratio: 16 / 9;
  width: 100%;
}

<div className="image-container">
  <img src="/video-thumb.jpg" alt="Thumbnail" />
</div>
```

#### 🎨 Font Loading Strategy

```css
/* ❌ BAD - Flash of Invisible Text (FOIT) */
@import url("https://fonts.googleapis.com/css2?family=Inter");

/* ✅ GOOD - font-display: swap */
@font-face {
  font-family: "Inter";
  src: url("/fonts/inter.woff2") format("woff2");
  font-display: swap; /* Show fallback immediately */
  font-weight: 100 900;
}

/* ✅ BEST - Preload + size-adjust */
/* In <head> */
<link 
  rel="preload" 
  href="/fonts/inter-var.woff2" 
  as="font" 
  type="font/woff2" 
  crossorigin
>

/* CSS */
@font-face {
  font-family: "Inter";
  src: url("/fonts/inter-var.woff2") format("woff2");
  font-display: optional; /* Only use if cached */
  ascent-override: 90%;
  descent-override: 22%;
  line-gap-override: 0%;
  size-adjust: 107%; /* Match fallback font metrics */
}

/* Fallback with similar metrics */
body {
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}
```

#### 📦 Reserve Space for Dynamic Content

```typescript
// ❌ BAD - Ad pops in without space
<div id="ad-slot"></div>

// ✅ GOOD - Reserve space
<div
  id="ad-slot"
  style={{
    minHeight: '250px',
    width: '300px',
    backgroundColor: '#f0f0f0'
  }}
>
  {/* Ad loads here */}
</div>

// For loading skeletons
const Skeleton = () => (
  <div className="skeleton" style={{ height: '400px' }}>
    <div className="skeleton-header" />
    <div className="skeleton-content" />
  </div>
);

{loading ? <Skeleton /> : <ActualContent />}
```

#### 🎭 CSS Transforms Instead of Layout Properties

```css
/* ❌ BAD - Causes layout shift */
.animate {
  transition:
    width 0.3s,
    height 0.3s,
    top 0.3s;
}

/* ✅ GOOD - GPU-accelerated, no layout */
.animate {
  transition:
    transform 0.3s,
    opacity 0.3s;
  will-change: transform; /* Hint to browser */
}

/* Transform instead of top/left */
.slide-in {
  transform: translateY(-100%);
}
.slide-in.active {
  transform: translateY(0);
}
```

---

## 2. Advanced Image Optimization

### 2.1 Modern Image Formats

**Format Priority:**

1. **AVIF** - Best compression (50% smaller than JPEG)
2. **WebP** - Great compression (30% smaller than JPEG)
3. **JPEG/PNG** - Fallback

```typescript
// Automatic format conversion (Next.js)
// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
  },
}

// Usage
<Image
  src="/photo.jpg"
  alt="Photo"
  width={800}
  height={600}
  // Automatically serves AVIF/WebP if supported
/>
```

### 2.2 Responsive Images

```html
<!-- Manual responsive images -->
<img
  srcset="/small.webp 480w, /medium.webp 800w, /large.webp 1200w"
  sizes="
    (max-width: 600px) 480px,
    (max-width: 1000px) 800px,
    1200px
  "
  src="/large.webp"
  alt="Responsive image"
  width="1200"
  height="800"
  loading="lazy"
/>
```

### 2.3 Lazy Loading Strategy

```typescript
// Images below the fold
<img
  src="/image.jpg"
  alt="Below fold"
  loading="lazy" // Native lazy loading
  decoding="async"
/>

// Intersection Observer (custom)
const useLazyLoad = (ref: RefObject<HTMLElement>) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src!;
          observer.unobserve(img);
        }
      },
      { rootMargin: '50px' } // Load 50px before visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref]);
};

// Usage
<img
  ref={imgRef}
  data-src="/image.jpg"
  alt="Lazy loaded"
/>
```

### 2.4 Image CDN & Optimization Services

```typescript
// Cloudinary
const optimizedUrl = `https://res.cloudinary.com/demo/image/upload/
  f_auto,        // Auto format (AVIF/WebP)
  q_auto,        // Auto quality
  w_800,         // Width
  c_limit        // Don't upscale
/sample.jpg`;

// Imgix
const imgixUrl = `https://demo.imgix.net/image.jpg?
  auto=format,compress&  // Auto format & compression
  w=800&                 // Width
  fit=max&               // Fit mode
  q=75                   // Quality
`;

// Cloudflare Images
const cfImageUrl = `https://imagedelivery.net/your-account/image-id/public`;
```

---

## 3. JavaScript Optimization

### 3.1 Code Splitting Strategies

```typescript
// Route-based splitting (automatic with Next.js)
// pages/dashboard.tsx automatically creates separate chunk

// Component-based splitting
const HeavyChart = lazy(() => import("./HeavyChart"));
const AdminPanel = lazy(() => import("./AdminPanel"));

// Conditional loading
const loadAdmin = () => {
  if (user.role === "admin") {
    return import("./AdminPanel");
  }
};

// Library splitting (use lighter alternatives)
// ❌ moment.js (288KB) → ✅ date-fns (13KB) or dayjs (7KB)
import { format } from "date-fns";

// ❌ lodash (71KB) → ✅ Individual imports
import debounce from "lodash/debounce"; // Only 2KB
```

### 3.2 Tree Shaking

```typescript
// package.json
{
  "sideEffects": false // Enable aggressive tree shaking
}

// Or specify files with side effects
{
  "sideEffects": ["*.css", "*.scss"]
}

// Import only what you need
// ❌ BAD
import _ from 'lodash';
_.debounce(fn, 300);

// ✅ GOOD
import debounce from 'lodash/debounce';
debounce(fn, 300);
```

### 3.3 Minification & Compression

```typescript
// next.config.js
module.exports = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Enable SWC minification (faster than Terser)
  swcMinify: true,

  compress: true, // Gzip/Brotli
};

// Webpack alternative
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
        },
      }),
    ],
  },
};
```

---

## 4. Accessibility (a11y) - WCAG 2.1 AAA

### 4.1 Semantic HTML

```html
<!-- ❌ BAD - Div soup -->
<div class="header">
  <div class="nav">
    <div class="nav-item">Home</div>
  </div>
</div>

<!-- ✅ GOOD - Semantic elements -->
<header>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Article Title</h1>
    <section>
      <h2>Section Title</h2>
      <p>Content...</p>
    </section>
  </article>

  <aside aria-label="Related content">
    <h2>Related Articles</h2>
  </aside>
</main>

<footer>
  <p>&copy; 2024 Company</p>
</footer>
```

### 4.2 ARIA Labels & Roles

```typescript
// Buttons and links
<button
  aria-label="Close dialog"
  aria-describedby="close-description"
>
  <X /> {/* Icon only */}
</button>
<span id="close-description" className="sr-only">
  Closes the dialog and returns to the previous page
</span>

// Form inputs
<label htmlFor="email">Email address</label>
<input
  id="email"
  type="email"
  aria-required="true"
  aria-invalid={errors.email ? 'true' : 'false'}
  aria-describedby="email-error"
/>
{errors.email && (
  <span id="email-error" role="alert" aria-live="polite">
    {errors.email.message}
  </span>
)}

// Loading states
<div
  role="status"
  aria-live="polite"
  aria-busy={loading}
>
  {loading ? 'Loading...' : 'Content loaded'}
</div>

// Dialog/Modal
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
  <h2 id="dialog-title">Confirmation</h2>
  <p id="dialog-description">Are you sure?</p>
</div>
```

### 4.3 Keyboard Navigation

```typescript
// Focus management
const Modal = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store current focus
      previousFocus.current = document.activeElement as HTMLElement;

      // Focus modal
      modalRef.current?.focus();

      // Trap focus within modal
      const handleTab = (e: KeyboardEvent) => {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (!focusableElements) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      document.addEventListener('keydown', handleTab);
      return () => document.removeEventListener('keydown', handleTab);
    } else {
      // Restore previous focus
      previousFocus.current?.focus();
    }
  }, [isOpen]);

  return (
    <div
      ref={modalRef}
      role="dialog"
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
      }}
    >
      {/* Modal content */}
    </div>
  );
};

// Skip to main content
<a href="#main-content" className="skip-link">
  Skip to main content
</a>

<main id="main-content" tabIndex={-1}>
  {/* Content */}
</main>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
</style>
```

### 4.4 Color Contrast

```css
/* WCAG AAA requires 7:1 contrast ratio for normal text */
/* WCAG AA requires 4.5:1 */

/* ❌ BAD - Low contrast */
.text-gray {
  color: #999; /* Only 2.8:1 on white */
}

/* ✅ GOOD - High contrast */
.text-dark {
  color: #333; /* 12.6:1 on white */
}

/* Test contrast: https://webaim.org/resources/contrastchecker/ */

/* Error states */
.error {
  color: #c0392b; /* 5.1:1 - WCAG AA compliant */
  font-weight: 600; /* Don't rely on color alone */
}
```

### 4.5 Screen Reader Support

```typescript
// Visually hidden but screen-reader accessible
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

// Live regions for dynamic content
<div aria-live="polite" aria-atomic="true">
  {notifications.map(n => (
    <div key={n.id} role="status">
      {n.message}
    </div>
  ))}
</div>

// Progress indicators
<div
  role="progressbar"
  aria-valuenow={progress}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label="Upload progress"
>
  <div style={{ width: `${progress}%` }} />
</div>
<span className="sr-only">{progress}% complete</span>
```

---

## 5. SEO Optimization

### 5.1 Meta Tags (Complete Set)

```tsx
// Next.js App Router (app/layout.tsx)
import { Metadata } from "next";

export const metadata: Metadata = {
  // Basic metadata
  title: {
    default: "Site Name - Tagline",
    template: "%s | Site Name", // For page-specific titles
  },
  description:
    "Compelling description under 160 characters that includes primary keywords",

  // Keywords (less important now, but doesn't hurt)
  keywords: ["trading", "copytrading", "finance", "investment"],

  // Authors
  authors: [{ name: "Your Name", url: "https://yourdomain.com" }],
  creator: "Your Company",
  publisher: "Your Company",

  // Open Graph (Facebook, LinkedIn)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourdomain.com",
    siteName: "Site Name",
    title: "Page Title for Social Sharing",
    description: "Description for social media previews",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Image description",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@yourusername",
    creator: "@yourusername",
    title: "Twitter-specific title",
    description: "Twitter-specific description",
    images: ["https://yourdomain.com/twitter-image.jpg"],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  // Manifest
  manifest: "/site.webmanifest",

  // Alternates (for multi-language)
  alternates: {
    canonical: "https://yourdomain.com",
    languages: {
      "en-US": "https://yourdomain.com",
      "pt-BR": "https://yourdomain.com/pt-br",
    },
  },

  // Verification
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    bing: "your-bing-verification-code",
  },
};

// Page-specific metadata
// app/about/page.tsx
export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about our company",
};
```

### 5.2 Structured Data (JSON-LD)

```tsx
// Organization schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Your Company",
  url: "https://yourdomain.com",
  logo: "https://yourdomain.com/logo.png",
  sameAs: [
    "https://facebook.com/yourpage",
    "https://twitter.com/yourhandle",
    "https://linkedin.com/company/yourcompany",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-555-555-5555",
    contactType: "Customer Service",
  },
};

// Article schema
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Article Title",
  image: "https://yourdomain.com/article-image.jpg",
  author: {
    "@type": "Person",
    name: "Author Name",
  },
  publisher: {
    "@type": "Organization",
    name: "Publisher Name",
    logo: {
      "@type": "ImageObject",
      url: "https://yourdomain.com/logo.png",
    },
  },
  datePublished: "2024-01-01",
  dateModified: "2024-01-15",
};

// Breadcrumb schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://yourdomain.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Category",
      item: "https://yourdomain.com/category",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Current Page",
      item: "https://yourdomain.com/category/page",
    },
  ],
};

// Add to page
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
/>;
```

### 5.3 Sitemap & Robots.txt

```typescript
// app/sitemap.ts (Next.js)
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://yourdomain.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://yourdomain.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://yourdomain.com/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];
}

// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/private/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        crawlDelay: 1,
      },
    ],
    sitemap: "https://yourdomain.com/sitemap.xml",
  };
}
```

### 5.4 Canonical URLs

```tsx
// Prevent duplicate content issues
<link rel="canonical" href="https://yourdomain.com/page" />

// For paginated content
<link rel="prev" href="https://yourdomain.com/page/1" />
<link rel="next" href="https://yourdomain.com/page/3" />

// For multi-language
<link rel="alternate" hreflang="en" href="https://yourdomain.com" />
<link rel="alternate" hreflang="pt-BR" href="https://yourdomain.com/pt-br" />
<link rel="alternate" hreflang="x-default" href="https://yourdomain.com" />
```

---

## 6. Caching Strategies

### 6.1 HTTP Caching Headers

```typescript
// Next.js API Route
export async function GET(request: Request) {
  const data = await fetchData();

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      // public: Cacheable by CDN
      // s-maxage: CDN cache duration (1 hour)
      // stale-while-revalidate: Serve stale while fetching fresh (24 hours)
    },
  });
}

// Static assets (Nginx)
location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

// HTML (no cache, revalidate)
location ~* \.html$ {
    expires -1;
    add_header Cache-Control "no-cache, must-revalidate";
}
```

### 6.2 Service Worker Caching

```typescript
// sw.js (Workbox)
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import {
  CacheFirst,
  StaleWhileRevalidate,
  NetworkFirst,
} from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";

// Precache static assets
precacheAndRoute(self.__WB_MANIFEST);

// Cache images
registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "images",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  }),
);

// Cache API requests
registerRoute(
  ({ url }) => url.pathname.startsWith("/api/"),
  new StaleWhileRevalidate({
    cacheName: "api-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 5 * 60, // 5 minutes
      }),
    ],
  }),
);

// Cache HTML (Network First)
registerRoute(
  ({ request }) => request.destination === "document",
  new NetworkFirst({
    cacheName: "html-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 10,
      }),
    ],
  }),
);
```

### 6.3 Next.js ISR (Incremental Static Regeneration)

```typescript
// app/blog/[slug]/page.tsx
export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  return <Article post={post} />;
}

// Revalidate on-demand
// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  const { path } = await request.json();
  revalidatePath(path);
  return Response.json({ revalidated: true });
}
```

---

## 7. Performance Monitoring

### 7.1 Web Vitals Tracking

```typescript
// app/layout.tsx
import { Suspense } from 'react';
import { WebVitals } from '@/components/web-vitals';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Suspense>
          <WebVitals />
        </Suspense>
      </body>
    </html>
  );
}

// components/web-vitals.tsx
'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Send to analytics
    console.log(metric);

    // Send to your analytics service
    if (metric.label === 'web-vital') {
      gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_label: metric.id,
        non_interaction: true,
      });
    }
  });

  return null;
}
```

### 7.2 Performance Budget

```typescript
// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.performance = {
        maxAssetSize: 244000, // 244 KB
        maxEntrypointSize: 244000,
        hints: "warning",
      };
    }
    return config;
  },
};

// .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      staticDistDir: "./out",
      numberOfRuns: 3,
    },
    assert: {
      preset: "lighthouse:recommended",
      assertions: {
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 1 }],
        "categories:seo": ["error", { minScore: 0.9 }],
        "first-contentful-paint": ["error", { maxNumericValue: 2000 }],
        "largest-contentful-paint": ["error", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
        "total-blocking-time": ["error", { maxNumericValue: 300 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
```

---

## 8. Checklist: 100/100 on PageSpeed

### Performance

- [ ] LCP < 2.5s
- [ ] FID/INP < 100ms
- [ ] CLS < 0.1
- [ ] Images optimized (AVIF/WebP)
- [ ] Images have width/height
- [ ] Critical CSS inlined
- [ ] JavaScript code-split
- [ ] Third-party scripts async/deferred
- [ ] Fonts preloaded with font-display: swap
- [ ] TTFB < 600ms
- [ ] Enable HTTP/2 or HTTP/3
- [ ] Enable compression (Brotli/Gzip)
- [ ] Minify CSS/JS/HTML
- [ ] Remove unused CSS/JS
- [ ] CDN for static assets
- [ ] Service Worker caching

### Accessibility

- [ ] Color contrast ≥ 4.5:1 (AA) or 7:1 (AAA)
- [ ] All images have alt text
- [ ] Semantic HTML (header, nav, main, footer)
- [ ] ARIA labels where needed
- [ ] Keyboard navigable
- [ ] Focus indicators visible
- [ ] Form labels associated
- [ ] Error messages descriptive
- [ ] Skip to main content link
- [ ] Headings in logical order (h1 → h2 → h3)
- [ ] Lang attribute on <html>
- [ ] No automated carousels or auto-play

### SEO

- [ ] Unique, descriptive <title> (50-60 chars)
- [ ] Meta description (150-160 chars)
- [ ] Canonical URL set
- [ ] Open Graph tags
- [ ] Twitter Card tags
- [ ] Structured data (JSON-LD)
- [ ] Sitemap.xml generated
- [ ] Robots.txt configured
- [ ] Mobile-friendly (responsive)
- [ ] HTTPS enabled
- [ ] 404 page exists
- [ ] Internal linking strategy
- [ ] Image alt tags descriptive
- [ ] URLs descriptive and readable
- [ ] Page load speed optimized

### Best Practices

- [ ] HTTPS everywhere
- [ ] No console errors
- [ ] No deprecated APIs
- [ ] Secure cookies (SameSite, Secure)
- [ ] CSP headers set
- [ ] No mixed content (HTTP on HTTPS)
- [ ] Images use correct aspect ratio
- [ ] No document.write()
- [ ] No passive event listeners warnings
- [ ] Permissions policy set
- [ ] Referrer policy set

---

## 9. Tools & Testing

### 9.1 Performance Testing Tools

```bash
# Lighthouse CLI
npm install -g lighthouse
lighthouse https://yourdomain.com --view

# Web Vitals Chrome Extension
# https://chrome.google.com/webstore/detail/web-vitals/

# PageSpeed Insights API
curl "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://yourdomain.com&category=performance&category=accessibility&category=seo"

# WebPageTest
# https://www.webpagetest.org/
```

### 9.2 Accessibility Testing

```bash
# axe DevTools
npm install --save-dev @axe-core/cli
axe https://yourdomain.com

# WAVE
# https://wave.webaim.org/

# Pa11y
npm install -g pa11y
pa11y https://yourdomain.com
```

### 9.3 SEO Testing

```bash
# Google Rich Results Test
# https://search.google.com/test/rich-results

# Schema.org Validator
# https://validator.schema.org/

# Mobile-Friendly Test
# https://search.google.com/test/mobile-friendly
```

---

## 10. Common Anti-Patterns to Avoid

### ❌ Render-Blocking Resources

```html
<!-- BAD -->
<link rel="stylesheet" href="/styles.css" />
<script src="/app.js"></script>

<!-- GOOD -->
<link
  rel="preload"
  href="/styles.css"
  as="style"
  onload="this.rel='stylesheet'"
/>
<script src="/app.js" defer></script>
```

### ❌ Unoptimized Images

```jsx
// BAD
<img src="/huge-image.jpg" />

// GOOD
<Image src="/image.jpg" width={800} height={600} alt="Description" />
```

### ❌ Client-Side Rendering Everything

```jsx
// BAD - CSR only
export default function Page() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/api").then(setData);
  }, []);
  return <div>{data?.content}</div>;
}

// GOOD - SSR/SSG
export async function getStaticProps() {
  const data = await fetch("/api");
  return { props: { data } };
}
```

### ❌ No Loading States

```jsx
// BAD
{
  data && <Content data={data} />;
}

// GOOD
{
  loading ? <Skeleton /> : <Content data={data} />;
}
```

---

## 11. When to Use This Skill

**TRIGGERS:**

- "optimize performance", "pagespeed", "lighthouse score"
- "slow loading", "images not loading", "layout shift"
- "accessibility", "screen reader", "keyboard navigation"
- "SEO", "google ranking", "meta tags", "structured data"
- User shows low performance scores
- User mentions Core Web Vitals issues
- User asks about best practices

**APPROACH:**

1. **Audit** current performance (run Lighthouse)
2. **Identify** bottlenecks (LCP, FID, CLS issues)
3. **Prioritize** fixes (biggest impact first)
4. **Implement** optimizations systematically
5. **Test** improvements with tools
6. **Monitor** with Real User Monitoring (RUM)
7. **Iterate** based on data

---

**Remember:** Performance is a feature. Every 100ms delay costs 1% in conversions. Accessibility is not optional—it's a legal requirement and good UX. SEO is an ongoing process. Measure, optimize, repeat. 🚀
