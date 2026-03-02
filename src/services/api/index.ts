/**
 * Provider registry — swap out providers here as API keys arrive.
 * For now: mock provider everywhere.
 */
import { mockProvider } from './mock'
import type { MarketProvider } from './types'

export const provider: MarketProvider = mockProvider

export * from './types'
