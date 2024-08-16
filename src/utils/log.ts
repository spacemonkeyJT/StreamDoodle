export default function log(...args: unknown[]) {
  if (import.meta.env.DEV) {
    console.log(...args)
  }
}
