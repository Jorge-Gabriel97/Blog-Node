export interface Post {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

// Dados enviados ao criar ou editar um post
export type PostInput = Pick<Post, 'title' | 'content'>
