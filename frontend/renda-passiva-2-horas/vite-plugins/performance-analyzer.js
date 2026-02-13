/**
 * Performance Analyzer Vite Plugin
 * Checks bundle sizes against performance budgets
 */

import fs from 'fs';
import path from 'path';

export default function performanceAnalyzer(options = {}) {
  const { budgetFile = './performance-budget.json', failOnExceeded = false } = options;

  let config;
  let budgets;

  return {
    name: 'vite-plugin-performance-analyzer',

    configResolved(resolvedConfig) {
      config = resolvedConfig;

      // Load budgets
      try {
        const budgetPath = path.resolve(config.root, budgetFile);
        budgets = JSON.parse(fs.readFileSync(budgetPath, 'utf8'));
      } catch (error) {
        console.warn('⚠️  Performance budget file not found, skipping checks');
        budgets = null;
      }
    },

    closeBundle() {
      if (!budgets) return;

      console.log('\n📊 Checking Performance Budgets...');
      console.log('─'.repeat(60));

      const outDir = path.resolve(config.root, config.build.outDir);
      const violations = [];

      // Analyze bundle sizes
      const stats = analyzeBundle(outDir);

      // Check resource budgets
      if (budgets.budgets) {
        budgets.budgets.forEach((budget) => {
          const actual = stats[budget.resourceType] || 0;
          const limit = budget.budget;

          const percent = (actual / limit) * 100;
          const emoji = percent <= 100 ? '✅' : '❌';
          const status = percent <= 100 ? 'OK' : `EXCEEDED by ${((actual - limit) / 1024).toFixed(1)} KB`;

          console.log(
            `${emoji} ${budget.resourceType.padEnd(15)} ${formatBytes(actual).padStart(10)} / ${formatBytes(limit).padStart(10)} (${percent.toFixed(0)}%) ${status}`
          );

          if (percent > 100) {
            violations.push({
              type: budget.resourceType,
              actual,
              limit,
              exceeded: actual - limit,
            });
          }
        });
      }

      console.log('─'.repeat(60));

      // Summary
      if (violations.length > 0) {
        console.log(`\n⚠️  ${violations.length} budget(s) exceeded:`);
        violations.forEach((v) => {
          console.log(`  - ${v.type}: ${formatBytes(v.exceeded)} over budget`);
        });

        if (failOnExceeded) {
          console.log('\n❌ Build failed due to performance budget violations\n');
          process.exit(1);
        } else {
          console.log('\n⚠️  Consider optimizing assets or adjusting budgets\n');
        }
      } else {
        console.log('\n✅ All performance budgets met!\n');
      }

      // Save stats
      const statsPath = path.join(outDir, 'performance.json');
      fs.writeFileSync(
        statsPath,
        JSON.stringify(
          {
            timestamp: new Date().toISOString(),
            stats,
            budgets: budgets.budgets,
            violations,
          },
          null,
          2
        )
      );
    },
  };
}

function analyzeBundle(outDir) {
  const stats = {
    script: 0,
    stylesheet: 0,
    image: 0,
    font: 0,
    total: 0,
  };

  function walkDir(dir) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        walkDir(filePath);
      } else {
        const ext = path.extname(file).toLowerCase();
        const size = stat.size;

        // Categorize by extension
        if (['.js', '.mjs'].includes(ext)) {
          stats.script += size;
        } else if (['.css'].includes(ext)) {
          stats.stylesheet += size;
        } else if (['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.avif'].includes(ext)) {
          stats.image += size;
        } else if (['.woff', '.woff2', '.ttf', '.eot', '.otf'].includes(ext)) {
          stats.font += size;
        }

        stats.total += size;
      }
    });
  }

  if (fs.existsSync(outDir)) {
    walkDir(outDir);
  }

  return stats;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i)) + ' ' + sizes[i];
}
