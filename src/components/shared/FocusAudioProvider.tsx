'use client'

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export interface FocusTrack {
  id: 'argon' | 'astra'
  titleKey: 'track1Title' | 'track2Title'
  artistKey: 'track1Artist' | 'track2Artist'
  src: string
}

export const FOCUS_TRACKS: FocusTrack[] = [
  {
    id: 'argon',
    titleKey: 'track1Title',
    artistKey: 'track1Artist',
    src: '/audio/focus-1.mp3',
  },
  {
    id: 'astra',
    titleKey: 'track2Title',
    artistKey: 'track2Artist',
    src: '/audio/focus-2.mp3',
  },
]

interface FocusAudioContextValue {
  tracks: FocusTrack[]
  currentTrackIndex: number
  currentTrack: FocusTrack
  isPlaying: boolean
  volume: number
  hasError: boolean
  togglePlay: () => void
  nextTrack: () => void
  prevTrack: () => void
  selectTrack: (index: number) => void
  setVolume: (value: number) => void
}

const FocusAudioContext = createContext<FocusAudioContextValue | null>(null)

const PAUSED_STORAGE_KEY = 'portfolio-audio-paused'
const TRACK_STORAGE_KEY = 'portfolio-audio-track'
const VOLUME_STORAGE_KEY = 'portfolio-audio-volume'

