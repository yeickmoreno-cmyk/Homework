/** Cliente fetch reutilizable: revisa res.ok y centraliza el manejo de errores. */
export async function getJson<T>(url: string, params: Record<string, string>, signal?: AbortSignal): Promise<T> {
  const res = await fetch(`${url}?${new URLSearchParams(params)}`, {
    signal,
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  return (await res.json()) as T;
}
