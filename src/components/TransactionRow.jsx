import { ArrowDownLeft, ArrowUpRight, Phone, Tv, Wifi, Zap } from "lucide-react"

export const TransactionRow = ({ transaction }) => {
  const getIcon = () => {
    switch (transaction.type) {
      case 'WALLET_FUNDING': return { icon: ArrowDownLeft, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' }
      case 'ELECTRICITY': return { icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20' }
      case 'AIRTIME': return { icon: Phone, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' }
      case 'DATA': return { icon: Wifi, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' }
      case 'CABLE_TV': return { icon: Tv, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' }
      default: return { icon: ArrowUpRight, color: 'text-gray-500', bg: 'bg-gray-50 dark:bg-gray-800' }
    }
  }

  const { icon: Icon, color, bg } = getIcon()
  const isCredit = transaction.type === 'WALLET_FUNDING'

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const getStatusColor = () => {
    switch (transaction.status) {
      case 'SUCCESS': return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400'
      case 'PENDING': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'FAILED': return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl transition">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${bg}`}>
        <Icon size={18} className={color} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
          {transaction.description}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {formatDate(transaction.createdAt)}
        </p>
      </div>

      <div className="text-right flex-shrink-0">
        <p className={`text-sm font-semibold ${isCredit ? 'text-green-600' : 'text-gray-800 dark:text-white'}`}>
          {isCredit ? '+' : '-'}₦{transaction.amount.toLocaleString()}
        </p>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor()}`}>
          {transaction.status}
        </span>
      </div>
    </div>
  )
}