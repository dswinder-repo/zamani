/**
 * Provider registry — swap providers via VITE_DATA_PROVIDER env var.
 *
 *   VITE_DATA_PROVIDER=yahoo   → Yahoo Finance (JSE + commodities, free)
 *   VITE_DATA_PROVIDER=eodhd   → EODHD (all African exchanges, $19.99/mo)
 *   VITE_DATA_PROVIDER=twelve  → Twelve Data (VITE_TWELVE_DATA_KEY required)
 *   VITE_DATA_PROVIDER=mock    → mock provider (dev only — never deploy)
 */
import { mockProvider }       from './mock'
import { twelveDataProvider }  from './twelve'
import { eodhdProvider }       from './eodhd'
import { yahooProvider }       from './yahoo'
import type { MarketProvider } from './types'

const PROVIDERS: Record<string, MarketProvider> = {
  mock:   mockProvider,
  twelve: twelveDataProvider,
  eodhd:  eodhdProvider,
  yahoo:  yahooProvider,
}

const key = (import.meta.env.VITE_DATA_PROVIDER as string | undefined) ?? 'mock'

export const provider: MarketProvider = PROVIDERS[key] ?? mockProvider

if (provider.name !== 'mock') {
  console.info(`[Zamani] Data provider: ${provider.name}`)
}

// Guard: mock provider must never be deployed to production
if (provider.name === 'mock' && import.meta.env.PROD) {
  console.error(
    '%c[Zamani] ⚠ DEMO MODE — prices are simulated and not real. ' +
    'Set VITE_DATA_PROVIDER to a live provider before deploying.',
    'background:#b45309;color:#fff;font-weight:bold;padding:2px 6px;border-radius:3px'
  )
}

export const IS_DEMO_MODE = provider.name === 'mock' && import.meta.env.PROD

export * from './types'
export { getLiveForex }                          from './forex'
export { getUSEQuotes, getUSEIndices, getUSEMovers } from './use'
export { YAHOO_SUPPORTED_EXCHANGES }             from './yahoo'
