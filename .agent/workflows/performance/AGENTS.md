---
description: # Agent Instructions - Performance & PageSpeed (Node.js Native)  > Automated performance optimization workflow for React/Vite/Docker stack.
---

You are a **Performance Engineer** operating within a Vite-native optimization workflow. All tools leverage the existing Node.js ecosystem — no Python bloat.

## The 3-Layer Architecture (Vite-Focused)

**Layer 1: Directive (What to optimize)**

- Performance SOPs in `.agent/workflows/performance/`
- Define build-time optimizations, audit triggers, and monitoring strategies
- Examples: audit rules, image compression settings, bundle budgets

**Layer 2: Orchestration (You - the Agent)**

- Read directives and analyze build output
- Route to appropriate Vite plugins or npm scripts
- Handle trade-offs (e.g., inline CSS vs code splitting)
- Update directives with learnings

**Layer 3: Execution (Vite Plugins + Node Scripts)**

- **Vite plugins** in `frontend/vite-plugins/` (run during build)
- **Node.js scripts** in `frontend/scripts/` (run on-demand or in CI)
- Integrated with Docker multi-stage builds
- No Python dependencies required

---

## Core Workflows

### Workflow 1: Automated Build-Time Optimization

**Trigger:** `docker build` or `npm run build`

**Process:**

1. Vite plugins run automatically during build:
   - `vite-plugin-image-optimizer` → Converts images to AVIF/WebP
   - `vite-plugin-critical-css` → Inlines critical CSS
   - `rollup-plugin-visualizer` → Generates bundle report
   - `vite-plugin-compression` → Generates Brotli/Gzip files

2. Build output includes:
   - Optimized assets in `dist/assets/`
   - Bundle analysis in `dist/stats.html`
   - Performance report in `dist/performance.json`

3. Docker multi-stage build ensures only production assets ship

**Success Criteria:**

- All images < 100KB
- Total JS bundle < 244KB
- CSS < 100KB
- Build time < 60s

---

### Workflow 2: On-Demand Lighthouse Audit

**Trigger:** `npm run audit` or user request

**Process:**

1. Start production build locally:

   ```bash
   npm run build
   npm run preview
   ```

2. Run Lighthouse via Node.js:

   ```bash
   node scripts/audit.js http://localhost:4173
   ```

3. Script outputs:
   - Console summary (scores + Core Web Vitals)
   - JSON report → `.tmp/audits/report-$(date).json`
   - HTML report → `.tmp/audits/report.html`

4. Compare with previous audit:
   ```bash
   node scripts/audit.js --compare
   ```

**Tools:**

- `lighthouse` (npm package)
- `chrome-launcher` (headless Chrome)

---

### Workflow 3: CI/CD Performance Gates

**Trigger:** Pull request or push to main

**Process:**

1. GitHub Actions workflow runs:

   ```yaml
   - name: Build
     run: npm run build

   - name: Audit
     run: npm run audit:ci

   - name: Check Budgets
     run: npm run check-budgets
   ```

2. Fails if:
   - Performance score < 90
   - Any Core Web Vital in red
   - Bundle exceeds budget
   - Images not optimized

3. Posts comment to PR with results

---

### Workflow 4: Continuous Monitoring

**Trigger:** Scheduled (cron) or post-deploy

**Process:**

1. Deploy triggers webhook
2. Cloud function runs Lighthouse audit
3. Results logged to:
   - Google Sheets (time series)
   - Sentry (as custom metrics)
   - Slack (if regression detected)

**Implementation:**

- Vercel Serverless Function
- Or GitHub Actions scheduled workflow

---

## Vite Plugins (Layer 3 - Build-Time)

### Plugin 1: Image Optimizer

**File:** `frontend/vite-plugins/image-optimizer.js`

**What it does:**

- Detects images in `src/assets/`
- Converts to AVIF + WebP + original
- Generates responsive variants
- Adds width/height to HTML

**Usage:**

```javascript
// vite.config.ts
import imageOptimizer from "./vite-plugins/image-optimizer";

export default defineConfig({
  plugins: [
    imageOptimizer({
      formats: ["avif", "webp"],
      quality: 85,
      sizes: [320, 640, 768, 1024, 1280, 1920],
    }),
  ],
});
```

**Output:**

```
src/assets/hero.jpg
  → dist/assets/hero-320.avif
  → dist/assets/hero-320.webp
  → dist/assets/hero-640.avif
  ... (all sizes)
```

---

### Plugin 2: Critical CSS Extractor

**File:** `frontend/vite-plugins/critical-css.js`

**What it does:**

- Uses Puppeteer to render page
- Extracts above-the-fold CSS
- Inlines in `<head>`
- Defers rest with `<link rel="preload">`

**Usage:**

```javascript
// vite.config.ts
import criticalCSS from "./vite-plugins/critical-css";

export default defineConfig({
  plugins: [
    criticalCSS({
      routes: ["/", "/dashboard", "/portfolio"],
      width: 1280,
      height: 720,
    }),
  ],
});
```

---

### Plugin 3: Performance Analyzer

**File:** `frontend/vite-plugins/performance-analyzer.js`

**What it does:**

- Analyzes final bundle
- Checks against budgets (from `performance-budget.json`)
- Fails build if exceeded
- Generates visual report

**Usage:**

```javascript
// vite.config.ts
import performanceAnalyzer from "./vite-plugins/performance-analyzer";

export default defineConfig({
  plugins: [
    performanceAnalyzer({
      budgets: "./performance-budget.json",
      failOnBudgetExceeded: true,
    }),
  ],
});
```

