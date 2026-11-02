import { useEffect } from 'react'

// Atualiza o título da aba do navegador: "Página | Meu Blog"
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | Meu Blog` : 'Meu Blog'
  }, [title])
}
