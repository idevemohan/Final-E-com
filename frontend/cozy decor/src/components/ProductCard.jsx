import React from 'react'
import { useCart } from '../context/CartContext.jsx'

function ProductCard({ product }) {
  const { addItem } = useCart()
  return (
    <div className="group overflow-hidden rounded-xl border bg-white">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-md bg-emerald-600 px-2 py-1 text-xs font-semibold text-white">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="line-clamp-1 font-semibold text-gray-900">{product.title}</h3>
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">{product.subtitle}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-semibold text-gray-900">₹{product.price}</span>
          <button onClick={() => addItem(product, 1)} className="inline-flex items-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700">Add to cart</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard


