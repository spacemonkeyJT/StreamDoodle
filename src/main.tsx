import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.less'
import CommandProcessor from './CommandProcessor.ts'
import { twitchAuth } from './twitch.ts'

async function main() {
  const params = new URL(location.href).searchParams;
  const channel = params.get('c') ?? undefined;
  const username = params.get('u') ?? undefined;
  const authToken = params.get('t') ?? undefined;

  twitchAuth.clientID = 'uxj8hdpst8v4lutkr842b3lxz8tp0o';
  twitchAuth.token = 'em91m010b52oxx0d1il2c8v6dgjmw1';
  
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
