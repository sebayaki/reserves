import { randomUUID } from 'node:crypto';
import { mkdir, rename, unlink, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const endpoint = new URL('https://api.coingecko.com/api/v3/simple/price');
endpoint.search = new URLSearchParams({
  ids: 'bitcoin,ethereum',
  vs_currencies: 'usd',
  include_last_updated_at: 'true',
}).toString();

const target = fileURLToPath(new URL('../public/prices.json', import.meta.url));
const temporary = `${target}.${process.pid}.${randomUUID()}.tmp`;

try {
  const response = await fetch(endpoint, {
    headers: { accept: 'application/json' },
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error(`CoinGecko returned HTTP ${response.status}`);
  const data = await response.json();

  for (const asset of ['bitcoin', 'ethereum']) {
    const quote = data?.[asset];
    if (!quote || typeof quote.usd !== 'number' || !Number.isFinite(quote.usd) || quote.usd <= 0) {
      throw new Error(`Invalid USD price for ${asset}`);
    }
    if (!Number.isSafeInteger(quote.last_updated_at) || quote.last_updated_at <= 0 ||
        !Number.isFinite(new Date(quote.last_updated_at * 1000).getTime())) {
      throw new Error(`Invalid price timestamp for ${asset}`);
    }
  }

  const snapshot = {
    bitcoin: { usd: data.bitcoin.usd },
    ethereum: { usd: data.ethereum.usd },
    // Use the older upstream timestamp so the shared date never overstates freshness.
    asOf: new Date(Math.min(data.bitcoin.last_updated_at, data.ethereum.last_updated_at) * 1000).toISOString(),
    source: 'CoinGecko',
    sourceUrl: 'https://www.coingecko.com/',
    fetchedAt: new Date().toISOString(),
  };

  await mkdir(fileURLToPath(new URL('../public/', import.meta.url)), { recursive: true });
  await writeFile(temporary, `${JSON.stringify(snapshot, null, 2)}\n`, { flag: 'wx' });
  await rename(temporary, target);
  console.log(`Updated BTC / ETH prices. Source timestamp: ${snapshot.asOf}`);
} catch (error) {
  await unlink(temporary).catch(() => {});
  console.error(`Price refresh failed; the existing snapshot was preserved. ${error.message}`);
  process.exitCode = 1;
}
