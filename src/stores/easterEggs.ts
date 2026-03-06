import { create } from 'zustand'

interface EasterEggStore {
  beastMode:    boolean
  oracleOpen:   boolean
  simbaSymbol:  string | null
  hakunaActive: boolean
  hakunaPct:    number
  circleActive: boolean
  circleValue:  number
  dangoOpen:    boolean
  tradeOpen:    boolean
  activateBeastMode(): void
  deactivateBeastMode(): void
  openOracle(): void
  closeOracle(): void
  triggerSimba(symbol: string): void
  dismissSimba(): void
  triggerHakuna(pct: number): void
  dismissHakuna(): void
  triggerCircle(value: number): void
  dismissCircle(): void
  openDangote(): void
  closeDangote(): void
  openTrade(): void
  closeTrade(): void
}

export const useEasterEggs = create<EasterEggStore>(set => ({
  beastMode:    false,
  oracleOpen:   false,
  simbaSymbol:  null,
  hakunaActive: false,
  hakunaPct:    0,
  circleActive: false,
  circleValue:  0,
  dangoOpen:    false,
  tradeOpen:    false,
  activateBeastMode()  { set({ beastMode: true }) },
  deactivateBeastMode(){ set({ beastMode: false }) },
  openOracle()         { set({ oracleOpen: true }) },
  closeOracle()        { set({ oracleOpen: false }) },
  triggerSimba(symbol) { set({ simbaSymbol: symbol }) },
  dismissSimba()       { set({ simbaSymbol: null }) },
  triggerHakuna(pct)   { set({ hakunaActive: true, hakunaPct: pct }) },
  dismissHakuna()      { set({ hakunaActive: false }) },
  triggerCircle(value) { set({ circleActive: true, circleValue: value }) },
  dismissCircle()      { set({ circleActive: false }) },
  openDangote()        { set({ dangoOpen: true }) },
  closeDangote()       { set({ dangoOpen: false }) },
  openTrade()          { set({ tradeOpen: true }) },
  closeTrade()         { set({ tradeOpen: false }) },
}))

// ── Oracle ──────────────────────────────────────────────────────────────────

const ORACLE_PROPHECIES = [
  "The Oracle sees volatility on the horizon. The wise accumulate when fear speaks loudest. Buy the dip, but only if your mother-in-law says to sell.",
  "NPN will test your patience before it tests new highs. The baobab does not grow in a day.",
  "The market is like jollof rice — it takes time, generates controversy, and everyone thinks their method is correct.",
  "Three signs that a rally is ending: your uncle starts giving stock tips, the taxi driver mentions crypto, and CNBC Africa runs a special.",
  "A proverb from Lagos: 'The market that goes up in the morning often humbles those who forgot that it is also allowed to come down.'",
  "The Oracle has consulted the ancestors. They say: diversify. The spirits do not put all their cowries in one bag.",
  "Resistance at the 200-day moving average is strong. But so was apartheid, and that also fell eventually.",
  "The stars align for mining stocks. Or perhaps that is just dust from the tailings dump. Hard to say.",
  "Great wealth is not built in a quarter. Naspers was once a small newspaper in Paarl. Be patient, be Paarl.",
  "The Oracle sees green candles. But the Oracle also has load-shedding and could not see clearly after 6pm.",
  "When the rand weakens, remember: the JSE is priced in ZAR. Your portfolio in USD may tell a different story.",
  "Buy when there is fear in the streets of Sandton. Sell when there is champagne in the streets of Rosebank.",
]

export function getOracleProphecy(): string {
  return ORACLE_PROPHECIES[Math.floor(Math.random() * ORACLE_PROPHECIES.length)]
}

// ── Dangote ─────────────────────────────────────────────────────────────────

export const DANGOTE_QUOTES = [
  "Dangote has reviewed your portfolio. He is not concerned. He has a refinery.",
  "In 1981, Aliko borrowed ₦500,000 from his uncle and started trading. By 2023 he was worth $13 billion. Your losses are temporary.",
  "Patience is the key to success. Dangote has been patient for 40 years. How long have you been patient?",
  "The market will correct itself. So will you. Have you considered cement?",
  "Dangote notes: he does not check his portfolio every day. He checks it when he needs to build something.",
  "What would Dangote do? He would not be looking at this app. He would be in Lagos, making deals.",
  "Success is not about timing the market. It is about having a plant that runs 24 hours.",
  "A dip in the market is not a loss. A dip in cement production — now that is a problem.",
  "If your portfolio is down, remember: Dangote's first business was flour. Not oil. Not cement. Flour.",
  "The Oracle speaks in riddles. Dangote speaks in factories.",
  "You are watching a screen. Dangote is watching a continent.",
  "Dangote says: stop waiting for government. Opportunities are in the ground, in the sea, and in the sky. Also in cement.",
]

export function getDangoteQuote(): string {
  return DANGOTE_QUOTES[Math.floor(Math.random() * DANGOTE_QUOTES.length)]
}
