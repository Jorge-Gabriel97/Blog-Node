import { Link } from 'react-router'
import type { Post } from '../types'
import { excerpt, formatDate, readingTime } from '../utils/format'

interface PostCardProps {
  post: Post
  featured?: boolean
}

export function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <article className={`post-card ${featured ? 'post-card--featured' : ''}`}>
      {featured && <span className="badge">Mais recente</span>}
      <h3 className="post-card__title">
        {/* O link cobre o card inteiro via CSS (::after) */}
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h3>
      <p className="post-card__meta">
        <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
        <span aria-hidden="true">·</span>
        {readingTime(post.content)}
      </p>
      <p className="post-card__excerpt">{excerpt(post.content, featured ? 320 : 160)}</p>
      <span className="post-card__more" aria-hidden="true">Ler mais →</span>
    </article>
  )
}
