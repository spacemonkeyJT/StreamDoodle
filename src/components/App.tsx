import { Outlet } from "react-router-dom"
import { NavBar } from "./NavBar"
import { useRootData } from "../loaders/rootData"

function App() {
  const { auth } = useRootData()

  if (!auth) {
    location.href = '/login'
  }

  return <>
    <NavBar />
    <Outlet />
  </>
}

export default App
