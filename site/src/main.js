import '@fontsource-variable/dm-sans';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import './style.css';
import { geoNaturalEarth1, geoPath, geoGraticule10 } from 'd3-geo';
import { feature, mesh } from 'topojson-client';
import world from 'world-atlas/countries-110m.json';
import { countries, sources, datasetMeta } from './data.js';
import { rankCountries } from './model.js';
import { parsePreferences, serializePreferences } from './state.js';

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const safe = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const number = value => value === null ? '—' : new Intl.NumberFormat('en-US', {maximumFractionDigits:2}).format(value);
const compact = value => value === null ? '—' : new Intl.NumberFormat('en-US', {notation:'compact',maximumFractionDigits:2}).format(value);
const money = value => value === null ? '—' : '$' + compact(value);
const share = value => value > 0 && value < 0.001 ? '&lt;0.1%' : `${(value * 100).toFixed(1)}%`;
const estimated = (row, asset = state.asset) => [...(row.estimatedAssets || []), ...(state.businesses ? row.businesses.flatMap(b => b.estimatedAssets || []) : [])].some(key => asset === 'all' || key === asset);
const date = value => new Intl.DateTimeFormat('en-GB', {day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(value));
const sourceById = new Map(sources.map(source => [source.id, source]));
const state = {
  ...parsePreferences(location.search),
  query: '', sort: 'value', direction: 'desc',
};
let prices = {bitcoin:{usd:null}, ethereum:{usd:null}, asOf:null};
try {
  const response = await fetch(`${import.meta.env.BASE_URL}prices.json`, { signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error('Price snapshot unavailable');
  const snapshot = await response.json();
  if (![snapshot.bitcoin?.usd, snapshot.ethereum?.usd].every(value => Number.isFinite(value) && value > 0) || !Number.isFinite(Date.parse(snapshot.asOf))) throw new Error('Invalid price snapshot');
  prices = snapshot;
} catch { $('#price-status').textContent = 'Price snapshot unavailable'; }

const numericIds = {US:'840',GB:'826',SV:'222',BT:'064',TW:'158',JP:'392',CA:'124',FR:'250',BR:'076',KR:'410',SE:'752',SG:'702',NL:'528',DE:'276',IL:'376',AE:'784',HK:'344',AU:'036',CZ:'203',NO:'578',CH:'756',TH:'764',MT:'470'};
const byNumericId = new Map(countries.map(country => [country.numericId || numericIds[country.id], country]));
const geoCountries = feature(world, world.objects.countries).features;
const projection = geoNaturalEarth1().rotate([-8,0]).scale(246).translate([650,319]);
const path = geoPath(projection);
const svg = $('#world-map');
svg.innerHTML = `<defs><pattern id="land-dots" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".82" fill="#b9c3aa"/></pattern></defs><path class="map-graticule" d="${path(geoGraticule10())}"/><g id="countries-layer"></g><path fill="none" stroke="#cad0bd" stroke-width=".35" d="${path(mesh(world, world.objects.countries, (a,b) => a !== b))}"/><g id="markers-layer"></g>`;
const countriesLayer = $('#countries-layer');
geoCountries.filter(country => country.id !== '010').forEach(country => {
  const node = document.createElementNS('http://www.w3.org/2000/svg','path');
  node.setAttribute('d',path(country));
  node.setAttribute('class','map-land');
  if (byNumericId.has(country.id)) node.dataset.country = byNumericId.get(country.id).id;
  countriesLayer.append(node);
});
const markerLayer = $('#markers-layer');
for (const country of countries) {
  const point = projection(country.coordinates);
  const group = document.createElementNS('http://www.w3.org/2000/svg','g');
  group.setAttribute('transform',`translate(${point[0]},${point[1]})`);
  group.setAttribute('class','map-marker');
  group.setAttribute('role','button');
  group.setAttribute('tabindex','0');
  group.dataset.country = country.id;
  group.innerHTML = '<circle class="marker-hit" r="24"/><circle class="marker-core" r="0"/>';
  group.addEventListener('mouseenter',() => showTooltip(country.id));
  group.addEventListener('mouseleave',hideTooltip);
  group.addEventListener('focus',() => showTooltip(country.id));
  group.addEventListener('blur',hideTooltip);
  group.addEventListener('click',() => openCountry(country.id));
  group.addEventListener('keydown',event => {
    if (['Enter',' '].includes(event.key)) {event.preventDefault();openCountry(country.id);}
  });
  markerLayer.append(group);
}

function getRows(sort = state.sort) { return rankCountries(countries,state.businesses,state.asset,prices,sort,state.direction); }
function showTooltip(id) {
  const row = getRows().find(country => country.id === id);
  const tooltip = $('#map-tooltip');
  const assets = state.asset === 'all' ? ['btc','eth'] : [state.asset];
  tooltip.innerHTML = `<div class="tooltip-country"><span aria-hidden="true">${row.flag}</span> ${safe(row.name)}</div><strong class="tooltip-value">${money(row.value)}</strong><div class="tooltip-assets">${assets.map(asset=>`<span>${number(row.holdings[asset])} <small>${asset.toUpperCase()}</small></span>`).join('')}</div>`;
  tooltip.hidden = false;
  highlightCountry(id);
}
function hideTooltip() { $('#map-tooltip').hidden = true; highlightCountry(null); }
function highlightCountry(id) { $$('#countries-layer [data-country]').forEach(node => node.classList.toggle('is-active',node.dataset.country === id)); }
function updateUrl() {
  const query = serializePreferences(state);
  history.replaceState(null,'',location.pathname+(query ? '?'+query : '')+location.hash);
}
function render() {
  const rows = getRows();
  const totalHoldings = ['btc','eth'].map(asset => {
    const values = rows.map(row => row.holdings[asset]).filter(value => value !== null);
    return values.length ? values.reduce((sum,value) => sum+value,0) : null;
  });
  $('#business-toggle').checked = state.businesses;
  $('#total-btc').textContent = compact(totalHoldings[0]);
  $('#total-eth').textContent = compact(totalHoldings[1]);
  const assetValues = totalHoldings.map((quantity,index) => quantity !== null && Number.isFinite(prices[index === 0 ? 'bitcoin' : 'ethereum'].usd) ? quantity * prices[index === 0 ? 'bitcoin' : 'ethereum'].usd : null);
  $('#btc-usd').textContent = `${money(assetValues[0])} USD`;
  $('#eth-usd').textContent = `${money(assetValues[1])} USD`;
  $('#total-value').textContent = money(assetValues.some(value => value !== null) ? assetValues.reduce((sum,value) => sum + (value ?? 0),0) : null);
  $('.stat-value .stat-label').textContent = 'Total value (USD)';
  if (prices.asOf) $('#price-status').textContent = `Prices ${date(prices.asOf)}`;
  const header = $('#value-heading button');
  header.innerHTML = `Value <span>${state.sort === 'value' ? (state.direction === 'desc' ? '↓' : '↑') : '↕'}</span>`;
  header.setAttribute('aria-label', `Sort by ${state.asset === 'all' ? 'combined' : state.asset.toUpperCase()} value in USD`);
  $$('[data-asset]').forEach(button => {const active = button.dataset.asset === state.asset;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
  $$('[data-view]').forEach(button => {const active = button.dataset.view === state.view;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
  $('#map-visual').hidden = state.view !== 'map';
  $('#leaders-visual').hidden = state.view !== 'leaders';
  $('#country-count').textContent = `${countries.length} countries & territories`;
  renderMap(rows);
  renderTable(rows);
  renderLeaders(rows);
  if (state.selected && $('#country-dialog').open) renderCountry(state.selected);
  updateUrl();
}
function renderMap(rows) {
  const maxValue = Math.max(1,...rows.map(row => row.value??0));
  $('#bubble-legend-label').textContent = `${state.view === 'map' ? 'Bubble area' : 'Bar length'} · ${state.asset === 'all' ? 'total' : state.asset.toUpperCase()} USD`;
  $('.bubble-key').hidden = state.view !== 'map';
  const screenScale = Math.max(0.1,svg.getBoundingClientRect().width / 1300);
  const hitRadius = 22 / screenScale;
  [...rows].sort((a,b)=>(b.value??0)-(a.value??0)).forEach(row => {
    const countryPath = $(`#countries-layer [data-country="${row.id}"]`);
    if (countryPath) {countryPath.classList.add('map-country');countryPath.classList.toggle('is-missing',row.value === null);}
    const group = $(`#markers-layer [data-country="${row.id}"]`);
    markerLayer.append(group); // Small bubbles stay reachable above larger nearby bubbles.
    const core = group.querySelector('.marker-core');
    const missing = row.value === null || row.value <= 0;
    // Radius sqrt(value): disk area, rather than diameter, encodes USD value.
    const radius = missing ? 0 : 64 * Math.sqrt(row.value / maxValue);
    core.setAttribute('r',radius);
    group.style.display = missing ? 'none' : '';
    group.querySelector('.marker-hit').setAttribute('r',Math.max(hitRadius,radius));
    group.setAttribute('aria-label',`${row.name}: ${row.value === null ? 'No verified amount in this view' : money(row.value)}. View sources and holdings.`);
  });
}
function renderTable(rows) {
  const filtered = rows.filter(row => row.name.toLowerCase().includes(state.query.toLowerCase()) || row.id.toLowerCase() === state.query.toLowerCase());
  $('#holdings-body').innerHTML = filtered.map(row => `<tr tabindex="0" role="row" data-country="${row.id}" class="${row.rank===1?'rank-first':''}" aria-label="${safe(row.name)}, ${row.rank ? `rank ${row.rank}` : 'no verified amount'}, view details"><td class="rank-cell">${row.rank ? String(row.rank).padStart(2,'0') : '—'}</td><td><div class="country-cell-content"><span class="flag" aria-hidden="true">${row.flag}</span><span class="country-name">${safe(row.name)}</span></div></td><td class="number-column"><span class="asset-number ${row.holdings.btc===null?'missing-value':''}">${number(row.holdings.btc)}</span></td><td class="number-column"><span class="asset-number ${row.holdings.eth===null?'missing-value':''}">${number(row.holdings.eth)}</span></td><td class="number-column"><span class="value-number ${row.value===null?'missing-value':''}">${money(row.value)}</span></td><td class="share-cell">${row.share===null?'<span class="missing-value">—</span>':`<span class="share-cell-value">${share(row.share)}</span><span class="share-track"><span style="width:${row.share*100}%"></span></span>`}</td><td class="row-arrow" aria-hidden="true">↗</td></tr>`).join('');
  $('#empty-state').hidden = filtered.length !== 0;
  $('#results-count').textContent = `${filtered.length} ${filtered.length === 1 ? 'entry' : 'entries'}`;
  $$('#holdings-body tr').forEach(row => {
    row.addEventListener('click',() => openCountry(row.dataset.country));
    row.addEventListener('keydown',event => {if (['Enter',' '].includes(event.key)){event.preventDefault();openCountry(row.dataset.country);}});
    row.addEventListener('mouseenter',() => highlightCountry(row.dataset.country));
    row.addEventListener('mouseleave',() => highlightCountry(null));
  });
  $$('[data-sort]').forEach(button => {
    const active = button.dataset.sort === state.sort;
    button.classList.toggle('sort-active',active);
    button.closest('th').removeAttribute('aria-sort');
    if (active) button.closest('th').setAttribute('aria-sort',state.direction==='desc'?'descending':'ascending');
    button.querySelector('span').textContent = active ? (state.direction==='desc'?'↓':'↑') : '↕';
  });
}
function renderLeaders(rows) {
  const ranked = [...rows].filter(row => row.value !== null && row.value > 0).sort((a,b) => b.value-a.value).slice(0,5);
  const max = ranked[0]?.value || 1;
  $('#leaders-visual').innerHTML = ranked.map(row => `<button class="leader-row" data-country="${row.id}" aria-label="${safe(row.name)}, rank ${row.rank}, ${money(row.value)}. View details."><span class="leader-rank">${String(row.rank).padStart(2,'0')}</span><span class="leader-country"><span aria-hidden="true">${row.flag}</span>${safe(row.name)}</span><span class="leader-bar-track"><span class="leader-bar" style="width:${row.value/max*100}%"></span></span><span class="leader-value">${money(row.value)}</span></button>`).join('');
  $$('#leaders-visual [data-country]').forEach(button => button.addEventListener('click',() => openCountry(button.dataset.country)));
}
function openCountry(id) {
  if (!countries.some(country => country.id===id)) return;
  state.selected = id;
  hideTooltip();
  renderCountry(id);
  if (!$('#country-dialog').open) $('#country-dialog').showModal();
  updateUrl();
}
function renderCountry(id) {
  const row = getRows().find(country => country.id===id);
  const assetName = state.asset === 'all' ? 'Value' : `${state.asset.toUpperCase()} value`;
  const entity = (name,holdings,asOf,sourceId,note = '',estimateAssets = [],quantityLabel = '') => {
    const balances = ['btc','eth'].filter(asset => holdings[asset] !== null).map(asset => `${number(holdings[asset])} <small>${asset.toUpperCase()}</small>`).join('<br>') || '<span class="missing-value" title="No verified amount included">—</span>';
    const source = sourceById.get(sourceId);
    return `<div class="entity-row"><div>${safe(name)}${quantityLabel ? `<small class="quantity-status">${safe(quantityLabel)}</small>` : ''}${asOf || source ? `<small>${asOf ? date(asOf) : ''}${source ? `${asOf ? ' · ' : ''}<a href="${source.url}" target="_blank" rel="noopener noreferrer" aria-label="${safe(name)} source">Source ↗</a>` : ''}</small>` : ''}</div><div class="entity-balances">${balances}</div>${note ? `<details class="entity-note"><summary>Details</summary><p>${safe(note)}</p></details>` : ''}</div>`;
  };
  $('#country-detail').innerHTML = `<div class="dialog-top"><span class="eyebrow">${row.id}${row.rank ? ` / #${row.rank}` : ''}</span><button class="close-button" data-country-close aria-label="Close country details">×</button></div><div class="country-heading"><span class="flag" aria-hidden="true">${row.flag}</span><div><h2 id="country-title">${safe(row.name)}</h2></div></div><div class="country-value-label">${assetName} (USD) · ${state.businesses?'Government + businesses':'Government'}</div><div class="country-value">${money(row.value)}</div><p class="country-value-meta">${prices.asOf?`Prices ${date(prices.asOf)}`:'Prices unavailable'}</p><div class="detail-assets"><div><span>Bitcoin</span><strong>${number(row.holdings.btc)} <small>BTC</small></strong></div><div><span>Ethereum</span><strong>${number(row.holdings.eth)} <small>ETH</small></strong></div></div><div class="entity-heading"><h3>Holdings</h3></div>${entity('Government',row.government,row.government.btc===null&&row.government.eth===null?null:row.asOf,row.government.btc===null&&row.government.eth===null?null:row.sourceIds.find(sourceId=>!row.businesses.some(b=>b.sourceId===sourceId)),'',row.estimatedAssets || [],row.government.btc!==null||row.government.eth!==null?row.governmentType:'')}${state.businesses?row.businesses.map(business=>entity(business.name,business,business.asOf,business.sourceId,business.note,business.estimatedAssets || [],business.quantityLabel)).join(''):row.businesses.length?`<div class="entity-row"><button class="text-link" id="detail-include">Include ${row.businesses.length} ${row.businesses.length===1?'business':'businesses'} ↗</button></div>`:''}<details class="detail-disclosure"><summary>Notes</summary><p class="country-note">${estimated(row) ? 'Some covered amounts are tracker estimates or rounded disclosures. ' : ''}${safe(row.governmentType)}. ${safe(row.note)}</p></details><details class="detail-disclosure"><summary>Sources <span>${row.sourceIds.length}</span></summary><div class="country-source-links">${row.sourceIds.map(sourceId=>sourceById.get(sourceId)).filter(Boolean).map(source=>`<a href="${source.url}" target="_blank" rel="noopener noreferrer"><span>${safe(source.publisher)}<br>${safe(source.type)} · ${date(source.asOf)}</span><span>↗</span></a>`).join('')}</div></details><div class="dialog-actions"><button class="text-link" id="copy-country-link">Copy link <span>↗</span></button><span>— Unverified</span></div>`;
  $('[data-country-close]').addEventListener('click',() => $('#country-dialog').close());
  $('#detail-include')?.addEventListener('click',() => {state.businesses=true;render();});
  $('#copy-country-link').addEventListener('click',async () => {
    try {await navigator.clipboard.writeText(location.href);toast('Link copied');}
    catch {toast('Share the URL in your browser');}
  });
}
let toastTimeout;
function toast(message) {$('#toast').textContent=message;$('#toast').hidden=false;clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>{$('#toast').hidden=true;},3500);}
function closeDialogOnBackdrop(event) {if(event.target===event.currentTarget){const rect=event.currentTarget.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)event.currentTarget.close();}}
$('#country-dialog').addEventListener('click',closeDialogOnBackdrop);
$('#methodology-dialog').addEventListener('click',closeDialogOnBackdrop);
$('#country-dialog').addEventListener('close',() => {state.selected=null;updateUrl();});
$$('[data-open-methodology]').forEach(button=>button.addEventListener('click',()=>$('#methodology-dialog').showModal()));
$$('[data-close-dialog]').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
$('#business-toggle').addEventListener('change',event=>{state.businesses=event.target.checked;hideTooltip();render();});
$$('[data-asset]').forEach(button=>button.addEventListener('click',()=>{state.asset=button.dataset.asset;state.sort='value';state.direction='desc';hideTooltip();render();}));
$$('[data-view]').forEach(button=>button.addEventListener('click',()=>{state.view=button.dataset.view;hideTooltip();render();}));
$$('[data-sort]').forEach(button=>button.addEventListener('click',()=>{const sort=button.dataset.sort;state.direction=state.sort===sort?(state.direction==='desc'?'asc':'desc'):(sort==='name'?'asc':'desc');state.sort=sort;render();}));
$('#country-search').addEventListener('input',event=>{state.query=event.target.value;renderTable(getRows());});
$('#clear-search').addEventListener('click',()=>{state.query='';$('#country-search').value='';renderTable(getRows());$('#country-search').focus();});
document.addEventListener('keydown',event=>{if(event.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement?.tagName)&&!$$('dialog').some(dialog=>dialog.open)){event.preventDefault();$('#country-search').focus();}});
$('#dataset-date').textContent=`Updated ${date(datasetMeta.reviewedAt)}`;
$('#source-register').innerHTML=sources.map((source,index)=>`<a href="${source.url}" target="_blank" rel="noopener noreferrer"><span>${String(index+1).padStart(2,'0')} / ${safe(source.title)}<small>${safe(source.publisher)} · ${safe(source.type)} · ${date(source.asOf)}</small></span><span>↗</span></a>`).join('')+`<a href="https://www.coingecko.com/" target="_blank" rel="noopener noreferrer"><span>Prices / CoinGecko<small>${prices.asOf?date(prices.asOf)+' · UTC':'Snapshot unavailable'}</small></span><span>↗</span></a>`;
$('#export-csv').addEventListener('click',()=>{
  const fields=['Country','ISO','Scope','Bitcoin BTC','Ethereum ETH','Selected valuation asset','Reported value USD','Share of dataset','Government snapshot date','Company snapshot dates','Price snapshot UTC','Government estimated assets','Sources'];
  const lines=getRows().filter(row=>row.name.toLowerCase().includes(state.query.toLowerCase())||row.id.toLowerCase()===state.query.toLowerCase()).map(row=>[row.name,row.id,state.businesses?'government+selected businesses':'government',row.holdings.btc??'',row.holdings.eth??'',state.asset,row.value??'',row.share??'',row.government.btc!==null||row.government.eth!==null?row.asOf:'',state.businesses?row.businesses.map(b=>b.name+': '+b.asOf).join('; '):'',prices.asOf??'',(row.estimatedAssets||[]).join('; '),row.sourceIds.map(id=>sourceById.get(id).url).join(' ')]);
  const csv=[fields,...lines].map(row=>row.map(value=>'"'+String(value).replaceAll('"','""')+'"').join(',')).join('\r\n');
  const url=URL.createObjectURL(new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8;'}));
  const link=document.createElement('a');link.href=url;link.download=`reserve-atlas-${state.asset}-${state.businesses?'with-businesses':'government'}-${datasetMeta.reviewedAt}.csv`;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('CSV exported');
});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.08});
$$('.section-heading,.research-note').forEach(node=>{node.classList.add('reveal');observer.observe(node);});
new ResizeObserver(() => { if (state.view === 'map') renderMap(getRows()); }).observe(svg);
render();
const initialCountry=state.selected;
if(initialCountry)openCountry(initialCountry);
