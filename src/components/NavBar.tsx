import { Link, useLocation } from "react-router-dom"
import { supabase } from "../utils/supabase"
import '../styles/NavBar.less'

async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error(error)
  } else {
    location.href = '/login'
  }
}

function NavItem(props: { label: string, route: string }) {
  const { pathname } = useLocation()
  return <Link className={`navitem ${pathname === props.route ? 'selected' : ''}`} to={props.route}>{props.label}</Link>
}

export function NavBar() {
  return (
    <div className="navbar">
      <div className="navitems">
        <NavItem label="Channels" route="/channels" />
        <NavItem label="Clips" route="/clips" />
        <NavItem label="Overlay" route="/overlay" />
        <NavItem label="Bot" route="/bot" />
      </div>
      <img src="logout.png" className="logout" onClick={logout} title="Log out" />
    </div>
  )
}
