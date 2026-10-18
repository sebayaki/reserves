import { assetUsd } from './map-viewport.js';

export const safe = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export const number = value => value === null ? '—' : new Intl.NumberFormat('en-US', {maximumFractionDigits:2}).format(value);
export const compact = value => value === null ? '—' : new Intl.NumberFormat('en-US', {notation:'compact',maximumFractionDigits:2}).format(value);
export const money = value => value === null ? '—' : '$' + compact(value);
export const share = value => value > 0 && value < 0.001 ? '&lt;0.1%' : `${(value * 100).toFixed(1)}%`;
export const date = value => new Intl.DateTimeFormat('en-GB', {day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(value));

function assetValueLine(quantity,price) {
  const value=assetUsd(quantity,price);
  return value===null?'':`<small class="table-asset-usd" aria-label="${safe(money(value))} USD">${money(value)}</small>`;
}
export function tableRowsMarkup(rows,prices) {
  return rows.map(row => `<tr tabindex="0" role="row" data-country="${row.id}" class="${row.rank===1?'rank-first':''}" aria-label="${safe(row.name)}, ${row.rank ? `rank ${row.rank}` : 'no verified amount'}, view details"><td class="rank-cell">${row.rank ? String(row.rank).padStart(2,'0') : '—'}</td><td><div class="country-cell-content"><span class="flag" aria-hidden="true">${row.flag}</span><span class="country-name">${safe(row.name)}</span></div></td><td class="number-column"><span class="asset-number ${row.holdings.btc===null?'missing-value':''}">${number(row.holdings.btc)}</span>${assetValueLine(row.holdings.btc,prices.bitcoin.usd)}</td><td class="number-column"><span class="asset-number ${row.holdings.eth===null?'missing-value':''}">${number(row.holdings.eth)}</span>${assetValueLine(row.holdings.eth,prices.ethereum.usd)}</td><td class="number-column"><span class="value-number ${row.value===null?'missing-value':''}">${money(row.value)}</span></td><td class="share-cell">${row.share===null?'<span class="missing-value">—</span>':`<span class="share-cell-value">${share(row.share)}</span><span class="share-track"><span style="width:${row.share*100}%"></span></span>`}</td><td class="row-arrow" aria-hidden="true">↗</td></tr>`).join('');
}

export function sourceRegisterMarkup(sources,prices) {
  const entries=[...sources,{title:'Price snapshot',publisher:'CoinGecko',type:'BTC / ETH prices · UTC',url:'https://www.coingecko.com/',asOf:prices.asOf}];
  const timestamp=entry=>Number.isFinite(Date.parse(entry.asOf))?Date.parse(entry.asOf):-Infinity;
  const sorted=entries.map((entry,index)=>({...entry,index})).sort((a,b)=>timestamp(b)-timestamp(a)||a.index-b.index);
  return sorted.map(source=>`<a href="${safe(source.url)}" target="_blank" rel="noopener noreferrer"><time class="source-date"${timestamp(source)!==-Infinity?` datetime="${safe(source.asOf)}"`:''}>${timestamp(source)!==-Infinity?date(source.asOf):'Undated'}</time><span class="source-title">${safe(source.title)}<small>${safe(source.publisher)} · ${safe(source.type)}</small></span><span aria-hidden="true">↗</span></a>`).join('')+'<a href="./data.json" download="reserve-atlas-data.json"><span class="source-date">Download</span><span class="source-title">Dataset / JSON<small>Quantities, disclosure dates, entity notes and sources</small></span><span aria-hidden="true">↓</span></a>';
}

export function scopeSummary(countries) {
  return `${countries.length} countries and territories · ${countries.reduce((sum,country)=>sum+country.businesses.length,0)} selected companies. Dated public disclosures; not live or comprehensive.`;
}
