import { useState } from 'react'
import { Link } from 'react-router'
import { api } from '../api'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { EmptyState, ErrorMessage, Loading } from '../components/Feedback'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useFetch } from '../hooks/useFetch'
import type { Post } from '../types'
import { formatDate } from '../utils/format'

export function AdminPage() {
  const { data: posts, error, loading, reload } = useFetch(api.getPosts)
  const [postToDelete, setPostToDelete] = useState<Post | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  useDocumentTitle('Admin')

  async function handleDelete() {
    if (!postToDelete) return
    try {
      await api.deletePost(postToDelete.id)
      setDeleteError(null)
      reload()
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Não foi possível excluir o post.')
    } finally {
      setPostToDelete(null)
    }
  }

  return (
    <div className="container section">
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Painel de administração</h1>
          {posts && <p className="page-header__subtitle">{posts.length} {posts.length === 1 ? 'post publicado' : 'posts publicados'}</p>}
        </div>
        <Link to="/posts/new?from=admin" className="btn btn--primary">+ Novo post</Link>
      </div>

      {deleteError && <p className="alert" role="alert">{deleteError}</p>}

      {loading && !posts && <Loading label="Carregando posts…" />}

      {error && (
        <ErrorMessage
          title="Não foi possível carregar os posts"
          action={<button className="btn btn--primary" onClick={reload}>Tentar novamente</button>}
        >
          {error.message}
        </ErrorMessage>
      )}

      {posts && posts.length === 0 && (
        <EmptyState
          title="Nenhum post cadastrado"
          action={<Link to="/posts/new?from=admin" className="btn btn--primary">Criar o primeiro</Link>}
        />
      )}

      {posts && posts.length > 0 && (
        <div className="card admin-table-wrapper">
          {/* Em telas pequenas, cada linha vira um card (ver .admin-table no CSS) */}
          <table className="admin-table">
            <thead>
              <tr>
                <th scope="col">Título</th>
                <th scope="col">Criado em</th>
                <th scope="col">Atualizado em</th>
                <th scope="col"><span className="sr-only">Ações</span></th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="admin-table__title">
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                  </td>
                  <td data-label="Criado em">
                    <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
                  </td>
                  <td data-label="Atualizado em">
                    <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                  </td>
                  <td className="admin-table__actions">
                    <Link to={`/admin/edit/${post.id}`} className="btn btn--sm btn--ghost">Editar</Link>
                    <button type="button" className="btn btn--sm btn--danger-ghost" onClick={() => setPostToDelete(post)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={postToDelete !== null}
        title="Excluir post?"
        message={`"${postToDelete?.title ?? ''}" será excluído permanentemente.`}
        confirmLabel="Excluir"
        onConfirm={handleDelete}
        onCancel={() => setPostToDelete(null)}
      />
    </div>
  )
}
