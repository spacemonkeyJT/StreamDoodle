import { useEffect, useState } from "react"
import '../styles/Login.less'
import { Session } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from "../utils/supabase"

export default function Login() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (
      <div className="login">
        <div className="login-panel panel center">
          <h2>streamdoodle</h2>
          <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={["twitch"]} onlyThirdPartyProviders />
        </div>
      </div>
    )
  }
  else {
    location.href = '/'
    return (<div>Logged in!</div>)
  }
}
