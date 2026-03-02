import { useState } from 'react'
import { Bell, BellOff, PlusCircle, Trash2, CheckCircle } from 'lucide-react'
import { useAlerts, type AlertCondition } from '../stores/alerts'

const CONDITION_LABELS: Record<AlertCondition, string> = {
  above:       'Price above',
  below:       'Price below',
  change_up:   '% gain ≥',
  change_down: '% drop ≥',
}

function AddAlertModal({ onClose }: { onClose: () => void }) {
  const { addAlert } = useAlerts()
  const [form, setForm] = useState({
    symbol: '', name: '', condition: 'above' as AlertCondition,
    threshold: '', currency: 'USD',
  })
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))
  const valid = form.symbol && Number(form.threshold) > 0

  function submit() {
    if (!valid) return
    addAlert({
      symbol:    form.symbol.toUpperCase(),
      name:      form.name || form.symbol.toUpperCase(),
      condition: form.condition,
      threshold: Number(form.threshold),
      currency:  form.currency,
      enabled:   true,
    })
    // Request notification permission on first alert
    if (Notification.permission === 'default') {
      Notification.requestPermission()
    }
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">New Price Alert</h2>

        <div className="modal-grid">
          <label className="modal-field">
            <span>Symbol</span>
            <input value={form.symbol} onChange={e => set('symbol', e.target.value)}
              placeholder="e.g. NPN" className="modal-input mono" />
          </label>
          <label className="modal-field">
            <span>Name (optional)</span>
            <input value={form.name} onChange={e => set('name', e.target.value)}
              placeholder="e.g. Naspers" className="modal-input" />
          </label>
          <label className="modal-field">
            <span>Condition</span>
            <select value={form.condition} onChange={e => set('condition', e.target.value)} className="modal-input">
              {Object.entries(CONDITION_LABELS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </label>
          <label className="modal-field">
            <span>
              {form.condition.startsWith('change') ? 'Percentage (%)' : `Price (${form.currency})`}
            </span>
            <input type="number" min="0" step="any" value={form.threshold}
              onChange={e => set('threshold', e.target.value)}
              placeholder={form.condition.startsWith('change') ? '5' : '100.00'}
              className="modal-input mono" />
          </label>
        </div>

        <div className="modal-actions">
          <button className="modal-cancel" onClick={onClose}>Cancel</button>
          <button className="modal-submit-alert" onClick={submit} disabled={!valid}>
            Create Alert
          </button>
        </div>

        <style>{`
          .modal-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,0.7);
            display: flex; align-items: center; justify-content: center; }
          .modal-box {
            background: var(--color-bg-elevated); border: 1px solid var(--color-border);
            border-radius: 6px; padding: 1.5rem; width: 400px; max-width: 92vw;
            box-shadow: 0 24px 48px rgba(0,0,0,0.6);
          }
          .modal-title { margin: 0 0 1rem; font-size: 15px; font-weight: 800; }
          .modal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
          .modal-field { display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--color-text-muted); }
          .modal-input {
            background: var(--color-bg-secondary); border: 1px solid var(--color-border);
            border-radius: 3px; padding: 0.375rem 0.5rem; color: var(--color-text-primary);
            font-size: 12px; font-family: var(--font-sans); outline: none;
          }
          .modal-input.mono { font-family: var(--font-mono); }
          .modal-input:focus { border-color: var(--color-gold-dim); }
          .modal-actions { display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 1.25rem; }
          .modal-cancel {
            padding: 5px 14px; border-radius: 4px; border: 1px solid var(--color-border);
            background: none; color: var(--color-text-muted); font-size: 12px; cursor: pointer;
          }
          .modal-submit-alert {
            padding: 5px 14px; border-radius: 4px; font-size: 12px; font-weight: 700;
            cursor: pointer; background: var(--color-gold-subtle);
            border: 1px solid var(--color-gold-dim); color: var(--color-gold);
          }
          .modal-submit-alert:disabled { opacity: 0.4; cursor: default; }
        `}</style>
      </div>
    </div>
  )
}

export default function Alerts() {
  const { alerts, removeAlert, toggleAlert, clearTriggered, markRead } = useAlerts()
  const [showAdd, setShowAdd] = useState(false)

  const active    = alerts.filter(a => a.enabled && !a.triggeredAt)
  const paused    = alerts.filter(a => !a.enabled && !a.triggeredAt)
  const triggered = alerts.filter(a => !!a.triggeredAt)

  // Mark as read when page opens
  useState(() => { markRead() })

  return (
    <div className="alerts-page">
      <div className="alerts-header">
        <div>
          <h1 className="alerts-h1">Price Alerts</h1>
          <p className="alerts-sub">Get notified when securities hit your price targets</p>
        </div>
        <button className="alerts-add-btn" onClick={() => setShowAdd(true)}>
          <PlusCircle size={13} /> New Alert
        </button>
      </div>

      {/* Notification permission banner */}
      {typeof Notification !== 'undefined' && Notification.permission === 'default' && (
        <div className="alerts-banner" onClick={() => Notification.requestPermission()}>
          <Bell size={13} />
          Enable browser notifications to receive alerts even when Zamani is in the background.
          <span className="alerts-banner-cta">Enable →</span>
        </div>
      )}

      {/* Empty state */}
      {alerts.length === 0 && (
        <div className="alerts-empty panel">
          <Bell size={28} style={{ opacity: 0.2, marginBottom: '0.75rem' }} />
          <p>No alerts set.</p>
          <p style={{ fontSize: 11 }}>Create a price alert to get notified when a security hits your target.</p>
        </div>
      )}

      {/* Active */}
      {active.length > 0 && (
        <section>
          <div className="section-label">Active ({active.length})</div>
          <div className="alerts-list panel">
            {active.map(a => (
              <AlertRow key={a.id} alert={a} onRemove={removeAlert} onToggle={toggleAlert} />
            ))}
          </div>
        </section>
      )}

      {/* Paused */}
      {paused.length > 0 && (
        <section>
          <div className="section-label">Paused ({paused.length})</div>
          <div className="alerts-list panel">
            {paused.map(a => (
              <AlertRow key={a.id} alert={a} onRemove={removeAlert} onToggle={toggleAlert} />
            ))}
          </div>
        </section>
      )}

      {/* Triggered */}
      {triggered.length > 0 && (
        <section>
          <div className="section-label-row">
            <div className="section-label">Triggered ({triggered.length})</div>
            <button className="alerts-clear-btn" onClick={clearTriggered}>Clear all</button>
          </div>
          <div className="alerts-list panel">
            {triggered.map(a => (
              <AlertRow key={a.id} alert={a} onRemove={removeAlert} onToggle={toggleAlert} />
            ))}
          </div>
        </section>
      )}

      {showAdd && <AddAlertModal onClose={() => setShowAdd(false)} />}

      <style>{`
        .alerts-page { display: flex; flex-direction: column; gap: 1rem; max-width: 700px; }
        .alerts-header { display: flex; align-items: flex-start; justify-content: space-between; }
        .alerts-h1  { margin: 0; font-size: 18px; font-weight: 800; letter-spacing: -0.02em; }
        .alerts-sub { margin: 0.125rem 0 0; font-size: 11px; color: var(--color-text-muted); }

        .alerts-add-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 6px 12px; border-radius: 4px;
          border: 1px solid var(--color-gold-dim);
          background: var(--color-gold-subtle); color: var(--color-gold);
          font-size: 11px; font-weight: 700; cursor: pointer; transition: all 0.1s;
        }
        .alerts-add-btn:hover { background: var(--color-gold-dim); color: var(--color-bg-primary); }

        .alerts-banner {
          display: flex; align-items: center; gap: 0.5rem;
          padding: 0.625rem 0.875rem; border-radius: 4px;
          background: var(--color-gold-subtle); border: 1px solid var(--color-gold-dim);
          font-size: 12px; color: var(--color-text-secondary); cursor: pointer;
        }
        .alerts-banner-cta { color: var(--color-gold); font-weight: 700; margin-left: auto; }

        .alerts-empty {
          padding: 3rem 2rem; text-align: center; display: flex; flex-direction: column;
          align-items: center; font-size: 13px; color: var(--color-text-muted);
        }
        .alerts-empty p { margin: 0.125rem 0; }

        .section-label {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-text-muted); font-weight: 600; margin-bottom: 0.5rem;
        }
        .section-label-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem; }
        .section-label-row .section-label { margin-bottom: 0; }
        .alerts-clear-btn {
          font-size: 10px; color: var(--color-text-muted); background: none; border: none;
          cursor: pointer; font-weight: 600;
        }
        .alerts-clear-btn:hover { color: var(--color-down); }

        .alerts-list { overflow: hidden; }
      `}</style>
    </div>
  )
}

function AlertRow({ alert, onRemove, onToggle }: {
  alert: ReturnType<typeof useAlerts>['alerts'][0]
  onRemove: (id: string) => void
  onToggle: (id: string) => void
}) {
  const isTriggered = !!alert.triggeredAt
  return (
    <div className={`alert-row ${isTriggered ? 'triggered' : ''}`}>
      <div className="ar-icon">
        {isTriggered
          ? <CheckCircle size={14} style={{ color: 'var(--color-up)' }} />
          : alert.enabled
            ? <Bell size={14} style={{ color: 'var(--color-gold)' }} />
            : <BellOff size={14} style={{ color: 'var(--color-text-muted)' }} />
        }
      </div>
      <div className="ar-body">
        <div className="ar-title">
          <span className="ar-symbol">{alert.symbol}</span>
          <span className="ar-cond">{CONDITION_LABELS[alert.condition]}</span>
          <span className="ar-threshold num">
            {alert.condition.startsWith('change') ? `${alert.threshold}%` : `${alert.threshold} ${alert.currency}`}
          </span>
        </div>
        <div className="ar-meta">
          {alert.name && <span>{alert.name}</span>}
          {isTriggered && alert.triggeredAt && (
            <span style={{ color: 'var(--color-up)' }}>
              Triggered {new Date(alert.triggeredAt).toLocaleString()}
            </span>
          )}
        </div>
      </div>
      <div className="ar-actions">
        {!isTriggered && (
          <button className="ar-toggle" onClick={() => onToggle(alert.id)}
            title={alert.enabled ? 'Pause' : 'Enable'}>
            {alert.enabled ? <BellOff size={12} /> : <Bell size={12} />}
          </button>
        )}
        <button className="ar-del" onClick={() => onRemove(alert.id)}>
          <Trash2 size={12} />
        </button>
      </div>

      <style>{`
        .alert-row {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.625rem 0.75rem;
          border-bottom: 1px solid var(--color-border-subtle);
        }
        .alert-row:last-child { border-bottom: none; }
        .alert-row.triggered { opacity: 0.7; }
        .ar-icon { flex-shrink: 0; }
        .ar-body { flex: 1; min-width: 0; }
        .ar-title { display: flex; align-items: center; gap: 0.375rem; font-size: 12px; }
        .ar-symbol { font-family: var(--font-mono); font-weight: 700; color: var(--color-gold); }
        .ar-cond   { color: var(--color-text-secondary); }
        .ar-threshold { color: var(--color-text-primary); font-weight: 700; }
        .ar-meta { font-size: 10px; color: var(--color-text-muted); margin-top: 2px; display: flex; gap: 0.5rem; }
        .ar-actions { display: flex; gap: 4px; flex-shrink: 0; }
        .ar-toggle, .ar-del {
          background: none; border: none; cursor: pointer;
          color: var(--color-text-muted); padding: 4px; border-radius: 3px; transition: all 0.1s;
        }
        .ar-toggle:hover { color: var(--color-gold); background: var(--color-gold-subtle); }
        .ar-del:hover    { color: var(--color-down); background: var(--color-down-subtle); }
      `}</style>
    </div>
  )
}
