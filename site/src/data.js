/** Native BTC/ETH quantities. null means unverified, not zero. Dated disclosures, not live balances. */
export const datasetMeta = {
  "name": "Reserve Atlas · Research preview",
  "reviewedAt": "2026-10-18",
  "updatedAt": "2026-10-18",
  "status": "Curated public-disclosure snapshot",
  "coverage": "17 countries and territories · 20 selected companies",
  "disclaimer": "A curated research preview, not a complete census of national wealth or a live audit of holdings. Disclosure dates vary by entity.",
  "methodology": [
    "Government figures include publicly reported state holdings and assets held in law-enforcement custody. Seized assets may be owed to victims and are not necessarily strategic reserves.",
    "Include businesses adds only the named companies in this dataset, attributed by operating headquarters. It does not mean every business in a country or government ownership of those assets.",
    "ETFs, exchange customer assets, private citizens and public officials’ personal holdings are excluded. State-owned Bhutan holdings are counted once in Government.",
    "A dash means no verified quantity is included. It does not mean the country or company owns none. Sums represent known, covered holdings only.",
    "Tracker estimates are explicitly identified. China’s disputed seizure balance, Bulgaria’s disputed 213,519 BTC and Ukraine officials’ personal declarations are excluded.",
    "Holdings are reviewed manually. Source publication and balance dates differ; open a country to inspect the date and evidence behind each figure.",
    "Corporate holdings can include explicitly disclosed company-owned pledged, lent or staked assets, not just unencumbered wallets. Indirect liquidity-pool exposure is excluded from native token totals.",
    "Corporate group holdings are counted once under the parent operating headquarters. Approximate issuer quantities and government tracker estimates carry an approximation mark."
  ]
};

