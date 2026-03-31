import { createContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const ThemeContext = createContext(null)

const PUBLIC_PATHS = ['/login', '/register', '/forgot-password', '/reset-password']

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  const location = useLocation()
  const isPublicPath = PUBLIC_PATHS.includes(location.pathname)

  useEffect(() => {
    if (isPublicPath) {
      document.documentElement.classList.remove('dark')
      return
    }

    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark, isPublicPath])

  const toggleTheme = () => setIsDark(prev => !prev)

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}