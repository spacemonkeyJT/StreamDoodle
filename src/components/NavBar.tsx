import { Link, useLocation } from "react-router-dom"
import { supabase } from "../utils/supabase"
import { ReactNode, useState } from "react"

async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error(error)
  } else {
    location.href = '/login'
  }
}

function NavItem(props: { children: ReactNode, route: string, onClick?: () => void }) {
  const { pathname } = useLocation()
  return <Link className={`navbar-item ${pathname === props.route ? 'is-active' : ''}`} to={props.route} onClick={props.onClick}>{props.children}</Link>
}

export function NavBar() {
  const [burgerActive, setBurgerActive] = useState(false)
  
  return <>
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img src="logo.png" />
        </Link>

        <a role="button" className={`navbar-burger ${burgerActive ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={() => setBurgerActive(!burgerActive)}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className={`navbar-menu ${burgerActive ? 'is-active' : ''}`}>
        <div className="navbar-start">
          <NavItem route="/channels" onClick={() => setBurgerActive(false)}>Channels</NavItem>
          <NavItem route="/clips" onClick={() => setBurgerActive(false)}>Clips</NavItem>
          <NavItem route="/overlay" onClick={() => setBurgerActive(false)}>Overlay</NavItem>
          <NavItem route="/bot" onClick={() => setBurgerActive(false)}>Bot</NavItem>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <img src="logout.png" className="logout" onClick={logout} title="Log out" />
          </div>
        </div>
      </div>
    </nav>
  </>
}
