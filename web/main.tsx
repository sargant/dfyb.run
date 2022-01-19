import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga4'
import { BrowserRouter } from 'react-router-dom'

import './fonts.css'
import 'virtual:windi.css'

import App from './App'

ReactGA.initialize('G-8LZWV2LRNQ')

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
