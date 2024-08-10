import { API_URL } from "../api";

export default function Login() {
  const redirectUri = `${API_URL}login/twitch`;
  const clientId = 'f3t4znfgwxi20ksfpksm81hwywz4a9';
  const loginUrl = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

  return <a href={loginUrl}>Login with Twitch</a>
}