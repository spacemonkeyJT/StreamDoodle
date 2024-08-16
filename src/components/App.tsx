import { Outlet } from "react-router-dom"
import { supabase } from "../db"

async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error(error)
  } else {
    location.href = '/login'
  }
}

function App() {
  console.log(JSON.parse(localStorage.getItem('sb-knnmxxukaxfrhabsstvh-auth-token') ?? '{}'))
  return <div>
    App root
    <button onClick={logout}>Log out</button>
    <Outlet />
  </div>
}

export default App
