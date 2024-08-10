import { Outlet, useLoaderData } from "react-router-dom";

function App() {
  const userInfo = useLoaderData() as { username: string };
  return <div>
    App root
    <pre>{JSON.stringify(userInfo)}</pre>
    <Outlet />
  </div>
}

export default App
