import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (p) => fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';

test('skills page is a dedicated performance dashboard with animated metric rings', () => {
  const page = read('src/app/skills/page.tsx');
  const css = read('src/app/skills/skills.module.css');
  assert.match(page, /Seu desempenho/);
  assert.match(page, /Reuniões analisadas/);
  assert.match(page, /Comunicação/);
  assert.match(page, /Clareza/);
  assert.match(page, /Escuta/);
  assert.match(page, /Objetividade/);
  assert.match(page, /Perguntas/);
  assert.match(page, /Argumentação/);
  assert.match(page, /Condução/);
  assert.match(page, /requestAnimationFrame|setInterval|setTimeout/);
  assert.match(css, /conic-gradient|stroke-dashoffset/);
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
