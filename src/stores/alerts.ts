import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AlertCondition = 'above' | 'below' | 'change_up' | 'change_down'

export interface PriceAlert {
  id:         string
  symbol:     string
  name:       string
  condition:  AlertCondition
  threshold:  number     // price or % depending on condition
  currency:   string
  enabled:    boolean
  createdAt:  number
  triggeredAt?: number   // set when alert fires
}

interface AlertsStore {
  alerts: PriceAlert[]
  addAlert(a: Omit<PriceAlert, 'id' | 'createdAt' | 'triggeredAt'>): void
  removeAlert(id: string): void
  toggleAlert(id: string): void
  triggerAlert(id: string): void
  clearTriggered(): void
  unreadCount: number
  markRead(): void
}

export const useAlerts = create<AlertsStore>()(
  persist(
    (set, get) => ({
      alerts: [],
      unreadCount: 0,

      addAlert(a) {
        const alert: PriceAlert = {
          ...a,
          id:        `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          createdAt: Date.now(),
        }
        set(s => ({ alerts: [...s.alerts, alert] }))
      },

      removeAlert(id) {
        set(s => ({ alerts: s.alerts.filter(a => a.id !== id) }))
      },

      toggleAlert(id) {
        set(s => ({
          alerts: s.alerts.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a)
        }))
      },

      triggerAlert(id) {
        set(s => ({
          alerts: s.alerts.map(a => a.id === id ? { ...a, triggeredAt: Date.now(), enabled: false } : a),
          unreadCount: s.unreadCount + 1,
        }))
        // Browser notification if permission granted
        if (Notification.permission === 'granted') {
          const alert = get().alerts.find(a => a.id === id)
          if (alert) {
            new Notification(`Zamani Alert: ${alert.symbol}`, {
              body: `${alert.symbol} has triggered your ${alert.condition} alert at ${alert.threshold}`,
              icon: '/zamani-icon-192.png',
            })
          }
        }
      },

      clearTriggered() {
        set(s => ({ alerts: s.alerts.filter(a => !a.triggeredAt) }))
      },

      markRead() {
        set({ unreadCount: 0 })
      },
    }),
    { name: 'zamani-alerts' },
  ),
)
