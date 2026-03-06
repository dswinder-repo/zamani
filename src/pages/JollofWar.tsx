/**
 * The Great Jollof War Index
 * Nigeria (NGX) vs Ghana (GSE) — the eternal debate, settled by markets.
 * Not really. But also: yes.
 */
import { useQueries } from '@tanstack/react-query'
import { provider } from '../services/api'
import type { IndexSnapshot } from '../services/api'

const JOLLOF_FACTS = [
  "Jollof rice was invented in the Senegambia region of West Africa. Both Nigeria and Ghana have been arguing about this since approximately 1492.",
  "Nigerian jollof is cooked over high heat on the stove, giving it a distinctive smoky bottom (party jollof). Ghanaians call this 'burnt rice' and they are wrong.",
  "Ghanaian jollof (waakye) uses a different rice variety and tomato base. Nigerians call this 'tomato stew with rice' and they are also wrong.",
  "The Jollof War is fought primarily on Twitter/X. No blood has been shed. Many feelings have been hurt.",
  "Senegal invented jollof rice (ceebu jën). Both Nigeria and Ghana prefer to ignore this fact.",
  "The word 'jollof' derives from the Wolof people of Senegal and The Gambia. The Wolof remain calm. They know the truth.",
]

export default function JollofWar() {
  const indexQueries = useQueries({
    queries: [
      {
        queryKey: ['indices', 'ngx'],
        queryFn:  () => provider.getIndices?.('ngx') ?? Promise.resolve([]),
        staleTime: 60_000,
      },
      {
        queryKey: ['indices', 'gse'],
        queryFn:  () => provider.getIndices?.('gse') ?? Promise.resolve([]),
        staleTime: 60_000,
      },
    ],
  })

  const ngxIndices = (indexQueries[0].data as IndexSnapshot[] | undefined) ?? []
  const gseIndices = (indexQueries[1].data as IndexSnapshot[] | undefined) ?? []

  const ngxPct = ngxIndices.length > 0
    ? ngxIndices.reduce((s, i) => s + i.changePct, 0) / ngxIndices.length
    : null
  const gsePct = gseIndices.length > 0
    ? gseIndices.reduce((s, i) => s + i.changePct, 0) / gseIndices.length
    : null

  const nigeriaWinning = ngxPct != null && gsePct != null && ngxPct > gsePct
  const ghanaWinning   = ngxPct != null && gsePct != null && gsePct > ngxPct
  const tied           = ngxPct != null && gsePct != null && ngxPct === gsePct

  const fact = JOLLOF_FACTS[new Date().getDate() % JOLLOF_FACTS.length]

  return (
    <div className="jollof-page">
      <div className="jollof-header">
        <div className="jollof-title">🍚 The Great Jollof War Index 🍚</div>
        <div className="jollof-subtitle">
          Nigeria vs Ghana — The eternal debate, now with financial data
        </div>
      </div>

      <div className="jollof-arena">
        {/* Nigeria */}
        <div className={`jollof-side ng ${nigeriaWinning ? 'winner' : ghanaWinning ? 'loser' : ''}`}>
          <div className="jollof-flag">🇳🇬</div>
          <div className="jollof-country">Nigeria</div>
          <div className="jollof-exchange">NGX Exchange</div>
          <div className={`jollof-pct num ${ngxPct != null && ngxPct >= 0 ? 'up' : 'down'}`}>
            {ngxPct != null
              ? `${ngxPct >= 0 ? '+' : ''}${ngxPct.toFixed(2)}%`
              : (indexQueries[0].isLoading ? '…' : 'No data')}
          </div>
          {nigeriaWinning && <div className="jollof-crown">👑 WINNING TODAY</div>}
          <div className="jollof-claim">
            "Party jollof is the only jollof. <br />The smoky bottom is not a mistake."
          </div>
        </div>

        {/* VS */}
        <div className="jollof-vs">
          <div className="jollof-vs-text">VS</div>
          {tied && <div className="jollof-tied">🤝 TIED</div>}
          {!tied && !nigeriaWinning && !ghanaWinning && (
            <div className="jollof-nodatatext">No market data —<br />the war continues</div>
          )}
        </div>

        {/* Ghana */}
        <div className={`jollof-side gh ${ghanaWinning ? 'winner' : nigeriaWinning ? 'loser' : ''}`}>
          <div className="jollof-flag">🇬🇭</div>
          <div className="jollof-country">Ghana</div>
          <div className="jollof-exchange">GSE Exchange</div>
          <div className={`jollof-pct num ${gsePct != null && gsePct >= 0 ? 'up' : 'down'}`}>
            {gsePct != null
              ? `${gsePct >= 0 ? '+' : ''}${gsePct.toFixed(2)}%`
              : (indexQueries[1].isLoading ? '…' : 'No data')}
          </div>
          {ghanaWinning && <div className="jollof-crown">👑 WINNING TODAY</div>}
          <div className="jollof-claim">
            "Waakye is an art form. <br />You cannot rush greatness."
          </div>
        </div>
      </div>

      {/* Historical scoreboard */}
      <div className="panel jollof-scoreboard">
        <div className="jollof-score-title">All-Time Record (simulated)</div>
        <div className="jollof-score-row">
          <div className="jollof-score-item ng">
            <span className="jollof-score-flag">🇳🇬</span>
            <span className="jollof-score-count num">247</span>
            <span className="jollof-score-label">days Nigeria led</span>
          </div>
          <div className="jollof-score-item draw">
            <span>🤝</span>
            <span className="jollof-score-count num">31</span>
            <span className="jollof-score-label">days tied</span>
          </div>
          <div className="jollof-score-item gh">
            <span className="jollof-score-flag">🇬🇭</span>
            <span className="jollof-score-count num">218</span>
            <span className="jollof-score-label">days Ghana led</span>
          </div>
        </div>
        <div className="jollof-score-note">
          * These numbers are made up. Both countries have excellent jollof and good markets.
        </div>
      </div>

      {/* Daily fact */}
      <div className="panel jollof-fact">
        <div className="jollof-fact-label">📚 Jollof War Intelligence Report</div>
        <div className="jollof-fact-text">{fact}</div>
      </div>

      {/* Disclaimer */}
      <div className="jollof-disclaimer">
        This page is satire. Zamani loves both Nigeria and Ghana deeply and without prejudice.
        <br />We also love Senegalese ceebu jën but are afraid to say that too loudly.
      </div>

      <style>{`
        .jollof-page { display: flex; flex-direction: column; gap: 1.5rem; max-width: 800px; margin: 0 auto; }

        .jollof-header { text-align: center; padding: 1rem 0; }
        .jollof-title  { font-size: 24px; font-weight: 800; letter-spacing: -0.02em; }
        .jollof-subtitle { font-size: 12px; color: var(--color-text-muted); margin-top: 4px; }

        .jollof-arena {
          display: grid; grid-template-columns: 1fr auto 1fr; gap: 1.5rem; align-items: center;
        }

        .jollof-side {
          background: var(--color-bg-secondary); border: 1px solid var(--color-border);
          border-radius: 8px; padding: 1.5rem 1.25rem; text-align: center;
          transition: all 0.3s;
        }
        .jollof-side.winner {
          border-color: var(--color-up); box-shadow: 0 0 20px rgba(74,222,128,0.15);
        }
        .jollof-side.loser { opacity: 0.6; }

        .jollof-flag    { font-size: 36px; margin-bottom: 0.5rem; }
        .jollof-country { font-size: 18px; font-weight: 800; margin-bottom: 2px; }
        .jollof-exchange { font-size: 10px; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.75rem; }
        .jollof-pct { font-size: 28px; font-weight: 800; letter-spacing: -0.03em; }
        .jollof-pct.up   { color: var(--color-up); }
        .jollof-pct.down { color: var(--color-down); }
        .jollof-crown { margin-top: 0.5rem; font-size: 11px; font-weight: 700; color: var(--color-up); letter-spacing: 0.04em; }
        .jollof-claim {
          margin-top: 1rem; font-size: 11px; color: var(--color-text-muted);
          font-style: italic; line-height: 1.5;
          border-top: 1px solid var(--color-border-subtle); padding-top: 0.75rem;
        }

        .jollof-vs { text-align: center; }
        .jollof-vs-text { font-size: 28px; font-weight: 900; color: var(--color-gold); }
        .jollof-tied { margin-top: 0.5rem; font-size: 11px; color: var(--color-text-muted); }
        .jollof-nodatatext { margin-top: 0.5rem; font-size: 10px; color: var(--color-text-muted); line-height: 1.4; }

        .jollof-scoreboard { padding: 1rem 1.25rem; }
        .jollof-score-title { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-text-muted); margin-bottom: 0.75rem; }
        .jollof-score-row   { display: flex; justify-content: center; gap: 2rem; align-items: center; }
        .jollof-score-item  { display: flex; flex-direction: column; align-items: center; gap: 2px; }
        .jollof-score-flag  { font-size: 20px; }
        .jollof-score-count { font-size: 28px; font-weight: 800; color: var(--color-text-primary); }
        .jollof-score-label { font-size: 10px; color: var(--color-text-muted); }
        .jollof-score-note  { font-size: 9px; color: var(--color-text-muted); text-align: center; margin-top: 0.75rem; font-style: italic; }

        .jollof-fact { padding: 1rem 1.25rem; }
        .jollof-fact-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-gold); margin-bottom: 0.5rem; }
        .jollof-fact-text  { font-size: 13px; color: var(--color-text-secondary); line-height: 1.6; font-style: italic; }

        .jollof-disclaimer { font-size: 10px; color: var(--color-text-muted); text-align: center; line-height: 1.6; }
      `}</style>
    </div>
  )
}
