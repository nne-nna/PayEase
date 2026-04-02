export const SuccessModal = ({ result, onClose }) => (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-sm shadow-xl p-6 text-center">
      <div className="w-16 h-16 bg-green-100 dark:bg-green-950 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-3xl">✅</span>
      </div>
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
        Payment Successful!
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
        ₦{result?.amount?.toLocaleString()} payment completed successfully
      </p>

      {result?.token && (
        <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Electricity Token
          </p>
          <p className="text-lg font-bold text-green-600 dark:text-green-400 tracking-wider">
            {result.token}
          </p>
          {result.units && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Units: {result.units}
            </p>
          )}
        </div>
      )}

      <div className="flex justify-between text-sm mb-6">
        <span className="text-gray-500 dark:text-gray-400">Wallet Balance</span>
        <span className="font-semibold text-gray-800 dark:text-white">
          ₦{result?.walletBalanceAfter?.toLocaleString()}
        </span>
      </div>

      <button
        onClick={onClose}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition"
      >
        Done
      </button>
    </div>
  </div>
)
