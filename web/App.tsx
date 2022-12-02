import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import * as Pages from './pages'
import { Header } from './Header'
import { Footer } from './Footer'

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Pages.Home />} />
        <Route path="/faq" element={<Pages.FAQ />} />
        <Route path="/privacy" element={<Pages.Privacy />} />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
      <Footer />
    </>
  )
}
