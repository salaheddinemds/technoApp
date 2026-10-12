function buttonStyles(variant = 'primary') {
  const variants = {
    primary: 'bg-[#ef3b2d] text-white hover:bg-[#d9311d]',
    secondary: 'bg-white text-[#1f1f1f] hover:bg-[#f0f0f0]',
    tertiary: 'bg-[#f5cc2b] text-[#1b1b1b] hover:bg-[#e7bb1d]',
    dark: 'bg-[#1e1e1e] text-white hover:bg-[#111111]',
  }

  return variants[variant] ?? variants.primary
}

export default function Button({ children, variant = 'primary', className = '', type = 'button', ...props }) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-bold uppercase tracking-[0.02em] transition focus:outline-none ${buttonStyles(variant)} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
