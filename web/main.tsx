import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import { BrowserRouter } from 'react-router-dom'

import './fonts.css'
import 'virtual:windi.css'

import App from './App'

ReactGA.initialize('G-C7G808C31D')

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
