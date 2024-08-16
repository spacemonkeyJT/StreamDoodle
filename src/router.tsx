import { createBrowserRouter, redirect } from "react-router-dom"
import App from "./components/App"
import ErrorPage from "./components/ErrorPage"
import Login from "./components/Login"
import ChannelsPage from "./components/ChannelsPage"
import { loadRootData } from "./loaders/rootData"
import ClipsPage from "./components/ClipsPage"
import OverlayPage from "./components/OverlayPage"
import BotPage from "./components/BotPage"

export const router = createBrowserRouter([
  {
    id: 'root',
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: loadRootData,
    children: [{
      index: true,
      loader: () => redirect('/channels'),
    }, {
      path: '/channels',
      element: <ChannelsPage />,
    }, {
      path: '/clips',
      element: <ClipsPage />,
    }, {
      path: '/overlay',
      element: <OverlayPage />,
    }, {
      path: '/bot',
      element: <BotPage />,
    }],
  },
  {
    path: '/login',
    element: <Login />,
  },
])
