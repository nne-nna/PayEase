import { useEffect } from 'react'

const PublicRoute = ({ children }) => {
  useEffect(() => {
    // Force remove dark class on public pages
    document.documentElement.classList.remove('dark')
    return () => {
      // Restore theme preference when leaving public page
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark')
      }
    }
  }, [])

  return children
}

export default PublicRoute