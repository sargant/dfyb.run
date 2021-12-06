import React from 'react'
import { Route, Routes } from 'react-router-dom'

import * as Pages from '@/web/pages'
import Header from '@/web/Header'

const App: React.FC = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<Pages.Home />} />
      <Route path="/faq" element={<Pages.FAQ />} />
      <Route path="/privacy" element={<Pages.Privacy />} />
    </Routes>
  </>
)

export default App
