import http from 'node:http';
import { readFile, stat, watch } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { spawn } from 'node:child_process';

const portArg = process.argv.indexOf('--port');
const port = Number(portArg > -1 ? process.argv[portArg + 1] : process.env.PORT || 5173);
const production = process.argv.includes('--production');
const runBuild = () => new Promise<void>((done,reject) => {
  const child = spawn(process.execPath, ['--import', 'tsx', 'scripts/build.ts'], { stdio:'inherit' });
  child.once('error', reject); child.once('exit', code => code === 0 ? done() : reject(new Error(`Build failed: ${code}`)));
});
await runBuild();
const root = resolve('dist');
const types: Record<string, string> = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.json':'application/json', '.svg':'image/svg+xml', '.jpg':'image/jpeg', '.png':'image/png', '.webp':'image/webp', '.ttf':'font/ttf', '.pdf':'application/pdf', '.txt':'text/plain; charset=utf-8' };
const server = http.createServer(async (req,res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url ?? '/','http://localhost').pathname);
    let path = resolve(root, `.${pathname}`);
    if(path !== root && !path.startsWith(root + sep)) { res.writeHead(403); return res.end('Forbidden'); }
    try {
      const info = await stat(path);
      if(info.isDirectory()) {
        if(!pathname.endsWith('/')) { res.writeHead(308, {Location:pathname + '/'}); return res.end(); }
        path = resolve(path,'index.html');
      }
    } catch { path = resolve(root,'404.html'); res.statusCode = 404; }
    const data = await readFile(path);
    res.setHeader('Content-Type',types[extname(path)] || 'application/octet-stream');
    res.setHeader('X-Content-Type-Options','nosniff');
    res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
    res.setHeader('Cache-Control', production ? 'public, max-age=300' : 'no-store');
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch { res.writeHead(400); res.end('Bad request'); }
});
server.listen(port,'127.0.0.1',() => console.log(`\n  Portfolio ready → http://localhost:${port}/\n`));
server.on('error', error => { console.error(error.message); process.exit(1); });
if(!production) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let chain = Promise.resolve();
  for(const folder of ['src','public','scripts']) (async () => {
    for await(const event of watch(folder,{recursive:true})) {
      if(!event.filename) continue;
      clearTimeout(timer);
      timer = setTimeout(() => { chain = chain.then(runBuild).catch(console.error); }, 180);
    }
  })().catch(console.error);
}
