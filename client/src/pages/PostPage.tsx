import { Link, useParams } from 'react-router'
import { api, ApiError } from '../api'
import { ErrorMessage, Loading } from '../components/Feedback'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useFetch } from '../hooks/useFetch'
import { formatDate, readingTime } from '../utils/format'
import { NotFoundPage } from './NotFoundPage'

export function PostPage() {
  const { id = '' } = useParams()
  const { data: post, error, loading } = useFetch(() => api.getPost(id), [id])
  useDocumentTitle(post?.title)

  if (loading) return <Loading label="Carregando post…" />
  if (error instanceof ApiError && error.status === 404) return <NotFoundPage message="Este post não existe ou foi excluído." />
  if (error || !post) {
    return (
      <div className="container section">
        <ErrorMessage title="Não foi possível carregar o post">{error?.message}</ErrorMessage>
      </div>
    )
  }

  const wasUpdated = post.updatedAt !== post.createdAt

  return (
    <article className="container container--narrow section">
      <Link to="/" className="back-link">← Voltar para os posts</Link>

      <header className="article__header">
        <h1 className="article__title">{post.title}</h1>
        <p className="article__meta">
          Publicado em <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
          {wasUpdated && (
            <> · atualizado em <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time></>
          )}
          <span aria-hidden="true"> · </span>
          {readingTime(post.content)}
        </p>
      </header>

      <div className="article__content">{post.content}</div>

      <footer className="article__footer">
        <Link to={`/admin/edit/${post.id}`} className="btn btn--ghost">Editar post</Link>
      </footer>
    </article>
  )
}
