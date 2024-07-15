export const twitchAuth = {
  clientID: '',
  token: '',
};

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
  const res = await fetch(`https://api.twitch.tv/helix/${url}`, {
    headers: {
      Authorization: `Bearer ${twitchAuth.token}`,
      'Client-Id': twitchAuth.clientID
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
