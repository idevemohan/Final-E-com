import React, { useEffect, useState } from 'react'
import api from '../lib/api.js'

function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setMessage('')
  }, [email, password])

  function onSubmit(e) {
    e.preventDefault()
    setIsError(false)
    const normalizedEmail = String(email || '').trim().toLowerCase()
    const trimmedPassword = String(password || '').trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!normalizedEmail || !trimmedPassword) {
      setIsError(true)
      setMessage('Please enter email and password')
      return
    }
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
    api
      .login(normalizedEmail, trimmedPassword)
      .then((data) => {
        localStorage.setItem('cozy_token', data.token)
        localStorage.setItem('cozy_current_user', data.user.email)
        setMessage('Signed in!')
        window.dispatchEvent(new CustomEvent('auth-signed-in', { detail: data.user.email }))
      })
      .catch((e) => {
        setIsError(true)
        setMessage('No account or incorrect password. Please create one.')
        window.dispatchEvent(new CustomEvent('auth-open-register', { detail: normalizedEmail }))
      })
  }

  return (
    <section id="signin" className="">
      <div className="mx-auto max-w-md">
        <h2 className="text-2xl font-semibold">Sign in</h2>
        <p className="mt-1 text-base text-gray-600">Welcome back to Cozy Decor</p>

        <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
          <div>
            <label htmlFor="email" className="mb-1 block text-base font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base outline-none focus:border-emerald-600"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-base font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base outline-none focus:border-emerald-600 pr-10"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 my-auto text-sm text-gray-600 hover:text-gray-800"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <button type="submit" className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-base font-medium text-white hover:bg-emerald-700">
            Sign in
          </button>
          <button
            type="button"
            className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 hover:border-emerald-600 hover:text-emerald-700"
            onClick={() => window.dispatchEvent(new CustomEvent('auth-open-register', { detail: String(email || '').trim().toLowerCase() }))}
          >
            Create account
          </button>
          {message && (
            <p className={`text-center text-base ${isError ? 'text-red-600' : 'text-emerald-700'}`}>{message}</p>
          )}
        </form>
      </div>
    </section>
  )
}

export default SignIn


