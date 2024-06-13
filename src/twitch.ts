/**
 * Makes a call to the Twitch API.
 * @param {string} url The url to call
 * @param {string} token The API token
 * @returns The parsed JSON response.
 */
async function apiCall<T>(url: string, clientID: string, token: string) {
  const res = await fetch(`https://api.twitch.tv/helix/${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
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
