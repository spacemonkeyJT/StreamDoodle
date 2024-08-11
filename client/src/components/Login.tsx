import { useEffect } from "react";
import { apiLoginTwitch } from "../api";

export default function Login() {
  const redirectUri = `${import.meta.env.VITE_BASE_URL}/login`;
  const clientId = 'f3t4znfgwxi20ksfpksm81hwywz4a9';
  const loginUrl = `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}`;

  useEffect(() => {
    (async () => {
      if (location.hash.startsWith('#access_token')) {
        const access_token = location.hash.substring(1).split('&')[0].split('=')[1];
        if (access_token) {
          const { token } = await apiLoginTwitch(access_token);
          document.cookie = `token=${token}`;
          document.cookie = `access_token=${access_token}`;
          location.href = '/';
        }
      }
    })();
  }, [])

  return <a href={loginUrl}>Login with Twitch</a>
}
