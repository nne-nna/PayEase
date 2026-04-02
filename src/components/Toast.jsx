import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from "lucide-react"

const Toast = ({ toast, onRemove }) => {
  const styles = {
    success: {
      container: "border-green-200 bg-green-50/95 dark:border-green-800 dark:bg-green-950/95",
      icon: CheckCircle2,
      iconClass: "text-green-600 dark:text-green-400",
      message: "text-green-800 dark:text-green-100",
      bar: "bg-green-500",
    },
    error: {
      container: "border-red-200 bg-red-50/95 dark:border-red-800 dark:bg-red-950/95",
      icon: AlertCircle,
      iconClass: "text-red-600 dark:text-red-400",
      message: "text-red-800 dark:text-red-100",
      bar: "bg-red-500",
    },
    info: {
      container: "border-blue-200 bg-blue-50/95 dark:border-blue-800 dark:bg-blue-950/95",
      icon: Info,
      iconClass: "text-blue-600 dark:text-blue-400",
      message: "text-blue-800 dark:text-blue-100",
      bar: "bg-blue-500",
    },
    warning: {
      container: "border-yellow-200 bg-yellow-50/95 dark:border-yellow-800 dark:bg-yellow-950/95",
      icon: AlertTriangle,
      iconClass: "text-yellow-600 dark:text-yellow-400",
      message: "text-yellow-800 dark:text-yellow-100",
      bar: "bg-yellow-500",
    },
  }

  const style = styles[toast.type] ?? styles.info
  const Icon = style.icon

  return (
    <div
      className={`
        pointer-events-auto relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border p-4
        shadow-xl shadow-slate-950/10 backdrop-blur-sm animate-slide-in
        ${style.container}
      `}
    >
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-white/80 shadow-sm dark:bg-white/5">
        <Icon size={20} className={style.iconClass} />
      </div>

      <div className="min-w-0 flex-1 self-center pr-2">
        <p className={`text-sm font-semibold leading-5 ${style.message}`}>
          {toast.message}
        </p>
      </div>

      <button
        onClick={() => onRemove(toast.id)}
        className="flex h-8 w-8 flex-shrink-0 self-center items-center justify-center rounded-xl text-gray-400 transition hover:bg-black/5 hover:text-gray-600 dark:hover:bg-white/5 dark:hover:text-gray-200"
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>

      <div className={`absolute bottom-0 left-0 h-1 ${style.bar} animate-progress-bar`} />
    </div>
  )
}

export default Toast
