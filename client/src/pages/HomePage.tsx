import { Link } from 'react-router'
import { api } from '../api'
import { EmptyState, ErrorMessage, Loading } from '../components/Feedback'
import { PostCard } from '../components/PostCard'
import { useFetch } from '../hooks/useFetch'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function HomePage() {
  const { data: posts, error, loading, reload } = useFetch(api.getPosts)
  useDocumentTitle()

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1 className="hero__title">Ideias, estudos e anotações sobre desenvolvimento</h1>
          <p className="hero__subtitle">Um espaço para registrar o que estou aprendendo e construindo.</p>
        </div>
      </section>

      <div className="container section">
        <h2 className="section__title">Últimos posts</h2>

        {loading && <Loading label="Carregando posts…" />}

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
            title="Nenhum post publicado ainda"
            action={<Link to="/posts/new" className="btn btn--primary">Escrever o primeiro</Link>}
          >
            Que tal começar agora?
          </EmptyState>
        )}

        {posts && posts.length > 0 && (
          <div className="post-grid">
            {posts.map((post, index) => (
              <PostCard key={post.id} post={post} featured={index === 0} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
