import './App.css'
import Header from './components/Header.jsx'
import HeroCarousel from './components/HeroCarousel.jsx'
import ProductCard from './components/ProductCard.jsx'
import { useEffect, useMemo, useState } from 'react'
import SignIn from './components/SignIn.jsx'
import SignInModal from './components/SignInModal.jsx'
import RegisterModal from './components/RegisterModal.jsx'
import Footer from './components/Footer.jsx'
import { CartProvider, useCart } from './context/CartContext.jsx'
import CartModal from './components/CartModal.jsx'
import CheckoutModal from './components/CheckoutModal.jsx'
import api from './lib/api.js'

const ALL_PRODUCTS = [
  { id: 1, title: 'Oakwood Lounge Chair', subtitle: 'Solid oak, linen upholstery', price: 12999, image: 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?q=80&w=1200&auto=format&fit=crop', badge: 'New', category: 'Couch' },
  { id: 2, title: 'Minimalist Floor Lamp', subtitle: 'Matte black, warm LED', price: 3499, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop', category: 'Lamps' },
  { id: 3, title: 'Ceramic Vase Set', subtitle: '3-piece neutral tones', price: 1899, image: 'https://plus.unsplash.com/premium_photo-1668704252726-452ce872b349?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGNlcmFtaWMlMjB2YXNlfGVufDB8fDB8fHww', category: 'Home Decor' },
  { id: 4, title: 'Table lamp', subtitle: 'Handcrafted, soft edges', price: 9999, image: 'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGFtcHxlbnwwfHwwfHx8MA%3D%3D', category: 'Home Decor' },
  { id: 5, title: 'Linen Throw Pillow', subtitle: '50x50, sand beige', price: 899, image: 'https://images.unsplash.com/photo-1708936120452-6dffc2a096e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGxpbmVuJTIwdGhyb3clMjBwaWxsb3d8ZW58MHx8MHx8fDA%3D', category: 'Home Decor' },
  { id: 6, title: 'Rattan Pendant Light', subtitle: 'Natural weave, E27', price: 4599, image: 'https://media.istockphoto.com/id/1343756267/photo/four-black-modern-pendant-electric-lamps.webp?a=1&b=1&s=612x612&w=0&k=20&c=cpZKMM_v2xGUrZsL21QYIBi5GjocNf_n1KBE4bLpGNE=', category: 'Lamps' },
  { id: 7, title: 'Bouclé Accent Chair', subtitle: 'Cream boucle, steel legs', price: 11499, image: 'https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTB8fGNoYWlyfGVufDB8fDB8fHww', category: 'Couch' },
  { id: 8, title: 'Abstract Wall Art', subtitle: '60x90 canvas print', price: 2499, image: 'https://plus.unsplash.com/premium_photo-1706561252297-d9b575e9f295?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fGFic3RyYWN0JTIwd2FsbCUyMGFydHxlbnwwfHwwfHx8MA%3D%3D', category: 'Home Decor' },
  { id: 9, title: 'Scandi Sofa 3-Seater', subtitle: 'Performance fabric, oak base', price: 45999, image: 'https://images.unsplash.com/photo-1729470813402-e342d8cba414?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fHNvZmElMjAzJTIwc2VhdGVyfGVufDB8fDB8fHww', category: 'Couch' },
  { id: 10, title: 'Arc Floor Lamp', subtitle: 'Brushed brass, dimmable', price: 5999, image: 'https://plus.unsplash.com/premium_photo-1724094573986-fd3a1af08a12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXJjJTIwZmxvb3IlMjBsYW1wfGVufDB8fDB8fHww', category: 'Lamps' },
  { id: 11, title: 'Stoneware Planter', subtitle: 'Medium, sand finish', price: 1299, image: 'https://images.unsplash.com/photo-1650817324403-b07068f301d3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3RvbmV3YXJlJTIwcGxhbnRlcnxlbnwwfHwwfHx8MA%3D%3D', category: 'Home Decor' },
  { id: 12, title: 'Compact Loveseat', subtitle: 'Bouclé, wood legs', price: 23999, image: 'https://images.unsplash.com/photo-1605365070248-299a182a2ca6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvdWNofGVufDB8fDB8fHww', category: 'Couch' },
]

function AppContent() {
  const [category, setCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [registerEmail, setRegisterEmail] = useState('')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const { totalItems } = useCart()
  const [remoteProducts, setRemoteProducts] = useState(null)
  const filteredProducts = useMemo(() => {
    const source = remoteProducts ?? ALL_PRODUCTS
    let list = category === 'All' ? source : source.filter((p) => p.category === category)
    const q = String(searchQuery || '').trim().toLowerCase()
    if (q) {
      list = list.filter((p) =>
        String(p.title).toLowerCase().includes(q) || String(p.subtitle).toLowerCase().includes(q)
      )
    }
    return list
  }, [category, searchQuery, remoteProducts])

  // React to header category dropdown selections
  useEffect(() => {
    function onSelectCategory(e) {
      const label = e.detail
      const map = {
        'Home Decor': 'Home Decor',
        'Furniture': 'Couch',
        'Lamp': 'Lamps',
        'Wall Art': 'Home Decor',
      }
      const target = map[label] || 'All'
      setCategory(target)
      const el = document.getElementById('products')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    window.addEventListener('select-category', onSelectCategory)
    return () => window.removeEventListener('select-category', onSelectCategory)
  }, [])

  useEffect(() => {
    function onSignedIn() {
      setIsSignInOpen(false)
    }
    window.addEventListener('auth-signed-in', onSignedIn)
    return () => window.removeEventListener('auth-signed-in', onSignedIn)
  }, [])

  useEffect(() => {
    // Load products from backend
    api.products().then(setRemoteProducts).catch(() => setRemoteProducts(null))

    function onPerformSearch(e) {
      const q = String(e.detail || '').toLowerCase()
      if (q) {
        // match by title or subtitle contains query
        setCategory('All')
        setSearchQuery(q)
        const grid = document.getElementById('products')
        if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' })
        // optionally we could add a separate search filter; for now, highlight via category 'All'
      } else {
        setSearchQuery('')
      }
    }
    window.addEventListener('perform-search', onPerformSearch)
    return () => window.removeEventListener('perform-search', onPerformSearch)
  }, [])

  useEffect(() => {
    function onOpenCheckout() {
      setIsCheckoutOpen(true)
    }
    window.addEventListener('open-checkout', onOpenCheckout)
    return () => window.removeEventListener('open-checkout', onOpenCheckout)
  }, [])

  useEffect(() => {
    function onOpenRegister(e) {
      setRegisterEmail(e.detail || '')
      setIsSignInOpen(false)
      setIsRegisterOpen(true)
    }
    window.addEventListener('auth-open-register', onOpenRegister)
    return () => window.removeEventListener('auth-open-register', onOpenRegister)
  }, [])

  function handleSelectCategory(c) {
    setCategory(c)
    setSearchQuery('')
    const grid = document.getElementById('products')
    if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <Header onOpenSignIn={() => setIsSignInOpen(true)} onOpenCart={() => setIsCartOpen(true)} cartCount={totalItems} />
      <main className="mx-auto max-w-7xl px-4 text-xl sm:px-6 lg:px-8 py-8 text-left">
        <HeroCarousel />
        <section id="products" className="mt-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold">Browse Products</h2>
            <div className="inline-flex flex-wrap gap-2 items-center">
              {['All', 'Lamps', 'Couch', 'Home Decor'].map((c) => (
                <button
                  key={c}
                  onClick={() => handleSelectCategory(c)}
                  className={`rounded-full border px-4 py-2 text-base ${category === c ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-gray-300 text-gray-700 hover:border-emerald-600 hover:text-emerald-700'}`}
                >
                  {c}
                </button>
              ))}
              {searchQuery && (
                <button
                  className="ml-2 rounded-full border px-3 py-2 text-base border-gray-300 text-gray-700 hover:border-emerald-600 hover:text-emerald-700"
                  onClick={() => {
                    setSearchQuery('')
                    setCategory('All')
                  }}
                >
                  Clear search
                </button>
              )}
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="rounded-lg border bg-white p-8 text-center text-base text-gray-700">
              No results found. Try another search or category.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      </main>
      <SignInModal open={isSignInOpen} onClose={() => setIsSignInOpen(false)} />
      <RegisterModal open={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} initialEmail={registerEmail} />
      <CartModal open={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <CheckoutModal open={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
      <Footer />
    </>
  )
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  )
}

export default App
