async function api(url: string) {
  return await (await fetch(import.meta.env.VITE_API_BASE_URL + url)).json();
}

export async function apiTest() {
  return api('test');
}
