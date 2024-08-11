import { useEffect } from "react";
import { apiLoginTwitch } from "../api";
import Cookies from 'js-cookie';
import { getLocationHash } from "../utils";
import { twitchLoginUrl } from "../twitch";

async function tryLogin(access_token: string | undefined) {
  if (access_token) {
    Cookies.set('access_token', access_token);
    try {
      const { token } = await apiLoginTwitch(access_token);
      Cookies.set('token', token);
      return true;
    } catch (err) {
      console.error(err);
    }
  }
  return false;
}

export default function Login() {
  const token = Cookies.get('token');
  const access_token = Cookies.get('access_token');

  useEffect(() => {
    (async () => {
      if ((token && access_token) || await tryLogin(getLocationHash().access_token) || await tryLogin(access_token)) {
        location.href = '/';
      } else {
        Cookies.remove('access_token');
      }
    })();
  }, [])

  return <a href={twitchLoginUrl}>Login with Twitch</a>
}
