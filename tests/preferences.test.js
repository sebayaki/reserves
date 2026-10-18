import test from 'node:test';
import assert from 'node:assert/strict';
import { parsePreferences, serializePreferences } from '../site/src/state.js';

test('new visits include businesses by default', () => {
  assert.deepEqual(parsePreferences(''), {
    asset: 'all', businesses: true, view: 'map', selected: null,
  });
  assert.equal(serializePreferences(parsePreferences('')), '');
});

test('explicit opt-out survives copying and reloading the URL', () => {
  const preferences = parsePreferences('?asset=eth&companies=0&view=leaders&country=JP');
  assert.deepEqual(preferences, {
    asset: 'eth', businesses: false, view: 'leaders', selected: 'JP',
  });
  const serialized = serializePreferences(preferences);
  assert.equal(serialized, 'asset=eth&companies=0&view=leaders&country=JP');
  assert.deepEqual(parsePreferences(serialized), preferences);
});

test('old opt-in links retain their meaning and use the shorter default URL', () => {
  const preferences = parsePreferences('?companies=1&asset=btc&country=US');
  assert.equal(preferences.businesses, true);
  assert.equal(serializePreferences(preferences), 'asset=btc&country=US');
});

test('unknown URL values resolve to supported defaults', () => {
  assert.deepEqual(parsePreferences('?asset=doge&companies=false&view=globe&country=ZZ'), {
    asset: 'all', businesses: true, view: 'map', selected: null,
  });
  assert.equal(serializePreferences({ asset: 'doge', businesses: true, view: 'globe', selected: 'ZZ' }), '');
});

test('changing filters preserves the selected country and businesses opt-out', () => {
  const preferences = { ...parsePreferences('?companies=0&country=TW'), asset: 'btc', view: 'leaders' };
  assert.deepEqual(parsePreferences(serializePreferences(preferences)), preferences);
});
