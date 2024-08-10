export const API_URL = import.meta.env.VITE_API_BASE_URL;

async function api(url: string) {
  return await (await fetch(API_URL + url)).json();
}

export async function apiTest() {
  return api('test');
}
