import { createContext, useCallback, useState, useMemo } from 'react'
import Toast from '../components/Toast'

export const ToastContext = createContext(null)

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([])

    const addToast = useCallback((message, type = 'info', duration = 4000) => {
        const id = Date.now()
        setToasts(prev => [...prev, { id, message, type }])

        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id))
        }, duration)
    }, [])

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id))
    }, [])

    const toast = useMemo(() => ({
        success: (message) => addToast(message, 'success'),
        error: (message) => addToast(message, 'error'),
        info: (message) => addToast(message, 'info'),
        warning: (message) => addToast(message, 'warning'),
    }), [addToast])

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex w-full flex-col items-center gap-3 px-4 sm:inset-x-auto sm:bottom-auto sm:right-4 sm:top-4 sm:w-auto sm:items-end sm:px-0">
                {toasts.map(t => (
                    <Toast key={t.id} toast={t} onRemove={removeToast} />
                ))}
            </div>
        </ToastContext.Provider>
    )
}
