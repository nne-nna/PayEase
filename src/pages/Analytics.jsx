import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { Zap, Phone, Wifi, Tv, TrendingUp, TrendingDown } from "lucide-react";
import api from "../api/axios";
import useToast from "../hooks/useToast";

const COLORS = {
  ELECTRICITY: "#eab308",
  AIRTIME: "#3b82f6",
  DATA: "#a855f7",
  CABLE_TV: "#ef4444",
  WALLET_FUNDING: "#22c55e",
};

const ICONS = {
  ELECTRICITY: Zap,
  AIRTIME: Phone,
  DATA: Wifi,
  CABLE_TV: Tv,
};

const Analytics = () => {
  const toast = useToast();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await api.get("/transactions");
      setTransactions(response.data.filter((t) => t.status === "SUCCESS"));
    } catch {
      toast.error("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  // Spending by category
  const spendingByCategory = ["ELECTRICITY", "AIRTIME", "DATA", "CABLE_TV"]
    .map((type) => {
      const total = transactions
        .filter((t) => t.type === type)
        .reduce((sum, t) => sum + t.amount, 0);
      return { name: type.replace("_", " "), value: total, type };
    })
    .filter((item) => item.value > 0);

  // Monthly spending (last 6 months)
  const monthlyData = () => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthStr = date.toLocaleDateString("en-NG", {
        month: "short",
        year: "2-digit",
      });

      const spent = transactions
        .filter((t) => {
          const tDate = new Date(t.createdAt);
          return (
            tDate.getMonth() === date.getMonth() &&
            tDate.getFullYear() === date.getFullYear() &&
            t.type !== "WALLET_FUNDING"
          );
        })
        .reduce((sum, t) => sum + t.amount, 0);

      const funded = transactions
        .filter((t) => {
          const tDate = new Date(t.createdAt);
          return (
            tDate.getMonth() === date.getMonth() &&
            tDate.getFullYear() === date.getFullYear() &&
            t.type === "WALLET_FUNDING"
          );
        })
        .reduce((sum, t) => sum + t.amount, 0);

      months.push({ month: monthStr, spent, funded });
    }
    return months;
  };

  const totalSpent = transactions
    .filter((t) => t.type !== "WALLET_FUNDING")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalFunded = transactions
    .filter((t) => t.type === "WALLET_FUNDING")
    .reduce((sum, t) => sum + t.amount, 0);

  const mostUsedService =
    spendingByCategory.length > 0
      ? spendingByCategory.reduce((a, b) => (a.value > b.value ? a : b))
      : null;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-3 shadow-lg">
          <p className="text-sm font-semibold text-gray-800 dark:text-white">
            {payload[0].name}
          </p>
          <p className="text-sm text-green-600">
            ₦{payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Analytics
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Your spending insights and patterns
        </p>
      </div>

      {/* Transaction Count by Category */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
        <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-4">
          Transaction Count by Service
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["ELECTRICITY", "AIRTIME", "DATA", "CABLE_TV"].map((type) => {
            const Icon = ICONS[type];
            const count = transactions.filter((t) => t.type === type).length;
            const amount = transactions
              .filter((t) => t.type === type)
              .reduce((sum, t) => sum + t.amount, 0);
            return (
              <div
                key={type}
                className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2"
                  style={{ backgroundColor: `${COLORS[type]}20` }}
                >
                  <Icon size={18} style={{ color: COLORS[type] }} />
                </div>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                  {count}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {type.replace("_", " ")}
                </p>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mt-1">
                  ₦{amount.toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
          <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-6">
            Spending by Category
          </h2>
          {spendingByCategory.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-gray-400 dark:text-gray-600">
              No spending data yet
            </div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={spendingByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {spendingByCategory.map((entry) => (
                      <Cell key={entry.type} fill={COLORS[entry.type]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>

              {/* Legend */}
              <div className="space-y-2 mt-4">
                {spendingByCategory.map((item) => {
                  const Icon = ICONS[item.type];
                  const percentage =
                    totalSpent > 0
                      ? ((item.value / totalSpent) * 100).toFixed(1)
                      : 0;
                  return (
                    <div
                      key={item.type}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: COLORS[item.type] }}
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {item.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-gray-800 dark:text-white">
                          ₦{item.value.toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-400 dark:text-gray-600 ml-2">
                          {percentage}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
          <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-6">
            Monthly Overview
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₦${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                dataKey="funded"
                name="Funded"
                fill="#22c55e"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="spent"
                name="Spent"
                fill="#ef4444"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Spent
            </p>
            <TrendingUp size={16} className="text-red-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">
            ₦{totalSpent.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Funded
            </p>
            <TrendingDown size={16} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">
            ₦{totalFunded.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Most Used Service
            </p>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">
            {mostUsedService ? mostUsedService.name : "N/A"}
          </p>
          {mostUsedService && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              ₦{mostUsedService.value.toLocaleString()} spent
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
