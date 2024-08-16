export const clientID = 'f3t4znfgwxi20ksfpksm81hwywz4a9';

const redirectUri = `${import.meta.env.VITE_BASE_URL}/login`;
export const twitchLoginUrl = `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${clientID}&redirect_uri=${redirectUri}`;

export type TwitchUser = {
  broadcaster_type: string;
  created_at: string;
  description: string;
  display_name: string;
  id: string;
  login: string;
  offline_image_url: string;
  profile_image_url: string;
  type: string;
  view_count: number;
}

const userCache = new Map<string, TwitchUser>();

/**
 * Makes a call to the Twitch API.
 * @param {string} url The url to call
 * @returns The parsed JSON response.
 */
async function apiCall<T>(url: string) {
  const access_token = 'TODO';
  const res = await fetch(`https://api.twitch.tv/helix/${url}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Client-Id': clientID
    }
  })
  if (res.status >= 400) {
    throw {
      message: `Error during request to ${url}`,
      statusCode: res.status,
    }
  }
  window.localStorage.removeItem('retryauth')
  return await res.json() as T
}

export async function getUserInfo(username: string) {
  if (!userCache.has(username)) {
    const res = await apiCall<{ data: TwitchUser[] }>(`users?login=${username}`);
    userCache.set(username, res.data[0]);
  }
  return userCache.get(username);
}
