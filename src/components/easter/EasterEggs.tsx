import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { useEasterEggs, getOracleProphecy, getDangoteQuote } from '../../stores/easterEggs'

// ── SIMBA! 52-week high toast ───────────────────────────────────────────────

export function SimbaToast() {
  const { simbaSymbol, dismissSimba } = useEasterEggs()

  useEffect(() => {
    if (!simbaSymbol) return
    const t = setTimeout(dismissSimba, 8000)
    return () => clearTimeout(t)
  }, [simbaSymbol, dismissSimba])

  if (!simbaSymbol) return null

  return (
    <div className="simba-toast" onClick={dismissSimba}>
      <div className="simba-lion">🦁</div>
      <div className="simba-content">
        <div className="simba-title">SIMBA!</div>
        <div className="simba-body">
          <strong>{simbaSymbol}</strong> has reached a new 52-week high
        </div>
        <div className="simba-sub">Remember who you are. — Mufasa</div>
      </div>
      <button className="simba-dismiss" onClick={e => { e.stopPropagation(); dismissSimba() }}>
        <X size={10} />
      </button>

      <style>{`
        .simba-toast {
          position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 9998;
          display: flex; align-items: center; gap: 0.875rem;
          background: linear-gradient(135deg, #1a1000, #0a0800);
          border: 1px solid #c9a84c;
          border-radius: 8px; padding: 0.875rem 1rem;
          box-shadow: 0 8px 32px rgba(0,0,0,0.7), 0 0 20px rgba(201,168,76,0.2);
          cursor: pointer; max-width: 320px;
          animation: simba-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes simba-in {
          from { opacity: 0; transform: translateY(20px) scale(0.92); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .simba-lion { font-size: 32px; flex-shrink: 0; }
        .simba-content { flex: 1; min-width: 0; }
        .simba-title {
          font-size: 16px; font-weight: 900; color: #c9a84c;
          letter-spacing: 0.1em; text-shadow: 0 0 12px rgba(201,168,76,0.6);
        }
        .simba-body { font-size: 12px; color: #e8e0d0; margin-top: 2px; }
        .simba-body strong { color: #fff; }
        .simba-sub {
          font-size: 10px; color: rgba(201,168,76,0.6);
          font-style: italic; margin-top: 4px;
        }
        .simba-dismiss {
          flex-shrink: 0; background: none; border: none; cursor: pointer;
          color: rgba(201,168,76,0.4); padding: 2px; border-radius: 3px;
          display: flex; align-items: center; transition: color 0.15s;
        }
        .simba-dismiss:hover { color: #c9a84c; }
      `}</style>
    </div>
  )
}

// ── Beast Mode Overlay ─────────────────────────────────────────────────────

