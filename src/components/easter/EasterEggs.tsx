import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { useEasterEggs, getOracleProphecy } from '../../stores/easterEggs'

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
