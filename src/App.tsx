import { Routes, Route } from 'react-router-dom'
import Shell from './components/layout/Shell'
import Dashboard from './pages/Dashboard'
import Exchange from './pages/Exchange'
import StockDetail from './pages/StockDetail'
import News from './pages/News'
import Forex from './pages/Forex'
import Watchlist from './pages/Watchlist'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/"                              element={<Dashboard />} />
        <Route path="/exchange/:id"                  element={<Exchange />} />
        <Route path="/exchange/:exchangeId/stock/:symbol" element={<StockDetail />} />
        <Route path="/news"                          element={<News />} />
        <Route path="/forex"                         element={<Forex />} />
        <Route path="/watchlist"                     element={<Watchlist />} />
        <Route path="*"                              element={<NotFound />} />
      </Routes>
    </Shell>
  )
}
