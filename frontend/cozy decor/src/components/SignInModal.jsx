import React from 'react'
import SignIn from './SignIn.jsx'

function SignInModal({ open, onClose }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="pointer-events-none absolute inset-0 flex items-start justify-center p-4 sm:p-6">
        <div className="pointer-events-auto w-full max-w-md">
          <div className="relative rounded-xl border bg-white shadow-xl">
            <button
              type="button"
              aria-label="Close sign in"
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
              onClick={onClose}
            >
              ✕
            </button>
            <div className="p-6">
              <SignIn />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInModal



