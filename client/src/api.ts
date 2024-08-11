import Cookies from 'js-cookie';

export class HttpError extends Error {
  constructor(message: string, public status: number, public statusText: string) {
    super(message);
    this.name = 'HttpError';
  }
}

async function fetchApi<T>(url: string, opts: FetchRequestInit = {}) {
  const apiUrl = `/api/${url}`;
  const res = await fetch(apiUrl, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    ...opts,
  });
  if (res.status === 200) {
    return (await res.json()) as T;
  } else {
    throw new HttpError(`Error during request to ${apiUrl}`, res.status, res.statusText)
  }
}

export async function loadApi<T>(action: (() => Promise<T>)) {
  try {
    return await action();
  } catch (err) {
    handleApiError(err);
  }
  return null;
}

export function handleApiError(err: unknown) {
  if (err instanceof HttpError) {
    if (err.status === 401) {
      Cookies.remove('token');
    }
    location.href = '/login';
  }
}

export async function apiGetUserInfo() {
  return fetchApi<{ ok: true }>('userinfo');
}

export async function apiLoginTwitch(access_token: string) {
  return await fetchApi<{ token: string }>('login/twitch', {
    method: 'POST',
    body: JSON.stringify({ access_token }),
  });
}
