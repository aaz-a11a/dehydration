import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './modules/App'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import { store } from './store'
// PWA auto update registration (vite-plugin-pwa)
// eslint-disable-next-line import/no-unresolved
import { registerSW } from 'virtual:pwa-register'

// регистрируем сервис-воркер для PWA (если поддерживается)
try { registerSW({ immediate: true }) } catch {}

const container = document.getElementById('root')!
const root = createRoot(container)
const useHash = (import.meta as any).env?.VITE_USE_HASH_ROUTER === 'true'
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {useHash ? (
        <HashRouter>
          <App />
        </HashRouter>
      ) : (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <App />
        </BrowserRouter>
      )}
    </Provider>
  </React.StrictMode>
)
