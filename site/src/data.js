/** Native BTC/ETH quantities. null means unverified, not zero. Dated disclosures, not live balances. */
export const datasetMeta = {
  "name": "Reserve Atlas · Research preview",
  "reviewedAt": "2026-10-18",
  "updatedAt": "2026-10-18",
  "status": "Curated public-disclosure snapshot",
  "coverage": "17 countries and territories · 25 selected companies",
  "disclaimer": "Indicative, dated public-disclosure and identified-wallet snapshots. Country totals cover only the listed entities and may be incomplete; they are not an audit of national wealth.",
  "methodology": [
    "Government figures include publicly reported state holdings and assets held in law-enforcement custody. Seized assets may be owed to victims and are not necessarily strategic reserves.",
    "Include businesses adds only the named companies in this dataset, attributed by operating headquarters. It does not mean every business in a country or government ownership of those assets.",
    "ETFs, exchange customer assets, private citizens and public officials’ personal holdings are excluded. State-owned Bhutan holdings are counted once in Government.",
    "A dash means no verified quantity is included. It does not mean the country or company owns none. Sums represent known, covered holdings only.",
    "Tracker estimates are explicitly identified. China’s disputed seizure balance, Bulgaria’s disputed 213,519 BTC and Ukraine officials’ personal declarations are excluded.",
    "Holdings are reviewed manually. Source publication and balance dates differ; open a country to inspect the date and evidence behind each figure.",
    "Corporate holdings can include explicitly disclosed company-owned pledged, lent or natively staked assets. Customer assets, borrowed tokens, liquidity-pool exposure and liquid-staking/restaking receipt-token equivalents are excluded.",
    "Corporate group holdings are counted once under the parent operating headquarters. Values are indicative. Source notes describe rounded disclosures, wallet attribution and custody limitations."
  ]
};

