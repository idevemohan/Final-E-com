import React, { useEffect, useMemo, useRef, useState } from 'react'

const IMAGE_SOURCES = [
  {
    src: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bGFtcHxlbnwwfHwwfHx8MA%3D%3D',
    alt: 'Modern living room furniture with cozy sofa and coffee table',
  },
  {
    src: 'https://images.unsplash.com/photo-1519961655809-34fa156820ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhvbWUlMjBkZWNvcnxlbnwwfHwwfHx8MA%3D%3D',
    alt: 'Home decor accessories and vases on wooden shelf',
  },
  {
    src: 'https://plus.unsplash.com/premium_photo-1681412205156-bb506a4ea970?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Pendant lights and lamps illuminating a dining area',
  },
  {
    src: 'https://plus.unsplash.com/premium_photo-1680351370944-c938d9fc4dad?q=80&w=978&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Scandinavian bedroom with wooden furniture and textiles',
  },
]

function HeroCarousel({ autoPlayMs = 4500 }) {
  const slides = useMemo(() => IMAGE_SOURCES, [])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef(null)
  const touchStartX = useRef(null)
  const touchDeltaX = useRef(0)

  const total = slides.length

  function goTo(index) {
    const next = (index + total) % total
    setCurrentIndex(next)
  }

  function goNext() {
    goTo(currentIndex + 1)
  }

  function goPrev() {
    goTo(currentIndex - 1)
  }

  useEffect(() => {
    if (isHovering) return
    const id = setInterval(() => {
      setCurrentIndex((v) => (v + 1) % total)
    }, autoPlayMs)
    return () => clearInterval(id)
  }, [autoPlayMs, total, isHovering])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [currentIndex])

  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX
    touchDeltaX.current = 0
  }

  function onTouchMove(e) {
    if (touchStartX.current == null) return
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current
  }

  function onTouchEnd() {
    const delta = touchDeltaX.current
    touchStartX.current = null
    touchDeltaX.current = 0
    if (Math.abs(delta) > 40) {
      if (delta < 0) goNext()
      else goPrev()
    }
  }

  return (
    <section
      className="relative w-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-xl border bg-gray-100"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        aria-roledescription="carousel"
      >
        <ul
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((item, idx) => (
            <li key={item.src} className="relative min-w-full">
              <img
                src={item.src}
                alt={item.alt}
                className="h-[40vh] sm:h-[55vh] lg:h-[70vh] w-full object-cover"
                draggable="false"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-8 text-white">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold drop-shadow">Curated Comfort</h2>
                <p className="mt-1 text-base sm:text-lg lg:text-xl opacity-90 drop-shadow">Furniture, decor, and lighting to elevate your home.</p>
              </div>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-900 shadow hover:bg-white"
          onClick={goPrev}
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Next slide"
          className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-900 shadow hover:bg-white"
          onClick={goNext}
        >
          ›
        </button>

        <div className="absolute inset-x-0 bottom-2 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 w-2 rounded-full transition-all ${i === currentIndex ? 'w-4 bg-white' : 'bg-white/60 hover:bg-white/80'}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroCarousel



