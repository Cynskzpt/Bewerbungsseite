import { useCallback, useState } from 'react'
import {
  isEditPasswordConfigured,
  isEditSessionActive,
  lockEditSession,
  unlockEditSession,
  verifyEditPassword,
} from '../utils/editModeAuth'

export function useEditModeAuth() {
  const [isOwnerMode, setIsOwnerMode] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(() => isEditSessionActive())
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [passwordError, setPasswordError] = useState('')

  const lock = useCallback(() => {
    lockEditSession()
    setIsUnlocked(false)
    setIsOwnerMode(false)
    setShowPasswordDialog(false)
    setPasswordError('')
  }, [])

  const toggleEditMode = useCallback(() => {
    if (!isEditPasswordConfigured) {
      setShowPasswordDialog(true)
      setPasswordError('')
      return
    }

    if (isOwnerMode) {
      setIsOwnerMode(false)
      return
    }

    if (isUnlocked) {
      setIsOwnerMode(true)
      return
    }

    setPasswordError('')
    setShowPasswordDialog(true)
  }, [isOwnerMode, isUnlocked])

  const submitPassword = useCallback(async (password) => {
    if (!isEditPasswordConfigured) return false

    const valid = await verifyEditPassword(password)
    if (!valid) {
      setPasswordError('wrong')
      return false
    }

    unlockEditSession()
    setIsUnlocked(true)
    setIsOwnerMode(true)
    setShowPasswordDialog(false)
    setPasswordError('')
    return true
  }, [])

  const closePasswordDialog = useCallback(() => {
    setShowPasswordDialog(false)
    setPasswordError('')
  }, [])

  return {
    isOwnerMode,
    isUnlocked,
    isConfigured: isEditPasswordConfigured,
    showPasswordDialog,
    passwordError,
    toggleEditMode,
    submitPassword,
    closePasswordDialog,
    lock,
  }
}
