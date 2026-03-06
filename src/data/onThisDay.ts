/** "On This Day in African Market History" — keyed by MM-DD */
export interface MarketFact {
  date: string  // MM-DD
  year: number
  text: string
}

export const MARKET_FACTS: MarketFact[] = [
  { date: '01-13', year: 1887, text: 'The Johannesburg Stock Exchange opens, just one year after gold was discovered on the Witwatersrand. The first listings are mining companies. Nobody is surprised.' },
  { date: '02-04', year: 1994, text: 'The JSE opens to foreign investors for the first time as South Africa transitions toward democracy. The rand strengthens. History is made.' },
  { date: '03-19', year: 1961, text: 'The Nairobi Stock Exchange is formally constituted. Kenya becomes one of the first African nations with an organized securities market.' },
  { date: '04-27', year: 1994, text: 'South Africa holds its first democratic election. The JSE surges. Nelson Mandela will become President. The market understands what this means.' },
  { date: '05-07', year: 2001, text: 'MTN lists on the JSE. The South African telco will go on to become the most valuable brand on the African continent. Subscribers: 2 million. Today: 280 million.' },
  { date: '06-12', year: 1989, text: 'The Ghana Stock Exchange is established. It will go on to be one of the best-performing exchanges in the world in 2023. Ghana knows what it is doing.' },
  { date: '07-02', year: 1960, text: 'The Lagos Stock Exchange — later renamed the Nigerian Exchange Group — begins operations in a borrowed conference room with 19 securities listed.' },
  { date: '08-14', year: 2007, text: 'The Dangote Group, founded on ₦500,000 borrowed from Aliko Dangote\'s uncle in 1977, announces it will list Dangote Cement. Cement. The empire begins.' },
  { date: '09-15', year: 2008, text: 'Lehman Brothers collapses. African markets feel the shockwave — though the JSE, NSE, and NGX had less exposure to subprime mortgages than their Western counterparts. One small mercy.' },
  { date: '10-31', year: 2017, text: 'Naspers, the South African media giant, announces it will spin off its global internet assets. Its 31% stake in Tencent is worth more than the JSE\'s entire banking sector. This is a normal thing that happened.' },
  { date: '11-17', year: 1997, text: 'The Uganda Securities Exchange is founded. The exchange will eventually modernize to fully electronic trading — making it one of Africa\'s most technologically advanced small exchanges.' },
  { date: '12-09', year: 1994, text: 'The Lusaka Stock Exchange opens in Zambia with 7 listed companies. The original trading floor consists of a small room and considerable optimism.' },
  { date: '01-22', year: 2019, text: 'Zimbabwe\'s ZSE is temporarily suspended by the government amid hyperinflation. When it reopens, stocks are priced in Zimbabwe dollars. Then USD. The accountants are tired.' },
  { date: '02-19', year: 2020, text: 'COVID-19 begins reaching African shores. The JSE falls 8% in a single day — its worst single-day drop since the 2008 crisis. The continent braces.' },
  { date: '03-23', year: 2020, text: 'The JSE halts trading as circuit breakers trigger during the COVID-19 crash. Every exchange on the continent is red. Zamani would have shown a lot of red that day.' },
  { date: '04-20', year: 2020, text: 'WTI crude oil futures go negative for the first time in history — traders literally paying people to take oil. Nigeria\'s budget is based on $57/barrel. The math does not work.' },
  { date: '05-26', year: 2022, text: 'The Africa Continental Free Trade Agreement (AfCFTA) begins to show early signs of cross-border capital flows increasing. Pan-African investing becomes less theoretical.' },
  { date: '06-22', year: 1998, text: 'The BRVM (Bourse Régionale des Valeurs Mobilières) opens, serving 8 West African nations. A single exchange for the entire UEMOA zone. Ambitious. Impressively functional.' },
  { date: '07-28', year: 2022, text: 'Ghana\'s GSE Composite Index has its best year on record in 2022, rising over 40% — making it the world\'s best-performing stock exchange that year. Jollof rice and equity returns.' },
  { date: '08-30', year: 2011, text: 'Africa\'s combined stock market capitalisation passes $1 trillion for the first time. The continent\'s markets have grown 500% in 10 years. The world starts paying attention.' },
  { date: '09-03', year: 1954, text: 'The Nairobi Securities Exchange traces its roots to this period, when trading in shares first began in Kenya under the East African Stock Exchange Committee.' },
  { date: '10-17', year: 2023, text: 'The JSE celebrates 136 years of operation — making it not just Africa\'s oldest and largest exchange, but one of the 20 largest in the world by market capitalisation.' },
  { date: '11-09', year: 2011, text: 'Equity Bank Kenya lists on the Uganda Securities Exchange via a cross-listing — one of the first examples of true pan-African equity integration. The borders are getting thinner.' },
  { date: '12-31', year: 2023, text: 'The JSE All Share Index closes the year up 8.2%. In a year where South Africa dealt with load-shedding, political uncertainty, and a 10%+ inflation peak, investors take the win.' },
]

export function getFactForToday(): MarketFact | null {
  const now   = new Date()
  const mmdd  = `${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  return MARKET_FACTS.find(f => f.date === mmdd) ?? MARKET_FACTS[now.getDate() % MARKET_FACTS.length]
}
