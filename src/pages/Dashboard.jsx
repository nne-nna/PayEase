import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wallet,
  Zap,
  Phone,
  Wifi,
  Tv,
  ArrowUpRight,
  ArrowDownLeft,
  TrendingUp,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import api from "../api/axios";
import useAuth from "../hooks/useAuth";
import useToast from "../hooks/useToast";
import { QuickAction } from "../components/QuickAction";
import { TransactionRow } from "../components/TransactionRow";
import OnboardingTour from "../components/OnboardingTour";

//Tooltip for Chart
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-3 shadow-lg">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
        <p className="text-sm font-semibold text-green-600">
          ₦{payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

// ── Main Dashboard
const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState({
    totalFunded: 0,
    totalSpent: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [walletRes, transactionsRes] = await Promise.all([
        api.get("/wallet/balance"),
        api.get("/transactions"),
      ]);

      const allTransactions = transactionsRes.data;

      setBalance(walletRes.data);
      setTransactions(allTransactions.slice(0, 3));
      generateChartData(allTransactions);
      calculateStats(allTransactions);
    } catch (err) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (allTransactions) => {
    const totalFunded = allTransactions
      .filter((t) => t.type === "WALLET_FUNDING" && t.status === "SUCCESS")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalSpent = allTransactions
      .filter((t) => t.type !== "WALLET_FUNDING" && t.status === "SUCCESS")
      .reduce((sum, t) => sum + t.amount, 0);

    setStats({ totalFunded, totalSpent });
  };

  const generateChartData = (transactions) => {
    const last30Days = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString("en-NG", {
        day: "numeric",
        month: "short",
      });

      const dayTotal = transactions
        .filter((t) => {
          const tDate = new Date(t.createdAt);
          return (
            tDate.toDateString() === date.toDateString() &&
            t.type === "WALLET_FUNDING" &&
            t.status === "SUCCESS"
          );
        })
        .reduce((sum, t) => sum + t.amount, 0);

      last30Days.push({ day: dateStr, amount: dayTotal });
    }
    setChartData(last30Days);
  };

  const totalSpent = transactions
    .filter((t) => t.type !== "WALLET_FUNDING" && t.status === "SUCCESS")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalFunded = transactions
    .filter((t) => t.type === "WALLET_FUNDING" && t.status === "SUCCESS")
    .reduce((sum, t) => sum + t.amount, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500" />
      </div>
    );
  }

  return (
    <>
    <OnboardingTour />
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Here's what's happening with your account today
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Wallet Balance */}
          <div className="wallet-balance-card md:col-span-1 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Wallet size={20} className="text-white" />
              </div>
              <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
                Wallet Balance
              </span>
            </div>
            <p className="text-3xl font-bold mb-1">
              ₦
              {balance?.balance?.toLocaleString("en-NG", {
                minimumFractionDigits: 2,
              }) ?? "0.00"}
            </p>
            <p className="text-green-100 text-sm">
              {balance?.firstName} {balance?.lastName}
            </p>
          </div>

          {/* Total Spent */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center justify-center">
                <ArrowUpRight size={20} className="text-red-500" />
              </div>
              <TrendingUp size={16} className="text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              ₦
              {stats.totalSpent.toLocaleString("en-NG", {
                minimumFractionDigits: 2,
              })}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Total Spent
            </p>
          </div>

          {/* Total Funded */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                <ArrowDownLeft size={20} className="text-green-500" />
              </div>
              <TrendingUp size={16} className="text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              ₦
              {stats.totalFunded.toLocaleString("en-NG", {
                minimumFractionDigits: 2,
              })}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Total Funded
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
          <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <QuickAction
              icon={Wallet}
              label="Fund Wallet"
              color="bg-green-500"
              onClick={() => navigate("/bill-payment?action=fund")}
            />
            <QuickAction
              icon={Zap}
              label="Electricity"
              color="bg-yellow-500"
              onClick={() => navigate("/bill-payment?service=electricity")}
            />
            <QuickAction
              icon={Phone}
              label="Airtime"
              color="bg-blue-500"
              onClick={() => navigate("/bill-payment?service=airtime")}
            />
            <QuickAction
              icon={Tv}
              label="Cable TV"
              color="bg-red-500"
              onClick={() => navigate("/bill-payment?service=cable")}
            />
          </div>
        </div>

        {/* Chart + Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* Chart */}
          <div className="lg:col-span-3 bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 h-fit">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-gray-800 dark:text-white">
                  Wallet Funding
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Last 7 days
                </p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `₦${v}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#22c55e"
                  strokeWidth={2}
                  fill="url(#colorAmount)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Transactions */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-800 dark:text-white">
                Recent Transactions
              </h2>
              <button
                onClick={() => navigate("/transactions")}
                className="text-xs text-green-600 hover:text-green-700 font-medium"
              >
                View all
              </button>
            </div>

            {transactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-center">
                <p className="text-gray-400 dark:text-gray-600 text-sm">
                  No transactions yet
                </p>
                <p className="text-gray-300 dark:text-gray-700 text-xs mt-1">
                  Fund your wallet to get started
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {transactions.map((transaction) => (
                  <TransactionRow
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
