import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import * as Pages from './pages'
import Header from './Header'
import Footer from './Footer'

const App: React.FC = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<Pages.Home />} />
      <Route path="/faq" element={<Pages.FAQ />} />
      <Route path="/privacy" element={<Pages.Privacy />} />
      <Navigate to="/" replace={true} /> 
    </Routes>
    <Footer />
  </>
)

export default App
