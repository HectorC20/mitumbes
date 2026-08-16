/**
 * Capa de servicios: comunicación con el backend de MiTumbes.
 * Expone un cliente HTTP tipado para que la web consuma datos del backend.
 * La URL base se configura con PUBLIC_API_URL (env); si no existe, se usa /api.
 */

const API_BASE = import.meta.env.PUBLIC_API_URL ?? '/api';

export interface ApiOptions {
  timeoutMs?: number;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface RequestOptions extends RequestInit, ApiOptions {}

async function request<T>(path: string, init: RequestOptions = {}): Promise<T> {
  const { timeoutMs = 10_000, ...fetchInit } = init;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...fetchInit,
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new ApiError(`API respondió ${res.status} en ${path}`, res.status);
    }
    if (res.status === 204) return undefined as T;
    return (await res.json()) as T;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw new ApiError(
      err instanceof Error ? err.message : 'Error de red al llamar a la API',
    );
  } finally {
    clearTimeout(timer);
  }
}

export const api = {
  /** GET: `api.get<Item[]>('/items')` */
  get: <T>(path: string, init?: Omit<RequestOptions, 'method' | 'body'>) =>
    request<T>(path, { ...init, method: 'GET' }),

  /** POST con cuerpo JSON: `api.post<Item>('/items', { name })` */
  post: <T>(path: string, body?: unknown, init?: Omit<RequestOptions, 'method' | 'body'>) =>
    request<T>(path, {
      ...init,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...init?.headers },
      body: body === undefined ? undefined : JSON.stringify(body),
    }),

  /** PUT con cuerpo JSON. */
  put: <T>(path: string, body?: unknown, init?: Omit<RequestOptions, 'method' | 'body'>) =>
    request<T>(path, {
      ...init,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...init?.headers },
      body: body === undefined ? undefined : JSON.stringify(body),
    }),

  /** DELETE. */
  delete: <T>(path: string, init?: Omit<RequestOptions, 'method' | 'body'>) =>
    request<T>(path, { ...init, method: 'DELETE' }),
};

/** API_BASE expuesto por si un módulo necesita componer URLs directamente. */
export { API_BASE };
