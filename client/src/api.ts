import type { Post, PostInput } from './types'

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`/api${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new ApiError(response.status, body?.error ?? 'Erro ao comunicar com o servidor')
  }

  // 204 No Content não tem corpo
  return (response.status === 204 ? undefined : await response.json()) as T
}

export const api = {
  getPosts: () => request<Post[]>('/posts'),
  getPost: (id: string) => request<Post>(`/posts/${id}`),
  createPost: (data: PostInput) => request<Post>('/posts', { method: 'POST', body: JSON.stringify(data) }),
  updatePost: (id: string, data: PostInput) =>
    request<Post>(`/posts/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deletePost: (id: string) => request<void>(`/posts/${id}`, { method: 'DELETE' }),
}
