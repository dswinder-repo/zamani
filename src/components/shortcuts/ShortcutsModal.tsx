import { useShortcutsModal } from '../../stores/shortcutsModal'
import { X } from 'lucide-react'

const SHORTCUTS = [
  { group: 'Navigation (press G then…)', items: [
    { key: 'G D',  desc: 'Dashboard' },
    { key: 'G J',  desc: 'JSE Exchange' },
    { key: 'G U',  desc: 'USE Exchange' },
    { key: 'G N',  desc: 'NGX Exchange' },
    { key: 'G K',  desc: 'NSE Exchange (Nairobi)' },
    { key: 'G G',  desc: 'GSE Exchange (Ghana)' },
    { key: 'G F',  desc: 'Forex' },
    { key: 'G W',  desc: 'Watchlist' },
    { key: 'G P',  desc: 'Portfolio' },
    { key: 'G A',  desc: 'Alerts' },
    { key: 'G C',  desc: 'Calendar' },
    { key: 'G M',  desc: 'Monitor mode' },
    { key: 'G S',  desc: 'Screener' },
    { key: 'G I',  desc: 'Economic Indicators' },
    { key: 'G X',  desc: 'Beat the Index' },
    { key: 'G O',  desc: '🔮 Invoke the Oracle of Lagos' },
    { key: 'G L',  desc: '🦁 SIMBA! — manual lion toast' },
    { key: 'G B',  desc: '🍚 The Great Jollof War' },
  ]},
  { group: '· · · secrets', items: [
    { key: 'G T',  desc: '🌍' },
    { key: 'G Z',  desc: '🏭' },
    { key: 'G H',  desc: '🐗' },
    { key: 'G R',  desc: '🌅' },
  ]},
  { group: 'General', items: [
    { key: '?',    desc: 'Show this keyboard shortcuts overlay' },
    { key: '/',    desc: 'Open command palette (search)' },
    { key: '↑↑↓↓←→←→BA', desc: '⚡ Konami code — activate Bloomberg Beast Mode' },
  ]},
]

export default function ShortcutsModal() {
  const { isOpen, close } = useShortcutsModal()
  if (!isOpen) return null

  return (
    <div className="sc-overlay" onClick={close}>
      <div className="sc-modal" onClick={e => e.stopPropagation()}>
        <div className="sc-header">
          <span className="sc-title">Keyboard Shortcuts</span>
          <button className="sc-close" onClick={close} aria-label="Close"><X size={14} /></button>
        </div>
        <div className="sc-body">
          {SHORTCUTS.map(({ group, items }) => (
            <div key={group} className="sc-group">
              <div className="sc-group-label">{group}</div>
              {items.map(({ key, desc }) => (
                <div key={key} className="sc-row">
                  <span className="sc-key">{key}</span>
                  <span className="sc-desc">{desc}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .sc-overlay {
          position: fixed; inset: 0; z-index: 300;
          background: rgba(0,0,0,0.65); backdrop-filter: blur(3px);
          display: flex; align-items: center; justify-content: center;
        }
        .sc-modal {
          background: var(--color-bg-elevated);
          border: 1px solid var(--color-border);
          border-radius: 6px; width: 480px; max-width: 92vw;
          max-height: 80vh; display: flex; flex-direction: column;
          box-shadow: 0 24px 60px rgba(0,0,0,0.7);
        }
        .sc-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.875rem 1.125rem;
          border-bottom: 1px solid var(--color-border-subtle);
        }
        .sc-title { font-size: 13px; font-weight: 700; }
        .sc-close {
          background: none; border: none; cursor: pointer;
          color: var(--color-text-muted); padding: 2px; border-radius: 3px;
          display: flex; align-items: center; transition: color 0.1s;
        }
        .sc-close:hover { color: var(--color-text-primary); }
        .sc-body { overflow-y: auto; padding: 0.75rem 1.125rem; }
        .sc-group { margin-bottom: 1.25rem; }
        .sc-group-label {
          font-size: 9px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-text-muted); font-weight: 600; margin-bottom: 0.5rem;
        }
        .sc-row {
          display: flex; align-items: center; gap: 1rem;
          padding: 0.25rem 0; font-size: 12px;
        }
        .sc-key {
          font-family: var(--font-mono); font-weight: 700;
          color: var(--color-gold); font-size: 11px;
          background: var(--color-gold-subtle); padding: 2px 7px;
          border-radius: 3px; border: 1px solid var(--color-gold-dim);
          white-space: nowrap; min-width: 60px; text-align: center;
        }
        .sc-desc { color: var(--color-text-secondary); }
      `}</style>
    </div>
  )
}
