import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { Bell, Menu, Moon, Sun } from "lucide-react";

const Navbar = ({ onMenuClick }) => {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await api.get("/notifications/unread");
        setUnreadCount(response.data.length);
      } catch (err) {
        console.error("Failed to fetch notifications", err);
      }
    };
  }, []);

  return (
    <header
      className="h-16 bg-white dark:bg-gray-900
      border-b border-gray-100 dark:border-gray-800
      flex items-center justify-between
      px-6 sticky top-0 z-30"
    >
      {/* Left — Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
      >
        <Menu size={22} />
      </button>

      {/* Page greeting */}
      <div className="hidden lg:block">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Welcome back,{" "}
          <span className="font-semibold text-gray-800 dark:text-white inline-flex items-center gap-1">
            {user?.firstName}!
            <img
              src="/welcome-emoji.png"
              alt="Welcome"
              className="w-10 h-10 object-contain -ml-3"
            />
          </span>
        </p>
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <button
          onClick={() => navigate("/notifications")}
          className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {/* Avatar */}
        <button
          onClick={() => navigate("/profile")}
          className="w-9 h-9 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center"
        >
          <span className="text-green-600 dark:text-green-400 text-sm font-semibold">
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
          </span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
