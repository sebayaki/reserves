# Reserve Atlas

**The geography of digital wealth.** An independent, static atlas of publicly reported government and selected company Bitcoin and Ethereum holdings.

Live site: **https://reserves.sebayaki.com/**

## Experience

- Natural Earth world map with country markers, hover reports and keyboard navigation.
- Government / selected businesses toggle recalculates balances, valuations, ranks and dataset shares together.
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

This first release covers **9 countries and selected entities**, not a comprehensive world ranking. Government observations range from 2025 to October 2026. Disclosure dates are visible in each country report. Some state amounts are third-party tracker estimates; seized assets can be held in custody and are not necessarily owned as strategic reserves. Companies are assigned by operating headquarters; state-owned Bhutan assets are counted once. ETFs, exchange customer balances and private citizens are excluded.

Government and company source observations are manually reviewed. **Holdings are not live or automatically refreshed.** Price snapshots can be refreshed with the command above, then rebuilt and committed. A failed upstream quote leaves the previous snapshot intact. The interface labels the quote date separately from holdings dates and never fills an unknown balance with zero. Rankings, shares and totals describe only the selected disclosed dataset.

## Credits

- [Natural Earth](https://www.naturalearthdata.com/) geography through [world-atlas](https://github.com/topojson/world-atlas) (ISC).
- [D3 Geo](https://github.com/d3/d3-geo) and [TopoJSON Client](https://github.com/topojson/topojson-client) (ISC).
- DM Sans and Instrument Serif, self-hosted via Fontsource (SIL Open Font License).
- Indicative USD price snapshot from [CoinGecko](https://www.coingecko.com/).
- Full holdings source register is included in the site's Methodology dialog.