export const sources = [
  {
    "id": "us-gov",
    "title": "US government-attributed wallets · rounded 307K BTC",
    "publisher": "Arkham Research",
    "url": "https://info.arkm.com/research/who-owns-the-most-bitcoin-top-btc-holders-2026",
    "asOf": "2026-10-15",
    "type": "Identified-wallet estimate · rounded",
    "retrievedAt": "2026-10-18"
  },
  {
    "id": "uk-gov",
    "title": "Europe’s largest crypto money-laundering case · 61,000 BTC in civil recovery proceedings",
    "publisher": "Crown Prosecution Service",
    "url": "https://www.cps.gov.uk/node/29684",
    "asOf": "2026-10-18",
    "type": "Official case study · accessed date",
    "dateKind": "accessed",
    "retrievedAt": "2026-10-18",
    "balanceDate": null
  },
  {
    "id": "sv-gov",
    "title": "ONBTC official treasury wallet · confirmed BTC balance",
    "publisher": "National Bitcoin Office · Government of El Salvador",
    "url": "https://bitcoin.gob.sv/wallet/ONBTC",
    "asOf": "2026-10-18",
    "type": "Official public wallet · observed snapshot",
    "observedAt": "2026-10-18T04:18:00Z"
  },
  {
    "id": "sv-office",
    "title": "National Bitcoin Office · public reserve explorer",
    "publisher": "Government of El Salvador",
    "url": "https://bitcoin.gob.sv/",
    "asOf": "2026-10-18",
    "type": "Official reserve explorer"
  },
  {
    "id": "bt-gov",
    "title": "Bhutan · 518 BTC in Arkham-attributed Druk wallets",
    "publisher": "Arkham Research",
    "url": "https://info.arkm.com/research/who-owns-the-most-bitcoin-top-btc-holders-2026",
    "asOf": "2026-10-15",
    "type": "Identified-wallet estimate · partial coverage",
    "retrievedAt": "2026-10-18"
  },
  {
    "id": "tw-moj",
    "title": "Ministry of Justice letter · prosecutor seized-asset custody inventory",
    "publisher": "Taiwan Ministry of Justice · published by legislator Ju-Chun Ko",
    "url": "https://ipfs.juchunko.com/ipfs/bafkreib4hcvl3pbsdts44iwyzp2xzughb6mguj7r3ar45brrz3qzl2krsu",
    "asOf": "2025-10-31",
    "type": "Official letter · original inventory visually verified",
    "publishedAt": "2025-12-15",
    "locator": "Page 3 inventory; scope limitations on page 1"
  },
  {
    "id": "tw-eth",
    "title": "Taiwan inventory reports 210.45 BTC and 2,429.97 ETH in judicial custody",
    "publisher": "DiarioBitcoin",
    "url": "https://www.diariobitcoin.com/bitcoin/taiwan-revela-tenencias-de-210-bitcoins-provenientes-de-incautaciones-en-casos-criminales/",
    "asOf": "2025-10-31",
    "type": "Reporting on official inventory"
  },
  {
    "id": "strategy",
    "title": "Strategy acquires 250 BTC · aggregate holdings 848,250 BTC",
    "publisher": "Strategy Inc.",
    "url": "https://www.sec.gov/Archives/edgar/data/1050446/000119312526419726/mstr-ex99_1.htm",
    "asOf": "2026-10-11",
    "type": "Company disclosure"
  },
  {
    "id": "bitmine",
    "title": "Bitmine holdings update · 6,028,946 ETH and 214 BTC",
    "publisher": "Bitmine Immersion Technologies · SEC Exhibit 99.1",
    "url": "https://www.sec.gov/Archives/edgar/data/1829311/000149315226046744/ex99-1.htm",
    "asOf": "2026-10-11",
    "type": "SEC furnished company disclosure"
  },
  {
    "id": "mara",
    "title": "MARA · Q2 2026 Form 10-Q · 35,577 BTC",
    "publisher": "MARA Holdings",
    "url": "https://ir.mara.com/sec-filings/all-sec-filings/content/0001507605-26-000022/mara-20260630.htm",
    "asOf": "2026-06-30",
    "type": "SEC quarterly filing"
  },
  {
    "id": "metaplanet",
    "title": "Metaplanet Q3 treasury disclosure · 44,000 BTC",
    "publisher": "Metaplanet Inc.",
    "url": "https://contents.xj-storage.jp/xcontents/33500/4b5f0c2e/ab52/4d40/9d89/e2aa6e3f3524/140120261005546274.pdf",
    "asOf": "2026-09-30",
    "type": "Company regulatory announcement"
  },
  {
    "id": "smarter-web",
    "title": "The Smarter Web Company · Bitcoin purchase · 2,830 BTC",
    "publisher": "The Smarter Web Company PLC",
    "url": "https://www.smarterwebcompany.co.uk/smarterweb-co-uk/_img/pdf/news/2026-10-15-Bitcoin-Purchase.pdf",
    "asOf": "2026-10-15",
    "type": "Company regulatory announcement"
  },
  {
    "id": "btct-corp",
    "title": "Bitcoin Treasury Corporation · 737.33 BTC",
    "publisher": "Bitcoin Treasury Corporation",
    "url": "https://btctcorp.com/",
    "asOf": "2026-09-30",
    "type": "Company treasury dashboard"
  },
  {
    "id": "capital-b",
    "title": "Capital B confirms total group holdings of 3,538 BTC",
    "publisher": "Capital B SA",
    "url": "https://cptlb.com/wp-content/uploads/2026/09/rbZj2RjXHd/20260928-Capital-B-CP-28-septembre-2026-EN-FINAL.pdf",
    "asOf": "2026-09-28",
    "type": "Company regulatory announcement"
  },
  {
    "id": "oranje",
    "title": "OranjeBTC market update · 3,950 BTC at 12 October 2026",
    "publisher": "OranjeBTC",
    "url": "https://filemanager-cdn.mziq.com/published/1c906e2c-8d06-4a32-a1a8-a240167c77f2/12ff32f8-c4fe-4912-8a90-b2e451c590e8",
    "asOf": "2026-10-12",
    "type": "Issuer regulatory announcement",
    "publishedAt": "2026-10-12"
  },
  {
    "id": "dunamu-2026h1",
    "title": "Dunamu 2026 half-year report, consolidated financial statements Note 13",
    "url": "https://dart.fss.or.kr/report/viewer.do?rcpNo=20260814003803&dcmNo=11538594&eleId=24&offset=452986&length=276461&dtd=dart4.xsd",
    "type": "Regulatory filing",
    "published": "2026-08-14",
    "asOf": "2026-06-30",
    "locator": "III.3 consolidated notes, Note 13 Intangible assets, tables (2) and (3)",
    "publisher": "Dunamu · DART"
  },
  {
    "id": "dunamu-2026h1-profile",
    "title": "Dunamu 2026 half-year report, corporate overview",
    "url": "https://dart.fss.or.kr/report/viewer.do?rcpNo=20260814003803&dcmNo=11538594&eleId=4&offset=6148&length=9648&dtd=dart4.xsd",
    "type": "Regulatory filing",
    "publisher": "Dunamu · DART",
    "asOf": "2026-10-18"
  },
  {
    "id": "nexon-purchase-2021",
    "title": "Nexon Purchases $100 Million Worth of Bitcoin",
    "url": "https://pdf.irpocket.com/C3659/BbNL/qYha/Sr9r.pdf",
    "type": "Issuer disclosure",
    "published": "2021-04-28",
    "asOf": "2021-04-28",
    "publisher": "NEXON Co., Ltd."
  },
  {
    "id": "nexon-2026h1",
    "title": "Nexon 2026 half-year report, EDINET S100YWN3",
    "url": "https://disclosure2dl.edinet-fsa.go.jp/searchdocument/pdf/S100YWN3.pdf",
    "type": "Regulatory filing",
    "asOf": "2026-06-30",
    "locator": "Page 32 of 40, Note 7(4)",
    "publisher": "NEXON Co., Ltd."
  },
  {
    "id": "nexon-profile",
    "title": "NEXON corporate profile",
    "url": "https://www.nexon.co.jp/en/about/",
    "type": "Official corporate profile · accessed date",
    "publisher": "NEXON Co., Ltd.",
    "asOf": "2026-10-18"
  },
  {
    "id": "h100",
    "title": "H100 completes acquisition · group holds 3,506.4 BTC",
    "publisher": "H100 Group · MFN",
    "url": "https://www.mfn.se/a/h100-group/h100-completes-acquisition-increasing-bitcoin-holdings-to-3-506-bitcoin.iframe",
    "asOf": "2026-08-10",
    "type": "Issuer acquisition-completion announcement"
  },
  {
    "id": "canaan",
    "title": "September 2026 mining update · 1,875 BTC owned on balance sheet",
    "publisher": "Canaan Inc.",
    "url": "https://canaan.gcs-web.com/news-releases/news-release-details/canaan-inc-provides-september-2026-bitcoin-production-and-mining",
    "asOf": "2026-09-30",
    "publishedAt": "2026-10-15",
    "type": "Company operational disclosure"
  },
  {
    "id": "treasury-nl",
    "title": "Treasury acquires additional 111 Bitcoin · total 1,111 BTC",
    "publisher": "Treasury B.V.",
    "url": "https://www.treasury-btc.com/news/treasury-acquires-additional-111-bitcoin",
    "asOf": "2025-09-18",
    "type": "Company disclosure"
  },
  {
    "id": "3u",
    "title": "3U Bitcoin factsheet October 2026 · 427.1 BTC",
    "publisher": "3U Holding AG",
    "url": "https://www.3u.net/en/3u-group/bitcoin-investment/",
    "asOf": "2026-10-01",
    "type": "Company treasury factsheet"
  },
  {
    "id": "zooz",
    "title": "ZOOZ first-half 2026 results · approximately 1,047 BTC at August 23",
    "publisher": "ZOOZ Strategy Ltd.",
    "url": "https://ir.zoozpower.com/wp-content/uploads/2026/08/ZOOZ-Power-Reports-Financial-Results-for-the-Six-Months-Ended-June-30-2025.pdf",
    "asOf": "2026-08-23",
    "publishedAt": "2026-08-25",
    "type": "Company quarterly filing"
  },
  {
    "id": "boyaa",
    "title": "Voluntary announcement · approximately 4,468 BTC",
    "publisher": "Boyaa Interactive International Limited",
    "url": "https://www.boyaa.com.hk/attachment/2026092101389.pdf",
    "asOf": "2026-09-21",
    "type": "Company regulatory announcement"
  },
  {
    "id": "samara",
    "title": "Samara 2026 interim financial statements · units undisclosed",
    "publisher": "Samara Asset Group p.l.c.",
    "url": "https://cdn.prod.website-files.com/687df2df76e1c946ba38115c/6aad502a3137f60313648897_Interim%202026%20FS%20-SIGNED.pdf",
    "asOf": "2026-06-30",
    "type": "Issuer financial statements",
    "locator": "PDF page 12, printed page 11, note 9; period cover PDF page 2"
  },
  {
    "id": "cleanspark",
    "title": "September 2026 operational update · 13,530 BTC",
    "publisher": "CleanSpark Inc.",
    "url": "https://investors.cleanspark.com/news/news-details/2026/CleanSpark-Releases-September-2026-Operational-Update/default.aspx",
    "asOf": "2026-09-30",
    "type": "Company operational disclosure"
  },
  {
    "id": "riot",
    "title": "Q2 2026 results · 11,380 BTC",
    "publisher": "Riot Platforms Inc.",
    "url": "https://www.riotplatforms.com/riot-platforms-reports-second-quarter-2026-financial-results-and-strategic-highlights/",
    "asOf": "2026-06-30",
    "publishedAt": "2026-08-10",
    "type": "Company quarterly disclosure"
  },
  {
    "id": "btcs",
    "title": "Q2 2026 Form 10-Q · 51,226 directly held ETH",
    "publisher": "BTCS Inc. · SEC",
    "url": "https://www.sec.gov/Archives/edgar/data/1436229/000149315226039249/form10-q.htm",
    "asOf": "2026-06-30",
    "publishedAt": "2026-08-19",
    "type": "SEC quarterly filing"
  },
  {
    "id": "us-context",
    "title": "Strategic Bitcoin Reserve executive order",
    "publisher": "The White House",
    "url": "https://www.whitehouse.gov/presidential-actions/2025/03/establishment-of-the-strategic-bitcoin-reserve-and-united-states-digital-asset-stockpile/",
    "asOf": "2025-03-06",
    "type": "Official policy context · not a quantity disclosure"
  },
  {
    "id": "bt-context",
    "title": "Bhutan Article IV · authorities do not disclose aggregate crypto holdings",
    "publisher": "International Monetary Fund",
    "url": "https://www.imf.org/-/media/files/publications/cr/2026/english/1btnea2026001-source-pdf.pdf",
    "asOf": "2025-12-22",
    "type": "IMF report · wallet-attribution limitations",
    "publishedAt": "2026-01-27",
    "locator": "Annex I, paragraphs 2–3"
  },
  {
    "id": "coinbase",
    "title": "Coinbase Global · dated proprietary holdings",
    "publisher": "Coinbase Global · SEC",
    "url": "https://www.sec.gov/Archives/edgar/data/1679788/000167978826000088/coin-20260630.htm",
    "asOf": "2026-06-30",
    "type": "SEC company disclosure",
    "locator": "Notes 7 and 9; units, not USD thousands"
  },
  {
    "id": "sharplink",
    "title": "Sharplink · dated proprietary holdings",
    "publisher": "Sharplink · SEC",
    "url": "https://www.sec.gov/Archives/edgar/data/1981535/000149315226036620/form10-q.htm",
    "asOf": "2026-08-03",
    "type": "SEC company disclosure",
    "locator": "MD&A, total ETH holdings and liquidity; subsequent disclosure at August 3"
  },
  {
    "id": "hut8",
    "title": "Hut 8 (consolidated) · dated proprietary holdings",
    "publisher": "Hut 8 (consolidated) · SEC",
    "url": "https://www.sec.gov/Archives/edgar/data/1964789/000110465926090025/hut-20260630x10q.htm",
    "asOf": "2026-06-30",
    "type": "SEC company disclosure",
    "locator": "Note 4 Bitcoin and Market Price Risk of Bitcoin"
  },
  {
    "id": "tesla",
    "title": "Tesla · dated proprietary holdings",
    "publisher": "Tesla · SEC",
    "url": "https://www.sec.gov/Archives/edgar/data/1318605/000162828026049270/tsla-20260630.htm",
    "asOf": "2026-06-30",
    "type": "SEC company disclosure",
    "locator": "Note 2 digital assets footnote (2)"
  },
  {
    "id": "strive",
    "title": "Strive · dated proprietary holdings",
    "publisher": "Strive · SEC",
    "url": "https://www.sec.gov/Archives/edgar/data/1920406/000162828026064753/asst-20261005.htm",
    "asOf": "2026-10-02",
    "type": "SEC company disclosure",
    "locator": "Item 8.01, holdings at October 2"
  },
  {
    "id": "us-gov-historical",
    "title": "United States · historical tracker comparison · 328,372 BTC",
    "publisher": "BitcoinTreasuries.net",
    "url": "https://bitcointreasuries.net/governments/united-states",
    "asOf": "2025-12-12",
    "type": "Historical tracker estimate"
  },
  {
    "id": "samara-historical",
    "title": "Samara Bitcoin Bond · historical 540 BTC report",
    "publisher": "Samara Asset Group p.l.c.",
    "url": "https://www.samara-ag.com/market-insights/samara-asset-group-issues-first-quarterly-report-for-its-bitcoin-bond",
    "asOf": "2024-12-31",
    "type": "Company disclosure · historical snapshot",
    "publishedAt": "2025-03-31"
  }
];

