import { Link, Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-slate-200 bg-white">
        <nav
          aria-label="Navigation principale"
          className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6"
        >
          <Link className="text-xl font-bold text-slate-900" to="/">
            technoApp
          </Link>
          <Link
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
            to="/produits"
          >
            Catalogue
          </Link>
        </nav>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-5 text-sm text-slate-500 sm:px-6">
          © technoApp
        </div>
      </footer>
    </div>
  )
}

export default App
