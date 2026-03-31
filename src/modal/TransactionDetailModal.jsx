import { getStatusStyle } from "../pages/Transactions";
import { generateReceipt } from "../utils/generateReceipt";

export const TransactionDetailModal = ({ transaction, onClose }) => {
  if (!transaction) return null;

  let details = null;
  try {
    details = transaction.details ? JSON.parse(transaction.details) : null;
  } catch {
    details = null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
          <h3 className="font-semibold text-gray-800 dark:text-white">
            Transaction Details
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Reference
            </span>
            <span className="text-sm font-medium text-gray-800 dark:text-white text-right max-w-48 break-all">
              {transaction.referenceId}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Type
            </span>
            <span className="text-sm font-medium text-gray-800 dark:text-white">
              {transaction.type.replace("_", " ")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Amount
            </span>
            <span className="text-sm font-bold text-gray-800 dark:text-white">
              ₦{transaction.amount.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Status
            </span>
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusStyle(transaction.status)}`}
            >
              {transaction.status}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Date
            </span>
            <span className="text-sm text-gray-800 dark:text-white">
              {new Date(transaction.createdAt).toLocaleString("en-NG")}
            </span>
          </div>

          {/* Extra details for bill payments */}
          {details && (
            <>
              <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">
                  Payment Details
                </p>
                <div className="space-y-3">
                  {details.token && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Token
                      </span>
                      <span className="text-sm font-bold text-green-600 dark:text-green-400">
                        {details.token}
                      </span>
                    </div>
                  )}
                  {details.units && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Units
                      </span>
                      <span className="text-sm font-medium text-gray-800 dark:text-white">
                        {details.units}
                      </span>
                    </div>
                  )}
                  {details.billersCode && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Meter/Account
                      </span>
                      <span className="text-sm font-medium text-gray-800 dark:text-white">
                        {details.billersCode}
                      </span>
                    </div>
                  )}
                  {details.productName && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Product
                      </span>
                      <span className="text-sm font-medium text-gray-800 dark:text-white">
                        {details.productName}
                      </span>
                    </div>
                  )}
                  {details.customerName && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Customer
                      </span>
                      <span className="text-sm font-medium text-gray-800 dark:text-white">
                        {details.customerName}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="p-6 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={() => generateReceipt(transaction)}
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition"
          >
            ⬇️ Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
};
