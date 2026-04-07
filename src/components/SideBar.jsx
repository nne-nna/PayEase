import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Wallet,
  Receipt,
  Bell,
  User,
  LogOut,
  HandCoins,
  Zap,
  BarChart2,
} from 'lucide-react'
import useAuth from '../hooks/useAuth'
import useToast from '../hooks/useToast'

const navItems = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
  },
  {
    label: 'Bill Payment',
    icon: Zap,
    path: '/bill-payment',
  },
  {
    label: 'Analytics',
    icon: BarChart2,
    path: '/analytics',
  },
  {
    label: 'Transactions',
    icon: Receipt,
    path: '/transactions',
  },
  {
    label: 'Notifications',
    icon: Bell,
    path: '/notifications',
  },
  {
    label: 'Profile',
    icon: User,
    path: '/profile',
  },
]

// Added isOpen and onClose props
const SideBar = ({ isOpen, onClose }) => {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/login')
    onClose() // Closes sidebar on logout
  }

  return (
    <aside className={`
      fixed inset-y-0 left-0 h-[100dvh] max-h-[100dvh] w-64 z-40
      bg-white dark:bg-gray-900
      border-r border-gray-100 dark:border-gray-800
      flex flex-col
      shadow-2xl shadow-slate-950/10 dark:shadow-black/40
      transform-gpu will-change-transform
      transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
      ${isOpen ? 'translate-x-0' : '-translate-x-[105%]'}
      ${isOpen ? 'pointer-events-auto' : 'pointer-events-none lg:pointer-events-auto'}
      lg:translate-x-0
      lg:shadow-none
    `}>
      {/* Logo */}
      <div className="flex items-center gap-2 p-5 border-gray-100 dark:border-gray-800">
        <HandCoins size={28} className="text-green-600" />
        <span className="text-gray-800 dark:text-white font-bold text-lg">
          PayEase
        </span>
      </div>

      {/* Nav Items */}
      <nav className="min-h-0 flex-1 overflow-y-auto p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose} // Closes sidebar when a link is clicked on mobile
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
              ${isActive
                ? 'bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400 font-semibold'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-white'
              }
            `}
          >
            <item.icon size={20} />
            <span className="text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Info & Logout */}
      <div className="shrink-0 border-t border-gray-100 p-4 dark:border-gray-800">
        {/* User info */}
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-8 h-8 bg-green-100 dark:bg-green-950 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-green-600 dark:text-green-400 text-sm font-semibold">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user?.email}
            </p>
          </div>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default SideBar
