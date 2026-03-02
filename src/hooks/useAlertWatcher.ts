/**
 * Runs in the background (mounted once in Shell) and checks price alerts
 * against live quotes every 30 seconds.
 */
import { useEffect } from 'react'
import { useAlerts } from '../stores/alerts'
import { provider } from '../services/api'

export function useAlertWatcher() {
  const { alerts, triggerAlert } = useAlerts()

  useEffect(() => {
    async function check() {
      const active = alerts.filter(a => a.enabled && !a.triggeredAt)
      if (!active.length) return

      // Batch unique symbols
      const symbols = [...new Set(active.map(a => a.symbol))]
      const quotes  = await Promise.allSettled(symbols.map(s => provider.getQuote(s)))
      const priceMap = new Map<string, number>()
      const changeMap = new Map<string, number>()

      quotes.forEach((r, i) => {
        if (r.status === 'fulfilled') {
          priceMap.set(symbols[i], r.value.price)
          changeMap.set(symbols[i], r.value.changePct)
        }
      })

      for (const alert of active) {
        const price  = priceMap.get(alert.symbol)
        const change = changeMap.get(alert.symbol)
        if (price === undefined) continue

        let triggered = false
        switch (alert.condition) {
          case 'above':      triggered = price >= alert.threshold; break
          case 'below':      triggered = price <= alert.threshold; break
          case 'change_up':  triggered = (change ?? 0) >= alert.threshold; break
          case 'change_down': triggered = (change ?? 0) <= -alert.threshold; break
        }

        if (triggered) triggerAlert(alert.id)
      }
    }

    check()
    const id = setInterval(check, 30_000)
    return () => clearInterval(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alerts])
}
