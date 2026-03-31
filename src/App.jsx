import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import BillPayment from "./pages/BillPayment";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import PublicRoute from "./components/PublicRoute";
import Analytics from "./pages/Analytics";

const ProtectedLayout = ({ children }) => (
  <ProtectedRoute>
    <Layout>{children}</Layout>
  </ProtectedRoute>
);

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={
                <PublicRoute><Login /></PublicRoute>
              } />
              <Route path="/register" element={
                <PublicRoute><Register /></PublicRoute>
              } />
              <Route path="/forgot-password" element={
                <PublicRoute><ForgotPassword /></PublicRoute>
              } />
              <Route path="/reset-password" element={
                <PublicRoute><ResetPassword /></PublicRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedLayout><Dashboard /></ProtectedLayout>
              } />
              <Route path="/transactions" element={
                <ProtectedLayout><Transactions /></ProtectedLayout>
              } />
              <Route path="/bill-payment" element={
                <ProtectedLayout><BillPayment /></ProtectedLayout>
              } />
              <Route path="/analytics" element={
                <ProtectedLayout><Analytics /></ProtectedLayout>
              } />
              <Route path="/notifications" element={
                <ProtectedLayout><Notifications /></ProtectedLayout>
              } />
              <Route path="/profile" element={
                <ProtectedLayout><Profile /></ProtectedLayout>
              } />
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ToastProvider>
  )
}

export default App;
