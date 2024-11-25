import { useEffect } from 'react'

export default function useSetTimeout(
  method: () => void,
  time: number,
  deps: any[]
) {
  useEffect(() => {
    const timer: ReturnType<typeof setTimeout> = setTimeout(
      () => method(),
      time
    )
    return () => clearTimeout(timer)
  }, [...deps, method, time])
}