export function FocusAudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const userPausedRef = useRef<boolean>(false)
  const volumeRef = useRef<number>(0.35)
  const currentTrackIndexRef = useRef<number>(0)
  const fadeRafRef = useRef<number | null>(null)
  const detachFirstGestureRef = useRef<(() => void) | null>(null)
  const playbackConfirmedRef = useRef<boolean>(false)
  const playAttemptIdRef = useRef<number>(0)

  const cancelFade = useCallback(() => {
    if (fadeRafRef.current !== null) {
      cancelAnimationFrame(fadeRafRef.current)
      fadeRafRef.current = null
    }
  }, [])

  const fadeInAudio = useCallback(
    (audio: HTMLAudioElement, targetVolume: number, durationMs = 1500) => {
      cancelFade()
      const startTime = performance.now()
      try {
        audio.volume = Math.min(targetVolume, 0.02)
      } catch {
        return
      }
      const step = (now: number) => {
        if (audio.paused) {
          fadeRafRef.current = null
          return
        }
        const progress = Math.min(1, (now - startTime) / durationMs)
        const eased = progress * (2 - progress)
        try {
          audio.volume = Math.max(0, Math.min(1, volumeRef.current * eased))
        } catch {
          fadeRafRef.current = null
          return
        }
        if (progress < 1) {
          fadeRafRef.current = requestAnimationFrame(step)
        } else {
          fadeRafRef.current = null
        }
      }
      fadeRafRef.current = requestAnimationFrame(step)
    },
    [cancelFade]
  )

  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [volume, setVolumeState] = useState<number>(0.35)
  const [hasError, setHasError] = useState<boolean>(false)

  /** Start playback synchronously inside user gestures without racing touchend vs click. */
  const startAudioElement = useCallback(
    (
      audio: HTMLAudioElement,
      callbacks?: {
        isActive?: () => boolean
        onStarted?: () => void
        onUnsupported?: () => void
      }
    ) => {
      const attemptId = ++playAttemptIdRef.current
      try {
        audio.volume = volumeRef.current
      } catch {
        // Ignore read-only volume (e.g. iOS Safari)
      }

      try {
        const playPromise = audio.play()
        if (playPromise && typeof playPromise.then === 'function') {
          playPromise
            .then(() => {
              if (callbacks?.isActive && !callbacks.isActive()) return
              playbackConfirmedRef.current = true
              setHasError(false)
              setIsPlaying(true)
              callbacks?.onStarted?.()
            })
            .catch((err) => {
              if (callbacks?.isActive && !callbacks.isActive()) return
              if (attemptId !== playAttemptIdRef.current || playbackConfirmedRef.current) return
              if (err instanceof DOMException && err.name === 'AbortError') return
              setIsPlaying(false)
              if (err instanceof DOMException && err.name === 'NotSupportedError') {
                setHasError(true)
                callbacks?.onUnsupported?.()
              }
            })
        } else {
          playbackConfirmedRef.current = true
          setHasError(false)
          setIsPlaying(true)
          callbacks?.onStarted?.()
        }
      } catch {
        if (attemptId === playAttemptIdRef.current && !playbackConfirmedRef.current) {
          setIsPlaying(false)
        }
      }
    },
    []
  )

  // Restore saved state, bind initial track source imperatively (avoiding React re-render src resets),
  // attempt immediate playback, and unlock synchronously on first click/touchend/key if autoplay is blocked.
  useEffect(() => {
    let active = true
    let initialTrack = 0
    let initialVolume = 0.35

    try {
      const navEntry = window.performance?.getEntriesByType?.('navigation')?.[0] as
        | PerformanceNavigationTiming
        | undefined
      if (navEntry?.type === 'reload') {
        window.sessionStorage.removeItem(PAUSED_STORAGE_KEY)
        userPausedRef.current = false
      } else {
        const savedPaused = window.sessionStorage.getItem(PAUSED_STORAGE_KEY)
        userPausedRef.current = savedPaused === '1'
      }

      const rawTrack = window.localStorage.getItem(TRACK_STORAGE_KEY)
      if (rawTrack !== null && rawTrack.trim() !== '') {
        const savedTrack = Number(rawTrack)
        if (!Number.isNaN(savedTrack) && savedTrack >= 0 && savedTrack < FOCUS_TRACKS.length) {
          initialTrack = savedTrack
        }
      }

      // Guard against Number(null) === 0 which otherwise mutes audio on first visit / fresh origins
      const rawVolume = window.localStorage.getItem(VOLUME_STORAGE_KEY)
      if (rawVolume !== null && rawVolume.trim() !== '') {
        const savedVolume = Number(rawVolume)
        if (!Number.isNaN(savedVolume) && savedVolume >= 0 && savedVolume <= 1) {
          initialVolume = savedVolume
        }
      }
    } catch {
      // Ignore storage access errors
    }

    currentTrackIndexRef.current = initialTrack
    volumeRef.current = initialVolume
    setCurrentTrackIndex(initialTrack)
    setVolumeState(initialVolume)

    const audioEl = audioRef.current
    if (audioEl) {
      const targetSrc = FOCUS_TRACKS[initialTrack].src
      if (audioEl.getAttribute('src') !== targetSrc) {
        audioEl.setAttribute('src', targetSrc)
      }
      try {
        audioEl.volume = initialVolume
      } catch {
        // Ignore read-only volume (e.g. iOS Safari)
      }
    }

    const gestureController = new AbortController()
    const detachListeners = () => gestureController.abort()
    detachFirstGestureRef.current = detachListeners

    const handleFirstGesture = (e: Event) => {
      if (userPausedRef.current || playbackConfirmedRef.current) {
        detachListeners()
        return
      }
      const target = e.target as Element | null
      if (target?.closest?.('[data-audio-control="true"]')) {
        return
      }

      const audio = audioRef.current
      if (!audio) return

      // Call play() synchronously on touchend AND click until playback promise actually resolves
      // (avoids Chromium/Safari touchend failing after flip of audio.paused causing click to skip & detach).
      startAudioElement(audio, {
        isActive: () => active,
        onStarted: detachListeners,
        onUnsupported: detachListeners,
      })
    }

    window.addEventListener('touchend', handleFirstGesture, {
      capture: true,
      passive: true,
      signal: gestureController.signal,
    })
    window.addEventListener('pointerup', handleFirstGesture, {
      capture: true,
      passive: true,
      signal: gestureController.signal,
    })
    window.addEventListener('click', handleFirstGesture, {
      capture: true,
      passive: true,
      signal: gestureController.signal,
    })
    window.addEventListener('keydown', handleFirstGesture, {
      capture: true,
      passive: true,
      signal: gestureController.signal,
    })

    if (audioEl && !userPausedRef.current) {
      startAudioElement(audioEl, {
        isActive: () => active,
        onStarted: detachListeners,
      })
    }

    return () => {
      active = false
      detachListeners()
      detachFirstGestureRef.current = null
    }
  }, [startAudioElement])

  // Sync volume changes onto the active audio element
  useEffect(() => {
    volumeRef.current = volume
    if (audioRef.current) {
      try {
        audioRef.current.volume = volume
      } catch {
        // Ignore read-only volume
      }
    }
  }, [volume])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (!audio.paused) {
      audio.pause()
      userPausedRef.current = true
      playbackConfirmedRef.current = false
      setIsPlaying(false)
      try {
        window.sessionStorage.setItem(PAUSED_STORAGE_KEY, '1')
      } catch {
        // Ignore storage errors
      }
      return
    }

    userPausedRef.current = false
    detachFirstGestureRef.current?.()
    try {
      window.sessionStorage.setItem(PAUSED_STORAGE_KEY, '0')
    } catch {
      // Ignore storage errors
    }

    const activeTrack = FOCUS_TRACKS[currentTrackIndexRef.current] ?? FOCUS_TRACKS[0]
    if (audio.getAttribute('src') !== activeTrack.src) {
      audio.setAttribute('src', activeTrack.src)
    }

    startAudioElement(audio)
  }, [startAudioElement])

  const selectTrack = useCallback(
    (index: number) => {
      const normalized = ((index % FOCUS_TRACKS.length) + FOCUS_TRACKS.length) % FOCUS_TRACKS.length
      const targetTrack = FOCUS_TRACKS[normalized]
      currentTrackIndexRef.current = normalized
      setCurrentTrackIndex(normalized)
      setHasError(false)
      userPausedRef.current = false
      detachFirstGestureRef.current?.()

      try {
        window.localStorage.setItem(TRACK_STORAGE_KEY, String(normalized))
        window.sessionStorage.setItem(PAUSED_STORAGE_KEY, '0')
      } catch {
        // Ignore storage errors
      }

      const audio = audioRef.current
      if (!audio) return

      cancelFade()
      if (audio.getAttribute('src') !== targetTrack.src) {
        audio.setAttribute('src', targetTrack.src)
      } else {
        audio.currentTime = 0
      }

      startAudioElement(audio)
    },
    [cancelFade, startAudioElement]
  )

  const nextTrack = useCallback(() => {
    selectTrack(currentTrackIndexRef.current + 1)
  }, [selectTrack])

  const prevTrack = useCallback(() => {
    selectTrack(currentTrackIndexRef.current - 1)
  }, [selectTrack])

  useEffect(() => {
    return () => cancelFade()
  }, [cancelFade])

  const setVolume = useCallback(
    (value: number) => {
      cancelFade()
      const clamped = Math.max(0, Math.min(1, value))
      setVolumeState(clamped)
      try {
        window.localStorage.setItem(VOLUME_STORAGE_KEY, String(clamped))
      } catch {
        // Ignore storage errors
      }
    },
    [cancelFade]
  )

  const currentTrack = FOCUS_TRACKS[currentTrackIndex] ?? FOCUS_TRACKS[0]

  return (
    <FocusAudioContext.Provider
      value={{
        tracks: FOCUS_TRACKS,
        currentTrackIndex,
        currentTrack,
        isPlaying,
        volume,
        hasError,
        togglePlay,
        nextTrack,
        prevTrack,
        selectTrack,
        setVolume,
      }}
    >
      <audio
        ref={audioRef}
        preload="auto"
        loop
        onPlaying={() => {
          playbackConfirmedRef.current = true
          detachFirstGestureRef.current?.()
          setIsPlaying(true)
          setHasError(false)
          if (audioRef.current) {
            fadeInAudio(audioRef.current, volumeRef.current)
          }
        }}
        onPause={() => {
          cancelFade()
          playbackConfirmedRef.current = false
          setIsPlaying(false)
        }}
        onError={() => {
          playbackConfirmedRef.current = false
          setIsPlaying(false)
          setHasError(true)
        }}
      />
      {children}
    </FocusAudioContext.Provider>
  )
}

