import { useState, useEffect } from 'react'
import {
  Zap,
  Phone,
  Wifi,
  Tv,
  ArrowDownLeft,
  ArrowUpRight,
  Search,
  Filter,
} from 'lucide-react'
import api from '../api/axios'
import useToast from '../hooks/useToast'
import { TransactionDetailModal } from '../modal/TransactionDetailModal'

const typeFilters = [
  { label: 'All', value: '' },
  { label: 'Wallet Funding', value: 'WALLET_FUNDING' },
  { label: 'Electricity', value: 'ELECTRICITY' },
  { label: 'Airtime', value: 'AIRTIME' },
  { label: 'Data', value: 'DATA' },
  { label: 'Cable TV', value: 'CABLE_TV' },
]

const getTransactionIcon = (type) => {
  switch (type) {
    case 'WALLET_FUNDING': return { icon: ArrowDownLeft, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' }
    case 'ELECTRICITY': return { icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20' }
    case 'AIRTIME': return { icon: Phone, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' }
    case 'DATA': return { icon: Wifi, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' }
    case 'CABLE_TV': return { icon: Tv, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' }
    default: return { icon: ArrowUpRight, color: 'text-gray-500', bg: 'bg-gray-50 dark:bg-gray-800' }
  }
}

export const getStatusStyle = (status) => {
  switch (status) {
    case 'SUCCESS': return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400'
    case 'PENDING': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400'
    case 'FAILED': return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400'
    default: return 'text-gray-600 bg-gray-50'
  }
}

const Transactions = () => {
  const toast = useToast()
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('')
  const [search, setSearch] = useState('')
  const [selectedTransaction, setSelectedTransaction] = useState(null)

  useEffect(() => {
    fetchTransactions()
  }, [activeFilter])

  const fetchTransactions = async () => {
    setLoading(true)
    try {
      const url = activeFilter
        ? `/transactions/filter?type=${activeFilter}`
        : '/transactions'
      const response = await api.get(url)
      setTransactions(response.data)
    } catch (err) {
      toast.error('Failed to load transactions')
    } finally {
      setLoading(false)
    }
  }

  const filteredTransactions = transactions.filter((t) =>
    t.description?.toLowerCase().includes(search.toLowerCase()) ||
    t.referenceId?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Transactions
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Your complete payment history
        </p>
      </div>

      {/* Search + Filter */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 space-y-4">

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Type Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {typeFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                activeFilter === filter.value
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-center p-6">
            <p className="text-gray-400 dark:text-gray-600 text-sm">
              No transactions found
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50 dark:divide-gray-800">
            {filteredTransactions.map((transaction) => {
              const { icon: Icon, color, bg } = getTransactionIcon(transaction.type)
              const isCredit = transaction.type === 'WALLET_FUNDING'

              return (
                <div
                  key={transaction.id}
                  onClick={() => setSelectedTransaction(transaction)}
                  className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${bg}`}>
                    <Icon size={18} className={color} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(transaction.createdAt).toLocaleDateString('en-NG', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </p>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className={`text-sm font-semibold ${isCredit ? 'text-green-600' : 'text-gray-800 dark:text-white'}`}>
                      {isCredit ? '+' : '-'}₦{transaction.amount.toLocaleString()}
                    </p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusStyle(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <TransactionDetailModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  )
}

export default Transactions