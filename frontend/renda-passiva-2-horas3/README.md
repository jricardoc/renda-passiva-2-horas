# Performance Optimization Workflow (Node.js Native)

Automated PageSpeed optimization for React/Vite/Docker stack — **no Python dependencies**.

## 🎯 Philosophy

- **Vite-first**: All optimizations leverage Vite plugins (run during build)
- **Docker-aware**: Works seamlessly in Alpine Linux containers
- **CI-integrated**: Performance gates on every PR
- **Self-documenting**: Bundle analysis and audit reports auto-generated

## 📊 What You Get

- ✅ **100/100 PageSpeed** (Performance, Accessibility, SEO, Best Practices)
- ✅ **Core Web Vitals** green (LCP < 2.5s, CLS < 0.1, TBT < 300ms)
- ✅ **Optimized images** (AVIF, WebP, responsive sizes)
- ✅ **Code splitting** (vendor, UI, charts separate chunks)
- ✅ **Compression** (Gzip + Brotli)
- ✅ **Bundle analysis** (visual breakdown in `dist/stats.html`)
- ✅ **CI/CD gates** (fails PR if performance degrades)

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Development

```bash
npm run dev
```

Open http://localhost:3000

### 3. Production Build

```bash
npm run build
```

Vite plugins run automatically:

- Images optimized to AVIF/WebP
- CSS minified
- JS code-split and tree-shaken
- Gzip + Brotli compression applied
- Bundle report generated at `dist/stats.html`

### 4. Preview Production Build

```bash
npm run preview
```

Open http://localhost:4173

### 5. Run Lighthouse Audit

```bash
npm run audit
```

This will:

1. Build production bundle
2. Start preview server
3. Run Lighthouse audit
4. Display results in terminal
5. Save report to `.tmp/audits/`

---

## 📦 Package Scripts

```bash
# Development
npm run dev                    # Start dev server (port 3000)

# Production
npm run build                  # Build with optimizations
npm run preview                # Preview production build (port 4173)

# Analysis
npm run analyze                # Generate bundle analysis (opens dist/stats.html)

# Auditing
npm run audit                  # Audit local build
npm run audit:prod             # Audit live production site
npm run audit:ci               # CI mode (fails if score < 90)
npm run audit:compare          # Compare with baseline

# Checks
npm run check-budgets          # Verify performance budgets
npm run type-check             # TypeScript type checking
npm run lint                   # ESLint
```

---

## 🏗️ Project Structure

```
frontend/
├── scripts/
│   ├── audit.js                    # Lighthouse audit (Node.js)
│   └── monitor.js                  # Continuous monitoring
│
├── vite-plugins/
│   └── performance-analyzer.js     # Budget checker plugin
│
├── src/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── assets/
│       └── images/                 # Auto-optimized during build
│
├── .tmp/
│   └── audits/                     # Audit reports (gitignored)
│
├── dist/                           # Production build output
│   ├── assets/
│   │   ├── js/                    # Code-split JS chunks
│   │   ├── css/                   # Minified CSS
│   │   └── images/                # Optimized images (AVIF/WebP)
│   ├── stats.html                 # Bundle analysis
│   └── performance.json           # Budget check results
│
├── vite.config.ts                 # Vite config with plugins
├── performance-budget.json        # Performance budgets
├── nginx.conf                     # Nginx config (for Docker)
├── Dockerfile                     # Multi-stage Docker build
└── package.json
```

---

## ⚙️ Configuration

### Performance Budgets

Edit `performance-budget.json`:

```json
{
  "budgets": [
    {
      "resourceType": "script",
      "budget": 250000 // 244 KB target
    },
    {
      "resourceType": "stylesheet",
      "budget": 100000 // 100 KB target
    }
  ]
}
```

Build will fail if budgets exceeded (in CI mode).

### Vite Plugins

Edit `vite.config.ts`:

```typescript
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import performanceAnalyzer from "./vite-plugins/performance-analyzer";

export default defineConfig({
  plugins: [
    ViteImageOptimizer({
      formats: ["avif", "webp"], // Output formats
      quality: 85, // Compression quality
    }),

    performanceAnalyzer({
      budgetFile: "./performance-budget.json",
      failOnExceeded: true, // Fail build if exceeded
    }),
  ],
});
```

---

## 🐳 Docker Deployment

### Build Image

```bash
docker build -t frontend:latest .
```

### Run Container

