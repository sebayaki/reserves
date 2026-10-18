import { countries } from './data.js';

const assets = new Set(['all', 'btc', 'eth']);
const countryIds = new Set(countries.map(country => country.id));

export function parsePreferences(search = '') {
  const params = new URLSearchParams(search);
  return {
    asset: assets.has(params.get('asset')) ? params.get('asset') : 'all',
    businesses: params.get('companies') !== '0',
    view: params.get('view') === 'leaders' ? 'leaders' : 'map',
    selected: countryIds.has(params.get('country')) ? params.get('country') : null,
  };
}

export function serializePreferences(state) {
  const params = new URLSearchParams();
  if (assets.has(state.asset) && state.asset !== 'all') params.set('asset', state.asset);
  if (state.businesses === false) params.set('companies', '0');
  if (state.view === 'leaders') params.set('view', state.view);
  if (countryIds.has(state.selected)) params.set('country', state.selected);
  return params.toString();
}
