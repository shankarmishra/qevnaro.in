/**
 * Quality gate for location and industry pages: compares the main content of every pair of
 * pages in the same family (e.g. /services/seo/* or /locations/*) and fails if any pair is too
 * alike. Near-duplicate location pages are what search engines treat as doorway pages.
 *
 * Usage: node scripts/similarity.mjs [threshold=0.55]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const threshold = Number(process.argv[2] ?? 0.55);

const text = (file) => {
  const html = fs.readFileSync(file, 'utf8');
  const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? html;
  return main
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/g, ' ')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
};
const shingles = (words, k = 5) => {
  const s = new Set();
  for (let i = 0; i + k <= words.length; i++) s.add(words.slice(i, i + k).join(' '));
  return s;
};
const jaccard = (a, b) => {
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter);
};

const families = {};
const add = (fam, p) => (families[fam] ??= []).push(p);
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === 'index.html') {
      const rel = '/' + path.relative(root, path.dirname(p)).split(path.sep).join('/');
      const parts = rel.split('/').filter(Boolean);
      if (parts[0] === 'services' && parts.length === 3) add(`/services/${parts[1]}/*`, rel);
      if (parts[0] === 'services' && parts.length === 4 && parts[2] === 'for') add('/services/*/for/*', rel);
      if (parts[0] === 'locations' && parts.length === 2) add('/locations/*', rel);
      if (parts[0] === 'global' && parts.length === 2) add('/global/*', rel);
    }
  }
};
walk(root);

let worst = 0;
let fails = 0;
for (const [fam, pages] of Object.entries(families)) {
  const sets = pages.map((p) => [p, shingles(text(path.join(root, p.slice(1), 'index.html')))]);
  let famMax = 0;
  let pair = '';
  for (let i = 0; i < sets.length; i++) {
    for (let j = i + 1; j < sets.length; j++) {
      const s = jaccard(sets[i][1], sets[j][1]);
      if (s > famMax) {
        famMax = s;
        pair = `${sets[i][0]} ~ ${sets[j][0]}`;
      }
      if (s > threshold) fails++;
    }
  }
  worst = Math.max(worst, famMax);
  console.log(`${famMax > threshold ? 'FAIL' : 'ok  '}  ${fam.padEnd(34)} ${String(pages.length).padStart(3)} pages  max ${(famMax * 100).toFixed(0)}%  ${pair}`);
}
console.log(`\nworst pair ${(worst * 100).toFixed(0)}%, ${fails} pair(s) over ${(threshold * 100).toFixed(0)}%`);
process.exit(fails ? 1 : 0);
