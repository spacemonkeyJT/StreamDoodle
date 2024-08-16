export function getLocationHash() {
  const result: { [key: string]: string } = {}
  if (location.hash.startsWith('#')) {
    for (const item of location.hash.substring(1).split('&')) {
      const [key, value] = item.split('=')
      result[key] = value
    }
  }
  return result
}
