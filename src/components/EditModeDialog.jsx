import { useId, useState } from 'react'

export function EditModeDialog({
  open,
  labels,
  isConfigured,
  hasError,
  onSubmit,
  onClose,
}) {
  const titleId = useId()
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!open) return null

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    const unlocked = await onSubmit(password)
    setSubmitting(false)
    if (unlocked) setPassword('')
  }

  function handleClose() {
    setPassword('')
    onClose()
  }

  return (
    <div className="edit-dialog-backdrop" onClick={handleClose} role="presentation">
      <div
        className="edit-dialog card"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id={titleId}>{labels.title}</h2>
        {!isConfigured ? (
          <>
            <p>{labels.notConfigured}</p>
            <button className="ghost-button" type="button" onClick={handleClose}>
              {labels.cancel}
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <label className="edit-dialog-label" htmlFor="edit-password">
              {labels.passwordLabel}
            </label>
            <input
              id="edit-password"
              className="edit-dialog-input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={labels.passwordPlaceholder}
              autoComplete="current-password"
              autoFocus
            />
            {hasError && <p className="edit-dialog-error">{labels.wrongPassword}</p>}
            <div className="edit-dialog-actions">
              <button className="ghost-button" type="button" onClick={handleClose}>
                {labels.cancel}
              </button>
              <button className="ghost-button active" type="submit" disabled={submitting || !password}>
                {labels.unlock}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
