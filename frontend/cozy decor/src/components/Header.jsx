import React, { useState } from 'react'

function Header({ onOpenSignIn, onOpenCart, cartCount = 0 }) {
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
   const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
   const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false)

   function selectCategory(categoryLabel) {
     const event = new CustomEvent('select-category', { detail: categoryLabel })
     window.dispatchEvent(event)
     setIsCategoriesOpen(false)
     setIsMobileMenuOpen(false)
     setIsMobileCategoriesOpen(false)
   }
  return (
    <header className="sticky top-0 z-30 w-full mt-2 text-xl border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 ">
      <div className="mx-auto max-w-[90%] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand */}
          <div  className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-3xl font-semibold tracking-tight">Cozy Decor</span>
          </div>

          {/* Search */}
          <form
            className="hidden md:flex flex-1 items-center max-w-xl mx-4"
            onSubmit={(e) => {
              e.preventDefault()
              const data = new FormData(e.currentTarget)
              const q = String(data.get('q') || '').trim()
              window.dispatchEvent(new CustomEvent('perform-search', { detail: q }))
            }}
          >
            <label htmlFor="site-search" className="sr-only">Search</label>
            <div className="relative flex w-full">
              <input
                id="site-search"
                name="q"
                type="text"
                placeholder="Search furniture, decor, brands..."
                className="w-full rounded-l-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-600"
              />
              <button
                type="submit"
                className="rounded-r-md bg-emerald-600 px-4 py-2 text-xl font-medium text-white hover:bg-emerald-700"
              >
                Search
              </button>
            </div>
          </form>

           {/* Mobile menu toggle */}
           <button
             type="button"
             className="md:hidden inline-flex items-center justify-center rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:border-emerald-600 hover:text-emerald-700"
             aria-expanded={isMobileMenuOpen}
             aria-controls="mobile-menu"
             onClick={() => setIsMobileMenuOpen((v) => !v)}
           >
             {isMobileMenuOpen ? '✕' : '☰'}
           </button>

         {/* Nav actions */}
         <nav className="hidden md:flex items-center text-xl gap-2 sm:gap-4">
           <a href="#home" className="hidden sm:inline-block  font-medium text-gray-700 hover:text-emerald-700">Home</a>
           <div
             className="relative hidden sm:block"
             onMouseEnter={() => setIsCategoriesOpen(true)}
             onMouseLeave={() => setIsCategoriesOpen(false)}
           >
             <button
               type="button"
               className="inline-flex items-center gap-1 font-medium text-gray-700 hover:text-emerald-700"
               onClick={() => setIsCategoriesOpen((v) => !v)}
               aria-haspopup="menu"
               aria-expanded={isCategoriesOpen}
             >
               Categories <span className="text-base">▾</span>
             </button>
                {isCategoriesOpen && (
               <div className="absolute left-0 z-50 mt-2 w-56 overflow-hidden rounded-md border bg-white shadow-lg">
                 <ul className="py-2 text-base text-gray-700">
                   <li><button className="w-full px-4 py-2 text-left hover:bg-emerald-50" onClick={() => selectCategory('Home Decor')}>Home Decor</button></li>
                   <li><button className="w-full px-4 py-2 text-left hover:bg-emerald-50" onClick={() => selectCategory('Furniture')}>Furniture</button></li>
                   <li><button className="w-full px-4 py-2 text-left hover:bg-emerald-50" onClick={() => selectCategory('Lamp')}>Lamp</button></li>
                   <li><button className="w-full px-4 py-2 text-left hover:bg-emerald-50" onClick={() => selectCategory('Wall Art')}>Wall Art</button></li>
                 </ul>
               </div>
             )}
           </div>
            <button onClick={onOpenCart} className="relative inline-flex text-xl items-center rounded-md border border-emerald-300 px-3 py-2 font-medium text-gray-700 hover:border-emerald-600 hover:text-emerald-700">
              <span className="mr-2 text-xl">🛒</span>
              Cart
              <span className="ml-2 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-emerald-600 px-1 text-xs text-white">{cartCount}</span>
            </button>
            <button onClick={onOpenSignIn} className="inline-flex items-center rounded-md bg-emerald-600 px-3 py-2 text-xl font-medium text-white hover:bg-emerald-800">Sign in</button>
          </nav>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-3">
          <form className="flex items-center" onSubmit={(e) => {
            e.preventDefault()
            const data = new FormData(e.currentTarget)
            const q = String(data.get('q') || '').trim()
            window.dispatchEvent(new CustomEvent('perform-search', { detail: q }))
            setIsMobileMenuOpen(false)
          }}>
            <label htmlFor="site-search-mobile" className="sr-only">Search</label>
            <div className="relative flex w-full">
              <input
                id="site-search-mobile"
                name="q"
                type="text"
                placeholder="Search furniture, decor, brands..."
                className="w-full rounded-l-md border border-gray-300 bg-white px-3 py-2  outline-none focus:border-emerald-600"
              />
              <button
                type="submit"
                className="rounded-r-md bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700"
              >
                Search
              </button>
            </div>
          </form>
        </div>

         {/* Mobile nav */}
         {isMobileMenuOpen && (
           <div id="mobile-menu" className="md:hidden pb-4">
            <nav className="grid gap-2">
               <a href="#home" className="w-full rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700">Home</a>
              <div className="w-full">
                <button
                  type="button"
                  className="w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                  onClick={() => setIsMobileCategoriesOpen((v) => !v)}
                  aria-expanded={isMobileCategoriesOpen}
                >
                  Categories {isMobileCategoriesOpen ? '▴' : '▾'}
                </button>
                {isMobileCategoriesOpen && (
                  <div className="mt-1 ml-2 grid gap-1">
                    <button className="w-full rounded-md px-3 py-2 text-left text-base text-gray-700 hover:bg-emerald-50 hover:text-emerald-700" onClick={() => selectCategory('Home Decor')}>Home Decor</button>
                    <button className="w-full rounded-md px-3 py-2 text-left text-base text-gray-700 hover:bg-emerald-50 hover:text-emerald-700" onClick={() => selectCategory('Furniture')}>Furniture</button>
                    <button className="w-full rounded-md px-3 py-2 text-left text-base text-gray-700 hover:bg-emerald-50 hover:text-emerald-700" onClick={() => selectCategory('Lamp')}>Lamp</button>
                    <button className="w-full rounded-md px-3 py-2 text-left text-base text-gray-700 hover:bg-emerald-50 hover:text-emerald-700" onClick={() => selectCategory('Wall Art')}>Wall Art</button>
                  </div>
                )}
              </div>
                <button onClick={onOpenCart} className="w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700">Cart</button>
               <button onClick={onOpenSignIn} className="w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700">Sign in</button>
             </nav>
           </div>
         )}
      </div>
    </header>
  )
}

export default Header


