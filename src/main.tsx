import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.less'

async function main() {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}

main().catch(console.error);
