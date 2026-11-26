'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image, { getImageProps } from 'next/image'

export const PROJECT_IMAGE_QUALITY = 75

export const PROJECT_IMAGE_SIZES = {
  desktopCard: '(max-width: 768px) 90vw, 384px',
  desktopModal: '(max-width: 640px) 92vw, 520px',
  tabletCard: '(max-width: 1024px) 90vw, 420px',
  tabletModal: '(max-width: 640px) 92vw, 512px',
  mobileCard: '(max-width: 640px) 94vw, 480px',
} as const

interface NetworkInformationLike {
  saveData?: boolean
  effectiveType?: string
}

const loadedImageCache = new Set<string>()
const inflightPreloads = new Map<string, HTMLImageElement>()

function getImageCacheKey(src: string, sizes: string): string {
  return `${src}|${sizes}`
}

function shouldSkipPreload(): boolean {
  if (typeof navigator === 'undefined') return true
  const connection = (navigator as Navigator & { connection?: NetworkInformationLike }).connection
  if (!connection) return false
  if (connection.saveData) return true
  return connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g'
}

/**
 * Warms the browser cache with the exact responsive Next.js Image srcSet/sizes
 * used by <ProjectImage>, avoiding duplicate downloads and URL mismatches.
 */
export function preloadProjectImages(
  urls: readonly (string | undefined)[],
  sizes: string
): void {
  if (typeof window === 'undefined' || shouldSkipPreload()) return

  const uniqueUrls = Array.from(new Set(urls.filter((u): u is string => Boolean(u))))

  for (const url of uniqueUrls) {
    const cacheKey = getImageCacheKey(url, sizes)
    if (loadedImageCache.has(cacheKey) || inflightPreloads.has(cacheKey)) continue

    const { props } = getImageProps({
      src: url,
      alt: '',
      fill: true,
      sizes,
      quality: PROJECT_IMAGE_QUALITY,
    })

    const img = new window.Image()
    img.decoding = 'async'
    img.sizes = props.sizes ?? sizes
    if (props.srcSet) {
      img.srcset = props.srcSet
    }

    const markSettled = (loaded: boolean) => {
      if (loaded) {
        loadedImageCache.add(cacheKey)
      }
      inflightPreloads.delete(cacheKey)
    }

    img.onload = () => markSettled(true)
    img.onerror = () => markSettled(false)

    inflightPreloads.set(cacheKey, img)
    img.src = props.src

    if (img.complete && img.naturalWidth > 0) {
      markSettled(true)
    }
  }
}

/**
 * Schedules non-blocking background preloading during browser idle time so
 * initial paint/splash rendering is never slowed down.
 */
export function scheduleProjectImagePreload(
  urls: readonly (string | undefined)[],
  sizes: string,
  delayMs = 1200
): () => void {
  if (typeof window === 'undefined') return () => {}

  let idleHandle: number | null = null
  const timer = window.setTimeout(() => {
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }
    if (typeof win.requestIdleCallback === 'function') {
      idleHandle = win.requestIdleCallback(
        () => preloadProjectImages(urls, sizes),
        { timeout: 2500 }
      )
    } else {
      preloadProjectImages(urls, sizes)
    }
  }, delayMs)

  return () => {
    window.clearTimeout(timer)
    const win = window as Window & { cancelIdleCallback?: (id: number) => void }
    if (idleHandle !== null && typeof win.cancelIdleCallback === 'function') {
      win.cancelIdleCallback(idleHandle)
    }
  }
}

interface ProjectImageProps {
  src?: string
  alt: string
  sizes: string
  priority?: boolean
  tone?: 'dark' | 'light' | 'auto'
  imgClassName?: string
  fallback: React.ReactNode
}

export function ProjectImage({
  src,
  alt,
  sizes,
  priority = false,
  tone = 'auto',
  imgClassName = '',
  fallback,
}: ProjectImageProps) {
  const cacheKey = src ? getImageCacheKey(src, sizes) : ''
  const [isLoaded, setIsLoaded] = useState<boolean>(() =>
    Boolean(cacheKey && loadedImageCache.has(cacheKey))
  )
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    setHasError(false)
    if (!cacheKey) {
      setIsLoaded(false)
      return
    }
    if (loadedImageCache.has(cacheKey)) {
      setIsLoaded(true)
      return
    }
    const el = imgRef.current
    if (el && el.complete && el.naturalWidth > 0) {
      loadedImageCache.add(cacheKey)
      setIsLoaded(true)
      return
    }
    setIsLoaded(false)
  }, [cacheKey])

  if (!src || hasError) {
    return <>{fallback}</>
  }

  const skeletonBaseClass =
    tone === 'dark'
      ? 'bg-slate-800/80'
      : tone === 'light'
        ? 'bg-zinc-200/80'
        : 'bg-zinc-200/80 dark:bg-zinc-800/80'

  const shimmerGradientClass =
    tone === 'dark'
      ? 'from-transparent via-white/[0.14] to-transparent'
      : tone === 'light'
        ? 'from-transparent via-white/75 to-transparent'
        : 'from-transparent via-white/75 dark:via-white/[0.12] to-transparent'

  const spinnerTrackClass =
    tone === 'dark'
      ? 'border-white/20 border-t-white/80'
      : tone === 'light'
        ? 'border-black/15 border-t-black/60'
        : 'border-black/15 border-t-black/60 dark:border-white/20 dark:border-t-white/80'

  const spinnerPillClass =
    tone === 'dark'
      ? 'bg-black/25 border-white/15'
      : tone === 'light'
        ? 'bg-white/70 border-black/10'
        : 'bg-white/70 border-black/10 dark:bg-black/25 dark:border-white/15'

  return (
    <>
      {!isLoaded && (
        <div
          aria-hidden="true"
          className={`absolute inset-0 overflow-hidden flex items-center justify-center ${skeletonBaseClass}`}
        >
          <div
            className={`project-skeleton-shimmer absolute inset-0 bg-gradient-to-r ${shimmerGradientClass}`}
          />
          <div
            className={`relative z-10 w-8 h-8 rounded-full border backdrop-blur-sm flex items-center justify-center ${spinnerPillClass}`}
          >
            <span
              className={`w-4 h-4 rounded-full border-2 animate-spin motion-reduce:animate-none ${spinnerTrackClass}`}
            />
          </div>
        </div>
      )}

      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={PROJECT_IMAGE_QUALITY}
        decoding="async"
        {...(priority ? { priority: true } : { loading: 'eager' })}
        onLoad={() => {
          if (cacheKey) loadedImageCache.add(cacheKey)
          setIsLoaded(true)
        }}
        onError={() => {
          setHasError(true)
          setIsLoaded(true)
        }}
        className={`object-cover transition-[opacity,transform] duration-300 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </>
  )
}
