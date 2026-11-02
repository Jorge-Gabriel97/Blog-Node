const dateFormatter = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })

export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso)).replace(/\./g, '')
}

export function excerpt(text: string, max = 180): string {
  if (text.length <= max) return text
  // Corta no último espaço antes do limite para não quebrar palavras no meio
  const lastSpace = text.lastIndexOf(' ', max)
  return text.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd() + '…'
}

// Considera uma leitura média de 200 palavras por minuto
export function readingTime(text: string): string {
  const words = text.trim().split(/\s+/).length
  return `${Math.max(1, Math.round(words / 200))} min de leitura`
}
