import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { assetUsd } from '../site/src/map-viewport.js';
import { countries, sources, datasetMeta } from '../site/src/data.js';
import { rankCountries } from '../site/src/model.js';
import { safe, compact, money, date, tableRowsMarkup, sourceRegisterMarkup, scopeSummary } from '../site/src/presentation.js';

export const siteUrl = 'https://reserves.sebayaki.com/';
export const datasetDescription = 'Dated public-disclosure and identified-wallet snapshots of government and selected company Bitcoin and Ethereum holdings by country and territory. Coverage is partial; company assets are not government assets. Seized assets can be included. Customer deposits are excluded. Null means unverified, not zero. USD values use a separate dated price snapshot and are not live balances.';

export function createSnapshot(prices) {
  const rows = rankCountries(countries, true, 'all', prices);
  const totals = Object.fromEntries(['btc','eth'].map(asset => {
    const values = rows.map(row => row.holdings[asset]).filter(value => value !== null);
    return [asset, values.length ? values.reduce((sum,value) => sum + value,0) : null];
  }));
  const data = { metadata: { ...datasetMeta, description: datasetDescription, url: siteUrl, defaultScope: 'Government and selected businesses', unknownMeaning: 'null means unverified, not zero' }, prices, countries, sources };
  const schema = {
    '@context':'https://schema.org',
    '@graph':[
      {'@type':'WebSite','@id':`${siteUrl}#website`,url:siteUrl,name:'Reserve Atlas',inLanguage:'en'},
      {'@type':'WebPage','@id':`${siteUrl}#webpage`,url:siteUrl,name:'Reserve Atlas — Bitcoin & Ethereum Holdings by Country',isPartOf:{'@id':`${siteUrl}#website`},mainEntity:{'@id':`${siteUrl}#dataset`},inLanguage:'en',primaryImageOfPage:{'@type':'ImageObject',url:`${siteUrl}og-image.png`,width:1200,height:630}},
      {'@type':'Dataset','@id':`${siteUrl}#dataset`,url:siteUrl,name:'Reserve Atlas: reported Bitcoin and Ethereum holdings by country',description:datasetDescription,dateModified:datasetMeta.reviewedAt,creator:{'@type':'Person',name:'sebayaki.eth',url:'https://x.com/0xsebayaki'},inLanguage:'en',variableMeasured:[{'@type':'PropertyValue',name:'Bitcoin holdings',unitText:'BTC'},{'@type':'PropertyValue',name:'Ethereum holdings',unitText:'ETH'}],measurementTechnique:'Manual compilation of dated public disclosures and attributed-wallet reports, with entity-level source links and coverage limitations.',spatialCoverage:countries.map(country=>({'@type':'Place',name:country.name})),citation:sources.map(source=>source.url),distribution:[{'@type':'DataDownload',name:'Reserve Atlas data and sources (JSON)',encodingFormat:'application/json',contentUrl:`${siteUrl}data.json`}]}
    ]
  };
  return { rows, totals, data, schema };
}

function replaceContent(html,id,content) {
  const pattern = new RegExp(`(<([a-z][a-z0-9]*)\\b[^>]*\\bid="${id}"[^>]*>)[\\s\\S]*?(</\\2>)`,'i');
  if (!pattern.test(html)) throw new Error(`Missing prerender target: ${id}`);
  return html.replace(pattern,(_,open,tag,close)=>open+content+close);
}

export function prerenderHtml(html,prices) {
  const snapshot = createSnapshot(prices);
  const { rows, totals, schema } = snapshot;
  const values = [assetUsd(totals.btc,prices.bitcoin.usd),assetUsd(totals.eth,prices.ethereum.usd)];
  const totalValue = values.some(value=>value!==null)?values.reduce((sum,value)=>sum+(value??0),0):null;
  const replacements = {
    'total-btc':compact(totals.btc), 'total-eth':compact(totals.eth),
    'btc-usd':`${money(values[0])} USD`, 'eth-usd':`${money(values[1])} USD`,
    'total-value':money(totalValue), 'price-status':`Prices ${date(prices.asOf)}`,
    'country-count':`${countries.length} countries &amp; territories`, 'holdings-body':tableRowsMarkup(rows,prices),
    'results-count':`${countries.length} entries`, 'dataset-date':`Updated ${date(datasetMeta.reviewedAt)}`,
    'source-register':sourceRegisterMarkup(sources,prices),
    'methodology-summary':safe(scopeSummary(countries)),
  };
  for (const [id,content] of Object.entries(replacements)) html=replaceContent(html,id,content);
  const structuredData = JSON.stringify(schema).replace(/</g,'\\u003c');
  html=html.replace('</head>',`    <script type="application/ld+json">${structuredData}</script>\n  </head>`);
  const companyCount=countries.reduce((sum,country)=>sum+country.businesses.length,0);
  const noScript=`<noscript><style>.atlas-toolbar,.map-stage,.info-button,.table-controls,.site-footer button{display:none!important}.holdings-table tbody tr{cursor:default}.holdings-table th button{pointer-events:none}.static-context{margin:24px 0;line-height:1.65;font-size:14px}.static-context p{margin:12px 0}.static-context a{text-decoration:underline}.static-context summary{cursor:pointer;min-height:44px;align-content:center}</style><section class="static-context" aria-labelledby="static-title"><h2 id="static-title">Bitcoin and Ethereum holdings by country</h2><p>${countries.length} countries and territories · ${companyCount} selected companies. Government and business holdings are combined below. Holdings reviewed ${date(datasetMeta.reviewedAt)}; individual disclosure dates vary. Prices dated ${safe(prices.asOf)}.</p><p>${safe(datasetDescription)}</p><p>Interactive filters and country details require JavaScript. <a href="${siteUrl}data.json">Download quantities, dates, entity notes and sources (JSON)</a>.</p><details><summary>Methodology and sources</summary>${datasetMeta.methodology.map(note=>`<p>${safe(note)}</p>`).join('')}<div class="source-register">${sourceRegisterMarkup(sources,prices)}</div></details></section></noscript>`;
  return html.replace('<section id="rankings"',`${noScript}\n        <section id="rankings"`);
}

export function seoPlugin() {
  const prices = () => JSON.parse(readFileSync(new URL('../public/prices.json',import.meta.url),'utf8'));
  return {
    name:'reserve-atlas-static-data',
    transformIndexHtml: { order:'pre', handler:(html,context)=>context.filename===fileURLToPath(new URL('../site/index.html',import.meta.url))?prerenderHtml(html,prices()):html },
    generateBundle() {
      this.emitFile({type:'asset',fileName:'data.json',source:JSON.stringify(createSnapshot(prices()).data,null,2)+'\n'});
    },
    configureServer(server) {
      server.middlewares.use('/data.json',(_request,response)=>{
        response.setHeader('Content-Type','application/json; charset=utf-8');
        response.end(JSON.stringify(createSnapshot(prices()).data,null,2)+'\n');
      });
    }
  };
}
