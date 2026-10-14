/**
 * No-build runtime for static hosting.
 * Fetches the TS/TSX source tree from src/main.tsx, transpiles each module in the
 * browser with Babel (TypeScript + automatic JSX), rewrites relative imports to blob
 * URLs and boots the app. Bare imports resolve through the import map in index.html.
 *
 * Under Vite (`npm run dev` / `npm run build`) this file is NOT used — vite.config.ts
 * swaps the runtime block in index.html for /src/main.tsx.
 */
const ENTRY = new URL('../main.tsx', import.meta.url).href;
const IMPORT_RE = /(\bfrom\s*|\bimport\s*\(\s*|\bimport\s+)(['"])(\.{1,2}\/[^'"]+)\2/g;
const modules = new Map(); // resolved url -> Promise<blobUrl>
const sources = new Map(); // raw specifier url -> Promise<{url, text}>

/** Fetch a source file; extension-less specifiers try .tsx then .ts (Vite/TS style). */
function fetchSource(raw) {
  if (sources.has(raw)) return sources.get(raw);
  const job = (async () => {
    // Plain-TS folders first try .ts, component folders .tsx — avoids needless 404s.
    const tsFirst = /\/(lib|store|data)\/|\/types$/.test(raw);
    const candidates = /\.(tsx?|jsx?|css)$/.test(raw) ? [raw] : tsFirst ? [raw + '.ts', raw + '.tsx'] : [raw + '.tsx', raw + '.ts'];
    for (const url of candidates) {
      const res = await fetch(url).catch(() => null);
      if (res && res.ok) return { url, text: await res.text() };
    }
    throw new Error('Cannot resolve module: ' + raw);
  })();
  sources.set(raw, job);
  return job;
}

function transpile(code, filename) {
  return window.Babel.transform(code, {
    filename,
    presets: [['typescript', { allowDeclareFields: true, isTSX: true, allExtensions: true }], ['react', { runtime: 'automatic' }]],
    comments: false
  }).code;
}

function load(raw) {
  if (raw.endsWith('.css')) {
    if (!modules.has(raw)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = raw;
      document.head.appendChild(link);
      modules.set(raw, Promise.resolve('data:text/javascript,'));
    }
    return modules.get(raw);
  }
  if (modules.has(raw)) return modules.get(raw);
  const job = (async () => {
    const { url, text } = await fetchSource(raw);
    let code = transpile(text, url);
    const specs = [...new Set([...code.matchAll(IMPORT_RE)].map((m) => m[3]))];
    const map = {};
    await Promise.all(specs.map(async (s) => { map[s] = await load(new URL(s, url).href); }));
    code = code.replace(IMPORT_RE, (_a, pre, q, s) => pre + q + map[s] + q);
    return URL.createObjectURL(new Blob([code + '\n//# sourceURL=' + url], { type: 'text/javascript' }));
  })();
  modules.set(raw, job);
  return job;
}

(async () => {
  try {
    if (!window.Babel) throw new Error('Babel not available');
    await import(await load(ENTRY));
  } catch (e) {
    console.error(e);
    const msg = document.getElementById('boot-msg');
    if (msg) msg.textContent = 'خطا در بارگذاری: ' + (e && e.message ? e.message : e);
  }
})();
