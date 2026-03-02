/**
 * Provider registry — swap providers via VITE_DATA_PROVIDER env var.
 *
 *   VITE_DATA_PROVIDER=mock    → mock provider (default, no API key)
 *   VITE_DATA_PROVIDER=twelve  → Twelve Data (VITE_TWELVE_DATA_KEY required)
 *   VITE_DATA_PROVIDER=eodhd   → EODHD (VITE_EODHD_KEY required)
 */
import { mockProvider }       from './mock'
import { twelveDataProvider }  from './twelve'
import { eodhdProvider }       from './eodhd'
import type { MarketProvider } from './types'

const PROVIDERS: Record<string, MarketProvider> = {
  mock:   mockProvider,
  twelve: twelveDataProvider,
  eodhd:  eodhdProvider,
}

const key = (import.meta.env.VITE_DATA_PROVIDER as string | undefined) ?? 'mock'

export const provider: MarketProvider = PROVIDERS[key] ?? mockProvider

if (provider.name !== 'mock') {
  console.info(`[Zamani] Data provider: ${provider.name}`)
}

export * from './types'
