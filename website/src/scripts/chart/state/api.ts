// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cache = new Map<string, Promise<any>>()

export function apiGet<T>(url: string): Promise<T> {
  const cached = cache.get(url)
  if (cached) {
    return cached
  }

  // https://stackoverflow.com/a/63814972
  const result = fetch(url, {
    method: 'GET',
    credentials: 'include',
    mode: 'no-cors',
  }).then((res) => res.json())
  cache.set(url, result)
  return result
}
