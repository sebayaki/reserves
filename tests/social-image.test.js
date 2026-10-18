import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('shared image is a real PNG with the dimensions advertised to social crawlers', () => {
  const image = readFileSync(new URL('../public/og-image.png', import.meta.url));
  const html = readFileSync(new URL('../site/index.html', import.meta.url), 'utf8');
  assert.equal(image.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  const width = Number(html.match(/property="og:image:width" content="(\d+)"/)[1]);
  const height = Number(html.match(/property="og:image:height" content="(\d+)"/)[1]);
  assert.equal(image.readUInt32BE(16), width);
  assert.equal(image.readUInt32BE(20), height);
  assert.equal(width, 1200);
  assert.equal(height, 630);
  assert.ok(image.length < 1024 * 1024, 'Keep the social image below 1 MB');
});
