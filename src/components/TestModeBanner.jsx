import { useState } from 'react'
import { Info, ChevronDown, ChevronUp } from 'lucide-react'

const testData = [
  {
    category: '💳 Wallet Funding (Paystack)',
    items: [
      { label: 'Card Number', value: '4084 0840 8408 4081' },
      { label: 'Expiry', value: '01/25' },
      { label: 'CVV', value: '408' },
      { label: 'PIN', value: '0000' },
      { label: 'OTP', value: '123456' },
    ]
  },
  {
    category: '⚡ Electricity',
    items: [
      { label: 'Prepaid meter', value: '1111111111111' },
      { label: 'Postpaid meter', value: '1010101010101' },
    ]
  },
  {
    category: '📱 Airtime & Data',
    items: [
      { label: 'Phone number', value: '08011111111' },
      { label: 'Note', value: 'Select any plan from dropdown' },
    ]
  },
  {
    category: '📺 Cable TV',
    items: [
      { label: 'Smart card', value: '1212121212' },
      { label: 'Note', value: 'Select any package from dropdown' },
    ]
  },
]

const TestModeBanner = () => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-2xl overflow-hidden">

      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 text-left transition-colors duration-300 hover:bg-blue-100/70 dark:hover:bg-blue-900/70"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/70 rounded-lg flex items-center justify-center">
            <Info size={16} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">
              🧪 Test Mode — Use these test credentials
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400">
              This is a demo app. No real money is processed.
            </p>
          </div>
        </div>
        {expanded
          ? <ChevronUp size={16} className="text-blue-500 flex-shrink-0" />
          : <ChevronDown size={16} className="text-blue-500 flex-shrink-0" />
        }
      </button>

      {/* Expandable content */}
      {expanded && (
        <div className="animate-fade-in px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-t border-blue-200 dark:border-blue-800 pt-4">
          {testData.map((section) => (
            <div key={section.category}>
              <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-2">
                {section.category}
              </p>
              <div className="space-y-1.5">
                {section.items.map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-2">
                    <span className="text-xs text-blue-600 dark:text-blue-400">
                      {item.label}
                    </span>
                    <code
                      className="text-xs bg-blue-100 dark:bg-blue-900/70 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded font-mono cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800 transition"
                      onClick={() => {
                        navigator.clipboard.writeText(item.value)
                      }}
                      title="Click to copy"
                    >
                      {item.value}
                    </code>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TestModeBanner
