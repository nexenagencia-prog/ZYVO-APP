import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const sidebar = readFileSync(new URL('../src/components/Sidebar.tsx', import.meta.url), 'utf8');
const page = readFileSync(new URL('../src/app/page.tsx', import.meta.url), 'utf8');
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

test('home greeting follows the editable profile name', () => {
  assert.match(sidebar, /zyvo-profile-updated/);
  assert.match(page, /zyvo-profile-updated/);
  assert.match(page, /Olá, bem-vindo/);
  assert.match(page, /zyvo-profile/);
});

test('quick actions keep four equal columns with subtle vertical separators', () => {
  assert.match(css, /\.quick-actions\{[^}]*grid-template-columns:repeat\(4,1fr\)/);
  assert.match(css, /\.quick-action\{[^}]*align-items:center[^}]*text-align:center/);
  assert.match(css, /\.quick-action\{[^}]*border-right:1px solid rgba\(255,255,255,\.08\)/);
  assert.match(css, /\.quick-action svg\{[^}]*stroke-width:1\.35/);
});

test('facial reading overlay animates subtly and respects reduced motion', () => {
  assert.match(page, /className="face-scan"/);
  assert.match(page, /scan-line/);
  assert.match(page, /scan-node/);
  assert.match(css, /@keyframes faceScanSweep/);
  assert.match(css, /@keyframes faceNodePulse/);
  assert.match(css, /prefers-reduced-motion:reduce[^}]*face-scan/s);
});
