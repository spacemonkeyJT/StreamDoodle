import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.less'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './components/ErrorPage';
import Login from './components/Login';
import App from './components/App';
import Home from './components/Home';
import Test from './components/Test';
import { apiGetUserInfo, loadApi } from './api';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: () => loadApi(apiGetUserInfo),
    children: [{
      index: true,
      element: <Home />,
    }, {
      path: 'test',
      element: <Test />,
    }]
  },
  {
    path: '/login',
    element: <Login />,
  }
]);

async function main() {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  )
}

main().catch(console.error);
