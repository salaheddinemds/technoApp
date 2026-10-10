import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route
            index
            element={
              <section className="py-12 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  Bienvenue sur technoApp
                </h1>
                <p className="mt-3 text-slate-600">
                  Votre catalogue de produits tech.
                </p>
              </section>
            }
          />
          <Route
            path="produits"
            element={
              <h1 className="text-2xl font-bold text-slate-900">Catalogue</h1>
            }
          />
          <Route
            path="*"
            element={
              <section className="py-12 text-center">
                <h1 className="text-2xl font-bold text-slate-900">
                  Page introuvable
                </h1>
                <p className="mt-3 text-slate-600">
                  Cette page n’existe pas.
                </p>
              </section>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
