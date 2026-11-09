import { useEffect } from 'react'

export default function PageMetadata({ title, description }) {
  useEffect(() => {
    document.title = title
    document.querySelector('meta[name="description"]').setAttribute('content', description)
  }, [description, title])

  return null
}