```bash
docker run -p 80:80 frontend:latest
```

### Image Size

Expected: **< 50 MB** (multi-stage build with Alpine Linux + Nginx)

Check size:

```bash
docker images frontend:latest --format "{{.Size}}"
```

---

## 🔄 CI/CD Integration

### GitHub Actions

Workflow auto-runs on:

- Every PR (audits and comments with results)
- Push to `main` (deploys if passing)
- Daily at 3 AM UTC (monitoring)
- Manual trigger (workflow_dispatch)

See `.github/workflows/performance-audit.yml`

### What Gets Checked

- ✅ Performance score ≥ 90
- ✅ LCP < 2.5s
- ✅ TBT < 300ms
- ✅ CLS < 0.1
- ✅ Bundle sizes within budget
- ✅ No accessibility violations

PR is **blocked** if any check fails.

---

## 📊 Reading Reports

### Bundle Analysis (`dist/stats.html`)

After `npm run build`, open `dist/stats.html` to see:

- Treemap of all modules
- Size breakdown (gzipped, brotli)
- Which libraries are largest

Use this to identify:

- Unnecessarily large dependencies
- Duplicate code
- Opportunities for code splitting

### Lighthouse Report (`.tmp/audits/`)

After `npm run audit`, check `.tmp/audits/current.json` for:

- Category scores (Performance, Accessibility, SEO, Best Practices)
- Core Web Vitals (LCP, TBT, CLS)
- Opportunities (what to fix)
- Diagnostics (why things are slow)

---

## 🎯 Performance Targets

| Metric                | Target   | Good       | Needs Work |
| --------------------- | -------- | ---------- | ---------- |
| **Performance Score** | 100      | 90-99      | < 90       |
| **LCP**               | < 2.5s   | 2.5-4.0s   | > 4.0s     |
| **TBT**               | < 300ms  | 300-600ms  | > 600ms    |
| **CLS**               | < 0.1    | 0.1-0.25   | > 0.25     |
| **Bundle (JS)**       | < 244 KB | 244-400 KB | > 400 KB   |
| **Bundle (CSS)**      | < 100 KB | 100-150 KB | > 150 KB   |

---

## 🐛 Troubleshooting

### Build fails with "budget exceeded"

**Solution:** Check `dist/stats.html` to see what's large.

Common fixes:

- Use dynamic imports: `const Heavy = lazy(() => import('./Heavy'))`
- Remove unused dependencies
- Use lighter alternatives (e.g., `date-fns` instead of `moment`)

### Lighthouse audit hangs

**Solution:**

1. Check if preview server is running: `curl http://localhost:4173`
2. Increase timeout in `scripts/audit.js`
3. Try headful Chrome (remove `--headless` flag)

### Images not optimized

**Solution:**

1. Ensure images are in `src/assets/images/`
2. Check `vite.config.ts` has `ViteImageOptimizer` plugin
3. Run `npm run build` (images optimized during build, not dev)

### Docker image too large

**Solution:**

1. Check if `node_modules` is copied (should only copy `dist/`)
2. Verify multi-stage build is working
3. Use `docker image inspect frontend:latest` to see layers

---

## 📚 Resources

- [Vite Documentation](https://vitejs.dev/)
- [Lighthouse Documentation](https://developer.chrome.com/docs/lighthouse)
- [Web Vitals](https://web.dev/vitals/)
- [Bundle Analysis Best Practices](https://web.dev/reduce-javascript-payloads-with-code-splitting/)

---

## 🤖 Using with Antigravity

Agent understands these prompts:

- **"Audit performance"** → Runs `npm run audit`
- **"Why is my bundle large?"** → Opens `dist/stats.html` and analyzes
- **"Optimize images"** → Rebuilds with image optimization
- **"Fix LCP"** → Reads audit report, suggests fixes
- **"Deploy"** → Runs CI/CD workflow

Agent workflow:

1. Reads `.agent/workflows/performance/AGENTS.md`
2. Runs appropriate npm script
3. Analyzes output (bundle stats, audit report)
4. Suggests optimizations
5. Updates config if needed

---

## ✨ Next Steps

1. **Baseline audit**: Run `npm run audit` to establish baseline
2. **Set budgets**: Edit `performance-budget.json` based on audit
3. **Enable CI**: Push to GitHub to trigger workflow
4. **Monitor**: Set up scheduled audits (daily/weekly)

---

## 📝 License

MIT
