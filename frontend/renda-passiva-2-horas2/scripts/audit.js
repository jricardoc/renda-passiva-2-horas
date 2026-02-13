#!/usr/bin/env node
/**
 * Lighthouse Audit Script (Node.js)
 * Runs performance audits without Python dependencies
 */

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs').promises;
const path = require('path');

const AUDIT_DIR = path.join(process.cwd(), '.tmp', 'audits');
const COMPARE_MODE = process.argv.includes('--compare');
const CI_MODE = process.argv.includes('--ci');
const url = process.argv[2] || 'http://localhost:4173';

async function runAudit(url) {
    console.log(`🔍 Starting Lighthouse audit for ${url}\n`);

    // Launch Chrome
    const chrome = await chromeLauncher.launch({
        chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox'],
    });

    try {
        // Lighthouse options
        const options = {
            logLevel: 'error',
            output: 'json',
            onlyCategories: ['performance', 'accessibility', 'seo', 'best-practices'],
            port: chrome.port,
            throttling: {
                rttMs: 40,
                throughputKbps: 10240,
                cpuSlowdownMultiplier: 1,
            },
        };

        // Run Lighthouse
        const runnerResult = await lighthouse(url, options);
        const report = runnerResult.lhr;

        // Extract scores
        const scores = {
            performance: Math.round(report.categories.performance.score * 100),
            accessibility: Math.round(report.categories.accessibility.score * 100),
            seo: Math.round(report.categories.seo.score * 100),
            bestPractices: Math.round(report.categories['best-practices'].score * 100),
        };

        // Extract Core Web Vitals
        const vitals = {
            lcp: report.audits['largest-contentful-paint'].numericValue / 1000,
            tbt: report.audits['total-blocking-time'].numericValue,
            cls: report.audits['cumulative-layout-shift'].numericValue,
        };

        // Save report
        await saveReport(report, scores, vitals);

        // Display results
        displayResults(url, scores, vitals);

        // Compare with previous (if requested)
        if (COMPARE_MODE) {
            await compareWithPrevious(scores, vitals);
        }

        // Check if meets targets (CI mode)
        if (CI_MODE) {
            checkTargets(scores, vitals);
        }

        return { scores, vitals, report };
    } finally {
        await chrome.kill();
    }
}

async function saveReport(report, scores, vitals) {
    // Ensure directory exists
    await fs.mkdir(AUDIT_DIR, { recursive: true });

    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const reportPath = path.join(AUDIT_DIR, `report-${timestamp}.json`);
    const currentPath = path.join(AUDIT_DIR, 'current.json');

    const data = {
        timestamp: new Date().toISOString(),
        url: report.finalUrl,
        scores,
        vitals,
        fullReport: report,
    };

    // Save timestamped report
    await fs.writeFile(reportPath, JSON.stringify(data, null, 2));

    // Save as current (for comparison)
    await fs.writeFile(currentPath, JSON.stringify(data, null, 2));

    console.log(`\n✅ Report saved to ${reportPath}\n`);
}

function displayResults(url, scores, vitals) {
    console.log('='.repeat(60));
    console.log('📊 Lighthouse Audit Results');
    console.log('='.repeat(60));
    console.log(`URL: ${url}`);
    console.log(`Time: ${new Date().toLocaleString()}`);
    console.log('='.repeat(60));
    console.log('\n🎯 Category Scores:');
    console.log('─'.repeat(60));

    Object.entries(scores).forEach(([category, score]) => {
        const emoji = score >= 90 ? '✅' : score >= 50 ? '⚠️' : '❌';
        const bar = createProgressBar(score);
        const name = category.replace(/([A-Z])/g, ' $1').trim();
        console.log(`${emoji} ${name.padEnd(20)} ${bar} ${score}/100`);
    });

    console.log('\n⚡ Core Web Vitals:');
    console.log('─'.repeat(60));

    const lcpStatus = vitals.lcp < 2.5 ? '✅' : vitals.lcp < 4.0 ? '⚠️' : '❌';
    const tbtStatus = vitals.tbt < 300 ? '✅' : vitals.tbt < 600 ? '⚠️' : '❌';
    const clsStatus = vitals.cls < 0.1 ? '✅' : vitals.cls < 0.25 ? '⚠️' : '❌';

    console.log(`${lcpStatus} LCP: ${vitals.lcp.toFixed(2)}s (target: < 2.5s)`);
    console.log(`${tbtStatus} TBT: ${vitals.tbt.toFixed(0)}ms (target: < 300ms)`);
    console.log(`${clsStatus} CLS: ${vitals.cls.toFixed(3)} (target: < 0.1)`);

    console.log('\n' + '='.repeat(60) + '\n');
}

