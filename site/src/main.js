import '@fontsource-variable/dm-sans';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import './style.css';
import { geoNaturalEarth1, geoPath, geoGraticule10 } from 'd3-geo';
import { feature, mesh } from 'topojson-client';
import world from 'world-atlas/countries-110m.json';
import { countries, sources, datasetMeta } from './data.js';
import { getHoldings, rankCountries } from './model.js';

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const safe = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const number = value => value === null ? '—' : new Intl.NumberFormat('en-US', {maximumFractionDigits:2}).format(value);
const compact = value => value === null ? '—' : new Intl.NumberFormat('en-US', {notation:'compact',maximumFractionDigits:2}).format(value);
const money = value => value === null ? '—' : '$' + compact(value);
const date = value => new Intl.DateTimeFormat('en-GB', {day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(value));
const sourceById = new Map(sources.map(source => [source.id, source]));
const params = new URLSearchParams(location.search);
const state = {
  asset: ['btc','eth'].includes(params.get('asset')) ? params.get('asset') : 'all',
  businesses: params.get('companies') === '1',
  view: params.get('view') === 'leaders' ? 'leaders' : 'map',
  query: '', sort: 'value', direction: 'desc', selected: null,
};
let prices = {bitcoin:{usd:null}, ethereum:{usd:null}, asOf:null};
try {
  const response = await fetch(`${import.meta.env.BASE_URL}prices.json`, { signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error('Price snapshot unavailable');
  const snapshot = await response.json();
  if (![snapshot.bitcoin?.usd, snapshot.ethereum?.usd].every(value => Number.isFinite(value) && value > 0) || !Number.isFinite(Date.parse(snapshot.asOf))) throw new Error('Invalid price snapshot');
  prices = snapshot;
} catch { $('#price-status').textContent = 'Price snapshot unavailable'; }

const numericIds = {US:'840',GB:'826',SV:'222',BT:'064',TW:'158',JP:'392',CA:'124',FR:'250',BR:'076'};
const byNumericId = new Map(countries.map(country => [numericIds[country.id], country]));
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
const offsets = {US:[36,-4],GB:[16,-20],SV:[12,23],BT:[12,-15],TW:[18,16],CA:[12,-10],FR:[14,15],BR:[14,8],JP:[14,-10]};
for (const country of countries) {
  const point = projection(country.coordinates);
  const group = document.createElementNS('http://www.w3.org/2000/svg','g');
  group.setAttribute('transform',`translate(${point[0]},${point[1]})`);
  group.setAttribute('class','map-marker');
  group.setAttribute('role','button');
  group.setAttribute('tabindex','0');
  group.dataset.country = country.id;
  const [dx,dy] = offsets[country.id] || [15,-10];
  const label = ['US','GB','SV','BT','TW'].includes(country.id);
  group.innerHTML = `<circle class="marker-halo" r="15"/><circle class="marker-core" r="5"/><circle class="marker-dot" r="1.8"/>${label ? `<text class="marker-label" x="${dx}" y="${dy}">${safe(country.name)}</text><text class="marker-value" x="${dx}" y="${dy+14}"></text>` : ''}`;
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
  tooltip.innerHTML = `<div class="tooltip-country">${safe(row.name)} <span>${row.flag}</span></div><strong class="tooltip-value">${money(row.value)}</strong><span class="tooltip-meta">${row.value === null ? 'No verified amount in this view' : `${row.rank ? `#${row.rank} in this dataset · ` : ''}${state.businesses ? 'Government + selected companies' : 'Government holdings'}`}</span>`;
  tooltip.hidden = false;
  highlightCountry(id);
}
function hideTooltip() { $('#map-tooltip').hidden = true; highlightCountry(null); }
function highlightCountry(id) { $$('#countries-layer [data-country]').forEach(node => node.classList.toggle('is-active',node.dataset.country === id)); }
function updateUrl() {
  const query = new URLSearchParams();
  if (state.asset !== 'all') query.set('asset',state.asset);
  if (state.businesses) query.set('companies','1');
  if (state.view !== 'map') query.set('view',state.view);
  if (state.selected) query.set('country',state.selected);
  history.replaceState(null,'',location.pathname+(query.size ? '?'+query : '')+location.hash);
}
function render() {
  const rows = getRows();
  const totalValue = rows.some(row => row.value !== null) ? rows.reduce((sum,row) => sum+(row.value??0),0) : null;
  const totalHoldings = ['btc','eth'].map(asset => {
    const values = rows.map(row => row.holdings[asset]).filter(value => value !== null);
    return values.length ? values.reduce((sum,value) => sum+value,0) : null;
  });
  $('#business-toggle').checked = state.businesses;
  $('#map-scope').textContent = state.businesses ? '/ + BUSINESSES' : '/ GOVERNMENTS';
  $('#stat-scope').innerHTML = state.businesses ? 'Government + selected<br>business holdings' : 'Government holdings<br>in this dataset';
  $('#table-scope').textContent = state.businesses ? 'Government + selected businesses' : 'Government holdings';
  $('#total-btc').textContent = compact(totalHoldings[0]);
  $('#total-eth').textContent = compact(totalHoldings[1]);
  $('#total-value').textContent = money(totalValue);
  $('#btc-share').textContent = totalHoldings[0] === null ? 'No verified amount in this view' : `${(totalHoldings[0]/21000000*100).toFixed(2)}% of Bitcoin’s 21M maximum supply`;
  $('.stat-value .stat-label').textContent = state.asset === 'all' ? 'Combined reported value' : `${state.asset === 'btc' ? 'Bitcoin' : 'Ethereum'} reported value`;
  if (prices.asOf) $('#price-status').textContent = `Prices · ${date(prices.asOf)} · UTC`;
  const header = $('#value-heading button');
  header.innerHTML = `${state.asset === 'all' ? 'Reported' : state.asset === 'btc' ? 'Bitcoin' : 'Ethereum'} value <span>${state.sort === 'value' ? (state.direction === 'desc' ? '↓' : '↑') : '↕'}</span>`;
  $$('[data-asset]').forEach(button => {const active = button.dataset.asset === state.asset;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
  $$('[data-view]').forEach(button => {const active = button.dataset.view === state.view;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
  $('#map-visual').hidden = state.view !== 'map';
  $('#leaders-visual').hidden = state.view !== 'leaders';
  $('#country-count').textContent = `/ ${countries.length} countries`;
  renderMap(rows);
  renderTable(rows);
  renderLeaders(rows);
  if (state.selected && $('#country-dialog').open) renderCountry(state.selected);
  updateUrl();
}
function renderMap(rows) {
  const maxValue = Math.max(1,...rows.map(row => row.value??0));
  rows.forEach(row => {
    const countryPath = $(`#countries-layer [data-country="${row.id}"]`);
    if (countryPath) {countryPath.classList.add('map-country');countryPath.classList.toggle('is-missing',row.value === null);}
    const group = $(`#markers-layer [data-country="${row.id}"]`);
    const core = group.querySelector('.marker-core');
    const halo = group.querySelector('.marker-halo');
    const missing = row.value === null;
    const radius = missing ? 3 : 4+Math.sqrt(Math.max(0,row.value)/maxValue)*22;
    core.setAttribute('r',radius);
    core.classList.toggle('map-missing-point',missing);
    halo.setAttribute('r',missing ? 8 : radius+9);
    halo.style.opacity = missing ? '0' : '';
    group.querySelector('.marker-dot').style.display = missing ? 'none' : '';
    const value = group.querySelector('.marker-value');
    if (value) value.textContent = money(row.value);
    group.setAttribute('aria-label',`${row.name}: ${row.value === null ? 'No verified amount in this view' : money(row.value)}. View sources and holdings.`);
  });
}
function renderTable(rows) {
  const filtered = rows.filter(row => row.name.toLowerCase().includes(state.query.toLowerCase()) || row.id.toLowerCase() === state.query.toLowerCase());
  $('#holdings-body').innerHTML = filtered.map(row => `<tr tabindex="0" role="row" data-country="${row.id}" class="${row.rank===1?'rank-first':''}" aria-label="${safe(row.name)}, ${row.rank ? `rank ${row.rank}` : 'no verified amount'}, view details"><td class="rank-cell">${row.rank ? String(row.rank).padStart(2,'0') : '—'}</td><td><div class="country-cell-content"><span class="flag" aria-hidden="true">${row.flag}</span><span><span class="country-name">${safe(row.name)}</span><span class="country-region">${safe(row.region)}</span></span></div></td><td class="number-column"><span class="asset-number ${row.holdings.btc===null?'missing-value':''}">${number(row.holdings.btc)}</span>${row.holdings.btc!==null?'<span class="asset-unit">BTC</span>':''}</td><td class="number-column"><span class="asset-number ${row.holdings.eth===null?'missing-value':''}">${number(row.holdings.eth)}</span>${row.holdings.eth!==null?'<span class="asset-unit">ETH</span>':''}</td><td class="number-column"><span class="value-number ${row.value===null?'missing-value':''}">${money(row.value)}</span></td><td class="share-cell">${row.share===null?'<span class="missing-value">—</span>':`<span class="share-cell-value">${(row.share*100).toFixed(2)}%</span><span class="share-track"><span style="width:${row.share*100}%"></span></span>`}</td><td class="row-arrow" aria-hidden="true">↗</td></tr>`).join('');
  $('#empty-state').hidden = filtered.length !== 0;
  $('#results-count').textContent = `${filtered.length} of ${countries.length} countries`;
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
  $('#leaders-visual').innerHTML = ranked.map(row => `<button class="leader-row" data-country="${row.id}"><span class="leader-rank">${String(row.rank).padStart(2,'0')}</span><span class="leader-country"><span aria-hidden="true">${row.flag}</span>${safe(row.name)}</span><span class="leader-bar-track"><span class="leader-bar" style="width:${row.value/max*100}%"></span></span><span class="leader-value">${money(row.value)}</span></button>`).join('')+`<p class="leader-caption">TOP ${ranked.length} / BY ${state.asset==='all'?'COMBINED':state.asset.toUpperCase()} USD VALUE · CURRENT DATASET ONLY</p>`;
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
  const assetName = state.asset === 'all' ? 'Combined' : state.asset === 'btc' ? 'Bitcoin' : 'Ethereum';
  const entity = (name,holdings,asOf,sourceId,note='') => `<div class="entity-row"><div>${safe(name)}<small>${safe(note)}${asOf?`<br>Snapshot / ${date(asOf)}`:''}${sourceId?` · <a href="${sourceById.get(sourceId).url}" target="_blank" rel="noopener noreferrer">Source ↗</a>`:''}</small></div><div class="entity-balances">${number(holdings.btc)} BTC<br>${number(holdings.eth)} ETH</div></div>`;
  $('#country-detail').innerHTML = `<div class="dialog-top"><span class="eyebrow">Country report / ${row.id}</span><button class="close-button" data-country-close aria-label="Close country details">×</button></div><div class="country-heading"><span class="flag" aria-hidden="true">${row.flag}</span><div><h2 id="country-title">${safe(row.name)}</h2><p>${safe(row.region)} ${row.rank?`/ #${row.rank} in this dataset`:''}</p></div></div><div class="country-value-label">${assetName} reported value · ${state.businesses?'Government + selected companies':'Government'}</div><div class="country-value">${money(row.value)}</div><p class="country-value-meta">${prices.asOf?`USD prices as of ${date(prices.asOf)} · UTC`:'Price snapshot unavailable'}${state.businesses?'<br>Sum of disclosed amounts; country coverage may be partial.':''}</p><div class="detail-assets"><div><span>Bitcoin</span><strong>${number(row.holdings.btc)} <small>BTC</small></strong></div><div><span>Ethereum</span><strong>${number(row.holdings.eth)} <small>ETH</small></strong></div></div><p class="country-note">${safe(row.note)}</p><div class="entity-heading"><h3>Behind the balance</h3><span>Native asset units</span></div>${entity('Government',row.government,row.government.btc===null&&row.government.eth===null?null:row.asOf,row.sourceIds.find(sourceId=>!row.businesses.some(b=>b.sourceId===sourceId)),row.governmentType)}${state.businesses?row.businesses.map(business=>entity(business.name,business,business.asOf,business.sourceId)).join(''):row.businesses.length?`<div class="entity-row"><div>${row.businesses.length} disclosed ${row.businesses.length===1?'business':'businesses'}<small>Excluded from this view</small></div><button class="text-link" id="detail-include">Include businesses ↗</button></div>`:''}<div class="country-source-links">${row.sourceIds.map(sourceId=>sourceById.get(sourceId)).filter(Boolean).map(source=>`<a href="${source.url}" target="_blank" rel="noopener noreferrer"><span>${safe(source.publisher)}<br>${safe(source.type)} · ${date(source.asOf)}</span><span>↗</span></a>`).join('')}</div><div class="dialog-actions"><button class="text-link" id="copy-country-link">Copy this view <span>↗</span></button><span>— No verified amount included</span></div>`;
  $('[data-country-close]').addEventListener('click',() => $('#country-dialog').close());
  $('#detail-include')?.addEventListener('click',() => {state.businesses=true;render();});
  $('#copy-country-link').addEventListener('click',async () => {
    try {await navigator.clipboard.writeText(location.href);toast('Link copied. A country, a new perspective.');}
    catch {toast('Copy the address in your browser to share this view.');}
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
$('#dataset-date').textContent=`Reviewed ${date(datasetMeta.reviewedAt)}`;
$('#source-register').innerHTML=sources.map((source,index)=>`<a href="${source.url}" target="_blank" rel="noopener noreferrer"><span>${String(index+1).padStart(2,'0')} / ${safe(source.title)}<small>${safe(source.publisher)} · ${safe(source.type)} · ${date(source.asOf)}</small></span><span>↗</span></a>`).join('')+`<a href="https://www.coingecko.com/" target="_blank" rel="noopener noreferrer"><span>Prices / CoinGecko<small>${prices.asOf?date(prices.asOf)+' · UTC':'Snapshot unavailable'}</small></span><span>↗</span></a>`;
$('#export-csv').addEventListener('click',()=>{
  const fields=['Country','ISO','Scope','Bitcoin BTC','Ethereum ETH','Selected valuation asset','Reported value USD','Share of dataset','Government snapshot date','Company snapshot dates','Price snapshot UTC','Sources'];
  const lines=getRows().filter(row=>row.name.toLowerCase().includes(state.query.toLowerCase())||row.id.toLowerCase()===state.query.toLowerCase()).map(row=>[row.name,row.id,state.businesses?'government+selected businesses':'government',row.holdings.btc??'',row.holdings.eth??'',state.asset,row.value??'',row.share??'',row.government.btc!==null||row.government.eth!==null?row.asOf:'',state.businesses?row.businesses.map(b=>b.name+': '+b.asOf).join('; '):'',prices.asOf??'',row.sourceIds.map(id=>sourceById.get(id).url).join(' ')]);
  const csv=[fields,...lines].map(row=>row.map(value=>'"'+String(value).replaceAll('"','""')+'"').join(',')).join('\r\n');
  const url=URL.createObjectURL(new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8;'}));
  const link=document.createElement('a');link.href=url;link.download=`reserve-atlas-${state.asset}-${state.businesses?'with-businesses':'government'}-${datasetMeta.reviewedAt}.csv`;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Snapshot exported with dates and source links.');
});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.08});
$$('.section-heading,.research-note').forEach(node=>{node.classList.add('reveal');observer.observe(node);});
render();
const initialCountry=params.get('country');
if(initialCountry)openCountry(initialCountry);
