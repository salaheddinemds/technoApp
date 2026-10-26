import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import CatalogPage from './pages/client/CatalogPage.jsx'
import ContactPage from './pages/client/ContactPage.jsx'
import HomePage from './pages/client/HomePage.jsx'
import ProductDetailPage from './pages/client/ProductDetailPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="produits" element={<CatalogPage />} />
          <Route path="produits/:slug" element={<ProductDetailPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route
            path="*"
            element={
              <div className="rounded-[18px] border border-[#d7d0c5] bg-[#f5f2ee] p-5 text-center sm:p-10">
                <h1 className="text-5xl font-black uppercase text-[#ef3b2d]">404</h1>
                <p className="mt-4 text-xl font-bold text-[#1b1b1b] sm:text-2xl">Oups, cette page n’existe pas</p>
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