export function BeastModeOverlay() {
  const { beastMode, deactivateBeastMode } = useEasterEggs()
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!beastMode) return
    const t = setInterval(() => setTick(v => v + 1), 80)
    const off = setTimeout(deactivateBeastMode, 6000)
    return () => { clearInterval(t); clearTimeout(off) }
  }, [beastMode, deactivateBeastMode])

  if (!beastMode) return null

  const fake = [
    { sym: 'NPN', val: (3411.23 + Math.sin(tick * 0.7) * 18).toFixed(2), up: Math.sin(tick * 0.7) >= 0 },
    { sym: 'BHP', val: (423.10  + Math.sin(tick * 1.1) * 9).toFixed(2),  up: Math.sin(tick * 1.1) >= 0 },
    { sym: 'MTN', val: (110.45  + Math.sin(tick * 0.4) * 4).toFixed(2),  up: Math.sin(tick * 0.4) >= 0 },
    { sym: 'AGL', val: (380.70  + Math.sin(tick * 0.9) * 12).toFixed(2), up: Math.sin(tick * 0.9) >= 0 },
    { sym: 'SBK', val: (162.30  + Math.sin(tick * 0.6) * 6).toFixed(2),  up: Math.sin(tick * 0.6) >= 0 },
    { sym: 'GLN', val: (91.15   + Math.sin(tick * 1.3) * 3).toFixed(2),  up: Math.sin(tick * 1.3) >= 0 },
  ]

  return (
    <div className="beast-overlay" onClick={deactivateBeastMode}>
      <div className="beast-badge">
        ⚡ BLOOMBERG BEAST MODE — 30-DAY TRIAL ACTIVATED ⚡
      </div>
      <div className="beast-subtitle">
        Professional Terminal · Real-Time Data · Unlimited Functions
      </div>
      <div className="beast-grid">
        {fake.map(s => (
          <div key={s.sym} className={`beast-card ${s.up ? 'up' : 'down'}`}>
            <div className="beast-sym">{s.sym}</div>
            <div className="beast-price">{s.val}</div>
            <div className="beast-chg">{s.up ? '▲' : '▼'} {(Math.random() * 3).toFixed(2)}%</div>
          </div>
        ))}
      </div>
      <div className="beast-disclaimer">
        This is a joke. Zamani is free. Click anywhere to exit.
        <br />Press ↑↑↓↓←→←→BA again to re-activate. 🦁
      </div>

      <style>{`
        .beast-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: #000; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 1.5rem;
          animation: beast-pulse 0.08s ease-in-out infinite alternate;
          cursor: pointer;
        }
        @keyframes beast-pulse {
          from { background: #000a00; }
          to   { background: #000500; }
        }
        .beast-badge {
          font-family: 'Courier New', monospace; font-size: 18px; font-weight: 700;
          color: #ff6600; letter-spacing: 0.1em; text-align: center;
          text-shadow: 0 0 20px rgba(255,102,0,0.8), 0 0 40px rgba(255,102,0,0.4);
          animation: beast-flash 0.15s ease-in-out infinite alternate;
        }
        @keyframes beast-flash {
          from { opacity: 1; }
          to   { opacity: 0.85; }
        }
        .beast-subtitle {
          font-family: 'Courier New', monospace; font-size: 11px;
          color: #00ff41; letter-spacing: 0.2em; text-transform: uppercase;
          text-shadow: 0 0 10px rgba(0,255,65,0.6);
        }
        .beast-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; padding: 0 2rem;
        }
        .beast-card {
          border: 1px solid #ff6600; border-radius: 4px; padding: 0.75rem 1rem;
          background: rgba(255,102,0,0.05);
        }
        .beast-card.up   { border-color: #00ff41; background: rgba(0,255,65,0.05); }
        .beast-card.down { border-color: #ff4444; background: rgba(255,68,68,0.05); }
        .beast-sym   { font-family: 'Courier New', monospace; font-size: 11px; color: #ff6600; font-weight: 700; letter-spacing: 0.1em; }
        .beast-price { font-family: 'Courier New', monospace; font-size: 22px; font-weight: 700; color: #fff; }
        .beast-chg   { font-family: 'Courier New', monospace; font-size: 12px; }
        .beast-card.up .beast-chg   { color: #00ff41; }
        .beast-card.down .beast-chg { color: #ff4444; }
        .beast-disclaimer {
          font-family: 'Courier New', monospace; font-size: 10px;
          color: #555; text-align: center; line-height: 1.6;
        }
      `}</style>
    </div>
  )
}

// ── Oracle of Lagos ────────────────────────────────────────────────────────

