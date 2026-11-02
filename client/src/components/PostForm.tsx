import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import type { PostInput } from '../types'

interface PostFormProps {
  heading: string
  submitLabel: string
  cancelTo: string
  initialValues?: PostInput
  onSubmit: (data: PostInput) => Promise<void>
}

export function PostForm({ heading, submitLabel, cancelTo, initialValues, onSubmit }: PostFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? '')
  const [content, setContent] = useState(initialValues?.content ?? '')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!title.trim() || !content.trim()) {
      setError('Preencha o título e o conteúdo.')
      return
    }

    setSubmitting(true)
    setError(null)
    try {
      await onSubmit({ title, content })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível salvar o post.')
      setSubmitting(false)
    }
  }

  return (
    <form className="card post-form" onSubmit={handleSubmit} noValidate>
      <h1 className="post-form__heading">{heading}</h1>

      {error && <p className="alert" role="alert">{error}</p>}

      <div className="field">
        <label htmlFor="title">Título</label>
        <input
          id="title"
          type="text"
          value={title}
          maxLength={150}
          placeholder="Um título que chame atenção"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="content">Conteúdo</label>
        <textarea
          id="content"
          value={content}
          placeholder="Escreva seu post aqui…"
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <span className="field__hint">{content.trim() ? content.trim().split(/\s+/).length : 0} palavras</span>
      </div>

      <div className="post-form__actions">
        <Link to={cancelTo} className="btn btn--ghost">Cancelar</Link>
        <button type="submit" className="btn btn--primary" disabled={submitting}>
          {submitting ? 'Salvando…' : submitLabel}
        </button>
      </div>
    </form>
  )
}
