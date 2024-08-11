async function fetchApi(url: string, opts: FetchRequestInit = {}) {
  const apiUrl = `/api/${url}`;
  const res = await fetch(apiUrl, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    ...opts,
  });
  if (res.status === 200) {
    return await res.json();
  } else if (res.status === 401) {
    location.href = '/login';
    return null;
  } else {
    throw new Error('Unexpected error');
  }
}

export async function apiGetUserInfo() {
  return fetchApi('userinfo');
}

export async function apiLoginTwitch(access_token: string) {
  return await fetchApi('login/twitch', {
    method: 'POST',
    body: JSON.stringify({ access_token }),
  });
}
