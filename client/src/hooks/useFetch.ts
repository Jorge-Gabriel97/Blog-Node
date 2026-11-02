import { useCallback, useEffect, useState } from 'react'
import { ApiError } from '../api'

interface FetchState<T> {
  data: T | null
  error: ApiError | Error | null
  loading: boolean
  reload: () => void
}

// Executa uma busca ao montar o componente (e sempre que `deps` mudar)
export function useFetch<T>(fetcher: () => Promise<T>, deps: unknown[] = []): FetchState<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<ApiError | Error | null>(null)
  const [loading, setLoading] = useState(true)
  const [version, setVersion] = useState(0)

  useEffect(() => {
    let ignore = false
    setLoading(true)
    setError(null)

    fetcher()
      .then((result) => !ignore && setData(result))
      .catch((err: Error) => !ignore && setError(err))
      .finally(() => !ignore && setLoading(false))

    // Evita atualizar o estado de uma busca antiga se o componente mudar antes da resposta
    return () => {
      ignore = true
    }
  }, [...deps, version])

  const reload = useCallback(() => setVersion((v) => v + 1), [])

  return { data, error, loading, reload }
}
