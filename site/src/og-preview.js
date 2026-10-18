import './og-preview.css';
import { geoNaturalEarth1, geoPath, geoGraticule10 } from 'd3-geo';
import { feature } from 'topojson-client';
import world from 'world-atlas/countries-110m.json';
import { countries } from './data.js';

// Editorial map artwork: equal-size pins indicate locations only, never amounts.
// The preview is a development-only capture surface, not a production entry point.
const land = feature(world, world.objects.countries).features.filter(country => country.id !== '010');
const projection = geoNaturalEarth1().rotate([-8, 0]).fitExtent([[5, 26], [610, 338]], { type: 'FeatureCollection', features: land });
const path = geoPath(projection);
const featuredLocations = new Set(['US', 'BR', 'GB', 'BT', 'JP', 'AU', 'SV']);
document.querySelector('#og-map').innerHTML = `
  <path class="map-grid" d="${path(geoGraticule10())}" />
  ${land.map(country => `<path class="map-land" d="${path(country)}" />`).join('')}
  ${countries.filter(country => featuredLocations.has(country.id)).map(country => {
    const [x, y] = projection(country.coordinates);
    return `<circle class="map-pin" cx="${x}" cy="${y}" r="5"/>`;
  }).join('')}
`;
await document.fonts.ready;
document.documentElement.dataset.ogReady = 'true';
