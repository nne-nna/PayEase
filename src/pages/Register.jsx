import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useToast from '../hooks/useToast'
import api from '../api/axios'
import { Eye, EyeClosed, HandCoins } from 'lucide-react'
import AuthLeftPanel from '../components/AuthLeftPanel'

const passwordRules = [
  {
    id: 'length',
    label: 'At least 8 characters',
    test: (pwd) => pwd.length >= 8,
  },
  {
    id: 'uppercase',
    label: 'At least one uppercase letter (A-Z)',
    test: (pwd) => /[A-Z]/.test(pwd),
  },
  {
    id: 'lowercase',
    label: 'At least one lowercase letter (a-z)',
    test: (pwd) => /[a-z]/.test(pwd),
  },
  {
    id: 'number',
    label: 'At least one number (0-9)',
    test: (pwd) => /\d/.test(pwd),
  },
  {
    id: 'special',
    label: 'At least one special character (!@#$%^&*)',
    test: (pwd) => /[^A-Za-z\d]/.test(pwd),
  },
]

const PasswordStrengthIndicator = ({ password }) => {
  if (!password) return null

  const passedRules = passwordRules.filter((rule) => rule.test(password))
  const strength = passedRules.length

  const getStrengthLabel = () => {
    if (strength <= 1) return { label: 'Very Weak', color: 'text-red-500' }
    if (strength === 2) return { label: 'Weak', color: 'text-orange-500' }
    if (strength === 3) return { label: 'Fair', color: 'text-yellow-500' }
    if (strength === 4) return { label: 'Strong', color: 'text-blue-500' }
    return { label: 'Very Strong', color: 'text-green-500' }
  }

  const getBarColor = (index) => {
    if (strength <= 1)
      return index === 0 ? 'bg-red-500' : 'bg-gray-200 dark:bg-gray-700'
    if (strength === 2)
      return index < 2 ? 'bg-orange-500' : 'bg-gray-200 dark:bg-gray-700'
    if (strength === 3)
      return index < 3 ? 'bg-yellow-500' : 'bg-gray-200 dark:bg-gray-700'
    if (strength === 4)
      return index < 4 ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'
    return 'bg-green-500'
  }

  const { label, color } = getStrengthLabel()

  return (
    <div className="mt-3 space-y-3">
      <div className="flex items-center gap-2">
        <div className="flex gap-1 flex-1">
          {[0, 1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${getBarColor(index)}`}
            />
          ))}
        </div>
        <span className={`text-xs font-medium ${color}`}>{label}</span>
      </div>

      <div className="space-y-1.5">
        {passwordRules.map((rule) => {
          const passed = rule.test(password)
          return (
            <div key={rule.id} className="flex items-center gap-2">
              <span
                className={`text-xs ${passed ? 'text-green-500' : 'text-gray-400 dark:text-gray-600'}`}
              >
                {passed ? '✅' : '○'}
              </span>
              <span
                className={`text-xs ${passed ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}
              >
                {rule.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const Register = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const toast = useToast()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const allRulesPassed = passwordRules.every((rule) =>
    rule.test(formData.password)
  )

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone &&
      formData.password &&
      formData.confirmPassword &&
      allRulesPassed &&
      formData.password === formData.confirmPassword
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!allRulesPassed) {
      toast.error('Please meet all password requirements')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const { confirmPassword, ...registerData } = formData
      const response = await api.post('/auth/register', registerData)
      const { token, email, firstName, lastName } = response.data

      login({ email, firstName, lastName }, token)
      toast.success(`Welcome to PayEase, ${firstName}! 🎉`)
      setTimeout(() => navigate('/dashboard'), 1500)
    } catch (err) {
      const errorData = err.response?.data
      if (typeof errorData === 'object' && errorData !== null) {
        const firstError = Object.values(errorData)[0]
        toast.error(firstError || 'Registration failed')
      } else {
        toast.error(errorData?.message || 'Registration failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* Left Side — Reusable panel */}
      <AuthLeftPanel />

      {/* Right Side — Register form */}
      <div className="w-full lg:w-1/2 min-h-screen overflow-y-auto flex items-center justify-center p-8 bg-white dark:bg-gray-900">
        <div className="w-full max-w-md py-8">

          {/* Logo — matches Login page */}
          <div className="flex items-center gap-2 mb-8">
            <HandCoins size={32} className="text-green-600" />
            <span className="text-gray-800 dark:text-white font-bold text-xl">
              PayEase
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 flex items-center">
            Create your account!
            <img
              src="/welcome-emoji.png"
              alt="Waving hand"
              className="w-20 h-20 -ml-5 object-contain inline-block"
            />
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
            Fill in your details to get started
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* First Name & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="08012345678"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
                </button>
              </div>
              <PasswordStrengthIndicator password={formData.password} />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  required
                  className={`w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition pr-12
                    ${formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? 'border-red-400 dark:border-red-600'
                      : 'border-gray-200 dark:border-gray-700'
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showConfirmPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
                </button>
              </div>

              {formData.confirmPassword &&
                formData.password !== formData.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1.5">
                    ❌ Passwords do not match
                  </p>
                )}

              {formData.confirmPassword &&
                formData.password === formData.confirmPassword && (
                  <p className="text-green-500 text-xs mt-1.5">
                    ✅ Passwords match
                  </p>
                )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !isFormValid()}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-6">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-green-600 hover:text-green-700 font-semibold"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register