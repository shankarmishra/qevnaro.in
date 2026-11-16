/**
 * Tell Bing (and other IndexNow engines) which URLs changed. Bing's index feeds ChatGPT search
 * and Microsoft Copilot, so this speeds up how quickly new pages can appear there.
 *
 * Run after a deploy:   node scripts/indexnow.mjs            (submits every URL in the sitemap)
 *                       node scripts/indexnow.mjs /pricing /services/seo   (submits only these)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const KEY = '20f3d181be1d68514cf19ba8fe87b5fe';
const HOST = 'www.qevnaro.in';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const args = process.argv.slice(2);
let urls = args.map((p) => `https://${HOST}${p.startsWith('/') ? p : '/' + p}`);
if (!urls.length) {
  const sitemap = fs.readFileSync(path.join(root, 'dist', 'sitemap.xml'), 'utf8');
  urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls.slice(0, 10000) }),
});
console.log(`IndexNow: submitted ${urls.length} URL(s), response ${res.status} ${res.statusText}`);
