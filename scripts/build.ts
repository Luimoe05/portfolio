import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { compile, optimize } from '@tailwindcss/node';
import { build as bundle } from 'esbuild';
import { projects } from '../src/projects.ts';
import { homepage, projectsPage, experiencePage, aboutPage, contactPage, resumePage, photographyPage, projectPage, notFound } from '../src/templates.ts';

export async function build(): Promise<void> {
  const pages = new Map<string, string>([
    ['index.html', homepage()],
    ['projects/index.html', projectsPage()],
    ['experience/index.html', experiencePage()],
    ['about/index.html', aboutPage()],
    ['contact/index.html', contactPage()],
    ['resume/index.html', resumePage()],
    ['photography/index.html', photographyPage()],
    ...projects.map(project => [`projects/${project.slug}/index.html`, projectPage(project)] as const),
    ['404.html', notFound()],
  ]);
  // Scan the actual generated HTML so every authored utility ships, including case pages.
  const candidates = new Set<string>();
  for (const html of pages.values()) {
    for (const match of html.matchAll(/class="([^"]+)"/g)) {
      for (const name of match[1].split(/\s+/)) candidates.add(name);
    }
  }
  const compiler = await compile(await readFile('src/styles.css', 'utf8'), {
    base: resolve('src'),
    onDependency() {},
  });
  const css = optimize(compiler.build([...candidates]), { minify: true }).code;
  await rm('dist', { recursive: true, force: true });
  await mkdir('dist', { recursive: true });
  await cp('public', 'dist', { recursive: true });
  await Promise.all([
    writeFile('dist/styles.css', css),
    bundle({ entryPoints: ['src/app.ts'], outdir: 'dist', splitting: true, bundle: true, minify: true, format: 'esm', target: 'es2022' }),
    ...[...pages].map(async ([path, html]) => {
      await mkdir(resolve('dist', path, '..'), { recursive: true });
      await writeFile(`dist/${path}`, html);
    }),
  ]);
  console.log('Built home, projects, experience, about, contact, 3 case studies, and 404 with TypeScript and Tailwind CSS.');
}
if (process.argv[1]?.endsWith('build.ts')) await build();
