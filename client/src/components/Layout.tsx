import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Fecha o menu mobile ao trocar de página
  useEffect(() => setMenuOpen(false), [location.pathname])

  return (
    <div className="app">
      <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>

      <header className="site-header">
        <div className="container site-header__inner">
          <Link to="/" className="brand">
            <span className="brand__logo" aria-hidden="true">B</span>
            Meu Blog
          </Link>

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="menu-principal"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="menu-toggle__bar" />
            <span className="menu-toggle__bar" />
            <span className="menu-toggle__bar" />
          </button>

          <nav id="menu-principal" className={`site-nav ${menuOpen ? 'is-open' : ''}`}>
            <NavLink to="/" end className="site-nav__link">Início</NavLink>
            <NavLink to="/admin" className="site-nav__link">Admin</NavLink>
            <Link to="/posts/new" className="btn btn--primary">Novo post</Link>
          </nav>
        </div>
      </header>

      <main id="conteudo" className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Meu Blog. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
