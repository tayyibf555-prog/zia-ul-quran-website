import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import './App.css'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import EventsPage from './pages/EventsPage'
import Team from './pages/Team'
import Ramadan from './pages/Ramadan'
import ZakatCalculator from './pages/ZakatCalculator'
import ImamPortal from './pages/ImamPortal'
import Resources from './pages/Resources'
import Footer from './components/shared/Footer'
import ChatAssistant from './components/shared/ChatAssistant'
import TopBar from './components/layout/TopBar'
import Preloader from './components/layout/Preloader'
import ScrollToTop from './components/shared/ScrollToTop'

import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <LanguageProvider>
        <ThemeProvider>
          <ScrollToTop />
          <div className="min-h-screen">
            <AnimatePresence mode="wait">
              {loading && <Preloader onComplete={() => setLoading(false)} />}
            </AnimatePresence>

            {!loading && (
              <>
                <TopBar />
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/ramadan" element={<Ramadan />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/events" element={<EventsPage />} />
                  <Route path="/zakat" element={<ZakatCalculator />} />
                  <Route path="/portal" element={<ImamPortal />} />
                  <Route path="/resources" element={<Resources />} />
                </Routes>
                <Footer />
                <ChatAssistant />
              </>
            )}
          </div>
        </ThemeProvider>
      </LanguageProvider>
    </Router >
  )
}

export default App