export function useFocusAudio() {
  const ctx = useContext(FocusAudioContext)
  if (!ctx) {
    return {
      tracks: FOCUS_TRACKS,
      currentTrackIndex: 0,
      currentTrack: FOCUS_TRACKS[0],
      isPlaying: false,
      volume: 0.35,
      hasError: false,
      togglePlay: () => {},
      nextTrack: () => {},
      prevTrack: () => {},
      selectTrack: () => {},
      setVolume: () => {},
    } satisfies FocusAudioContextValue
  }
  return ctx
}

/** Calm, slow-breathing 3-bar Apple Music equalizer indicator. */
export function AudioEqualizerBars({
  playing,
  className = '',
}: {
  playing: boolean
  className?: string
}) {
  const prefersReducedMotion = useReducedMotion()

  if (!playing || prefersReducedMotion) {
    return (
      <span
        aria-hidden="true"
        className={`inline-flex items-end gap-[2.5px] h-3 ${className}`}
      >
        <span className={`w-[2px] rounded-full bg-current ${playing ? 'h-2.5 opacity-90' : 'h-1.5 opacity-60'}`} />
        <span className={`w-[2px] rounded-full bg-current ${playing ? 'h-3 opacity-95' : 'h-2.5 opacity-60'}`} />
        <span className={`w-[2px] rounded-full bg-current ${playing ? 'h-2 opacity-85' : 'h-1 opacity-60'}`} />
      </span>
    )
  }

  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-end gap-[2.5px] h-3 ${className}`}
    >
      <motion.span
        className="w-[2px] h-3 rounded-full bg-current origin-bottom"
        animate={{ scaleY: [0.35, 0.9, 0.45, 0.8, 0.35] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        className="w-[2px] h-3 rounded-full bg-current origin-bottom"
        animate={{ scaleY: [0.85, 0.4, 0.95, 0.5, 0.85] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.25 }}
      />
      <motion.span
        className="w-[2px] h-3 rounded-full bg-current origin-bottom"
        animate={{ scaleY: [0.5, 0.95, 0.35, 0.75, 0.5] }}
        transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
    </span>
  )
}
