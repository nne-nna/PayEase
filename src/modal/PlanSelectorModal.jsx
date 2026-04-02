import { useState } from 'react'
import { Search, X, Check } from 'lucide-react'

const PlanSelectorModal = ({ isOpen, onClose, onSelect, plans, title, selectedValue }) => {
  const [search, setSearch] = useState('')

  if (!isOpen) return null

  const filtered = plans.filter(plan =>
    plan.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white dark:bg-gray-900 w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl max-h-[85vh] flex flex-col shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
          <h3 className="font-semibold text-gray-800 dark:text-white text-base">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 flex-shrink-0">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search plans..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Plans List */}
        <div className="overflow-y-auto flex-1 px-4 pb-4">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-gray-400 dark:text-gray-600 text-sm">
              No plans found
            </div>
          ) : (
            <div className="space-y-1">
              {filtered.map((plan) => {
                const isSelected = selectedValue === plan.variation_code
                return (
                  <button
                    key={plan.variation_code}
                    onClick={() => {
                      onSelect(plan)
                      onClose()
                      setSearch('')
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition text-left ${
                      isSelected
                        ? 'bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800 border border-transparent'
                    }`}
                  >
                    <div className="flex-1 min-w-0 pr-4">
                      <p className={`text-sm font-medium truncate ${
                        isSelected
                          ? 'text-green-700 dark:text-green-400'
                          : 'text-gray-800 dark:text-white'
                      }`}>
                        {plan.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className={`text-sm font-bold ${
                        isSelected ? 'text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        ₦{parseFloat(plan.variation_amount).toLocaleString()}
                      </span>
                      {isSelected && (
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check size={12} className="text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PlanSelectorModal
