/**
 * Merchant of the Savanna
 * A Dope Wars–style commodity trading game set across African cities.
 * Triggered via G+T. Not listed anywhere obvious.
 */
import { useState, useCallback } from 'react'
import { X } from 'lucide-react'
import { useEasterEggs } from '../../stores/easterEggs'

// ── Types ────────────────────────────────────────────────────────────────────

type Good = 'Palm Oil' | 'Cocoa' | 'Gold' | 'Coffee' | 'Copper' | 'Cement' | 'Mobile Data'
type City = 'Lagos' | 'Accra' | 'Nairobi' | 'Joburg' | 'Dakar' | 'Kampala'

interface GameState {
  phase:     'intro' | 'market' | 'over'
  turn:      number
  city:      City
  cash:      number
  inventory: Partial<Record<Good, number>>
  prices:    Record<Good, number>
  event:     string | null
  log:       string[]
}

// ── Constants ─────────────────────────────────────────────────────────────────

const MAX_TURNS  = 20
const MAX_CARGO  = 50
const TRAVEL_COST = 300
const START_CASH  = 10_000

const CITIES: City[] = ['Lagos', 'Accra', 'Nairobi', 'Joburg', 'Dakar', 'Kampala']
const GOODS: Good[]  = ['Palm Oil', 'Cocoa', 'Gold', 'Coffee', 'Copper', 'Cement', 'Mobile Data']

const CITY_META: Record<City, { flag: string; country: string; specialty: string }> = {
  'Lagos':   { flag: '🇳🇬', country: 'Nigeria',      specialty: 'Cheap Palm Oil & Cement' },
  'Accra':   { flag: '🇬🇭', country: 'Ghana',        specialty: 'Cheap Cocoa' },
  'Nairobi': { flag: '🇰🇪', country: 'Kenya',        specialty: 'Cheap Coffee & Mobile Data' },
  'Joburg':  { flag: '🇿🇦', country: 'South Africa', specialty: 'Cheap Gold & Copper' },
  'Dakar':   { flag: '🇸🇳', country: 'Senegal',      specialty: 'Fair prices, low volatility' },
  'Kampala': { flag: '🇺🇬', country: 'Uganda',       specialty: 'Cheapest Coffee' },
}

const GOOD_META: Record<Good, { icon: string; unit: string }> = {
  'Palm Oil':    { icon: '🛢️',  unit: 'barrel' },
  'Cocoa':       { icon: '🍫',  unit: 'sack' },
  'Gold':        { icon: '🥇',  unit: 'oz' },
  'Coffee':      { icon: '☕',  unit: 'bag' },
  'Copper':      { icon: '🔶',  unit: 'kg' },
  'Cement':      { icon: '🏗️', unit: 'bag' },
  'Mobile Data': { icon: '📱',  unit: 'GB' },
}

const BASE: Record<Good, number> = {
  'Palm Oil': 45, 'Cocoa': 85, 'Gold': 450,
  'Coffee': 38, 'Copper': 95, 'Cement': 18, 'Mobile Data': 28,
}

const SPEC: Record<City, Partial<Record<Good, number>>> = {
  'Lagos':   { 'Palm Oil': 0.65, 'Cement': 0.55, 'Gold': 1.30 },
  'Accra':   { 'Cocoa': 0.62, 'Palm Oil': 0.80, 'Gold': 1.20 },
  'Nairobi': { 'Coffee': 0.68, 'Mobile Data': 0.72, 'Cocoa': 1.25 },
  'Joburg':  { 'Gold': 0.72, 'Copper': 0.68, 'Palm Oil': 1.25 },
  'Dakar':   { 'Palm Oil': 0.82, 'Mobile Data': 0.78 },
  'Kampala': { 'Coffee': 0.62, 'Mobile Data': 0.80 },
}

type EventDef = { text: string; apply(p: Record<Good, number>): Record<Good, number>; cashLoss?: number }