export function OracleModal() {
  const { oracleOpen, closeOracle } = useEasterEggs()
  const [prophecy] = useState(getOracleProphecy)

  if (!oracleOpen) return null

  return (
    <div className="oracle-overlay" onClick={closeOracle}>
      <div className="oracle-modal" onClick={e => e.stopPropagation()}>
        <div className="oracle-header">
          <div className="oracle-icon">🔮</div>
          <div className="oracle-title">The Oracle of Lagos</div>
          <div className="oracle-subtitle">Keeper of African market wisdom since 1961</div>
        </div>
        <div className="oracle-body">
          <div className="oracle-smoke">～～～～～～～～～～～</div>
          <blockquote className="oracle-prophecy">"{prophecy}"</blockquote>
          <div className="oracle-smoke">～～～～～～～～～～～</div>
        </div>
        <div className="oracle-footer">
          <div className="oracle-disclaimer">This is not financial advice. Neither is it financial not-advice. It simply is.</div>
          <button className="oracle-close" onClick={closeOracle}>
            <X size={12} /> Dismiss the Oracle
          </button>
        </div>
      </div>

      <style>{`
        .oracle-overlay {
          position: fixed; inset: 0; z-index: 500;
          background: rgba(0,0,0,0.8); backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
        }
        .oracle-modal {
          background: linear-gradient(135deg, #1a0a00, #0a0a1a);
          border: 1px solid #c9a84c; border-radius: 8px;
          width: 520px; max-width: 92vw;
          box-shadow: 0 0 60px rgba(201,168,76,0.3), 0 24px 80px rgba(0,0,0,0.8);
          overflow: hidden;
        }
        .oracle-header {
          text-align: center; padding: 1.5rem 1.5rem 0.75rem;
          border-bottom: 1px solid rgba(201,168,76,0.3);
        }
        .oracle-icon  { font-size: 36px; margin-bottom: 0.5rem; }
        .oracle-title { font-size: 18px; font-weight: 800; color: #c9a84c; letter-spacing: 0.05em; }
        .oracle-subtitle { font-size: 10px; color: rgba(201,168,76,0.6); letter-spacing: 0.1em; text-transform: uppercase; margin-top: 3px; }
        .oracle-body  { padding: 1.25rem 1.5rem; }
        .oracle-smoke { text-align: center; color: rgba(201,168,76,0.3); font-size: 18px; letter-spacing: 0.3em; }
        .oracle-prophecy {
          margin: 1rem 0; padding: 0; border: none;
          font-size: 14px; line-height: 1.7; color: #e8e0d0;
          font-style: italic; text-align: center;
        }
        .oracle-footer {
          padding: 0.75rem 1.5rem 1.25rem; text-align: center;
          border-top: 1px solid rgba(201,168,76,0.2);
        }
        .oracle-disclaimer {
          font-size: 9px; color: rgba(255,255,255,0.3);
          letter-spacing: 0.04em; margin-bottom: 0.75rem;
        }
        .oracle-close {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 5px 14px; border-radius: 4px;
          border: 1px solid rgba(201,168,76,0.4);
          background: rgba(201,168,76,0.08); color: #c9a84c;
          font-size: 11px; font-weight: 600; cursor: pointer;
          transition: all 0.15s;
        }
        .oracle-close:hover { background: rgba(201,168,76,0.15); }
      `}</style>
    </div>
  )
}

// ── Hakuna Matata ───────────────────────────────────────────────────────────

export function HakunaMatataBanner() {
  const { hakunaActive, hakunaPct, dismissHakuna } = useEasterEggs()

  useEffect(() => {
    if (!hakunaActive) return
    const t = setTimeout(dismissHakuna, 9000)
    return () => clearTimeout(t)
  }, [hakunaActive, dismissHakuna])

  if (!hakunaActive) return null

  const pctStr = hakunaPct !== 0 ? `${hakunaPct.toFixed(1)}%` : 'a bit'

  return (
    <div className="hakuna-overlay" onClick={dismissHakuna}>
      <div className="hakuna-top">🐗</div>
      <div className="hakuna-title">HAKUNA MATATA</div>
      <div className="hakuna-subtitle">It means no worries, for the rest of your days</div>
      <div className="hakuna-detail">
        Your portfolio is down {pctStr}. This is not a problem.<br />
        It is a temporary setback on the path to becoming Simba.
      </div>
      <div className="hakuna-meerkat">🦡 "Relax. We've all been there." — Timon, probably</div>
      <div className="hakuna-dismiss">Click anywhere to stop worrying</div>

      <style>{`
        .hakuna-overlay {
          position: fixed; inset: 0; z-index: 9998;
          background: linear-gradient(160deg, #1a0a2e 0%, #2d1a00 40%, #4a2200 70%, #1a0a00 100%);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 1.25rem;
          cursor: pointer;
          animation: hakuna-fade 0.5s ease;
        }
        @keyframes hakuna-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .hakuna-top    { font-size: 56px; animation: hakuna-sway 2s ease-in-out infinite; }
        @keyframes hakuna-sway {
          0%,100% { transform: rotate(-8deg); }
          50%     { transform: rotate(8deg); }
        }
        .hakuna-title {
          font-size: 42px; font-weight: 900; letter-spacing: 0.12em;
          background: linear-gradient(135deg, #ff8c00, #ffd700, #ff6b00);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: none;
          animation: hakuna-pulse 1.5s ease-in-out infinite alternate;
        }
        @keyframes hakuna-pulse {
          from { opacity: 0.85; }
          to   { opacity: 1; }
        }
        .hakuna-subtitle {
          font-size: 15px; color: rgba(255,200,100,0.8);
          font-style: italic; letter-spacing: 0.04em;
        }
        .hakuna-detail {
          font-size: 13px; color: rgba(255,220,160,0.7);
          text-align: center; line-height: 1.7; max-width: 420px;
        }
        .hakuna-meerkat {
          font-size: 12px; color: rgba(255,200,100,0.5);
          font-style: italic; margin-top: 0.5rem;
        }
        .hakuna-dismiss {
          font-size: 10px; color: rgba(255,200,100,0.3);
          letter-spacing: 0.08em; text-transform: uppercase;
          margin-top: 1rem;
        }
      `}</style>
    </div>
  )
}

