import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const sidebar = readFileSync(new URL('../src/components/Sidebar.tsx', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/app/globals.css', import.meta.url), 'utf8');

test('sidebar exposes editable profile name and image with persistence', () => {
  assert.match(sidebar, /zyvo-profile/);
  assert.match(sidebar, /type="file"/);
  assert.match(sidebar, /localStorage\.setItem/);
  assert.match(sidebar, /profileName/);
});

test('sidebar uses a clean collapse control instead of an X button', () => {
  assert.match(sidebar, /aria-label="Recolher menu"/);
  assert.doesNotMatch(sidebar, />×</);
});

test('rail icons are visually lighter and aligned', () => {
  assert.match(sidebar, /strokeWidth="1\.45"/);
  assert.match(css, /\.rail-nav a\{[^}]*display:grid[^}]*place-items:center/);
  assert.match(css, /\.rail-nav a svg\{[^}]*width:21px[^}]*height:21px/);
});

test('expanded sidebar has no dead left gutter', () => {
  assert.match(css, /\.sidebar-panel\{[^}]*padding:22px 18px/);
});
