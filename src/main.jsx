import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

/* ── Lenis smooth scroll — initialised once, before React renders ── */
const lenis = new Lenis({
  lerp: 0.1,
  smoothWheel: true,
  syncTouch: false, // mobile uses native touch scroll (already smooth on iOS/Android)
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

export { lenis }

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
