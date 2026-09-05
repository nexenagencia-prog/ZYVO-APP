import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (p) => fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';

test('skills page is a dedicated performance dashboard with animated metric rings', () => {
  const page = read('src/app/skills/page.tsx');
  const css = read('src/app/skills/skills.module.css');
  assert.match(page, /Seu desempenho/);
  assert.match(page, /Comunicação/);
  assert.match(page, /Clareza/);
  assert.match(page, /Escuta/);
  assert.match(page, /Objetividade/);
  assert.match(page, /Perguntas/);
  assert.match(page, /Condução/);
  assert.match(page, /requestAnimationFrame|setInterval|setTimeout/);
  assert.match(css, /conic-gradient|stroke-dashoffset/);
});

test('skills uses the approved editorial card structure', () => {
  const page = read('src/app/skills/page.tsx');
  assert.match(page, /PERFORMANCE HUMANA/);
  assert.match(page, /INSIGHTS REAIS/);
  assert.match(page, /Insights e Conteúdo/);
  assert.match(page, /Analisar Reuniões/);
  assert.match(page, /Analise suas reuniões/);
  assert.match(page, /CAPTURE/);
  assert.match(page, /ANALISE/);
  assert.match(page, /EVOLUA/);
});

test('skills uses imagery extracted from the approved reference in every visual card', () => {
  const page = read('src/app/skills/page.tsx');
  assert.match(page, /skills-ref-hero/);
  assert.match(page, /skills-ref-performance/);
  assert.match(page, /skills-ref-insights/);
  assert.match(page, /skills-ref-meeting/);
  assert.match(page, /skills-ref-analysis/);
  assert.match(page, /backgroundImage/);
});

test('skills desktop dashboard fits completely inside the viewport', () => {
  const css = read('src/app/skills/skills.module.css');
  assert.match(css, /height:100dvh/);
  assert.match(css, /overflow:hidden/);
  assert.match(css, /topbar-offset:82px/);
  assert.match(css, /height:calc\(100dvh - var\(--topbar-offset\) - 16px\)/);
  assert.match(css, /grid-template-columns:minmax\(0,1\.02fr\) minmax\(0,\.79fr\) minmax\(260px,\.61fr\)/);
});

test('home and feature pages use the same shared top navigation', () => {
  const topbar = read('src/components/Topbar.tsx');
  const home = read('src/app/page.tsx');
  const feature = read('src/app/[...slug]/page.tsx');
  const skills = read('src/app/skills/page.tsx');
  assert.match(topbar, /Início/);
  assert.match(topbar, /Skills/);
  assert.match(topbar, /Agenda/);
  assert.match(topbar, /Planos e preços/);
  assert.match(home, /<Topbar/);
  assert.match(feature, /<Topbar/);
  assert.match(skills, /<Topbar/);
});

test('sidebar highlights the current route instead of always highlighting home', () => {
  const sidebar = read('src/components/Sidebar.tsx');
  assert.match(sidebar, /usePathname/);
  assert.match(sidebar, /pathname/);
  assert.doesNotMatch(sidebar, /index === 0 \? styles\.selected/);
});

test('sidebar has a compact performance bar below the profile', () => {
  const sidebar = read('src/components/Sidebar.tsx');
  const css = read('src/components/Sidebar.module.css');
  assert.match(sidebar, /performanceMiniTrack/);
  assert.match(sidebar, /82%/);
  assert.match(css, /\.performanceMiniTrack/);
  assert.match(css, /width:70px/);
});
