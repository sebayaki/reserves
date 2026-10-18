import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createSnapshot, prerenderHtml, siteUrl, seoPlugin } from '../scripts/seo.mjs';
import { countries, sources, datasetMeta } from '../site/src/data.js';
import { rankCountries } from '../site/src/model.js';
import { tableRowsMarkup, sourceRegisterMarkup } from '../site/src/presentation.js';
const prices=JSON.parse(readFileSync(new URL('../public/prices.json',import.meta.url),'utf8'));
const source=readFileSync(new URL('../site/index.html',import.meta.url),'utf8');

test('static HTML contains the same default table as interactive rendering',()=>{
  const html=prerenderHtml(source,prices);
  const table=html.match(/<tbody id="holdings-body">([\s\S]*?)<\/tbody>/)[1];
  assert.equal(table,tableRowsMarkup(rankCountries(countries,true,'all',prices),prices));
  assert.equal((table.match(/data-country=/g)||[]).length,countries.length);
  assert.ok(html.includes('Bitcoin and Ethereum holdings by country'));
  assert.ok(html.includes('Null means unverified, not zero'));
  for(const item of sources) assert.ok(html.includes(item.url));
  assert.ok(!html.includes('Loading prices…'));
});

test('structured dataset matches public source snapshots without claiming live or global coverage',()=>{
  const snapshot=createSnapshot(prices);
  const html=prerenderHtml(source,prices);
  const schema=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const dataset=schema['@graph'].find(item=>item['@type']==='Dataset');
  assert.equal(dataset.dateModified,datasetMeta.reviewedAt);
  assert.equal(dataset.distribution[0].contentUrl,siteUrl+'data.json');
  assert.equal(dataset.spatialCoverage.length,countries.length);
  assert.deepEqual(snapshot.data.countries,countries);
  assert.deepEqual(snapshot.data.sources,sources);
  assert.deepEqual(snapshot.data.prices,prices);
  assert.ok(dataset.description.includes('Coverage is partial'));
  assert.equal(dataset.license,undefined);
});

test('canonical and social metadata remain absolute and crawler-readable without JavaScript',()=>{
  assert.ok(source.includes('<link rel="canonical" href="'+siteUrl+'"'));
  assert.ok(source.includes('name="twitter:card" content="summary_large_image"'));
  assert.ok(source.includes('property="og:image" content="'+siteUrl+'og-image.png"'));
  assert.ok(source.includes('name="twitter:creator" content="@0xsebayaki"'));
  assert.ok(readFileSync(new URL('../public/robots.txt',import.meta.url),'utf8').includes('Sitemap: '+siteUrl+'sitemap.xml'));
  const sitemap=readFileSync(new URL('../public/sitemap.xml',import.meta.url),'utf8');
  assert.equal((sitemap.match(/<loc>/g)||[]).length,1);
  assert.ok(sitemap.includes('<loc>'+siteUrl+'</loc>'));
});

test('source register places dates first, sorts newest first and keeps undated entries last',()=>{
  const items=[
    {title:'Old report',asOf:'2025-01-01',url:'https://example.com/old',publisher:'Example',type:'Report'},
    {title:'No date',asOf:null,url:'https://example.com/undated',publisher:'Example',type:'Report'},
    {title:'New report',asOf:'2026-10-18',url:'https://example.com/new',publisher:'Example',type:'Report'},
    {title:'Same date',asOf:'2026-10-18',url:'https://example.com/same',publisher:'Example',type:'Report'},
  ];
  const html=sourceRegisterMarkup(items,{asOf:'2026-01-01'});
  assert.ok(html.indexOf('New report')<html.indexOf('Same date'));
  assert.ok(html.indexOf('Same date')<html.indexOf('Price snapshot'));
  assert.ok(html.indexOf('Price snapshot')<html.indexOf('Old report'));
  assert.ok(html.indexOf('Old report')<html.indexOf('No date'));
  assert.ok(html.indexOf('No date')<html.indexOf('Dataset / JSON'));
  assert.ok(html.indexOf('18 Oct 2026')<html.indexOf('New report'));
  assert.ok(!html.includes('01 /'));
  assert.ok(html.includes('Undated'));
});

test('prerender skips auxiliary HTML and unavailable prices remain unknown',()=>{
  const other='<html><body>Social image preview</body></html>';
  assert.equal(seoPlugin().transformIndexHtml.handler(other,{filename:'/tmp/og-preview.html'}),other);
  const html=prerenderHtml(source,{...prices,bitcoin:{usd:null},ethereum:{usd:null}});
  assert.ok(html.includes('id="total-value">—</strong>'));
  assert.ok(html.includes('id="btc-usd">— USD</span>'));
});
