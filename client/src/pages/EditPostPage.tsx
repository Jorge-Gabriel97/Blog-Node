import { useNavigate, useParams } from 'react-router'
import { api, ApiError } from '../api'
import { ErrorMessage, Loading } from '../components/Feedback'
import { PostForm } from '../components/PostForm'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useFetch } from '../hooks/useFetch'
import type { PostInput } from '../types'
import { NotFoundPage } from './NotFoundPage'

export function EditPostPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { data: post, error, loading } = useFetch(() => api.getPost(id), [id])
  useDocumentTitle('Editar post')

  async function handleSubmit(data: PostInput) {
    await api.updatePost(id, data)
    navigate('/admin')
  }

  if (loading) return <Loading label="Carregando post…" />
  if (error instanceof ApiError && error.status === 404) return <NotFoundPage message="Este post não existe ou foi excluído." />
  if (error || !post) {
    return (
      <div className="container section">
        <ErrorMessage title="Não foi possível carregar o post">{error?.message}</ErrorMessage>
      </div>
    )
  }

  return (
    <div className="container container--narrow section">
      <PostForm
        heading="Editar post"
        submitLabel="Salvar alterações"
        cancelTo="/admin"
        initialValues={{ title: post.title, content: post.content }}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
