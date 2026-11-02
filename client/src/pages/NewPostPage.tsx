import { useNavigate, useSearchParams } from 'react-router'
import { api } from '../api'
import { PostForm } from '../components/PostForm'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import type { PostInput } from '../types'

export function NewPostPage() {
  const navigate = useNavigate()
  // Vindo do admin (?from=admin), volta para o admin depois de publicar
  const [searchParams] = useSearchParams()
  const fromAdmin = searchParams.get('from') === 'admin'
  useDocumentTitle('Novo post')

  async function handleSubmit(data: PostInput) {
    const post = await api.createPost(data)
    navigate(fromAdmin ? '/admin' : `/posts/${post.id}`)
  }

  return (
    <div className="container container--narrow section">
      <PostForm
        heading="Novo post"
        submitLabel="Publicar"
        cancelTo={fromAdmin ? '/admin' : '/'}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
