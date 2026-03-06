import { create } from 'zustand'

interface EasterEggStore {
  beastMode:    boolean
  oracleOpen:   boolean
  simbaSymbol:  string | null
  activateBeastMode(): void
  deactivateBeastMode(): void
  openOracle(): void
  closeOracle(): void
  triggerSimba(symbol: string): void
  dismissSimba(): void
}

export const useEasterEggs = create<EasterEggStore>(set => ({
  beastMode:    false,
  oracleOpen:   false,
  simbaSymbol:  null,
  activateBeastMode()  { set({ beastMode: true }) },
  deactivateBeastMode(){ set({ beastMode: false }) },
  openOracle()  { set({ oracleOpen: true }) },
  closeOracle() { set({ oracleOpen: false }) },
  triggerSimba(symbol) { set({ simbaSymbol: symbol }) },
  dismissSimba()       { set({ simbaSymbol: null }) },
}))

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
