export function getHoldings(country, includeBusinesses = false) {
  const entities = [country.government, ...(includeBusinesses ? country.businesses : [])];
  return Object.fromEntries(['btc', 'eth'].map(asset => {
    const known = entities.map(entity => entity?.[asset]).filter(value => Number.isFinite(value));
    return [asset, known.length ? known.reduce((sum, value) => sum + value, 0) : null];
  }));
}

export function valueOf(country, includeBusinesses, asset, prices) {
  const holdings = getHoldings(country, includeBusinesses);
  const assets = asset === 'all' ? ['btc', 'eth'] : [asset];
  const values = assets.filter(key => holdings[key] !== null && Number.isFinite(prices[key === 'btc' ? 'bitcoin' : 'ethereum']?.usd) && prices[key === 'btc' ? 'bitcoin' : 'ethereum'].usd > 0).map(key => holdings[key] * prices[key === 'btc' ? 'bitcoin' : 'ethereum'].usd);
  return values.length ? values.reduce((sum, value) => sum + value, 0) : null;
}

export function rankCountries(countries, includeBusinesses, asset, prices, sort = 'value', direction = 'desc') {
  const rows = countries.map(country => ({ ...country, holdings: getHoldings(country, includeBusinesses), value: valueOf(country, includeBusinesses, asset, prices) }));
  const total = rows.reduce((sum, row) => sum + (row.value ?? 0), 0);
  const byValue = [...rows].sort((a, b) => (b.value ?? -1) - (a.value ?? -1) || a.name.localeCompare(b.name));
  const ranks = new Map(byValue.filter(row => row.value !== null && row.value > 0).map((row, index) => [row.id, index + 1]));
  return rows.map(row => ({ ...row, share: total > 0 && row.value !== null ? row.value / total : null, rank: ranks.get(row.id) ?? null })).sort((a, b) => {
    if (sort === 'name') return a.name.localeCompare(b.name) * (direction === 'asc' ? 1 : -1);
    const aValue = sort === 'value' ? a.value : a.holdings[sort];
    const bValue = sort === 'value' ? b.value : b.holdings[sort];
    if (aValue === null) return bValue === null ? a.name.localeCompare(b.name) : 1;
    if (bValue === null) return -1;
    return (aValue - bValue) * (direction === 'asc' ? 1 : -1) || a.name.localeCompare(b.name);
  });
}
