import React from 'react'
import { useCart } from '../context/CartContext.jsx'

function CartModal({ open, onClose }) {
  const { items, removeItem, totalItems, totalPrice, clearCart } = useCart()
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="pointer-events-none absolute inset-0 flex items-start justify-end p-4 sm:p-6">
        <div className="pointer-events-auto w-full max-w-md">
          <div className="relative rounded-xl border bg-white shadow-xl">
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="text-xl font-semibold">Your Cart ({totalItems})</h3>
              <button className="rounded-md bg-gray-100 px-3 py-1 text-base hover:bg-gray-200" onClick={onClose}>Close</button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-4">
              {items.length === 0 ? (
                <p className="text-base text-gray-600">Your cart is empty.</p>
              ) : (
                <ul className="grid gap-3">
                  {items.map((it) => (
                    <li key={it.id} className="flex items-center gap-3">
                      <img src={it.image} alt={it.title} className="h-16 w-16 rounded object-cover" />
                      <div className="flex-1">
                        <p className="font-medium">{it.title}</p>
                        <p className="text-base text-gray-600">Qty {it.qty} • ₹{it.price}</p>
                      </div>
                      <button className="rounded-md border px-3 py-1 text-base hover:border-emerald-600 hover:text-emerald-700" onClick={() => removeItem(it.id)}>Remove</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="border-t p-4">
              <div className="mb-3 flex items-center justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
              <button
                className="inline-flex w-full items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-base font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                disabled={items.length === 0}
                onClick={() => {
                  alert('Checkout (demo)')
                  clearCart()
                  onClose()
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartModal



