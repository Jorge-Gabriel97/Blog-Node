import { Link } from 'react-router'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function NotFoundPage({ message = 'A página que você procurou não existe.' }: { message?: string }) {
  useDocumentTitle('Página não encontrada')

  return (
    <div className="container section not-found">
      <p className="not-found__code">404</p>
      <h1>Nada por aqui</h1>
      <p>{message}</p>
      <Link to="/" className="btn btn--primary">Voltar para o início</Link>
    </div>
  )
}
