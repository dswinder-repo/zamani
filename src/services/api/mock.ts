/**
 * Mock provider — deterministic fake data for dev/demo.
 * Returns plausible African market data so the UI looks real.
 */
import type { MarketProvider, Quote, OHLCV, IndexSnapshot, ForexRate, NewsItem, Commodity, Mover } from './types'

function seed(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = Math.imul(31, h) + s.charCodeAt(i) | 0
  return Math.abs(h)
}

function rng(s: number) {
  let x = s
  return () => { x = (x * 1664525 + 1013904223) & 0xffffffff; return (x >>> 0) / 0xffffffff }
}

function mockPrice(symbol: string, base: number) {
  const r = rng(seed(symbol))()
  return +(base * (0.8 + r * 0.4)).toFixed(2)
}

function mockChange(symbol: string) {
  const r = rng(seed(symbol + 'chg'))()
  const pct = (r - 0.48) * 6   // -3% to +3%
  return +pct.toFixed(2)
}

const INDICES: IndexSnapshot[] = [
  { id: 'jse-alsi',  name: 'JSE All Share',       exchange: 'JSE',  value: 81_432, change: 312,  changePct: 0.39,  currency: 'ZAR', sparkline: spark('jse-alsi',  81_000), timestamp: Date.now() },
  { id: 'jse-top40', name: 'JSE Top 40',           exchange: 'JSE',  value: 74_210, change: -89,  changePct: -0.12, currency: 'ZAR', sparkline: spark('jse-top40', 74_000), timestamp: Date.now() },
  { id: 'ngx-asi',   name: 'NGX All Share',        exchange: 'NGX',  value: 98_762, change: 1023, changePct: 1.05,  currency: 'NGN', sparkline: spark('ngx-asi',   98_000), timestamp: Date.now() },
  { id: 'nse-20',    name: 'NSE 20 Share',         exchange: 'NSE',  value: 2_048,  change: -14,  changePct: -0.68, currency: 'KES', sparkline: spark('nse-20',    2_000),  timestamp: Date.now() },
  { id: 'gse-ci',    name: 'GSE Composite',        exchange: 'GSE',  value: 4_321,  change: 22,   changePct: 0.51,  currency: 'GHS', sparkline: spark('gse-ci',    4_300),  timestamp: Date.now() },
  { id: 'brvm-ci',   name: 'BRVM Composite',       exchange: 'BRVM', value: 234,    change: 1.2,  changePct: 0.52,  currency: 'XOF', sparkline: spark('brvm-ci',   233),    timestamp: Date.now() },
]

function spark(id: string, base: number): number[] {
  const r = rng(seed(id))
  return Array.from({ length: 30 }, () => +(base * (0.98 + r() * 0.04)).toFixed(0))
}

const FOREX: ForexRate[] = [
  { base: 'USD', quote: 'ZAR', rate: 18.42, change: 0.12,  changePct: 0.65,  timestamp: Date.now() },
  { base: 'USD', quote: 'NGN', rate: 1610,  change: -5,    changePct: -0.31, timestamp: Date.now() },
  { base: 'USD', quote: 'KES', rate: 129.5, change: 0.8,   changePct: 0.62,  timestamp: Date.now() },
  { base: 'USD', quote: 'GHS', rate: 13.1,  change: 0.05,  changePct: 0.38,  timestamp: Date.now() },
  { base: 'USD', quote: 'EGP', rate: 48.9,  change: -0.1,  changePct: -0.20, timestamp: Date.now() },
  { base: 'USD', quote: 'ETB', rate: 131.2, change: 0.4,   changePct: 0.31,  timestamp: Date.now() },
  { base: 'USD', quote: 'UGX', rate: 3700,  change: -5,    changePct: -0.14, timestamp: Date.now() },
  { base: 'USD', quote: 'XOF', rate: 615,   change: 2,     changePct: 0.33,  timestamp: Date.now() },
  { base: 'ZAR', quote: 'USD', rate: 0.054, change: 0,     changePct: -0.65, timestamp: Date.now() },
]

const NEWS: NewsItem[] = [
  { id: '1', headline: 'JSE All Share extends gains as rand strengthens against dollar', source: 'Business Day', url: '#', publishedAt: Date.now() - 1_800_000, exchange: 'JSE' },
  { id: '2', headline: 'NGX records N1.2trn turnover in February amid bullish sentiment', source: 'BusinessDay NG', url: '#', publishedAt: Date.now() - 3_600_000, exchange: 'NGX' },
  { id: '3', headline: 'NSE 20 Share Index dips 0.7% on profit-taking in banking stocks', source: 'The EastAfrican', url: '#', publishedAt: Date.now() - 5_400_000, exchange: 'NSE' },
  { id: '4', headline: 'Ghana cedi stabilises as Bank of Ghana holds rate at 28%', source: 'GhanaWeb', url: '#', publishedAt: Date.now() - 7_200_000 },
  { id: '5', headline: 'African Development Bank approves $500m infrastructure facility for East Africa', source: 'AfDB', url: '#', publishedAt: Date.now() - 10_800_000 },
  { id: '6', headline: 'BRVM composite reaches 18-month high amid regional growth optimism', source: 'Ecofin', url: '#', publishedAt: Date.now() - 14_400_000, exchange: 'BRVM' },
]

