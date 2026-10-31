import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { build } from '../scripts/build.ts';
import { projects } from '../src/projects.ts';
import { escape } from '../src/templates.ts';

await build();
const routes = ['index.html','projects/index.html','experience/index.html','about/index.html','contact/index.html','resume/index.html','photography/index.html','404.html',...projects.map(p => `projects/${p.slug}/index.html`)];

test('every generated page has one primary heading, metadata, and valid local assets and route links',async () => {
  for(const route of routes) {
    const html = await readFile(`dist/${route}`,'utf8');
    assert.equal((html.match(/<h1[ >]/g)||[]).length,1,route);
    assert.match(html,/<html lang="en">/);
    assert.match(html,/<meta name="description" content="[^"]+">/);
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size,ids.length,`${route}: duplicate IDs`);
    for(const match of html.matchAll(/(?:href|src)="(\/[^"#]*)(?:#[^"]*)?"/g)) {
      const path = match[1];
      const target = resolve('dist',`.${path}`,path.endsWith('/') ? 'index.html' : '');
      const info = await stat(target);
      assert.ok(info.isFile(),`${route}: ${path} must exist`);
      assert.ok(info.size>0,`${path} must not be empty`);
    }
  }
});

test('all projects remain reachable without JavaScript and have complete source-backed case studies',async () => {
  const home = await readFile('dist/projects/index.html','utf8');
  for(const project of projects) {
    assert.ok(home.includes(`href="/projects/${project.slug}/"`));
    const html = await readFile(`dist/projects/${project.slug}/index.html`,'utf8');
    assert.ok(html.includes(project.source));
    assert.ok(html.includes(project.problem));
    assert.ok(html.includes('What I worked on'));
    assert.ok(html.includes('What shipped'));
    if(!project.live) assert.ok(!html.includes('Visit live site'));
  }
});

test('development context and private source documents never ship',async () => {
  for(const route of routes) {
    const html = await readFile(`dist/${route}`,'utf8');
    assert.doesNotMatch(html,/Direction contract|SEED REFERENCE|IMPECCABLE|\/Users\/luis|awaiting confirmation/);
  }
  for(const path of ['PRODUCT.md','CONTENT.md','DESIGN-BRIEF.md','.impeccable/config.local.json']) {
    await assert.rejects(stat(`dist/${path}`));
  }
});

test('template escaping protects HTML and attribute boundaries',() => {
  assert.equal(escape('<img src="x" onerror=\'bad()\'>&'),'&lt;img src=&quot;x&quot; onerror=&#39;bad()&#39;&gt;&amp;');
});

test('primary navigation opens separate pages and marks the current page',async () => {
  const sections = ['projects','experience','about','contact'];
  for(const [route,active] of [['index.html','/'],...sections.map(name=>[`${name}/index.html`,`/${name}/`])]) {
    const html = await readFile(`dist/${route}`,'utf8');
    const nav = html.match(/<nav aria-label="Main navigation">(.*?)<\/nav>/)![1];
    assert.match(nav,new RegExp(`href="${active}" aria-current="page"`));
    assert.equal((nav.match(/aria-current="page"/g)||[]).length,1);
    assert.doesNotMatch(nav,/href="[^"]*#/);
  }
  const home = await readFile('dist/index.html','utf8');
  assert.match(home,/class="build-key[^"]*"[^>]*href="\/projects\/"/);
  assert.doesNotMatch(home,/id="(?:work|experience|about|contact)"/);
});

test('hero navigation exposes every section and resume as labeled native links',async () => {
  const html = await readFile('dist/index.html','utf8');
  const keyboard = html.match(/<nav class="hero-keyboard"[^>]*>(.*?)<\/nav>/)![1];
  for(const [href,label] of [['/projects/','Projects'],['/experience/','Experience'],['/about/','About'],['/contact/','Contact'],['/resume/','Resume'],['/photography/','Photography']]) {
    assert.ok(keyboard.includes(`href="${href}"`));
    assert.ok(keyboard.includes(label));
  }
  assert.doesNotMatch(keyboard,/target="_blank"/);
  const resume = await readFile('dist/resume/index.html','utf8');
  assert.match(resume,/<iframe[^>]+src="\/luis-angel-moreno-resume.pdf#view=FitH"[^>]+title="[^"]+"/);
  assert.match(resume,/download="Luis-Angel-Moreno-Resume.pdf"/);
  for(const route of routes) {
    const page = await readFile(`dist/${route}`,'utf8');
    assert.match(page,/<a class="resume-link" href="\/resume\/"/);
    assert.doesNotMatch(page,/<a[^>]+href="\/luis-angel-moreno-resume.pdf"[^>]+target="_blank"/);
  }
});
