export default function Input({ label, id, name, value, onChange, placeholder, type = 'text', className = '', ...props }) {
  return (
    <label htmlFor={id} className="block text-sm font-medium text-[#202020]">
      {label && <span className="mb-2 block">{label}</span>}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-md border border-[#d9d0c6] bg-white px-3 py-2.5 text-sm text-[#1f1f1f] outline-none transition focus:border-[#b8aca0] ${className}`}
        {...props}
      />
    </label>
  )
}
