import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('cozy_cart')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('cozy_cart', JSON.stringify(items))
    } catch {}
  }, [items])

  function addItem(product, qty = 1) {
    setItems((prev) => {
      const index = prev.findIndex((p) => p.id === product.id)
      if (index >= 0) {
        const updated = [...prev]
        updated[index] = { ...updated[index], qty: updated[index].qty + qty }
        return updated
      }
      const newItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        qty,
      }
      return [...prev, newItem]
    })
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((p) => p.id !== id))
  }

  function clearCart() {
    setItems([])
  }

  const totalItems = useMemo(() => items.reduce((sum, p) => sum + p.qty, 0), [items])
  const totalPrice = useMemo(() => items.reduce((sum, p) => sum + p.qty * p.price, 0), [items])

  const value = { items, addItem, removeItem, clearCart, totalItems, totalPrice }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}



