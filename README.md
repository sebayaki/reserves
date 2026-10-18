# Reserve Atlas

**Bitcoin and Ethereum holdings, by country.** An independent, static atlas of publicly reported government and selected company Bitcoin and Ethereum holdings.

Live site: **https://reserves.sebayaki.com/**

## Experience

- Natural Earth world map with bubble area proportional to selected USD value, hover reports and keyboard navigation.
- Centered 1280px layout, with native BTC/ETH quantities and their individual USD valuations.
- Businesses are included by default; the switch recalculates balances, valuations, ranks and dataset shares together.
- All-assets, BTC and ETH valuation lenses; table sorting and country search.
- Country reports with entity-level balances, disclosure dates and source links.
- Shareable country/filter URLs and dated CSV exports.
- Self-hosted typography, responsive layouts and reduced-motion support.

## Local development

Requires Node.js 22.12+ or 24+.

```sh
npm ci
npm run dev
```

Editable source is in `site/`. Vite serves `site/index.html` during development. `site/src/data.js` is the manually curated holdings dataset. `public/prices.json` is the validated CoinGecko price snapshot. All asset quantities are native units; `null` means unverified, never zero.

```sh
npm test
npm run refresh:prices
npm run build
```

The build produces `dist/` and stages its generated `index.html`, `assets/`, `CNAME`, `prices.json` and favicon in the repository root. **Commit the source and generated output together.** This keeps the existing GitHub Pages configuration (`main` → `/`) working without changing repository administration settings. `assets/` is generated and must not contain hand-authored files.

GitHub Actions runs validation on pushes and pull requests. GitHub Pages publishes the committed root directly. No server, private API key or external font request is required at runtime.

## Data boundaries

This disclosure review covers **17 countries and territories and 25 selected companies**, not a comprehensive world ranking or custody audit. Government and corporate balance dates differ. Unverified current unit counts are excluded from totals; historical purchases do not establish a current balance. Disclosure dates are visible in each country report. Some government figures are identified-wallet estimates with incomplete coverage; seized assets can be held in custody and are not necessarily owned as strategic reserves. Companies are assigned by operating headquarters; state-owned Bhutan assets are counted once. ETFs, exchange customer balances and private citizens are excluded.

Government and company source observations are manually reviewed. **Holdings are not live or automatically refreshed.** Price snapshots can be refreshed with the command above, then rebuilt and committed. A failed upstream quote leaves the previous snapshot intact. The interface labels the quote date separately from holdings dates and never fills an unknown balance with zero. Rankings, shares and totals describe only the selected disclosed dataset.

## October 2026 audit

- Dunamu (Upbit): consolidated own-account **16,587 BTC / 12,329 ETH** at June 30, 2026 from DART Note 13(2). Client custody in Note 13(3), and standalone parent figures already included in the group, are excluded.
- Nexon: attributed to its Japanese parent headquarters. The 2026 filing confirms a bitcoin investment but provides no unit count. The **2021 purchase of 1,717 BTC is historical and excluded**.
- Samara: the 2026 interim financial statements report values and asset movements without coin units. Its historical 540 BTC is now excluded; **23 of the 25 listed companies contribute verified, dated native quantities**.
- Strategy, Bitmine, MARA and Metaplanet were crosschecked against SEC/issuer disclosures.
- Bhutan's **518 BTC** is the rounded balance in Arkham-attributed Druk wallets on October 15, not an official countrywide inventory. Unidentified transfers cannot be assumed to be sales. US government custody uses the same publisher's dated **307K BTC**, replacing the December 2025 tracker snapshot.
- El Salvador uses the official ONBTC explorer's **7,808.37428655 BTC** confirmed balance observed October 18 at 04:18 UTC. Taiwan's **210.45 BTC / 2,429.97 ETH** was checked against the original Ministry of Justice custody-platform inventory for October 31, 2025. The UK case study has no balance date; its October 18 access date is not shown as one.
- Approximation symbols are omitted throughout the interface. Source types and plain-language entity notes preserve distinctions between disclosures, rounded values, wallet estimates and custody.
- BTCS includes **51,226 direct ETH** and excludes 3,615 ETH of indirect liquidity-pool exposure. Owned pledged/lent/staked assets are identified in entity notes.
- Added primary filing coverage for Coinbase proprietary assets, native Sharplink ETH, consolidated Hut 8, Tesla and Strive. Coinbase customer assets, borrowing and counterparty collateral are excluded. American Bitcoin is counted once within Hut 8. Sharplink liquid-staking/restaking receipt-token equivalents are excluded from native ETH totals.
- The second review covers every original government/company row in `research/government-recheck-2026-10-18.json` and `research/business-recheck-2026-10-18.json`; additions are documented in `research/additions-recheck-2026-10-18.json`. Earlier research files are retained as historical audit records.

## Credits

- [Natural Earth](https://www.naturalearthdata.com/) geography through [world-atlas](https://github.com/topojson/world-atlas) (ISC).
- [D3 Geo](https://github.com/d3/d3-geo) and [TopoJSON Client](https://github.com/topojson/topojson-client) (ISC).
- DM Sans and Instrument Serif, self-hosted via Fontsource (SIL Open Font License).
- Indicative USD price snapshot from [CoinGecko](https://www.coingecko.com/).
- Full holdings source register is included in the site's Methodology dialog.