// ── Circle of Life ──────────────────────────────────────────────────────────

export function CircleOfLifeModal() {
  const { circleActive, circleValue, dismissCircle } = useEasterEggs()
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!circleActive) return
    const t = setInterval(() => setTick(v => v + 1), 120)
    const off = setTimeout(dismissCircle, 10000)
    return () => { clearInterval(t); clearTimeout(off) }
  }, [circleActive, dismissCircle])

  if (!circleActive) return null

  const rays = Array.from({ length: 12 }, (_, i) => i)

  return (
    <div className="circle-overlay" onClick={dismissCircle}>
      <div className="circle-sun" style={{ transform: `rotate(${tick * 1.5}deg)` }}>
        {rays.map(i => (
          <div key={i} className="circle-ray" style={{ transform: `rotate(${i * 30}deg)` }} />
        ))}
        <div className="circle-sun-core">🌅</div>
      </div>
      <div className="circle-title">NANTS INGONYAMA</div>
      <div className="circle-subtitle">bagithi baba — sithi uhhmm ingonyama</div>
      <div className="circle-body">
        Your portfolio has reached a new all-time high
      </div>
      {circleValue > 0 && (
        <div className="circle-value">
          {circleValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      )}
      <div className="circle-mufasa">
        "Remember who you are." — Mufasa
      </div>
      <div className="circle-dismiss">Click to descend from Pride Rock</div>

      <style>{`
        .circle-overlay {
          position: fixed; inset: 0; z-index: 9998;
          background: linear-gradient(180deg, #0a0520 0%, #1a0a30 20%, #3d1a00 55%, #7a3500 75%, #c46200 90%, #e87c00 100%);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 1rem;
          cursor: pointer;
          animation: circle-rise 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        @keyframes circle-rise {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .circle-sun {
          position: relative; width: 100px; height: 100px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 0.5rem;
        }
        .circle-ray {
          position: absolute; top: 0; left: 50%;
          width: 3px; height: 40px; margin-left: -1.5px;
          transform-origin: 50% 100%;
          background: linear-gradient(to top, rgba(255,180,0,0.8), rgba(255,220,0,0));
          border-radius: 2px;
        }
        .circle-sun-core { font-size: 44px; position: relative; z-index: 1; }
        .circle-title {
          font-size: 32px; font-weight: 900; letter-spacing: 0.15em;
          color: #ffd700;
          text-shadow: 0 0 30px rgba(255,180,0,0.8), 0 0 60px rgba(255,100,0,0.4);
        }
        .circle-subtitle {
          font-size: 11px; color: rgba(255,200,100,0.6);
          letter-spacing: 0.2em; text-transform: uppercase;
          font-style: italic;
        }
        .circle-body {
          font-size: 14px; color: rgba(255,220,160,0.85);
          text-align: center; margin-top: 0.5rem;
        }
        .circle-value {
          font-size: 28px; font-weight: 800;
          color: #ffd700; font-family: var(--font-mono);
          letter-spacing: -0.02em;
          text-shadow: 0 0 20px rgba(255,200,0,0.5);
        }
        .circle-mufasa {
          font-size: 12px; color: rgba(255,200,100,0.5);
          font-style: italic; margin-top: 0.75rem;
        }
        .circle-dismiss {
          font-size: 10px; color: rgba(255,200,100,0.25);
          letter-spacing: 0.08em; text-transform: uppercase;
          margin-top: 0.75rem;
        }
      `}</style>
    </div>
  )
}