const COMMODITIES: Commodity[] = [
  { id: 'gold',     name: 'Gold',        price: 2_341.80, change: 12.40,  changePct: 0.53,  unit: 'oz',  currency: 'USD', timestamp: Date.now() },
  { id: 'silver',   name: 'Silver',      price: 29.42,    change: 0.18,   changePct: 0.61,  unit: 'oz',  currency: 'USD', timestamp: Date.now() },
  { id: 'platinum', name: 'Platinum',    price: 987.50,   change: -4.20,  changePct: -0.42, unit: 'oz',  currency: 'USD', timestamp: Date.now() },
  { id: 'palladium',name: 'Palladium',   price: 1_023.00, change: 8.50,   changePct: 0.84,  unit: 'oz',  currency: 'USD', timestamp: Date.now() },
  { id: 'brent',    name: 'Brent Crude', price: 78.24,    change: -1.16,  changePct: -1.46, unit: 'bbl', currency: 'USD', timestamp: Date.now() },
  { id: 'wti',      name: 'WTI Crude',   price: 74.38,    change: -1.02,  changePct: -1.35, unit: 'bbl', currency: 'USD', timestamp: Date.now() },
  { id: 'cocoa',    name: 'Cocoa',       price: 8_452,    change: 210,    changePct: 2.55,  unit: 'MT',  currency: 'USD', timestamp: Date.now() },
  { id: 'coffee',   name: 'Coffee',      price: 4.82,     change: 0.14,   changePct: 2.99,  unit: 'lb',  currency: 'USD', timestamp: Date.now() },
  { id: 'copper',   name: 'Copper',      price: 4.52,     change: 0.03,   changePct: 0.67,  unit: 'lb',  currency: 'USD', timestamp: Date.now() },
  { id: 'palmoil',  name: 'Palm Oil',    price: 3_820,    change: -45,    changePct: -1.16, unit: 'MT',  currency: 'USD', timestamp: Date.now() },
]

const GAINERS: Mover[] = [
  { symbol: 'SCOM',   name: 'Safaricom',       exchange: 'NSE',  price: 42.50,  changePct: 4.17 },
  { symbol: 'MTN',    name: 'MTN Group',        exchange: 'JSE',  price: 142.80, changePct: 3.12 },
  { symbol: 'EQTY',   name: 'Equity Group',     exchange: 'NSE',  price: 48.75,  changePct: 2.82 },
  { symbol: 'CIB',    name: 'CIB Egypt',        exchange: 'EGX',  price: 86.40,  changePct: 2.15 },
  { symbol: 'ZENITH', name: 'Zenith Bank',      exchange: 'NGX',  price: 38.60,  changePct: 1.84 },
]

const LOSERS: Mover[] = [
  { symbol: 'DAN',    name: 'Dangote Cement',   exchange: 'NGX',  price: 548.00, changePct: -2.84 },
  { symbol: 'NPN',    name: 'Naspers',          exchange: 'JSE',  price: 3_412,  changePct: -1.92 },
  { symbol: 'SBIC',   name: 'Stanbic Holdings', exchange: 'NSE',  price: 108.00, changePct: -0.92 },
  { symbol: 'AGL',    name: 'Anglo American',   exchange: 'JSE',  price: 492.30, changePct: -0.74 },
  { symbol: 'ACCESS', name: 'Access Holdings',  exchange: 'NGX',  price: 20.15,  changePct: -0.49 },
]

async function delay(ms = 200) { return new Promise(r => setTimeout(r, ms)) }

interface StockDef { symbol: string; name: string; basePrice: number; currency: string }

