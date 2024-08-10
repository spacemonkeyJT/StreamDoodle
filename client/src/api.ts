export const API_URL = import.meta.env.VITE_API_BASE_URL;

async function api(url: string) {
  const apiUrl = `/api/${url}`;
  const res = await fetch(apiUrl);
  if (res.status === 200) {
    return await res.json();
  } else if (res.status === 401) {
    location.href = '/login';
    return null;
  } else {
    throw new Error('Unexpected error');
  }
}

export async function getUserInfo() {
  return api('userinfo');
}
