import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const sidebar = readFileSync('src/components/Sidebar.tsx', 'utf8');
const defaults = readFileSync('src/lib/cms/defaults.ts', 'utf8');
let page = '';
let css = '';
try { page = readFileSync('src/app/entrar-ao-vivo/page.tsx', 'utf8'); } catch {}
try { css = readFileSync('src/app/entrar-ao-vivo/live.module.css', 'utf8'); } catch {}

test('sidebar exposes Entrar ao vivo route even when CMS navigation is stale', () => {
  assert.match(defaults, /Entrar ao vivo/);
  assert.match(defaults, /\/entrar-ao-vivo/);
  assert.match(sidebar, /\/entrar-ao-vivo/);
});

test('live route preserves global navigation shell and meeting workspace', () => {
  assert.match(page, /<Sidebar\s*\/>/);
  assert.match(page, /<Topbar\s*\/>/);
  assert.match(page, /Skills em tempo real/);
  assert.match(page, /Slides da reunião/);
  assert.match(page, /Convidar participante/);
  assert.match(page, /Sair/);
});

test('live workspace includes glass panels and responsive sidebar offset', () => {
  assert.match(css, /backdrop-filter:\s*blur/);
  assert.match(css, /grid-template-columns/);
  assert.match(css, /padding-left:\s*var\(--rail-space/);
});