export const countries = [
  {
    "id": "US",
    "name": "United States",
    "flag": "🇺🇸",
    "region": "North America",
    "coordinates": [
      -100,
      39
    ],
    "government": {
      "btc": 307000,
      "eth": null
    },
    "businesses": [
      {
        "name": "Strategy",
        "btc": 848250,
        "eth": null,
        "asOf": "2026-10-11",
        "sourceId": "strategy",
        "note": "Aggregate company-owned BTC reported at 11 October 2026."
      },
      {
        "name": "Bitmine Immersion",
        "btc": 214,
        "eth": 6028946,
        "asOf": "2026-10-11",
        "sourceId": "bitmine",
        "note": "Balance disclosed as of 11 October 2026 at 1:30 p.m. Eastern; published 12 October."
      },
      {
        "name": "MARA Holdings",
        "btc": 35577,
        "eth": null,
        "asOf": "2026-06-30",
        "sourceId": "mara",
        "note": "26,307 unrestricted BTC plus 9,270 BTC receivables: 4,742 lent and 4,528 pledged. Total company-owned balance is 35,577 BTC. A pending 44 BTC investee dividend is excluded."
      },
      {
        "name": "CleanSpark",
        "btc": 13530,
        "eth": null,
        "asOf": "2026-09-30",
        "sourceId": "cleanspark",
        "note": "Total includes 3,475 BTC posted as collateral or receivable for derivative transactions. Corporate-owned exposure, not unencumbered cash-like reserve."
      },
      {
        "name": "Riot Platforms",
        "btc": 11380,
        "eth": null,
        "asOf": "2026-06-30",
        "sourceId": "riot",
        "note": "Includes 5,821 BTC pledged as collateral; owned assets not third-party borrowed collateral. Historical June balance; do not label October."
      },
      {
        "name": "BTCS",
        "btc": null,
        "eth": 51226,
        "asOf": "2026-06-30",
        "sourceId": "btcs",
        "note": "51,226 directly held ETH from the June 2026 Form 10-Q, including staking and company-owned collateral. The separately disclosed 3,615 ETH underlying liquidity-pool positions is excluded to keep this total in directly held native units. Do not add the 54,841 ETH exposure subtotal again."
      },
      {
        "name": "Coinbase Global",
        "btc": 17864,
        "eth": 160759,
        "asOf": "2026-06-30",
        "sourceId": "coinbase",
        "note": "Own investment assets 17,311 BTC + 150,279 ETH; own operating assets 553 BTC + 10,480 ETH. Sum: 17,864 BTC / 160,759 ETH. Borrowed assets, lending/derivatives collateral owed to counterparties and customer assets are separate categories and excluded."
      },
      {
        "name": "Sharplink",
        "btc": null,
        "eth": 634255,
        "asOf": "2026-08-03",
        "sourceId": "sharplink",
        "note": "634,255 native ETH. Exclude 181,748 ETH equivalent from LsETH and 72,935 ETH equivalent from weETH; do not use gross 888,938 ETH-equivalent figure for a native-token total."
      },
      {
        "name": "Hut 8 (consolidated)",
        "btc": 17316,
        "eth": null,
        "asOf": "2026-06-30",
        "sourceId": "hut8",
        "note": "17,316 BTC = 9,314 Hut 8 + 8,002 consolidated American Bitcoin. Includes 9,376 in custody, 3,090 pledged for miner purchase, 4,850 pledged as collateral. Own assets; not customer assets."
      },
      {
        "name": "Tesla",
        "btc": 11509,
        "eth": null,
        "asOf": "2026-06-30",
        "sourceId": "tesla",
        "note": "Explicitly discloses 11,509 units of Bitcoin at June 30, 2026 and December 31, 2025. No unit count is inferred from fair value."
      },
      {
        "name": "Strive",
        "btc": 29462,
        "eth": null,
        "asOf": "2026-10-02",
        "sourceId": "strive",
        "note": "29,462 BTC at October 2 versus 28,000 at September 30. Strategy preferred shares are financial investments and are not added as BTC. Consolidated group counted once."
      }
    ],
    "asOf": "2026-10-15",
    "note": "Arkham reports 307K BTC in identified US government wallets on 15 October 2026. This includes custody of seized assets and is not an audited Strategic Bitcoin Reserve balance. The older BitcoinTreasuries figure of 328,372 BTC is dated 12 December 2025 and is not added. Wallet movements do not by themselves establish sales. Corporate groups are counted once; company notes describe owned pledged, lent or staked positions.",
    "sourceIds": [
      "us-gov",
      "strategy",
      "bitmine",
      "mara",
      "cleanspark",
      "riot",
      "btcs",
      "us-context",
      "coinbase",
      "sharplink",
      "hut8",
      "tesla",
      "strive",
      "us-gov-historical"
    ],
    "governmentType": "Tracked government custody",
    "estimatedAssets": [
      "btc"
    ]
  },
  {
    "id": "GB",
    "name": "United Kingdom",
    "flag": "🇬🇧",
    "region": "Europe",
    "coordinates": [
      -2.5,
      54.5
    ],
    "government": {
      "btc": 61000,
      "eth": null
    },
    "businesses": [
      {
        "name": "The Smarter Web Company",
        "btc": 2830,
        "eth": null,
        "asOf": "2026-10-15",
        "sourceId": "smarter-web"
      }
    ],
    "asOf": null,
    "note": "The Crown Prosecution Service describes 61,000 seized BTC subject to High Court civil recovery proceedings. This is a rounded case-specific custody amount, not an unrestricted sovereign reserve. The undated case study was checked on 18 October 2026; it does not provide a balance date.",
    "sourceIds": [
      "uk-gov",
      "smarter-web"
    ],
    "governmentType": "Seized assets in custody",
    "estimatedAssets": [
      "btc"
    ]
  },
  {
    "id": "SV",
    "name": "El Salvador",
    "flag": "🇸🇻",
    "region": "North America",
    "coordinates": [
      -88.9,
      13.7
    ],
    "government": {
      "btc": 7808.37428655,
      "eth": null
    },
    "businesses": [],
    "asOf": "2026-10-18",
    "note": "The National Bitcoin Office explorer displayed a confirmed ONBTC wallet balance of 7,808.37428655 BTC when checked on 18 October 2026 at 04:18 UTC. This is an observed wallet snapshot, not a consolidated audit of every public-sector asset. Chivo customer assets are excluded.",
    "sourceIds": [
      "sv-gov",
      "sv-office"
    ],
    "governmentType": "Official treasury wallet"
  },
  {
    "id": "BT",
    "name": "Bhutan",
    "flag": "🇧🇹",
    "region": "Asia",
    "coordinates": [
      90.4,
      27.5
    ],
    "government": {
      "btc": 518,
      "eth": null
    },
    "businesses": [],
    "asOf": "2026-10-15",
    "note": "518 BTC is the rounded balance in wallets Arkham attributes to Druk Holding & Investments, not Bhutan’s disclosed total. The government has not published a complete coin inventory. Transfers to unidentified wallets can reduce a tracked balance without a sale. Older 10,000–13,000 BTC estimates refer to other dates and cannot establish today’s total. State-owned holdings are counted only here.",
    "sourceIds": [
      "bt-gov",
      "bt-context"
    ],
    "governmentType": "Tracked state-linked wallets",
    "estimatedAssets": [
      "btc"
    ]
  },
  {
    "id": "TW",
    "name": "Taiwan",
    "flag": "🇹🇼",
    "region": "Asia",
    "coordinates": [
      120.95,
      23.7
    ],
    "government": {
      "btc": 210.45,
      "eth": 2429.97
    },
    "businesses": [],
    "asOf": "2025-10-31",
    "note": "Taiwan Ministry of Justice letter dated 15 December 2025 reports prosecutor seized-asset custody-platform balances at 31 October 2025. The original table lists 210.453033426 BTC and 2,429.96515210136 ETH; this dataset uses the rounded figures 210.45 and 2,429.97. The letter states that a total for finally confiscated assets is not available. These custody balances are not declared strategic reserves.",
    "sourceIds": [
      "tw-moj",
      "tw-eth"
    ],
    "governmentType": "Judicial custody · dated inventory",
    "estimatedAssets": [
      "btc",
      "eth"
    ]
  },
  {
    "id": "JP",
    "name": "Japan",
    "flag": "🇯🇵",
    "region": "Asia",
    "coordinates": [
      138,
      37
    ],
    "government": {
      "btc": null,
      "eth": null
    },
    "businesses": [
      {
        "name": "Metaplanet",
        "btc": 44000,
        "eth": null,
        "asOf": "2026-09-30",
        "sourceId": "metaplanet",
        "note": "Group balance at 30 September 2026. The proposed 2,100 BTC contribution to Superplanet was conditional and is not added to these holdings."
      },
      {
        "name": "NEXON Co., Ltd.",
        "btc": null,
        "eth": null,
        "asOf": "2026-06-30",
        "sourceId": "nexon-2026h1",
        "quantityLabel": "Current units unverified",
        "note": "Tokyo-headquartered Japanese parent, rather than its Korean operating subsidiary. Its H1 2026 filing confirms a bitcoin investment with ¥16,355 million fair value but provides no unit count. The 1,717 BTC purchase announced on 28 April 2021 is historical and excluded from totals. No quantity is inferred from valuation."
      }
    ],
    "asOf": "2026-09-30",
    "note": "Companies follow their parent operating headquarters: Nexon belongs to Japan despite its Korean origins. Metaplanet has a verified unit disclosure. Nexon’s current units remain unknown and contribute nothing to totals.",
    "sourceIds": [
      "metaplanet",
      "nexon-purchase-2021",
      "nexon-2026h1",
      "nexon-profile"
    ],
    "governmentType": "No verified quantity included"
  },
  {
    "id": "CA",
    "name": "Canada",
    "flag": "🇨🇦",
    "region": "North America",
    "coordinates": [
      -106,
      57
    ],
    "government": {
      "btc": null,
      "eth": null
    },
    "businesses": [
      {
        "name": "Bitcoin Treasury Corporation",
        "btc": 737.33,
        "eth": null,
        "asOf": "2026-09-30",
        "sourceId": "btct-corp",
        "note": "Issuer-reported total includes principal Bitcoin loaned and excludes accrued unpaid interest. Loaned coins are company receivables, not immediately available custody balances."
      }
    ],
    "asOf": "2026-09-30",
    "note": "Business coverage includes Bitcoin Treasury Corporation only. Canadian ETFs and fund customer assets are excluded. No verified government quantity is included.",
    "sourceIds": [
      "btct-corp"
    ],
    "governmentType": "No verified quantity included"
  },
  {
    "id": "FR",
    "name": "France",
    "flag": "🇫🇷",
    "region": "Europe",
    "coordinates": [
      2.4,
      46.7
    ],
    "government": {
      "btc": null,
      "eth": null
    },
    "businesses": [
      {
        "name": "Capital B",
        "btc": 3538,
        "eth": null,
        "asOf": "2026-09-28",
        "sourceId": "capital-b"
      }
    ],
    "asOf": "2026-09-28",
    "note": "Business coverage includes the Capital B group, including its Luxembourg treasury subsidiary, counted once under the French operating parent. No verified government quantity is included.",
    "sourceIds": [
      "capital-b"
    ],
    "governmentType": "No verified quantity included"
  },
  {
    "id": "BR",
    "name": "Brazil",
    "flag": "🇧🇷",
    "region": "South America",
    "coordinates": [
      -51,
      -14
    ],
    "government": {
      "btc": null,
      "eth": null
    },
    "businesses": [
      {
        "name": "OranjeBTC",
        "btc": 3950,
        "eth": null,
        "asOf": "2026-10-12",
        "sourceId": "oranje"
      }
    ],
    "asOf": "2026-10-12",
    "note": "OranjeBTC reported 3,950 BTC for the week ending 12 October 2026. No verified government quantity is included.",
    "sourceIds": [
      "oranje"
    ],
    "governmentType": "No verified quantity included"
  },
  {
    "id": "KR",
    "numericId": "410",
    "name": "South Korea",
    "flag": "🇰🇷",
    "region": "Asia",
    "coordinates": [
      127.8,
      36
    ],
    "government": {
      "btc": null,
      "eth": null
    },
    "businesses": [
      {
        "name": "Dunamu · Upbit (consolidated)",
        "btc": 16587,
        "eth": 12329,
        "asOf": "2026-06-30",
        "sourceId": "dunamu-2026h1",
        "note": "Company-owned holdings from consolidated Note 13(2), including subsidiaries once. Customer custody of 173,911 BTC and 2,338,007 ETH is explicitly excluded by Note 13(3). Standalone parent holdings are already part of the consolidated total and are not added again."
      }
    ],
    "asOf": "2026-06-30",
    "note": "Dunamu Inc. is headquartered in Seoul. These are the Upbit operator’s proprietary assets, not customer deposits or South Korea’s total private holdings. Government holdings and other unverified corporate quantities are not included.",
    "sourceIds": [
      "dunamu-2026h1",
      "dunamu-2026h1-profile"
    ],
    "governmentType": "No verified government quantity included"
  },
  {
    "id": "SE",
    "name": "Sweden",
    "flag": "🇸🇪",
    "region": "Europe",
    "coordinates": [
      15,
      62
    ],
    "government": {
      "btc": null,
      "eth": null
    },
    "businesses": [
      {
        "name": "H100 Group",
        "btc": 3506.4,
        "eth": null,
        "asOf": "2026-08-10",
        "sourceId": "h100",
        "note": "Consolidated group balance following the completed Norwegian acquisitions. Acquired subsidiaries are included once under the Swedish parent."
      }
    ],
    "asOf": "2026-08-10",
    "note": "Only named, verified company disclosures are included. No verified government quantity is included; this does not imply zero.",
    "sourceIds": [
      "h100"
    ],
    "governmentType": "No verified government quantity included"
  },
  {
    "id": "SG",
    "name": "Singapore",
    "flag": "🇸🇬",
    "region": "Asia",
    "coordinates": [
      103.82,
      1.35
    ],
    "government": {
      "btc": null,
      "eth": null
    },
    "businesses": [
      {
        "name": "Canaan",
        "btc": 1875,
        "eth": null,
        "asOf": "2026-09-30",
        "sourceId": "canaan",
        "note": "Rounded company-owned BTC balance includes receivables and excludes customer deposits. No verified current ETH quantity is included.",
        "estimatedAssets": [
          "btc"
        ]
      }
    ],
    "asOf": "2026-09-30",
    "note": "Only named, verified company disclosures are included. No verified government quantity is included; this does not imply zero.",
    "sourceIds": [
      "canaan"
    ],
    "governmentType": "No verified government quantity included"
  },
  {
    "id": "NL",
    "name": "Netherlands",
    "flag": "🇳🇱",
    "region": "Europe",
    "coordinates": [
      5.3,
      52.2
    ],
    "government": {
      "btc": null,
      "eth": null
    },
    "businesses": [
      {
        "name": "Treasury B.V.",
        "btc": 1111,
        "eth": null,
        "asOf": "2025-09-18",
        "sourceId": "treasury-nl",
        "note": "Historical dated purchase disclosure remains consistent with current official homepage. Do not relabel balance as 2026 just because homepage is current; do not confuse with unrelated treasury.nl consultancy.",
        "quantityLabel": "Historical snapshot"
      }
    ],
    "asOf": "2025-09-18",
    "note": "Only named, verified company disclosures are included. No verified government quantity is included; this does not imply zero.",
    "sourceIds": [
      "treasury-nl"
    ],
    "governmentType": "No verified government quantity included"
  },
  {
    "id": "DE",
    "name": "Germany",
    "flag": "🇩🇪",
    "region": "Europe",
    "coordinates": [
      10.45,
      51.16
    ],
    "government": {
      "btc": null,
      "eth": null
    },
    "businesses": [
      {
        "name": "3U Holding",
        "btc": 427.1,
        "eth": null,
        "asOf": "2026-10-01",
        "sourceId": "3u",
        "note": "Factsheet footnote explicitly dates holdings October 1, 2026. Own corporate investment."
      }
    ],
    "asOf": "2026-10-01",
    "note": "Only named, verified company disclosures are included. No verified government quantity is included; this does not imply zero.",
    "sourceIds": [
      "3u"
    ],
    "governmentType": "No verified government quantity included"
  },
  {
    "id": "IL",
    "name": "Israel",
    "flag": "🇮🇱",
    "region": "Asia",
    "coordinates": [
      34.85,
      31.05
    ],
    "government": {
      "btc": null,
      "eth": null
    },
    "businesses": [
      {
        "name": "ZOOZ Strategy",
        "btc": 1047,
        "eth": null,
        "asOf": "2026-08-23",
        "sourceId": "zooz",
        "note": "PDF filename incorrectly says 2025; actual document is 2026 Form 6-K. Page19 subsequent disclosure dates 1,047 BTC August23, newer than June30 same quantity. Official IR address Lod Israel. Source rounded approximate.",
        "estimatedAssets": [
          "btc"
        ]
      }
    ],
    "asOf": "2026-08-23",
    "note": "Only named, verified company disclosures are included. No verified government quantity is included; this does not imply zero.",
    "sourceIds": [
      "zooz"
    ],
    "governmentType": "No verified government quantity included"
  },
  {
    "id": "HK",
    "name": "Hong Kong",
    "flag": "🇭🇰",
    "region": "Asia",
    "coordinates": [
      114.17,
      22.32
    ],
    "government": {
      "btc": null,
      "eth": null
    },
    "businesses": [
      {
        "name": "Boyaa Interactive",
        "btc": 4468,
        "eth": null,
        "asOf": "2026-09-21",
        "sourceId": "boyaa",
        "note": "Official contemporary company information calls Hong Kong headquarters and Shenzhen an office; older2024 reports called Shenzhen headquarters. Use Hong Kong per current https://www.boyaa.com.hk/html/investor.php . Coins include operational Web3 deployments; not all idle treasury. Do not add historical 15,000+ ETH after ETH-to-BTC conversions.",
        "estimatedAssets": [
          "btc"
        ]
      }
    ],
    "asOf": "2026-09-21",
    "note": "Only named, verified company disclosures are included. No verified government quantity is included; this does not imply zero.",
    "sourceIds": [
      "boyaa"
    ],
    "governmentType": "No verified government quantity included"
  },
  {
    "id": "MT",
    "name": "Malta",
    "flag": "🇲🇹",
    "region": "Europe",
    "coordinates": [
      14.4,
      35.9
    ],
    "government": {
      "btc": null,
      "eth": null
    },
    "businesses": [
      {
        "name": "Samara Asset Group",
        "btc": null,
        "eth": null,
        "asOf": "2026-06-30",
        "sourceId": "samara",
        "note": "The June 2026 financial statements report digital-asset values, purchases and disposals without a BTC/ETH unit count. The roughly 540 BTC disclosed for the earlier December 2024 report is historical and excluded. No quantity is inferred from euro valuation.",
        "quantityLabel": "Current units unverified"
      }
    ],
    "asOf": "2026-06-30",
    "note": "Samara’s latest financial statements disclose digital-asset values and movements without native coin quantities. Historical Bitcoin holdings are excluded from current totals. This does not mean Samara or Malta holds zero.",
    "sourceIds": [
      "samara",
      "samara-historical"
    ],
    "governmentType": "No verified government quantity included"
  }
];
