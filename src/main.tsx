import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.less'
import { RouterProvider } from "react-router-dom"
import { router } from './router'

async function main() {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  )
}

main().catch(console.error)
