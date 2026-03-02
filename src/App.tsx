import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Shell from './components/layout/Shell'

const Dashboard   = lazy(() => import('./pages/Dashboard'))
const Exchange    = lazy(() => import('./pages/Exchange'))
const StockDetail = lazy(() => import('./pages/StockDetail'))
const News        = lazy(() => import('./pages/News'))
const Forex       = lazy(() => import('./pages/Forex'))
const Watchlist   = lazy(() => import('./pages/Watchlist'))
const Portfolio   = lazy(() => import('./pages/Portfolio'))
const Alerts      = lazy(() => import('./pages/Alerts'))
const Calendar    = lazy(() => import('./pages/Calendar'))
const NotFound    = lazy(() => import('./pages/NotFound'))

function PageLoader() {
  return (
    <div style={{
      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'var(--color-text-muted)', fontSize: 12, fontFamily: 'var(--font-mono)',
    }}>
      Loading…
    </div>
  )
}

export default function App() {
  return (
    <Shell>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"                                    element={<Dashboard />} />
          <Route path="/exchange/:id"                        element={<Exchange />} />
          <Route path="/exchange/:exchangeId/stock/:symbol"  element={<StockDetail />} />
          <Route path="/news"                                element={<News />} />
          <Route path="/forex"                               element={<Forex />} />
          <Route path="/watchlist"                           element={<Watchlist />} />
          <Route path="/portfolio"                           element={<Portfolio />} />
          <Route path="/alerts"                              element={<Alerts />} />
          <Route path="/calendar"                            element={<Calendar />} />
          <Route path="*"                                    element={<NotFound />} />
        </Routes>
      </Suspense>
    </Shell>
  )
}