export const sources = [
  {
    "id": "us-gov",
    "title": "United States government · reported BTC holdings",
    "publisher": "BitcoinTreasuries.net",
    "url": "https://bitcointreasuries.net/governments/united-states",
    "asOf": "2025-12-12",
    "type": "Tracker estimate"
  },
  {
    "id": "uk-gov",
    "title": "Europe’s largest crypto money-laundering case · 61,000 BTC in civil recovery proceedings",
    "publisher": "Crown Prosecution Service",
    "url": "https://www.cps.gov.uk/node/29684",
    "asOf": "2026-10-18",
    "type": "Official case study · accessed date"
  },
  {
    "id": "sv-gov",
    "title": "El Salvador · reported government BTC holdings",
    "publisher": "BitcoinTreasuries.net",
    "url": "https://bitcointreasuries.net/governments/el-salvador",
    "asOf": "2026-10-18",
    "type": "Public holdings tracker"
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
    "title": "Bhutan · reported state-owned BTC holdings",
    "publisher": "BitcoinTreasuries.net",
    "url": "https://bitcointreasuries.net/governments/bhutan",
    "asOf": "2026-09-15",
    "type": "Tracker estimate"
  },
  {
    "id": "tw-moj",
    "title": "Seized virtual-asset inventory · Ministry of Justice response published by legislator Ju-Chun Ko",
    "publisher": "Ju-Chun Ko · Ministry of Justice letter",
    "url": "https://juchunko.com/en/act/bitcoin-reserve/",
    "asOf": "2025-10-31",
    "type": "Legislative disclosure"
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
    "title": "OranjeBTC treasury dashboard · 3,950 BTC",
    "publisher": "OranjeBTC",
    "url": "https://www.oranjebtc.com/dashboard",
    "asOf": "2026-08-09",
    "type": "Company treasury dashboard"
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
    "title": "H100 official Bitcoin Strategy Tracker · 3,506.4 BTC",
    "publisher": "H100 Group",
    "url": "https://treasury.h100.group/",
    "asOf": "2026-08-10",
    "type": "Company treasury dashboard"
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
    "url": "https://treasury-btc.com/news/treasury-acquires-additional-111-bitcoin",
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
    "title": "Bitcoin Bond first quarterly report · approximately 540 BTC",
    "publisher": "Samara Asset Group p.l.c.",
    "url": "https://www.samara-ag.com/market-insights/samara-asset-group-issues-first-quarterly-report-for-its-bitcoin-bond",
    "asOf": "2025-03-31",
    "type": "Company disclosure · historical snapshot"
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
    "title": "Bhutan IMF Article IV report · limits of wallet attribution",
    "publisher": "International Monetary Fund",
    "url": "https://www.elibrary.imf.org/view/journals/002/2026/019/article-A001-en.xml",
    "asOf": "2026-10-18",
    "type": "Official policy context · accessed date, not a quantity disclosure"
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
      "btc": 328372,
      "eth": null
    },
    "businesses": [
      {
        "name": "Strategy",
        "btc": 848250,
        "eth": null,
        "asOf": "2026-10-11",
        "sourceId": "strategy",
        "note": "Company press page renders little text; SEC furnished release explicitly supplies aggregate holdings/date."
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
        "note": "26,307 BTC unrestricted; 4,742 lent; 4,528 pledged; total 35,577. Includes company receivables. Excludes 44 investee BTC pending dividend. Flag encumbrance, retain gross total under current methodology."
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
      }
    ],
    "asOf": "2025-12-12",
    "note": "Other trackers use198000; no reconciliation published in reviewed evidence. Maintain estimate label and true Dec2025 balance date. Executive order establishes final-forfeiture reserve with victim-return/legal exceptions but gives no quantity; cannot call entire tracker balance strategic reserve. Corporate totals include disclosed company-owned pledged/lent positions; amounts and exclusions appear in each company’s details.",
    "sourceIds": [
      "us-gov",
      "strategy",
      "bitmine",
      "mara",
      "cleanspark",
      "riot",
      "btcs",
      "us-context"
    ],
    "governmentType": "Reported custody · estimate",
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
    "asOf": "2026-10-18",
    "note": "The CPS reports approximately 61,000 seized BTC subject to High Court civil recovery proceedings. This is law-enforcement custody, not a declared sovereign investment reserve. Date shown is the official case-study access date.",
    "sourceIds": [
      "uk-gov",
      "smarter-web"
    ],
    "governmentType": "Seized assets · legal proceedings",
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
      "btc": 7807,
      "eth": null
    },
    "businesses": [],
    "asOf": "2026-10-18",
    "note": "Retain as tracker-reported balance rather than official verification. Official explorer https://bitcoin.gob.sv/ linked for comparison; access alone does not establish balance.",
    "sourceIds": [
      "sv-gov",
      "sv-office"
    ],
    "governmentType": "Reported national reserve",
    "estimatedAssets": [
      "btc"
    ]
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
    "asOf": "2026-09-15",
    "note": "IMF Jan2026 report explicitly says authorities neither confirmed nor denied Arkham estimates; wallet declines may be unidentified transfers rather than disposals. State mining operations transferred from DHI to GIDC. Do not assert518 is full audited state wealth or infer all earlier coins sold.",
    "sourceIds": [
      "bt-gov",
      "bt-context"
    ],
    "governmentType": "State-owned holdings · estimate",
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
    "note": "Historical Ministry of Justice inventory of seized assets in judicial custody, disclosed through a legislative inquiry. These are not central-bank reserves. ETH quantity is reported by DiarioBitcoin from the same inventory.",
    "sourceIds": [
      "tw-moj",
      "tw-eth"
    ],
    "governmentType": "Judicial custody · historical disclosure"
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
        "note": "The 5 October company disclosure confirms 44,000 BTC at 30 September. The proposed 2,100 BTC Superplanet contribution was still conditional in the 15 October filing and is not added."
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
        "sourceId": "btct-corp"
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
        "asOf": "2026-08-09",
        "sourceId": "oranje"
      }
    ],
    "asOf": "2026-08-09",
    "note": "Business coverage includes OranjeBTC only. The date follows the latest acquisition displayed in its official treasury dashboard. No verified government quantity is included.",
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
        "note": "Consolidated holdings after Norwegian acquisitions, counted once in Sweden; latest dated transaction August 10. Website confirms Swedish identity. Current tracker value 1,051 on some aggregators is stale."
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
        "note": "Rounded company-owned balance includes BTC receivable and explicitly excludes customer deposits. Singapore address in official IR. ETH was fully monetized in August/September 2026: do not carry forward June's 3,951.70 ETH. Retain ETH null unless intentionally adding verified zero with separate balance date.",
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
        "btc": 540,
        "eth": null,
        "asOf": "2025-03-31",
        "sourceId": "samara",
        "note": "Company's own reserve assets, not portfolio funds' customer assets. Official disclosure gives Malta address. Historical snapshot; aggregators labeling same balance2026 do not establish new balance date.",
        "estimatedAssets": [
          "btc"
        ],
        "quantityLabel": "Historical snapshot"
      }
    ],
    "asOf": "2025-03-31",
    "note": "Only named, verified company disclosures are included. No verified government quantity is included; this does not imply zero.",
    "sourceIds": [
      "samara"
    ],
    "governmentType": "No verified government quantity included"
  }
];
