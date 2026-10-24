function normalizeCategoryName(name) {
  return name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

export default function CategoryIcon({ name }) {
  const category = normalizeCategoryName(name)

  let icon
  switch (category) {
    case 'scolaire':
      icon = (
        <>
          <path d="M4 4h12a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3z" />
          <path d="M8 8h7" />
        </>
      )
      break
    case 'loisirs creatifs':
      icon = <polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 9" />
      break
    case 'beaux arts':
      icon = <path d="M4 20l1-4 11-11 3 3-11 11z" />
      break
    case 'bureautique & informatique':
      icon = (
        <>
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <path d="M8 21h8M12 16v5" />
        </>
      )
      break
    case 'bricolage':
      icon = (
        <>
          <path d="M4 20l9-9" />
          <path d="M13 11l3-3 4 4-3 3z" />
          <path d="M9 7l3-3 5 5" />
        </>
      )
      break
    case 'ecriture & coloriage':
      icon = (
        <>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
        </>
      )
      break
    case 'technique':
      icon = (
        <>
          <path d="M3 15l12-12 6 6-12 12z" />
          <path d="M8 10l2 2M11 7l2 2M5 13l2 2" />
        </>
      )
      break
    case 'equipement hotel & magasin':
      icon = (
        <>
          <path d="M21 8l-9-5-9 5v8l9 5 9-5z" />
          <path d="M3 8l9 5 9-5M12 13v8" />
        </>
      )
      break
    default:
      icon = (
        <>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </>
      )
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7"
    >
      {icon}
    </svg>
  )
}