const EXCHANGE_STOCKS: Record<string, StockDef[]> = {
  JSE: [
    // Banking & Financial Services
    { symbol: 'SBK',   name: 'Standard Bank Group',   basePrice: 195,    currency: 'ZAR' },
    { symbol: 'FSR',   name: 'FirstRand',             basePrice: 75,     currency: 'ZAR' },
    { symbol: 'CPI',   name: 'Capitec Bank',          basePrice: 2_250,  currency: 'ZAR' },
    { symbol: 'ABG',   name: 'Absa Group',            basePrice: 190,    currency: 'ZAR' },
    { symbol: 'NED',   name: 'Nedbank Group',         basePrice: 205,    currency: 'ZAR' },
    { symbol: 'INL',   name: 'Investec',              basePrice: 105,    currency: 'ZAR' },
    { symbol: 'SLM',   name: 'Sanlam',                basePrice: 72,     currency: 'ZAR' },
    { symbol: 'MMH',   name: 'Momentum Metropolitan', basePrice: 29,     currency: 'ZAR' },
    { symbol: 'DSY',   name: 'Discovery',             basePrice: 175,    currency: 'ZAR' },
    { symbol: 'OMU',   name: 'Old Mutual',            basePrice: 12,     currency: 'ZAR' },
    { symbol: 'JSE',   name: 'JSE Ltd',               basePrice: 115,    currency: 'ZAR' },
    // Mining & Resources
    { symbol: 'AGL',   name: 'Anglo American',        basePrice: 495,    currency: 'ZAR' },
    { symbol: 'BHP',   name: 'BHP Group',             basePrice: 1_200,  currency: 'ZAR' },
    { symbol: 'AMS',   name: 'Anglo American Platinum', basePrice: 1_450, currency: 'ZAR' },
    { symbol: 'IMP',   name: 'Impala Platinum',       basePrice: 135,    currency: 'ZAR' },
    { symbol: 'SSW',   name: 'Sibanye-Stillwater',    basePrice: 27,     currency: 'ZAR' },
    { symbol: 'GFI',   name: 'Gold Fields',           basePrice: 195,    currency: 'ZAR' },
    { symbol: 'HAR',   name: 'Harmony Gold',          basePrice: 120,    currency: 'ZAR' },
    { symbol: 'SOL',   name: 'Sasol',                 basePrice: 110,    currency: 'ZAR' },
    // Tech & Telecom
    { symbol: 'NPN',   name: 'Naspers',               basePrice: 3_400,  currency: 'ZAR' },
    { symbol: 'PRX',   name: 'Prosus',                basePrice: 1_650,  currency: 'ZAR' },
    { symbol: 'MTN',   name: 'MTN Group',             basePrice: 145,    currency: 'ZAR' },
    { symbol: 'VOD',   name: 'Vodacom Group',         basePrice: 105,    currency: 'ZAR' },
    { symbol: 'TKG',   name: 'Telkom SA',             basePrice: 24,     currency: 'ZAR' },
    // Retail & Consumer
    { symbol: 'SHP',   name: 'Shoprite Holdings',     basePrice: 280,    currency: 'ZAR' },
    { symbol: 'WHL',   name: 'Woolworths Holdings',   basePrice: 55,     currency: 'ZAR' },
    { symbol: 'PIK',   name: 'Pick n Pay',            basePrice: 32,     currency: 'ZAR' },
    { symbol: 'MRP',   name: 'Mr Price Group',        basePrice: 218,    currency: 'ZAR' },
    { symbol: 'TFG',   name: 'The Foschini Group',    basePrice: 106,    currency: 'ZAR' },
    { symbol: 'CLS',   name: 'Clicks Group',          basePrice: 275,    currency: 'ZAR' },
    { symbol: 'PPH',   name: 'Pepkor Holdings',       basePrice: 22,     currency: 'ZAR' },
    // Industrial & Diversified
    { symbol: 'BID',   name: 'Bid Corporation',       basePrice: 310,    currency: 'ZAR' },
    { symbol: 'REM',   name: 'Remgro',                basePrice: 145,    currency: 'ZAR' },
    { symbol: 'MNP',   name: 'Mondi',                 basePrice: 330,    currency: 'ZAR' },
    { symbol: 'AVI',   name: 'AVI Limited',           basePrice: 52,     currency: 'ZAR' },
    { symbol: 'BAW',   name: 'Barloworld',            basePrice: 58,     currency: 'ZAR' },
    { symbol: 'SNT',   name: 'Santam',                basePrice: 295,    currency: 'ZAR' },
    // Healthcare
    { symbol: 'LHC',   name: 'Life Healthcare',       basePrice: 22,     currency: 'ZAR' },
    // Property
    { symbol: 'GRT',   name: 'Growthpoint Properties', basePrice: 10,   currency: 'ZAR' },
    { symbol: 'RDF',   name: 'Redefine Properties',   basePrice: 5.5,    currency: 'ZAR' },
  ],
  NGX: [
    // Banking
    { symbol: 'DANGCEM',   name: 'Dangote Cement',           basePrice: 548,   currency: 'NGN' },
    { symbol: 'GTCO',      name: 'Guaranty Trust Holding',   basePrice: 54,    currency: 'NGN' },
    { symbol: 'ZENITH',    name: 'Zenith Bank',              basePrice: 39,    currency: 'NGN' },
    { symbol: 'ACCESS',    name: 'Access Holdings',          basePrice: 20,    currency: 'NGN' },
    { symbol: 'UBA',       name: 'United Bank for Africa',   basePrice: 28,    currency: 'NGN' },
    { symbol: 'FBNH',      name: 'FBN Holdings',             basePrice: 27,    currency: 'NGN' },
    { symbol: 'STANBIC',   name: 'Stanbic IBTC Holdings',    basePrice: 80,    currency: 'NGN' },
    { symbol: 'FIDELITY',  name: 'Fidelity Bank',            basePrice: 15,    currency: 'NGN' },
    { symbol: 'FCMB',      name: 'FCMB Group',               basePrice: 8.5,   currency: 'NGN' },
    { symbol: 'WEMA',      name: 'Wema Bank',                basePrice: 8,     currency: 'NGN' },
    { symbol: 'STERLING',  name: 'Sterling Financial Holdings', basePrice: 4.2, currency: 'NGN' },
    { symbol: 'STERLNB',   name: 'Sterling Bank',            basePrice: 5,     currency: 'NGN' },
    // Telecoms
    { symbol: 'MTNN',      name: 'MTN Nigeria',              basePrice: 270,   currency: 'NGN' },
    { symbol: 'AIRTELAFRI', name: 'Airtel Africa',           basePrice: 2_100, currency: 'NGN' },
    // Cement & Construction
    { symbol: 'BUACEMENT',  name: 'BUA Cement',              basePrice: 115,   currency: 'NGN' },
    { symbol: 'WAPCO',      name: 'Lafarge Africa',          basePrice: 42,    currency: 'NGN' },
    { symbol: 'JBERGER',    name: 'Julius Berger Nigeria',   basePrice: 130,   currency: 'NGN' },
    // Food & Beverages
    { symbol: 'NESTLE',    name: 'Nestlé Nigeria',           basePrice: 1_400, currency: 'NGN' },
    { symbol: 'NB',        name: 'Nigerian Breweries',       basePrice: 28,    currency: 'NGN' },
    { symbol: 'GUINNESS',  name: 'Guinness Nigeria',         basePrice: 68,    currency: 'NGN' },
    { symbol: 'BUAFOODS',  name: 'BUA Foods',                basePrice: 390,   currency: 'NGN' },
    { symbol: 'FLOURMILL', name: 'Flour Mills of Nigeria',   basePrice: 30,    currency: 'NGN' },
    { symbol: 'DANGSUGAR', name: 'Dangote Sugar Refinery',   basePrice: 33,    currency: 'NGN' },
    { symbol: 'CADBURY',   name: 'Cadbury Nigeria',          basePrice: 25,    currency: 'NGN' },
    { symbol: 'UNILEVER',  name: 'Unilever Nigeria',         basePrice: 19,    currency: 'NGN' },
    // Oil & Agriculture
    { symbol: 'SEPLAT',    name: 'Seplat Energy',            basePrice: 2_200, currency: 'NGN' },
    { symbol: 'TOTAL',     name: 'TotalEnergies Nigeria',    basePrice: 395,   currency: 'NGN' },
    { symbol: 'CONOIL',    name: 'Conoil',                   basePrice: 68,    currency: 'NGN' },
    { symbol: 'PRESCO',    name: 'Presco Plc',               basePrice: 530,   currency: 'NGN' },
    { symbol: 'OKOMUOIL',  name: 'Okomu Oil Palm',          basePrice: 310,   currency: 'NGN' },
    // Insurance & Investment
    { symbol: 'AIICO',     name: 'AIICO Insurance',          basePrice: 1.9,   currency: 'NGN' },
    { symbol: 'MANSARD',   name: 'AXA Mansard Insurance',    basePrice: 6,     currency: 'NGN' },
    { symbol: 'CUSTODIAN', name: 'Custodian Investment',     basePrice: 11,    currency: 'NGN' },
    { symbol: 'UCAP',      name: 'United Capital',           basePrice: 20,    currency: 'NGN' },
    { symbol: 'AFRIPRUD',  name: 'African Prudential',       basePrice: 12,    currency: 'NGN' },
    // Others
    { symbol: 'TRANSCORP', name: 'Transcorp Group',          basePrice: 18,    currency: 'NGN' },
    { symbol: 'VITAFOAM',  name: 'Vitafoam Nigeria',         basePrice: 30,    currency: 'NGN' },
    { symbol: 'FIDSON',    name: 'Fidson Healthcare',        basePrice: 15,    currency: 'NGN' },
    { symbol: 'INTBREW',   name: 'International Breweries',  basePrice: 4,     currency: 'NGN' },
  ],
  NSE: [
    // Banking
    { symbol: 'SCOM',    name: 'Safaricom',               basePrice: 43,    currency: 'KES' },
    { symbol: 'EQTY',    name: 'Equity Group Holdings',   basePrice: 49,    currency: 'KES' },
    { symbol: 'KCB',     name: 'KCB Group',               basePrice: 36,    currency: 'KES' },
    { symbol: 'COOP',    name: 'Co-operative Bank',       basePrice: 15,    currency: 'KES' },
    { symbol: 'NCBA',    name: 'NCBA Group',              basePrice: 44,    currency: 'KES' },
    { symbol: 'DTK',     name: 'Diamond Trust Bank',      basePrice: 56,    currency: 'KES' },
    { symbol: 'ABSA',    name: 'ABSA Bank Kenya',         basePrice: 13,    currency: 'KES' },
    { symbol: 'SBIC',    name: 'Stanbic Holdings Kenya',  basePrice: 108,   currency: 'KES' },
    { symbol: 'SCBK',    name: 'Standard Chartered Kenya',basePrice: 196,   currency: 'KES' },
    { symbol: 'IMB',     name: 'I&M Group',               basePrice: 22,    currency: 'KES' },
    { symbol: 'HF',      name: 'HF Group',                basePrice: 4.5,   currency: 'KES' },
    { symbol: 'NBK',     name: 'National Bank of Kenya',  basePrice: 9,     currency: 'KES' },
    // Insurance & Investment
    { symbol: 'BRIT',    name: 'Britam Holdings',         basePrice: 10,    currency: 'KES' },
    { symbol: 'JUB',     name: 'Jubilee Holdings',        basePrice: 270,   currency: 'KES' },
    { symbol: 'CIC',     name: 'CIC Insurance Group',     basePrice: 2.4,   currency: 'KES' },
    { symbol: 'SLAM',    name: 'Sanlam Kenya',            basePrice: 8,     currency: 'KES' },
    { symbol: 'LIB',     name: 'Liberty Kenya Holdings',  basePrice: 7.5,   currency: 'KES' },
    { symbol: 'CTUM',    name: 'Centum Investment',       basePrice: 28,    currency: 'KES' },
    { symbol: 'KNRE',    name: 'Kenya Re',                basePrice: 2.6,   currency: 'KES' },
    { symbol: 'NSE',     name: 'Nairobi Securities Exchange', basePrice: 9, currency: 'KES' },
    // Energy & Utilities
    { symbol: 'KPLC',    name: 'Kenya Power',             basePrice: 3.5,   currency: 'KES' },
    { symbol: 'KEGN',    name: 'KenGen',                  basePrice: 5.8,   currency: 'KES' },
    { symbol: 'TOTL',    name: 'TotalEnergies Kenya',     basePrice: 25,    currency: 'KES' },
    // Commercial & Manufacturing
    { symbol: 'EABL',    name: 'East African Breweries',  basePrice: 145,   currency: 'KES' },
    { symbol: 'BAT',     name: 'BAT Kenya',               basePrice: 425,   currency: 'KES' },
    { symbol: 'UNGA',    name: 'Unga Group',              basePrice: 26,    currency: 'KES' },
    { symbol: 'BOC',     name: 'BOC Kenya',               basePrice: 115,   currency: 'KES' },
    { symbol: 'CARB',    name: 'Carbacid Investments',    basePrice: 20,    currency: 'KES' },
    { symbol: 'CGEN',    name: 'Car & General Kenya',     basePrice: 45,    currency: 'KES' },
    { symbol: 'BAMB',    name: 'Bamburi Cement',          basePrice: 55,    currency: 'KES' },
    { symbol: 'EAPC',    name: 'EA Portland Cement',      basePrice: 2.5,   currency: 'KES' },
    { symbol: 'ARM',     name: 'ARM Cement',              basePrice: 19,    currency: 'KES' },
    // Transport
    { symbol: 'KQ',      name: 'Kenya Airways',           basePrice: 3.8,   currency: 'KES' },
    // Agriculture
    { symbol: 'SASN',    name: 'Sasini',                  basePrice: 20,    currency: 'KES' },
    { symbol: 'WTK',     name: 'Williamson Tea Kenya',    basePrice: 175,   currency: 'KES' },
    { symbol: 'KAPC',    name: 'Kapchorua Tea',           basePrice: 110,   currency: 'KES' },
    { symbol: 'KUKUZI',  name: 'Kakuzi',                  basePrice: 375,   currency: 'KES' },
    { symbol: 'LIMTEA',  name: 'Limuru Tea',              basePrice: 650,   currency: 'KES' },
    // Media & Publishing
    { symbol: 'NMG',     name: 'Nation Media Group',      basePrice: 22,    currency: 'KES' },
    { symbol: 'SGL',     name: 'Standard Group',          basePrice: 2.8,   currency: 'KES' },
    { symbol: 'LHBL',    name: 'Longhorn Publishers',     basePrice: 3.8,   currency: 'KES' },
    { symbol: 'SCAN',    name: 'Scangroup',               basePrice: 4.5,   currency: 'KES' },
    // Real Estate & Hotels
    { symbol: 'ILAM',    name: 'Ilam Fahari I-REIT',      basePrice: 10,    currency: 'KES' },
    { symbol: 'TPS',     name: 'TPS Eastern Africa',      basePrice: 55,    currency: 'KES' },
  ],
  GSE: [
    // Banking
    { symbol: 'GCB',     name: 'GCB Bank',                  basePrice: 5.8,   currency: 'GHS' },
    { symbol: 'EGH',     name: 'Ecobank Ghana',             basePrice: 9.5,   currency: 'GHS' },
    { symbol: 'SCB',     name: 'Standard Chartered Ghana',  basePrice: 23,    currency: 'GHS' },
    { symbol: 'CAL',     name: 'CAL Bank',                  basePrice: 0.88,  currency: 'GHS' },
    { symbol: 'SOGEGH',  name: 'Société Générale Ghana',    basePrice: 1.8,   currency: 'GHS' },
    { symbol: 'ACCESS',  name: 'Access Bank Ghana',         basePrice: 5.4,   currency: 'GHS' },
    { symbol: 'RBGH',    name: 'Republic Bank Ghana',       basePrice: 0.8,   currency: 'GHS' },
    // Telecom
    { symbol: 'MTN',     name: 'MTN Ghana',                 basePrice: 2.2,   currency: 'GHS' },
    // Consumer & Industrials
    { symbol: 'GGBL',    name: 'Guinness Ghana Breweries',  basePrice: 2.4,   currency: 'GHS' },
    { symbol: 'FML',     name: 'Fan Milk / Sèrèwa',        basePrice: 5.8,   currency: 'GHS' },
    { symbol: 'UNIL',    name: 'Unilever Ghana',            basePrice: 15,    currency: 'GHS' },
    { symbol: 'TOTAL',   name: 'TotalEnergies Ghana',       basePrice: 4.1,   currency: 'GHS' },
    { symbol: 'GOIL',    name: 'GOIL',                      basePrice: 2.1,   currency: 'GHS' },
    { symbol: 'BOPP',    name: 'Benso Oil Palm Plantation', basePrice: 8.2,   currency: 'GHS' },
    { symbol: 'AYRTN',   name: 'Ayrton Drug Manufacturing', basePrice: 1.1,   currency: 'GHS' },
    // Insurance & Investment
    { symbol: 'EGL',     name: 'Enterprise Group',          basePrice: 1.9,   currency: 'GHS' },
    { symbol: 'CLYD',    name: 'ClydeBerg Plastics',        basePrice: 0.32,  currency: 'GHS' },
    { symbol: 'MTNGH',   name: 'MTN Ghana (preference)',    basePrice: 0.01,  currency: 'GHS' },
  ],
  BRVM: [
    // Telecoms
    { symbol: 'SNTS',    name: 'Sonatel Senegal',           basePrice: 17_000, currency: 'XOF' },
    { symbol: 'ORAC',    name: 'Orange Côte d\'Ivoire',    basePrice: 4_800,  currency: 'XOF' },
    { symbol: 'ONTBF',   name: 'Onatel Burkina Faso',       basePrice: 4_600,  currency: 'XOF' },
    // Banking
    { symbol: 'ETIT',    name: 'Ecobank Transnational',     basePrice: 18,     currency: 'XOF' },
    { symbol: 'SGBCI',   name: 'Société Générale CI',       basePrice: 14_000, currency: 'XOF' },
    { symbol: 'BICC',    name: 'Banque Internationale CI',  basePrice: 8_500,  currency: 'XOF' },
    { symbol: 'NSBC',    name: 'NSIA Banque CI',            basePrice: 5_100,  currency: 'XOF' },
    { symbol: 'BOABF',   name: 'Bank of Africa Burkina',    basePrice: 5_200,  currency: 'XOF' },
    { symbol: 'BOAM',    name: 'Bank of Africa Mali',       basePrice: 1_900,  currency: 'XOF' },
    { symbol: 'BOAS',    name: 'Bank of Africa Senegal',    basePrice: 3_800,  currency: 'XOF' },
    { symbol: 'SMBC',    name: 'Société Multinationale de Bitumes', basePrice: 10_500, currency: 'XOF' },
    // Agro-Industry
    { symbol: 'PALC',    name: 'Palm CI',                   basePrice: 6_000,  currency: 'XOF' },
    { symbol: 'SIFCA',   name: 'SIFCA Group',               basePrice: 5_200,  currency: 'XOF' },
    { symbol: 'SOLIBRA', name: 'Solibra (Brasseries CI)',   basePrice: 165_000, currency: 'XOF' },
    { symbol: 'TTLCI',   name: 'TotalEnergies CI',          basePrice: 2_200,  currency: 'XOF' },
    { symbol: 'CFACI',   name: 'CFAO CI',                   basePrice: 980,    currency: 'XOF' },
    { symbol: 'UNXC',    name: 'Unilever CI',               basePrice: 7_200,  currency: 'XOF' },
  ],
  ZSE: [
    // Large Caps
    { symbol: 'DELTA',   name: 'Delta Corporation',         basePrice: 2_850,  currency: 'ZWL' },
    { symbol: 'INNSCOR', name: 'Innscor Africa',            basePrice: 5_100,  currency: 'ZWL' },
    { symbol: 'ECONET',  name: 'Econet Wireless Zimbabwe',  basePrice: 4_200,  currency: 'ZWL' },
    { symbol: 'CBZ',     name: 'CBZ Holdings',              basePrice: 920,    currency: 'ZWL' },
    { symbol: 'SEEDCO',  name: 'SeedCo International',      basePrice: 650,    currency: 'ZWL' },
    { symbol: 'HIPPO',   name: 'Hippo Valley Estates',      basePrice: 3_200,  currency: 'ZWL' },
    // Banking
    { symbol: 'FBC',     name: 'FBC Holdings',              basePrice: 180,    currency: 'ZWL' },
    { symbol: 'ZB',      name: 'ZB Financial Holdings',     basePrice: 95,     currency: 'ZWL' },
    { symbol: 'NMB',     name: 'NMB Holdings',              basePrice: 115,    currency: 'ZWL' },
    { symbol: 'FIRST',   name: 'First Capital Bank Zimbabwe', basePrice: 95,   currency: 'ZWL' },
    // Insurance & Investment
    { symbol: 'FMLRE',   name: 'First Mutual Holdings',     basePrice: 62,     currency: 'ZWL' },
    { symbol: 'NICOZ',   name: 'NicozDiamond Insurance',    basePrice: 55,     currency: 'ZWL' },
    { symbol: 'ZIMRE',   name: 'Zimbabwe Reinsurance',      basePrice: 50,     currency: 'ZWL' },
    { symbol: 'FIDELITY', name: 'Fidelity Life Assurance',  basePrice: 28,     currency: 'ZWL' },
    // Industrial & Commercial
    { symbol: 'TSL',     name: 'TSL Limited',               basePrice: 460,    currency: 'ZWL' },
    { symbol: 'ART',     name: 'ART Corporation',           basePrice: 145,    currency: 'ZWL' },
    { symbol: 'MASIMBA', name: 'Masimba Holdings',          basePrice: 420,    currency: 'ZWL' },
    { symbol: 'TURNALL', name: 'Turnall Holdings',          basePrice: 95,     currency: 'ZWL' },
    { symbol: 'PADENGA', name: 'Padenga Holdings',          basePrice: 410,    currency: 'ZWL' },
    // Hospitality
    { symbol: 'AFRICAN', name: 'African Sun Hotels',        basePrice: 22,     currency: 'ZWL' },
    { symbol: 'RTG',     name: 'Rainbow Tourism Group',     basePrice: 35,     currency: 'ZWL' },
    // Retail
    { symbol: 'OK',      name: 'OK Zimbabwe',               basePrice: 165,    currency: 'ZWL' },
  ],
  BSE: [
    // Banking
    { symbol: 'FNBB',     name: 'First National Bank Botswana', basePrice: 3.5,  currency: 'BWP' },
    { symbol: 'STANBIC',  name: 'Stanbic Bank Botswana',        basePrice: 8.9,  currency: 'BWP' },
    { symbol: 'ABSA',     name: 'Absa Bank Botswana',           basePrice: 5.2,  currency: 'BWP' },
    { symbol: 'ABCH',     name: 'ABC Holdings',                 basePrice: 1.2,  currency: 'BWP' },
    // Insurance & Investment
    { symbol: 'BIHL',     name: 'Botswana Insurance Holdings',  basePrice: 2.8,  currency: 'BWP' },
    { symbol: 'LETSHEGO', name: 'Letshego Holdings',            basePrice: 1.4,  currency: 'BWP' },
    { symbol: 'IMARA',    name: 'Imara Holdings',               basePrice: 0.8,  currency: 'BWP' },
    { symbol: 'OLYMPIA',  name: 'Olympia Capital Holdings',     basePrice: 0.85, currency: 'BWP' },
    // Retail & Consumer
    { symbol: 'SEFALANA', name: 'Sefalana Holdings',            basePrice: 11,   currency: 'BWP' },
    { symbol: 'SB',       name: 'Sechaba Brewery Holdings',     basePrice: 14,   currency: 'BWP' },
    { symbol: 'CHOPPIES', name: 'Choppies Enterprises',         basePrice: 0.9,  currency: 'BWP' },
    // Telecoms & Utilities
    { symbol: 'BTCL',     name: 'Botswana Telecommunications',  basePrice: 1.9,  currency: 'BWP' },
    { symbol: 'ENGEN',    name: 'Engen Botswana',               basePrice: 19,   currency: 'BWP' },
    // Tourism & Property
    { symbol: 'CHOBE',    name: 'Chobe Holdings',               basePrice: 12.5, currency: 'BWP' },
    { symbol: 'WILDERNESS', name: 'Wilderness Holdings',        basePrice: 2.8,  currency: 'BWP' },
    { symbol: 'CRESTA',   name: 'Cresta Marakanelo Hotels',     basePrice: 1.8,  currency: 'BWP' },
    { symbol: 'TURNSTAR', name: 'Turnstar Holdings',            basePrice: 3.5,  currency: 'BWP' },
    { symbol: 'TLOU',     name: 'Tlou Energy',                  basePrice: 0.22, currency: 'BWP' },
  ],
  LUSE: [
    // Mining & Energy
    { symbol: 'ZCCM',     name: 'ZCCM Investments',             basePrice: 42,   currency: 'ZMW' },
    { symbol: 'CEC',      name: 'Copperbelt Energy Corporation', basePrice: 3.5, currency: 'ZMW' },
    // Banking
    { symbol: 'ZANACO',   name: 'Zanaco',                       basePrice: 2.8,  currency: 'ZMW' },
    { symbol: 'STANDARD', name: 'Standard Chartered Zambia',    basePrice: 28,   currency: 'ZMW' },
    { symbol: 'INVESTRUST', name: 'Investrust Bank',            basePrice: 1.2,  currency: 'ZMW' },
    { symbol: 'MADISON',  name: 'Madison General Insurance',    basePrice: 0.8,  currency: 'ZMW' },
    // Consumer & Agriculture
    { symbol: 'ZAMBEEF',  name: 'Zambeef Products',             basePrice: 7.8,  currency: 'ZMW' },
    { symbol: 'ZSUG',     name: 'Zambia Sugar',                 basePrice: 5.2,  currency: 'ZMW' },
    { symbol: 'NATBREW',  name: 'National Breweries Zambia',    basePrice: 14.5, currency: 'ZMW' },
    { symbol: 'BATA',     name: 'Bata Shoe Company Zambia',     basePrice: 9.5,  currency: 'ZMW' },
    { symbol: 'LAFARGE',  name: 'Lafarge Zambia',               basePrice: 2.8,  currency: 'ZMW' },
    // Real Estate & Other
    { symbol: 'REIZ',     name: 'Real Estate Investments Zambia', basePrice: 1.1, currency: 'ZMW' },
    { symbol: 'PAMODZI',  name: 'Pamodzi Hotels',               basePrice: 0.9,  currency: 'ZMW' },
    { symbol: 'PRIMA',    name: 'Prima Reinsurance',            basePrice: 1.8,  currency: 'ZMW' },
  ],
}

