import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { getAssetUrl } from './assets/index.js'

const logoUrl = getAssetUrl('Betwo tech logo.jpg')
if (logoUrl) {
  const link = document.querySelector('link[rel="icon"]')
  if (link) link.href = logoUrl
  const ogImage = document.querySelector('meta[property="og:image"]')
  if (ogImage) ogImage.content = logoUrl
  const twitterImage = document.querySelector('meta[name="twitter:image"]')
  if (twitterImage) twitterImage.content = logoUrl
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
