import { useEffect, useRef } from 'react'

interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  confirmLabel: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({ open, title, message, confirmLabel, onConfirm, onCancel }: ConfirmDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)

  // O <dialog> nativo já cuida do foco, da tecla Esc e do fundo escurecido
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog ref={ref} className="dialog" onClose={onCancel} aria-labelledby="dialog-title">
      <h2 id="dialog-title">{title}</h2>
      <p>{message}</p>
      <div className="dialog__actions">
        <button type="button" className="btn btn--ghost" onClick={onCancel}>Cancelar</button>
        <button type="button" className="btn btn--danger" onClick={onConfirm}>{confirmLabel}</button>
      </div>
    </dialog>
  )
}
