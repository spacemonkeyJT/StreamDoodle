
export async function twitchApi(token: string, url: string, opts: FetchRequestInit = {}) {
  const res = await fetch(`https://api.twitch.tv/helix/${url}`, {
    ...opts,
    headers: {
      Authorization: `Bearer ${token}`,
      'Client-Id': 'f3t4znfgwxi20ksfpksm81hwywz4a9',
      ...(opts.headers ?? {}),
    },
  });
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return await res.json();
}

export async function twitchGetCurrentUser(token: string) {
  return (await twitchApi(token, 'users')).data[0];
}
