import React from 'react'

function Footer() {
  return (
    <footer className="mt-16 border-t bg-white/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-emerald-600" />
              <span className="text-xl font-semibold">Cozy Decor</span>
            </div>
            <p className="mt-3 text-base text-gray-600">Furniture, decor, and lighting curated for comfort and style.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Shop</h3>
            <ul className="mt-3 space-y-2 text-base text-gray-700">
              <li><a href="#" className="hover:text-emerald-700">New Arrivals</a></li>
              <li><a href="#" className="hover:text-emerald-700">Best Sellers</a></li>
              <li><a href="#" className="hover:text-emerald-700">Sale</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Categories</h3>
            <ul className="mt-3 space-y-2 text-base text-gray-700">
              <li><a href="#products" className="hover:text-emerald-700">Home Decor</a></li>
              <li><a href="#products" className="hover:text-emerald-700">Furniture</a></li>
              <li><a href="#products" className="hover:text-emerald-700">Lamp</a></li>
              <li><a href="#products" className="hover:text-emerald-700">Wall Art</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="mt-3 space-y-2 text-base text-gray-700">
              <li>Email: support@cozydecor.example</li>
              <li>Phone: +91 98765 43210</li>
              <li>Hours: Mon–Sat, 9am–7pm</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t pt-6 text-center text-base text-gray-600">
          © {new Date().getFullYear()} Cozy Decor. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer



