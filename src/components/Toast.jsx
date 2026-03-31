const Toast = ({ toast, onRemove }) => {
    const styles = {
        success: {
            container: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800',
            icon: '✅',
            message: 'text-green-700 dark:text-green-400',
            bar: 'bg-green-500',
        },
        error: {
            container: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800',
            icon: '❌',
            message: 'text-red-700 dark:text-red-400',
            bar: 'bg-red-500',
        },
        info: {
            container: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800',
            icon: 'ℹ️',
            message: 'text-blue-700 dark:text-blue-400',
            bar: 'bg-blue-500',
        },
        warning: {
            container: 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800',
            icon: '⚠️',
            message: 'text-yellow-700 dark:text-yellow-400',
            bar: 'bg-yellow-500',
        },
    }

    const style = styles[toast.type]

    return (
        <div className={`
            relative border rounded-xl shadow-lg p-4 flex items-start gap-3
            animate-slide-in overflow-hidden
            ${style.container}
        `}>
            <span className="text-lg flex-shrink-0 mt-0.5">{style.icon}</span>

            <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${style.message}`}>
                    {toast.message}
                </p>
            </div>

            <button
                onClick={() => onRemove(toast.id)}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
            >
                ✕
            </button>

            <div className={`absolute bottom-0 left-0 h-1 ${style.bar} animate-progress-bar`} />
        </div>
    )
}

export default Toast