const EVENTS: EventDef[] = [
  { text: '☀️ Bumper cocoa harvest in Ghana — cocoa floods the market.',
    apply: p => ({ ...p, 'Cocoa': Math.round(p['Cocoa'] * 0.55) }) },
  { text: '🏭 Dangote opens ANOTHER cement factory. Prices crash. It\'s always cement.',
    apply: p => ({ ...p, 'Cement': Math.round(p['Cement'] * 0.58) }) },
  { text: '⚓ Port workers strike! Supply disrupted. All goods +30%.',
    apply: p => Object.fromEntries(GOODS.map(g => [g, Math.round((p as any)[g] * 1.30)])) as Record<Good, number> },
  { text: '☔ Drought destroys coffee crop in the highlands. Prices surge.',
    apply: p => ({ ...p, 'Coffee': Math.round(p['Coffee'] * 1.70) }) },
  { text: '📱 Mobile data demand explodes across East Africa.',
    apply: p => ({ ...p, 'Mobile Data': Math.round(p['Mobile Data'] * 1.65) }) },
  { text: '⛏️ Massive copper deposit found in the DRC. Copper -38%.',
    apply: p => ({ ...p, 'Copper': Math.round(p['Copper'] * 0.62) }) },
  { text: '🤝 African Union trade deal signed! All commodity prices rally +20%.',
    apply: p => Object.fromEntries(GOODS.map(g => [g, Math.round((p as any)[g] * 1.20)])) as Record<Good, number> },
  { text: '🥇 Central bank gold buying spree — gold surges.',
    apply: p => ({ ...p, 'Gold': Math.round(p['Gold'] * 1.38) }) },
  { text: '💸 Customs official requires a "facilitation fee" of $700. Pay or lose time.',
    apply: p => p, cashLoss: 700 },
  { text: '📰 Inflation report: palm oil prices highly volatile today.',
    apply: p => ({ ...p, 'Palm Oil': Math.round(p['Palm Oil'] * (0.65 + Math.random() * 0.70)) }) },
  { text: '🛢️ Oil pipeline rupture near Lagos — palm oil disrupted. Prices spike.',
    apply: p => ({ ...p, 'Palm Oil': Math.round(p['Palm Oil'] * 1.55) }) },
  { text: '📉 IMF releases new Africa growth forecast. Markets briefly panic. Gold -15%.',
    apply: p => ({ ...p, 'Gold': Math.round(p['Gold'] * 0.85) }) },
]

// ── Game logic ────────────────────────────────────────────────────────────────

function genPrices(city: City): Record<Good, number> {
  const prices = {} as Record<Good, number>
  for (const good of GOODS) {
    const base = BASE[good]
    const spec = (SPEC[city] as any)[good] ?? 1.0
    const variance = 0.80 + Math.random() * 0.40
    prices[good] = Math.max(1, Math.round(base * spec * variance))
  }
  return prices
}

function rollEvent(): EventDef | null {
  if (Math.random() > 0.35) return null
  return EVENTS[Math.floor(Math.random() * EVENTS.length)]
}

function cargoUsed(inv: Partial<Record<Good, number>>): number {
  return Object.values(inv).reduce((s, v) => s + (v ?? 0), 0)
}

function netWorth(state: GameState): number {
  const invVal = GOODS.reduce((s, g) => s + (state.inventory[g] ?? 0) * state.prices[g], 0)
  return state.cash + invVal
}

function scoreLabel(worth: number): { grade: string; message: string } {
  if (worth < 5_000)  return { grade: 'F', message: 'The market humbled you. Even Dangote has bad days. Fewer of them, but still.' }
  if (worth < 12_000) return { grade: 'C', message: 'You broke even, roughly. The savanna respects effort, not results.' }
  if (worth < 25_000) return { grade: 'B', message: 'Respectable. You understand the flow. Keep trading.' }
  if (worth < 50_000) return { grade: 'A', message: 'Strong performance. Dangote\'s people are asking questions about you.' }
  return { grade: 'S', message: 'LEGENDARY. You are the Merchant of the Savanna. The baobab bows.' }
}

