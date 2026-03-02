import { useRef, useState, useEffect } from 'react'

/** Returns a CSS class name that briefly flashes when `value` changes direction. */
export function useFlash(value: number): 'flash-up' | 'flash-down' | '' {
  const prev = useRef(value)
  const [cls, setCls] = useState<'flash-up' | 'flash-down' | ''>('')

  useEffect(() => {
    if (prev.current === value) return
    setCls(value > prev.current ? 'flash-up' : 'flash-down')
    prev.current = value
    const t = setTimeout(() => setCls(''), 800)
    return () => clearTimeout(t)
  }, [value])

  return cls
}