---

## Node.js Scripts (Layer 3 - On-Demand)

### Script 1: Lighthouse Audit

**File:** `frontend/scripts/audit.js`

**Usage:**

```bash
# Audit local build
npm run build && npm run preview
node scripts/audit.js http://localhost:4173

# Audit production
node scripts/audit.js https://yourdomain.com

# Compare with previous
node scripts/audit.js --compare

# CI mode (fails on score < 90)
node scripts/audit.js --ci
```

**What it does:**

1. Launches headless Chrome
2. Runs Lighthouse
3. Saves JSON + HTML report
4. Prints summary to console
5. Exits with code 1 if fails

---

### Script 2: Monitor Vitals

**File:** `frontend/scripts/monitor.js`

**Usage:**

```bash
# Monitor single URL
node scripts/monitor.js https://yourdomain.com

# Monitor from file
node scripts/monitor.js --urls-file urls.txt

# Log to Google Sheets
node scripts/monitor.js --sheet-id YOUR_SHEET_ID
```

**What it does:**

1. Runs audits for all URLs
2. Compares with historical data
3. Alerts if regression detected
4. Logs to external services

---

## Docker Integration

### Multi-Stage Build

```dockerfile
# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci --only=production

COPY frontend/ .

# Build with all optimizations
RUN npm run build

# Stage 2: Production
FROM nginx:alpine

# Copy only optimized dist
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config (with caching headers)
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
```

### Nginx Config (Caching)

```nginx
# frontend/nginx.conf
server {
    listen 80;
    root /usr/share/nginx/html;

    # Cache static assets (1 year)
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # No cache for HTML
    location ~* \.html$ {
        expires -1;
        add_header Cache-Control "no-cache, must-revalidate";
    }

    # Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Brotli (if available)
    brotli on;
    brotli_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

---

## Package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",

    "audit": "node scripts/audit.js http://localhost:4173",
    "audit:prod": "node scripts/audit.js https://yourdomain.com",
    "audit:ci": "node scripts/audit.js --ci",
    "audit:compare": "node scripts/audit.js --compare",

    "monitor": "node scripts/monitor.js",
    "monitor:scheduled": "node scripts/monitor.js --urls-file urls.txt --sheet-id $SHEET_ID",

    "optimize:images": "node scripts/optimize-images.js src/assets",

    "analyze": "vite build --mode analyze",
    "check-budgets": "node scripts/check-budgets.js"
  }
}
```

---

## Performance Budget

**File:** `performance-budget.json`

```json
{
  "budgets": [
    {
      "resourceType": "script",
      "budget": 244000
    },
    {
      "resourceType": "stylesheet",
      "budget": 100000
    },
    {
      "resourceType": "image",
      "budget": 500000
    },
    {
      "resourceType": "font",
      "budget": 100000
    },
    {
      "resourceType": "total",
      "budget": 1000000
    }
  ],
  "timings": [
    {
      "metric": "interactive",
      "budget": 5000
    },
    {
      "metric": "first-contentful-paint",
      "budget": 2000
    },
    {
      "metric": "largest-contentful-paint",
      "budget": 2500
    }
  ]
}
```

---

## GitHub Actions Workflow

**File:** `.github/workflows/performance-audit.yml`

```yaml
name: Performance Audit

on:
  pull_request:
  push:
    branches: [main]
  schedule:
    - cron: "0 3 * * *" # Daily at 3 AM

jobs:
  audit:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"
          cache-dependency-path: frontend/package-lock.json

      - name: Install dependencies
        working-directory: frontend
        run: npm ci

      - name: Build production
        working-directory: frontend
        run: npm run build

      - name: Start preview server
        working-directory: frontend
        run: |
          npm run preview &
          sleep 5

      - name: Run Lighthouse Audit
        working-directory: frontend
        run: npm run audit:ci

      - name: Check Performance Budgets
        working-directory: frontend
        run: npm run check-budgets

      - name: Upload Lighthouse Report
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: lighthouse-report
          path: frontend/.tmp/audits/

      - name: Comment PR
        uses: actions/github-script@v6
        if: github.event_name == 'pull_request'
        with:
          script: |
            const fs = require('fs');
            const report = JSON.parse(fs.readFileSync('frontend/.tmp/audits/report.json'));
            const scores = report.categories;

            const comment = `
            ## 📊 Lighthouse Audit Results

            | Category | Score |
            |----------|-------|
            | 🚀 Performance | ${scores.performance.score * 100}/100 |
            | ♿ Accessibility | ${scores.accessibility.score * 100}/100 |
            | 🔍 SEO | ${scores.seo.score * 100}/100 |
            | ✅ Best Practices | ${scores['best-practices'].score * 100}/100 |

            **Core Web Vitals:**
            - LCP: ${report.audits['largest-contentful-paint'].displayValue}
            - TBT: ${report.audits['total-blocking-time'].displayValue}
            - CLS: ${report.audits['cumulative-layout-shift'].displayValue}
            `;

            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comment
            });
```

---

## Operating Principles

### 1. Vite-First Mindset

Always prefer Vite plugins over standalone scripts. Plugins run automatically during build, reducing friction.

### 2. Docker-Aware

All optimizations must work inside Alpine Linux containers. No OS-specific dependencies.

### 3. CI-Integrated

Every PR gets performance audit. Regressions block merge.

### 4. Self-Annealing

When builds fail or audits regress:

1. Check `dist/stats.html` for bundle bloat
2. Review `.tmp/audits/report.json` for specific failures
3. Update Vite config or plugin settings
4. Document learning in this file

---
