import { useEffect, useRef } from 'react'

export function HeroPortrait({ src, alt }) {
  const portraitRef = useRef(null)

  useEffect(() => {
    const portrait = portraitRef.current
    if (!portrait) return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionQuery.matches) return

    let frameId = 0

    const updateParallax = () => {
      const rect = portrait.getBoundingClientRect()
      const centerY = rect.top + rect.height / 2
      const offset = (centerY - window.innerHeight * 0.42) * 0.16
      portrait.style.setProperty('--parallax-y', `${offset.toFixed(1)}px`)
    }

    const onScroll = () => {
      if (frameId) return
      frameId = window.requestAnimationFrame(() => {
        frameId = 0
        updateParallax()
      })
    }

    updateParallax()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frameId) window.cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <figure ref={portraitRef} className="hero-portrait">
      <div className="hero-portrait-float">
        <div className="hero-portrait-backdrop" aria-hidden="true" />
        <div className="hero-portrait-ring" aria-hidden="true" />
        <img src={src} alt={alt} width={280} height={360} loading="eager" decoding="async" />
      </div>
    </figure>
  )
}
