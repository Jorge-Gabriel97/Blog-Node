import type { ReactNode } from 'react'

export function Loading({ label = 'Carregando…' }: { label?: string }) {
  return (
    <div className="feedback" role="status">
      <span className="spinner" aria-hidden="true" />
      <p>{label}</p>
    </div>
  )
}

interface MessageProps {
  title: string
  children?: ReactNode
  action?: ReactNode
}

export function ErrorMessage({ title, children, action }: MessageProps) {
  return (
    <div className="feedback feedback--error" role="alert">
      <h2>{title}</h2>
      {children && <p>{children}</p>}
      {action}
    </div>
  )
}

export function EmptyState({ title, children, action }: MessageProps) {
  return (
    <div className="feedback">
      <h2>{title}</h2>
      {children && <p>{children}</p>}
      {action}
    </div>
  )
}
