import { useEffect } from 'react'

export const useEventListener = (
  eventType: string,
  listener: (event: Event) => void,
  element: HTMLElement | Document | Window = document
) => {
  useEffect(() => {
    element.addEventListener(eventType, listener)
    return () => {
      element.removeEventListener(eventType, listener)
    }
  }, [eventType, listener, element])
}