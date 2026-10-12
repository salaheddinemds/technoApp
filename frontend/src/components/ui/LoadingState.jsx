export default function LoadingState({ message = 'Chargement...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-10 text-slate-600">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-700" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  )
}
