import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.less'
import CommandProcessor from './CommandProcessor.ts'

async function main() {
  const params = new URL(location.href).searchParams;
  const channel = params.get('c') ?? undefined;
  const username = params.get('u') ?? undefined;
  const authToken = params.get('t') ?? undefined;

  
  const cp = CommandProcessor.inst = new CommandProcessor(channel, username, authToken);
  await cp.connect();
  
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      {cp.error}
      <App />
    </React.StrictMode>,
  )
}

main().catch(console.error);
