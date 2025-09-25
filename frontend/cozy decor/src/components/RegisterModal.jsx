import React, { useEffect, useState } from 'react'
import api from '../lib/api.js'

function RegisterModal({ open, onClose, initialEmail = '' }) {
  const [email, setEmail] = useState(initialEmail)
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setEmail(initialEmail)
  }, [initialEmail])

  useEffect(() => {
    setMessage('')
    setIsError(false)
  }, [email, password, confirm])

  if (!open) return null

  function handleSubmit(e) {
    e.preventDefault()
    setIsError(false)
    const normalizedEmail = String(email || '').trim().toLowerCase()
    const trimmedPassword = String(password || '').trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!emailRegex.test(normalizedEmail)) {
      setIsError(true)
      setMessage('Enter a valid email address')
      return
    }
    if (trimmedPassword.length < 6) {
      setIsError(true)
      setMessage('Password must be at least 6 characters')
      return
    }
    if (trimmedPassword !== confirm) {
      setIsError(true)
      setMessage('Passwords do not match')
      return
    }
    api
      .register(normalizedEmail, trimmedPassword)
      .then((data) => {
        localStorage.setItem('cozy_token', data.token)
        localStorage.setItem('cozy_current_user', data.user.email)
        window.dispatchEvent(new CustomEvent('auth-signed-in', { detail: data.user.email }))
        onClose?.()
      })
      .catch((e) => {
        setIsError(true)
        setMessage(e.message || 'Registration failed')
      })
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="pointer-events-none absolute inset-0 flex items-start justify-center p-4 sm:p-6">
        <div className="pointer-events-auto w-full max-w-md">
          <div className="relative rounded-xl border bg-white shadow-xl">
            <button
              type="button"
              aria-label="Close register"
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
              onClick={onClose}
            >
              ✕
            </button>
            <div className="p-6">
              <h2 className="text-2xl font-semibold">Create account</h2>
              <p className="mt-1 text-base text-gray-600">Register with your email and password</p>
              <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="reg-email" className="mb-1 block text-base font-medium text-gray-700">Email</label>
                  <input
                    id="reg-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base outline-none focus:border-emerald-600"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="reg-password" className="mb-1 block text-base font-medium text-gray-700">Password</label>
                  <input
                    id="reg-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base outline-none focus:border-emerald-600"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="reg-confirm" className="mb-1 block text-base font-medium text-gray-700">Confirm password</label>
                  <input
                    id="reg-confirm"
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base outline-none focus:border-emerald-600"
                    required
                  />
                </div>
                <button type="submit" className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-base font-medium text-white hover:bg-emerald-700">
                  Create account
                </button>
                {message && (
                  <p className={`text-center text-base ${isError ? 'text-red-600' : 'text-emerald-700'}`}>{message}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterModal



