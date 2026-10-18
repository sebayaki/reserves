import test from 'node:test';
import assert from 'node:assert/strict';
import { copyFile, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { getHoldings, rankCountries, valueOf } from '../site/src/model.js';
import { countries, sources } from '../site/src/data.js';

const prices = { bitcoin: { usd: 10 }, ethereum: { usd: 2 } };
const sampleCountries = [
  { id: 'AA', name: 'Alpha', government: { btc: 1, eth: null }, businesses: [{ name: 'Alpha Co', btc: 9, eth: 2 }] },
  { id: 'BB', name: 'Beta', government: { btc: 3, eth: 1 }, businesses: [] },
  { id: 'CC', name: 'Confirmed zero', government: { btc: 0, eth: 0 }, businesses: [] },
  { id: 'DD', name: 'Unverified', government: { btc: null, eth: null }, businesses: [] },
];

test('unverified holdings remain null while a disclosed zero remains zero', () => {
  assert.deepEqual(getHoldings(sampleCountries[3]), { btc: null, eth: null });
  assert.deepEqual(getHoldings(sampleCountries[2]), { btc: 0, eth: 0 });
  assert.equal(valueOf(sampleCountries[3], false, 'all', prices), null);
  assert.equal(valueOf(sampleCountries[2], false, 'all', prices), 0);
});

test('business inclusion adds covered companies to each asset without treating unknown as zero', () => {
  assert.deepEqual(getHoldings(sampleCountries[0], false), { btc: 1, eth: null });
  assert.deepEqual(getHoldings(sampleCountries[0], true), { btc: 10, eth: 2 });
  assert.deepEqual(getHoldings(sampleCountries[3], true), { btc: null, eth: null });
});

test('USD values use the selected asset and sum only the covered holdings', () => {
  assert.equal(valueOf(sampleCountries[0], false, 'btc', prices), 10);
  assert.equal(valueOf(sampleCountries[0], false, 'eth', prices), null);
  assert.equal(valueOf(sampleCountries[0], false, 'all', prices), 10);
  assert.equal(valueOf(sampleCountries[0], true, 'btc', prices), 100);
  assert.equal(valueOf(sampleCountries[0], true, 'eth', prices), 4);
  assert.equal(valueOf(sampleCountries[0], true, 'all', prices), 104);
});

test('including businesses recalculates rankings and shares, leaving unverified countries last', () => {
  const government = rankCountries(sampleCountries, false, 'all', prices);
  const combined = rankCountries(sampleCountries, true, 'all', prices);
  assert.deepEqual(government.map(row => row.id), ['BB', 'AA', 'CC', 'DD']);
  assert.deepEqual(combined.map(row => row.id), ['AA', 'BB', 'CC', 'DD']);
  assert.equal(government[0].rank, 1);
  assert.equal(government[1].rank, 2);
  assert.equal(combined[0].rank, 1);
  assert.equal(combined[0].share, 104 / 136);
  assert.equal(combined[1].share, 32 / 136);
  assert.equal(combined[2].share, 0);
  assert.equal(combined[2].rank, null);
  assert.equal(combined[3].share, null);
  assert.equal(combined[3].rank, null);
  assert.deepEqual(sampleCountries[0].government, { btc: 1, eth: null });
  assert.equal(sampleCountries[0].rank, undefined);
});

test('table sorting keeps value rankings intact and unknown quantities last in both directions', () => {
  const byName = rankCountries(sampleCountries, false, 'all', prices, 'name', 'asc');
  assert.deepEqual(byName.map(row => row.id), ['AA', 'BB', 'CC', 'DD']);
  assert.equal(byName[0].rank, 2);
  assert.equal(byName[1].rank, 1);
  const ascending = rankCountries(sampleCountries, false, 'all', prices, 'eth', 'asc');
  assert.deepEqual(ascending.map(row => row.id), ['CC', 'BB', 'AA', 'DD']);
  const descending = rankCountries(sampleCountries, false, 'all', prices, 'eth', 'desc');
  assert.deepEqual(descending.map(row => row.id), ['BB', 'CC', 'AA', 'DD']);
});

test('published holdings have unique country IDs and traceable, dated source references', () => {
  assert.equal(new Set(countries.map(country => country.id)).size, countries.length);
  assert.equal(new Set(sources.map(source => source.id)).size, sources.length);
  const sourceIds = new Set(sources.map(source => source.id));
  for (const source of sources) {
    assert.equal(new URL(source.url).protocol, 'https:');
    assert.ok(Number.isFinite(Date.parse(source.asOf)), source.id);
  }
  for (const country of countries) {
    assert.ok(country.sourceIds.length > 0, country.name);
    assert.ok(country.sourceIds.every(id => sourceIds.has(id)), country.name);
    for (const entity of [country.government, ...country.businesses]) {
      for (const asset of ['btc', 'eth']) {
        assert.ok(entity[asset] === null || (Number.isFinite(entity[asset]) && entity[asset] >= 0), `${country.name}: ${asset}`);
      }
      if (entity.sourceId) assert.ok(sourceIds.has(entity.sourceId), entity.name);
    }
  }
});

async function runRefresh(t, response) {
  const directory = await mkdtemp(join(tmpdir(), 'reserve-atlas-prices-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  await mkdir(join(directory, 'scripts'));
  await mkdir(join(directory, 'public'));
  await copyFile(new URL('../scripts/refresh-prices.mjs', import.meta.url), join(directory, 'scripts/refresh-prices.mjs'));
  const previous = '{"previous":"verified snapshot"}\n';
  await writeFile(join(directory, 'public/prices.json'), previous);
  const preloader = `globalThis.fetch = async () => ({ok: ${response.status === 200}, status: ${response.status}, json: async () => (${JSON.stringify(response.body)})});`;
  const result = spawnSync(process.execPath, [
    '--import', `data:text/javascript;base64,${Buffer.from(preloader).toString('base64')}`,
    join(directory, 'scripts/refresh-prices.mjs'),
  ], { encoding: 'utf8', timeout: 5000 });
  assert.equal(result.error, undefined);
  return {
    ...result,
    previous,
    content: await readFile(join(directory, 'public/prices.json'), 'utf8'),
    files: await readdir(join(directory, 'public')),
  };
}

test('price refresh uses upstream timestamps and saves both quotes together', async t => {
  const result = await runRefresh(t, {
    status: 200,
    body: {
      bitcoin: { usd: 100_000.25, last_updated_at: 1_760_000_100 },
      ethereum: { usd: 4_000.5, last_updated_at: 1_760_000_000 },
    },
  });
  assert.equal(result.status, 0, result.stderr);
  const snapshot = JSON.parse(result.content);
  assert.deepEqual(snapshot.bitcoin, { usd: 100_000.25 });
  assert.deepEqual(snapshot.ethereum, { usd: 4_000.5 });
  assert.equal(snapshot.asOf, new Date(1_760_000_000_000).toISOString());
  assert.equal(snapshot.source, 'CoinGecko');
  assert.equal(snapshot.sourceUrl, 'https://www.coingecko.com/');
  assert.ok(Number.isFinite(Date.parse(snapshot.fetchedAt)));
  assert.deepEqual(result.files, ['prices.json']);
});

test('price refresh preserves the verified snapshot on an HTTP failure', async t => {
  const result = await runRefresh(t, { status: 429, body: { error: 'rate limited' } });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /HTTP 429/);
  assert.equal(result.content, result.previous);
  assert.deepEqual(result.files, ['prices.json']);
});

test('price refresh rejects incomplete or malformed quotes without changing the snapshot', async t => {
  for (const body of [
    { bitcoin: { usd: 100_000, last_updated_at: 1_760_000_000 } },
    { bitcoin: { usd: '100000', last_updated_at: 1_760_000_000 }, ethereum: { usd: 4000, last_updated_at: 1_760_000_000 } },
    { bitcoin: { usd: 100_000, last_updated_at: 1_760_000_000 }, ethereum: { usd: 4000, last_updated_at: null } },
  ]) {
    const result = await runRefresh(t, { status: 200, body });
    assert.equal(result.status, 1);
    assert.equal(result.content, result.previous);
    assert.deepEqual(result.files, ['prices.json']);
  }
});

test('exchange customer custody and historical Nexon purchase do not enter holdings totals', () => {
  const korea = countries.find(country => country.id === 'KR');
  const dunamu = korea.businesses.find(business => business.sourceId === 'dunamu-2026h1');
  assert.equal(dunamu.btc, 16587);
  assert.equal(dunamu.eth, 12329);
  assert.deepEqual(getHoldings(korea, true), { btc: 16587, eth: 12329 });
  const japan = countries.find(country => country.id === 'JP');
  const nexon = japan.businesses.find(business => business.name === 'NEXON Co., Ltd.');
  assert.equal(nexon.btc, null);
  assert.equal(nexon.eth, null);
  assert.equal(getHoldings(japan, true).btc, 44000);
});

test('wallet estimates and source rounding remain documented without conflating official balances', () => {
  for (const id of ['US', 'GB', 'BT', 'TW']) {
    assert.ok(countries.find(country => country.id === id).estimatedAssets.includes('btc'));
  }
  const salvador = countries.find(country => country.id === 'SV');
  assert.equal(salvador.estimatedAssets, undefined);
  assert.equal(sources.find(source => source.id === 'sv-gov').publisher, 'National Bitcoin Office · Government of El Salvador');
  const btcs = countries.find(country => country.id === 'US').businesses.find(business => business.sourceId === 'btcs');
  assert.equal(btcs.eth, 51226);
  for (const country of countries) {
    assert.equal(new Set(country.businesses.map(business => business.sourceId)).size, country.businesses.length);
    for (const business of country.businesses) {
      assert.ok(country.sourceIds.includes(business.sourceId));
      assert.ok(Number.isFinite(Date.parse(business.asOf)));
    }
  }
});