export const mockProvider: MarketProvider = {
  name: 'mock',

  async getQuote(symbol) {
    await delay()
    const base = mockPrice(symbol, 100)
    const pct = mockChange(symbol)
    return {
      symbol, name: symbol, price: base,
      change: +(base * pct / 100).toFixed(3),
      changePct: pct,
      currency: 'USD', exchange: 'MOCK',
      timestamp: Date.now(),
    }
  },

  async getHistory(symbol, days) {
    await delay(400)
    const r = rng(seed(symbol + 'hist'))
    const base = mockPrice(symbol, 100)
    const bars: OHLCV[] = []
    const now = Date.now()
    let close = base
    for (let i = days; i >= 0; i--) {
      const chg = (r() - 0.49) * 0.04
      const open = close
      close = +(open * (1 + chg)).toFixed(3)
      bars.push({
        time: now - i * 86_400_000,
        open, high: Math.max(open, close) * (1 + r() * 0.01),
        low: Math.min(open, close) * (1 - r() * 0.01), close,
        volume: Math.floor(r() * 5_000_000),
      })
    }
    return bars
  },

  async getIndices() {
    await delay()
    return INDICES
  },

  async getForex() {
    await delay()
    return FOREX
  },

  async getNews() {
    await delay(300)
    return NEWS
  },

  async getCommodities() {
    await delay()
    return COMMODITIES
  },

  async getTopMovers() {
    await delay()
    return { gainers: GAINERS, losers: LOSERS }
  },

  async getExchangeStocks(exchange) {
    await delay(300)
    const ex = exchange.toUpperCase()
    const pool = EXCHANGE_STOCKS[ex] ?? []
    return pool.map((s): Quote => {
      const pct  = mockChange(s.symbol)
      const price = mockPrice(s.symbol, s.basePrice)
      return {
        symbol:    s.symbol,
        name:      s.name,
        price,
        change:    +(price * pct / 100).toFixed(3),
        changePct: pct,
        volume:    Math.floor(rng(seed(s.symbol + 'vol'))() * 10_000_000),
        currency:  s.currency,
        exchange:  ex,
        timestamp: Date.now(),
      }
    })
  },
}