function initGame(): GameState {
  const city: City = 'Lagos'
  const prices = genPrices(city)
  return {
    phase: 'intro',
    turn: 1,
    city,
    cash: START_CASH,
    inventory: {},
    prices,
    event: null,
    log: ['You arrive in Lagos with $10,000 and a dream.'],
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

export function TradeGame() {
  const { tradeOpen, closeTrade } = useEasterEggs()
  const [game, setGame] = useState<GameState>(initGame)
  const [selected, setSelected] = useState<Good | null>(null)
  const [qty, setQty] = useState(1)

  const resetGame = useCallback(() => {
    setGame(initGame())
    setSelected(null)
    setQty(1)
  }, [])

  if (!tradeOpen) return null

  function startGame() {
    setGame(g => ({ ...g, phase: 'market' }))
  }

  function travel(dest: City) {
    if (dest === game.city) return
    setGame(g => {
      if (g.turn >= MAX_TURNS) {
        return { ...g, phase: 'over' }
      }
      const newPrices = genPrices(dest)
      const ev = rollEvent()
      const applied = ev ? ev.apply(newPrices) : newPrices
      const cashAfter = g.cash - TRAVEL_COST - (ev?.cashLoss ?? 0)
      const newLog = [
        ...(ev ? [`Turn ${g.turn + 1}: ${ev.text}`] : [`Turn ${g.turn + 1}: You arrive in ${dest}.`]),
        ...g.log,
      ].slice(0, 6)
      return {
        ...g,
        turn: g.turn + 1,
        city: dest,
        cash: Math.max(0, cashAfter),
        prices: applied,
        event: ev?.text ?? null,
        log: newLog,
        phase: g.turn + 1 >= MAX_TURNS ? 'over' : 'market',
      }
    })
    setSelected(null)
    setQty(1)
  }

  function buy(good: Good, amount: number) {
    setGame(g => {
      const space = MAX_CARGO - cargoUsed(g.inventory)
      const canBuy = Math.min(amount, Math.floor(g.cash / g.prices[good]), space)
      if (canBuy <= 0) return g
      return {
        ...g,
        cash: g.cash - g.prices[good] * canBuy,
        inventory: { ...g.inventory, [good]: (g.inventory[good] ?? 0) + canBuy },
      }
    })
  }

  function sell(good: Good, amount: number) {
    setGame(g => {
      const have = g.inventory[good] ?? 0
      const canSell = Math.min(amount, have)
      if (canSell <= 0) return g
      const newInv = { ...g.inventory, [good]: have - canSell }
      if (newInv[good] === 0) delete newInv[good]
      return {
        ...g,
        cash: g.cash + g.prices[good] * canSell,
        inventory: newInv,
      }
    })
  }

  const used    = cargoUsed(game.inventory)
  const worth   = netWorth(game)
  const { grade, message } = scoreLabel(worth)
  const maxBuy  = selected ? Math.min(Math.floor(game.cash / game.prices[selected]), MAX_CARGO - used) : 0
  const maxSell = selected ? (game.inventory[selected] ?? 0) : 0

  // ── Intro Screen ────────────────────────────────────────────────────────────
  if (game.phase === 'intro') {
    return (
      <div className="tg-overlay">
        <div className="tg-intro">
          <div className="tg-intro-emoji">🌍</div>
          <div className="tg-intro-title">MERCHANT OF THE SAVANNA</div>
          <div className="tg-intro-sub">A Dope Wars–style trading game across African cities</div>
          <div className="tg-intro-rules">
            <div className="tg-rule">💰 Start with <strong>$10,000</strong></div>
            <div className="tg-rule">📦 Carry up to <strong>50 units</strong> of cargo</div>
            <div className="tg-rule">🗺️ Visit <strong>6 cities</strong> across <strong>20 turns</strong></div>
            <div className="tg-rule">🎲 Random events will test your nerves</div>
            <div className="tg-rule">🏆 Maximise your net worth to win</div>
          </div>
          <div className="tg-intro-cities">
            {CITIES.map(c => (
              <span key={c} className="tg-intro-city">
                {CITY_META[c].flag} {c}
                <span className="tg-intro-spec">{CITY_META[c].specialty}</span>
              </span>
            ))}
          </div>
          <button className="tg-btn tg-btn--start" onClick={startGame}>Begin Trading →</button>
        </div>
        <button className="tg-exit" onClick={closeTrade}><X size={14} /></button>
        {STYLES}
      </div>
    )
  }

  // ── Game Over ───────────────────────────────────────────────────────────────
  if (game.phase === 'over') {
    return (
      <div className="tg-overlay">
        <div className="tg-over">
          <div className="tg-over-grade" data-grade={grade}>{grade}</div>
          <div className="tg-over-worth">${worth.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
          <div className="tg-over-label">Final Net Worth</div>
          <div className="tg-over-msg">{message}</div>
          <div className="tg-over-hs">
            Started: $10,000 · Profit: {worth >= START_CASH ? '+' : ''}{((worth / START_CASH - 1) * 100).toFixed(1)}%
          </div>
          <div className="tg-over-btns">
            <button className="tg-btn tg-btn--start" onClick={resetGame}>Play Again</button>
            <button className="tg-btn" onClick={closeTrade}>Return to Markets</button>
          </div>
        </div>
        <button className="tg-exit" onClick={closeTrade}><X size={14} /></button>
        {STYLES}
      </div>
    )
  }

  // ── Market Screen ───────────────────────────────────────────────────────────
  return (
    <div className="tg-overlay">
      <button className="tg-exit" onClick={closeTrade}><X size={14} /></button>

      {/* Header */}
      <div className="tg-header">
        <div className="tg-header-left">
          <span className="tg-game-title">MERCHANT OF THE SAVANNA</span>
          <span className="tg-city-badge">{CITY_META[game.city].flag} {game.city}</span>
        </div>
        <div className="tg-header-stats">
          <span className="tg-stat">Turn <strong>{game.turn}</strong>/{MAX_TURNS}</span>
          <span className="tg-stat cash">💰 <strong>${game.cash.toLocaleString('en-US', { maximumFractionDigits: 0 })}</strong></span>
          <span className="tg-stat cargo">📦 <strong>{used}</strong>/{MAX_CARGO}</span>
          <span className="tg-stat worth">≈ <strong>${worth.toLocaleString('en-US', { maximumFractionDigits: 0 })}</strong> net</span>
        </div>
      </div>

      {/* Event banner */}
      {game.event && (
        <div className="tg-event">{game.event}</div>
      )}

      <div className="tg-body">
        {/* Market prices */}
        <div className="tg-market">
          <div className="tg-panel-title">📊 {game.city} Market</div>
          <div className="tg-goods">
            {GOODS.map(good => {
              const have = game.inventory[good] ?? 0
              const isSelected = selected === good
              return (
                <div
                  key={good}
                  className={`tg-good ${isSelected ? 'tg-good--selected' : ''}`}
                  onClick={() => { setSelected(isSelected ? null : good); setQty(1) }}
                >
                  <span className="tg-good-icon">{GOOD_META[good].icon}</span>
                  <span className="tg-good-name">{good}</span>
                  <span className="tg-good-price">${game.prices[good].toLocaleString()}</span>
                  {have > 0 && <span className="tg-good-have">×{have}</span>}
                </div>
              )
            })}
          </div>

          {/* Buy/sell panel */}
          {selected && (
            <div className="tg-trade-panel">
              <div className="tg-trade-good">
                {GOOD_META[selected].icon} {selected} @ ${game.prices[selected]}/{GOOD_META[selected].unit}
              </div>
              <div className="tg-trade-row">
                <span className="tg-trade-label">Qty:</span>
                <input
                  type="number" min={1} max={Math.max(maxBuy, maxSell)} value={qty}
                  onChange={e => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                  className="tg-qty-input"
                />
                <button className="tg-btn tg-btn--buy" disabled={maxBuy <= 0}
                  onClick={() => buy(selected, qty)}>
                  BUY {qty} (${(game.prices[selected] * qty).toLocaleString()})
                </button>
                <button className="tg-btn tg-btn--max" disabled={maxBuy <= 0}
                  onClick={() => buy(selected, maxBuy)}>
                  MAX
                </button>
                <button className="tg-btn tg-btn--sell" disabled={maxSell <= 0}
                  onClick={() => sell(selected, qty)}>
                  SELL {qty}
                </button>
                <button className="tg-btn tg-btn--all" disabled={maxSell <= 0}
                  onClick={() => sell(selected, maxSell)}>
                  ALL
                </button>
              </div>
              <div className="tg-trade-info">
                Can buy: {maxBuy} · Have: {maxSell} · Space: {MAX_CARGO - used}
              </div>
            </div>
          )}
        </div>

        {/* Right side: inventory + travel */}
        <div className="tg-sidebar">
          {/* Inventory */}
          <div className="tg-panel-title">📦 Your Cargo</div>
          {Object.keys(game.inventory).length === 0
            ? <div className="tg-empty-inv">Nothing yet — buy something.</div>
            : GOODS.filter(g => (game.inventory[g] ?? 0) > 0).map(g => (
              <div key={g} className="tg-inv-row">
                <span>{GOOD_META[g].icon} {g}</span>
                <span className="tg-inv-qty">×{game.inventory[g]}</span>
                <span className="tg-inv-val">${((game.inventory[g] ?? 0) * game.prices[g]).toLocaleString()}</span>
              </div>
            ))
          }

          {/* Travel */}
          <div className="tg-panel-title tg-travel-title">
            🗺️ Travel (${TRAVEL_COST})
            {game.turn >= MAX_TURNS - 1 && <span className="tg-last-warning"> — LAST TURN</span>}
          </div>
          <div className="tg-cities">
            {CITIES.filter(c => c !== game.city).map(c => (
              <button key={c} className="tg-city-btn" onClick={() => travel(c)}>
                {CITY_META[c].flag} {c}
                <span className="tg-city-spec">{CITY_META[c].specialty}</span>
              </button>
            ))}
          </div>
          {game.turn >= MAX_TURNS && (
            <button className="tg-btn tg-btn--start" style={{ marginTop: '0.75rem', width: '100%' }}
              onClick={() => setGame(g => ({ ...g, phase: 'over' }))}>
              End Journey
            </button>
          )}
        </div>
      </div>

      {/* Log */}
      <div className="tg-log">
        {game.log.slice(0, 3).map((entry, i) => (
          <span key={i} className="tg-log-entry">{entry}</span>
        ))}
      </div>

      {STYLES}
    </div>
  )
}

// ── Styles ────────────────────────────────────────────────────────────────────

const STYLES = (
  <style>{`
    .tg-overlay {
      position: fixed; inset: 0; z-index: 9997;
      background: #050a08; color: #b0c8a0;
      font-family: var(--font-mono); font-size: 12px;
      display: flex; flex-direction: column;
      overflow: hidden;
    }
    .tg-exit {
      position: absolute; top: 0.75rem; right: 0.875rem;
      background: none; border: none; color: #4a6a3a;
      cursor: pointer; padding: 4px; border-radius: 3px;
      display: flex; align-items: center; z-index: 1;
      transition: color 0.15s;
    }
    .tg-exit:hover { color: #8ab87a; }

    /* Intro */
    .tg-intro {
      flex: 1; display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      gap: 1rem; padding: 2rem; text-align: center;
    }
    .tg-intro-emoji  { font-size: 48px; }
    .tg-intro-title  { font-size: 24px; font-weight: 900; color: #7dc547; letter-spacing: 0.12em; }
    .tg-intro-sub    { font-size: 11px; color: #4a7a3a; letter-spacing: 0.06em; }
    .tg-intro-rules  { display: flex; flex-direction: column; gap: 4px; margin: 0.5rem 0; }
    .tg-rule         { font-size: 12px; color: #90b880; }
    .tg-intro-cities {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem;
      max-width: 600px; width: 100%;
    }
    .tg-intro-city   {
      background: rgba(125,197,71,0.06); border: 1px solid rgba(125,197,71,0.15);
      border-radius: 4px; padding: 0.4rem 0.6rem; font-size: 11px; color: #7dc547;
      display: flex; flex-direction: column; gap: 2px;
    }
    .tg-intro-spec   { font-size: 9px; color: #4a7a3a; }

    /* Game Over */
    .tg-over {
      flex: 1; display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      gap: 0.75rem; padding: 2rem; text-align: center;
    }
    .tg-over-grade {
      font-size: 64px; font-weight: 900; line-height: 1;
      color: #7dc547;
      text-shadow: 0 0 30px rgba(125,197,71,0.5);
    }
    .tg-over-grade[data-grade="F"] { color: #ff4444; text-shadow: 0 0 30px rgba(255,68,68,0.5); }
    .tg-over-grade[data-grade="C"] { color: #f59e0b; }
    .tg-over-grade[data-grade="S"] { color: #ffd700; text-shadow: 0 0 40px rgba(255,215,0,0.7); }
    .tg-over-worth { font-size: 36px; font-weight: 800; color: #ffd700; }
    .tg-over-label { font-size: 10px; color: #4a7a3a; text-transform: uppercase; letter-spacing: 0.1em; }
    .tg-over-msg   { font-size: 13px; color: #90b880; max-width: 480px; line-height: 1.6; font-style: italic; }
    .tg-over-hs    { font-size: 10px; color: #4a7a3a; }
    .tg-over-btns  { display: flex; gap: 0.75rem; margin-top: 0.5rem; }

    /* Header */
    .tg-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0.5rem 1rem; border-bottom: 1px solid rgba(125,197,71,0.15);
      background: rgba(125,197,71,0.04); flex-shrink: 0;
    }
    .tg-header-left { display: flex; align-items: center; gap: 1rem; }
    .tg-game-title  { font-size: 11px; font-weight: 700; color: #4a7a3a; letter-spacing: 0.1em; }
    .tg-city-badge  { font-size: 13px; font-weight: 700; color: #7dc547; }
    .tg-header-stats { display: flex; gap: 1rem; }
    .tg-stat         { font-size: 11px; color: #4a7a3a; }
    .tg-stat strong  { color: #90b880; }
    .tg-stat.cash strong { color: #7dc547; }
    .tg-stat.worth strong { color: #f59e0b; }

    /* Event banner */
    .tg-event {
      background: rgba(245,158,11,0.1); border-bottom: 1px solid rgba(245,158,11,0.3);
      padding: 0.4rem 1rem; font-size: 11px; color: #f59e0b;
      flex-shrink: 0;
    }

    /* Body */
    .tg-body {
      flex: 1; display: grid; grid-template-columns: 1fr 280px;
      gap: 0; overflow: hidden;
    }

    /* Market */
    .tg-market {
      border-right: 1px solid rgba(125,197,71,0.15);
      display: flex; flex-direction: column;
      overflow-y: auto; padding: 0.75rem 1rem;
    }
    .tg-panel-title {
      font-size: 9px; text-transform: uppercase; letter-spacing: 0.1em;
      color: #4a7a3a; font-weight: 700; margin-bottom: 0.5rem;
    }
    .tg-goods { display: flex; flex-direction: column; gap: 2px; }
    .tg-good {
      display: flex; align-items: center; gap: 0.5rem;
      padding: 0.35rem 0.5rem; border-radius: 3px; cursor: pointer;
      border: 1px solid transparent; transition: all 0.1s;
    }
    .tg-good:hover        { background: rgba(125,197,71,0.06); border-color: rgba(125,197,71,0.2); }
    .tg-good--selected    { background: rgba(125,197,71,0.12); border-color: rgba(125,197,71,0.4); }
    .tg-good-icon  { font-size: 14px; width: 20px; text-align: center; }
    .tg-good-name  { flex: 1; color: #90b880; }
    .tg-good-price { font-weight: 700; color: #7dc547; min-width: 64px; text-align: right; }
    .tg-good-have  { font-size: 10px; color: #f59e0b; min-width: 32px; text-align: right; }

    /* Trade panel */
    .tg-trade-panel {
      margin-top: 0.75rem; padding: 0.75rem;
      background: rgba(125,197,71,0.05); border: 1px solid rgba(125,197,71,0.2);
      border-radius: 4px;
    }
    .tg-trade-good  { font-size: 12px; color: #7dc547; font-weight: 700; margin-bottom: 0.5rem; }
    .tg-trade-row   { display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap; }
    .tg-trade-label { font-size: 10px; color: #4a7a3a; }
    .tg-qty-input {
      width: 52px; background: rgba(125,197,71,0.08);
      border: 1px solid rgba(125,197,71,0.3); border-radius: 3px;
      color: #7dc547; font-family: var(--font-mono); font-size: 12px;
      padding: 3px 6px; text-align: center;
    }
    .tg-trade-info { font-size: 9px; color: #3a5a2a; margin-top: 0.4rem; }

    /* Sidebar */
    .tg-sidebar {
      overflow-y: auto; padding: 0.75rem 1rem;
      display: flex; flex-direction: column; gap: 2px;
    }
    .tg-empty-inv   { font-size: 10px; color: #3a5a2a; margin-bottom: 0.5rem; }
    .tg-inv-row     { display: flex; align-items: center; gap: 0.5rem; padding: 2px 0; font-size: 11px; }
    .tg-inv-qty     { color: #f59e0b; margin-left: auto; }
    .tg-inv-val     { color: #7dc547; min-width: 64px; text-align: right; }
    .tg-travel-title { margin-top: 0.75rem; }
    .tg-last-warning { color: #ff4444; }
    .tg-cities      { display: flex; flex-direction: column; gap: 4px; }
    .tg-city-btn {
      background: rgba(125,197,71,0.05); border: 1px solid rgba(125,197,71,0.15);
      border-radius: 3px; padding: 0.35rem 0.6rem; cursor: pointer;
      color: #7dc547; font-family: var(--font-mono); font-size: 11px;
      text-align: left; transition: all 0.1s;
      display: flex; flex-direction: column; gap: 1px;
    }
    .tg-city-btn:hover { background: rgba(125,197,71,0.12); border-color: rgba(125,197,71,0.35); }
    .tg-city-spec { font-size: 9px; color: #3a6a2a; }

    /* Buttons */
    .tg-btn {
      padding: 4px 10px; border-radius: 3px; cursor: pointer;
      font-family: var(--font-mono); font-size: 10px; font-weight: 700;
      border: 1px solid rgba(125,197,71,0.3);
      background: rgba(125,197,71,0.08); color: #7dc547;
      transition: all 0.1s; letter-spacing: 0.04em;
    }
    .tg-btn:hover:not(:disabled) { background: rgba(125,197,71,0.18); }
    .tg-btn:disabled { opacity: 0.3; cursor: default; }
    .tg-btn--buy   { border-color: rgba(125,197,71,0.5); color: #7dc547; }
    .tg-btn--sell  { border-color: rgba(255,100,100,0.4); color: #ff8888; background: rgba(255,100,100,0.06); }
    .tg-btn--sell:hover:not(:disabled) { background: rgba(255,100,100,0.12); }
    .tg-btn--max   { font-size: 9px; }
    .tg-btn--all   { font-size: 9px; border-color: rgba(255,100,100,0.4); color: #ff8888; background: rgba(255,100,100,0.06); }
    .tg-btn--all:hover:not(:disabled) { background: rgba(255,100,100,0.12); }
    .tg-btn--start {
      padding: 8px 24px; font-size: 12px;
      background: rgba(125,197,71,0.15); border-color: rgba(125,197,71,0.5);
    }
    .tg-btn--start:hover { background: rgba(125,197,71,0.25); }

    /* Log */
    .tg-log {
      display: flex; gap: 1.5rem; align-items: center;
      padding: 0.35rem 1rem; flex-shrink: 0;
      border-top: 1px solid rgba(125,197,71,0.1);
      background: rgba(0,0,0,0.3); overflow: hidden;
    }
    .tg-log-entry { font-size: 10px; color: #3a5a2a; white-space: nowrap; }
    .tg-log-entry:first-child { color: #5a8a4a; }

    @media (max-width: 700px) {
      .tg-body { grid-template-columns: 1fr; }
      .tg-sidebar { border-top: 1px solid rgba(125,197,71,0.15); }
      .tg-intro-cities { grid-template-columns: repeat(2, 1fr); }
      .tg-header-stats { gap: 0.5rem; }
    }
  `}</style>
)
