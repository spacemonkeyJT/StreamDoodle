import { useEffect, useState } from "react"
import './Login.less'
import { Session } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from "../db"

// async function tryLogin(access_token: string | undefined | null) {
//   if (access_token) {
//     if (!localStorage.getItem('access_token')) {
//       log(`Storing access token: ${access_token}`);
//       localStorage.setItem('access_token', access_token);
//     }
//     try {
//       log(`Attempting to login with access token: ${access_token}`);
//       const { token } = await apiLoginTwitch(access_token);
//       log('Login successful');
//       Cookies.set('token', token);
//       return true;
//     } catch (err) {
//       console.error(err);
//     }
//   }
//   return false;
// }



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

  useEffect(() => {
    (async () => {
      console.log(await supabase.from('users').select())
    })()
  }, [])

  if (!session) {
    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={["twitch"]} onlyThirdPartyProviders />)
  }
  else {
    return (<div>Logged in!</div>)
  }

  // const token = Cookies.get('token');
  // const access_token = localStorage.getItem('access_token');

  // useEffect(() => {
  //   (async () => {
  //     if ((token && access_token) || await tryLogin(getLocationHash().access_token) || await tryLogin(access_token)) {
  //       log('Logged in, navigating to site root');
  //       location.href = '/';
  //     }
  //   })();
  // }, [])

  // return <div className="login">
  //   <h1>streamdoodle</h1>
  //   <a className="login-twitch" href={twitchLoginUrl}>
  //     <img className="logo" src={TwitchLogo} />
  //     <div className="label">Login with Twitch</div>
  //   </a>
  // </div>
}
