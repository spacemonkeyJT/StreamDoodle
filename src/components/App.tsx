import { Outlet } from "react-router-dom";

function App() {
  console.log(JSON.parse(localStorage.getItem('sb-knnmxxukaxfrhabsstvh-auth-token') ?? '{}'))
  return <div>
    App root
    <Outlet />
  </div>
}

export default App