function createProgressBar(score) {
    const filled = Math.floor(score / 10);
    const empty = 10 - filled;
    return `[${'█'.repeat(filled)}${'░'.repeat(empty)}]`;
}

async function compareWithPrevious(scores, vitals) {
    try {
        const previousPath = path.join(AUDIT_DIR, 'baseline.json');
        const previous = JSON.parse(await fs.readFile(previousPath, 'utf8'));

        console.log('📈 Comparison with Baseline:');
        console.log('─'.repeat(60));

        // Compare performance score
        const perfDiff = scores.performance - previous.scores.performance;
        const perfEmoji = perfDiff >= 0 ? '📈' : '📉';
        console.log(`${perfEmoji} Performance: ${scores.performance} (${perfDiff >= 0 ? '+' : ''}${perfDiff})`);

        // Compare LCP
        const lcpDiff = vitals.lcp - previous.vitals.lcp;
        const lcpEmoji = lcpDiff <= 0 ? '📈' : '📉';
        console.log(`${lcpEmoji} LCP: ${vitals.lcp.toFixed(2)}s (${lcpDiff <= 0 ? '' : '+'}${lcpDiff.toFixed(2)}s)`);

        // Compare CLS
        const clsDiff = vitals.cls - previous.vitals.cls;
        const clsEmoji = clsDiff <= 0 ? '📈' : '📉';
        console.log(`${clsEmoji} CLS: ${vitals.cls.toFixed(3)} (${clsDiff <= 0 ? '' : '+'}${clsDiff.toFixed(3)})`);

        console.log();

        // Check for regressions
        if (perfDiff < -10 || lcpDiff > 0.5 || clsDiff > 0.05) {
            console.log('⚠️  REGRESSION DETECTED!');
            if (CI_MODE) {
                process.exit(1);
            }
        }
    } catch (error) {
        console.log('ℹ️  No baseline found. This will be saved as baseline.');
        // Save current as baseline
        const currentPath = path.join(AUDIT_DIR, 'current.json');
        const baselinePath = path.join(AUDIT_DIR, 'baseline.json');
        await fs.copyFile(currentPath, baselinePath);
    }
}

function checkTargets(scores, vitals) {
    console.log('🎯 Checking Performance Targets...\n');

    const failures = [];

    if (scores.performance < 90) {
        failures.push(`Performance score (${scores.performance}) < 90`);
    }

    if (vitals.lcp > 2.5) {
        failures.push(`LCP (${vitals.lcp.toFixed(2)}s) > 2.5s`);
    }

    if (vitals.tbt > 300) {
        failures.push(`TBT (${vitals.tbt}ms) > 300ms`);
    }

    if (vitals.cls > 0.1) {
        failures.push(`CLS (${vitals.cls.toFixed(3)}) > 0.1`);
    }

    if (failures.length > 0) {
        console.log('❌ Performance targets not met:');
        failures.forEach((failure) => {
            console.log(`  - ${failure}`);
        });
        console.log();
        process.exit(1);
    } else {
        console.log('✅ All performance targets met!\n');
        process.exit(0);
    }
}

// Main execution
runAudit(url).catch((error) => {
    console.error('❌ Audit failed:', error);
    process.exit(1);
});