// ── What Would Dangote Do? ──────────────────────────────────────────────────

export function DangoteModal() {
  const { dangoOpen, closeDangote } = useEasterEggs()
  const [quote] = useState(getDangoteQuote)

  if (!dangoOpen) return null

  return (
    <div className="dango-overlay" onClick={closeDangote}>
      <div className="dango-modal" onClick={e => e.stopPropagation()}>
        <div className="dango-header">
          <div className="dango-icon">🏭</div>
          <div className="dango-name">Aliko Dangote</div>
          <div className="dango-title-sub">President & CEO, Dangote Group · Africa's Richest Person</div>
        </div>
        <div className="dango-body">
          <div className="dango-question">What would Dangote do?</div>
          <blockquote className="dango-quote">"{quote}"</blockquote>
        </div>
        <div className="dango-footer">
          <div className="dango-disclaimer">This is satire. Zamani admires Mr. Dangote deeply.</div>
          <button className="dango-close" onClick={closeDangote}>
            <X size={12} /> Back to work
          </button>
        </div>
      </div>

      <style>{`
        .dango-overlay {
          position: fixed; inset: 0; z-index: 500;
          background: rgba(0,0,0,0.85); backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
        }
        .dango-modal {
          background: linear-gradient(135deg, #0a0800, #1a1000);
          border: 1px solid #2d5016; border-radius: 8px;
          width: 520px; max-width: 92vw;
          box-shadow: 0 0 60px rgba(45,80,22,0.4), 0 24px 80px rgba(0,0,0,0.8);
          overflow: hidden;
        }
        .dango-header {
          text-align: center; padding: 1.5rem 1.5rem 0.75rem;
          border-bottom: 1px solid rgba(45,80,22,0.4);
          background: linear-gradient(135deg, rgba(45,80,22,0.2), transparent);
        }
        .dango-icon      { font-size: 36px; margin-bottom: 0.5rem; }
        .dango-name      { font-size: 18px; font-weight: 800; color: #7dc547; letter-spacing: 0.03em; }
        .dango-title-sub { font-size: 10px; color: rgba(125,197,71,0.5); letter-spacing: 0.06em; margin-top: 3px; text-transform: uppercase; }
        .dango-body      { padding: 1.5rem; }
        .dango-question  {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em;
          color: rgba(125,197,71,0.6); font-weight: 700; margin-bottom: 0.75rem;
        }
        .dango-quote {
          margin: 0; padding: 0; border: none;
          font-size: 15px; line-height: 1.7; color: #e8e8d0;
          font-style: italic; text-align: center;
        }
        .dango-footer {
          padding: 0.75rem 1.5rem 1.25rem; text-align: center;
          border-top: 1px solid rgba(45,80,22,0.2);
        }
        .dango-disclaimer {
          font-size: 9px; color: rgba(255,255,255,0.25);
          letter-spacing: 0.04em; margin-bottom: 0.75rem;
        }
        .dango-close {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 5px 14px; border-radius: 4px;
          border: 1px solid rgba(45,80,22,0.5);
          background: rgba(45,80,22,0.12); color: #7dc547;
          font-size: 11px; font-weight: 600; cursor: pointer;
          transition: all 0.15s;
        }
        .dango-close:hover { background: rgba(45,80,22,0.25); }
      `}</style>
    </div>
  )
}
