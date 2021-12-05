import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import { BrowserRouter } from 'react-router-dom'

import 'react-tippy/dist/tippy.css'
import './fonts.css'
import './virtual:windi.css'

import App from 'src/App'

ReactGA.initialize('G-C7G808C31D')

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
