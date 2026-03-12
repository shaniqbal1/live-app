import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { authApi } from "../api/auth.api"
import { useAuth } from "../hooks/use.auth"
import {loginSchema} from "../validation/login.js"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import GoogleButton from "../component/google.button.jsx"

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();
  const { IsAuthenticated, setAccessToken, setUser } = useAuth()
  
  useEffect(() => {
    if (IsAuthenticated) {
      navigate("/dashboard")
    }
  }, [IsAuthenticated, navigate])

  const { register, handleSubmit, reset, formState: { errors, isSubmitting }, setError } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: ""
    }
  })

  async function onSubmit(data) {
    try {
      const res = await authApi.login(data);
      console.log(res, "RESPONSE ")
      setAccessToken(res.data.accessToken)
      setUser(res.data.user)
      reset();
    } catch (error) {
      console.log(error?.message, "Server error")
      console.log(error, "rerroroo")
      
      if (error.response?.data?.message) {
        setError("general", { 
          type: "server", 
          message: error.response.data.message 
        })
      } else if (error.response?.data?.error) {
        setError("general", { 
          type: "server", 
          message: error.response.data.error 
        })
      } else if (error.message) {
        setError("general", { 
          type: "server", 
          message: "Network error. Please try again." 
        })
      } else {
        setError("general", { 
          type: "server", 
          message: "Login failed. Please check your credentials and try again." 
        })
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Container - Animated Background */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Mesh Gradient Background */}
        <div className="absolute inset-0 bg-mesh-gradient">
          {/* Floating Chat Bubbles */}
          <div className="absolute top-20 left-20 w-20 h-20 bg-indigo-500/30 rounded-2xl chat-bubble flex items-center justify-center backdrop-blur-sm">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          
          <div className="absolute top-40 right-32 w-16 h-16 bg-pink-500/30 rounded-full chat-bubble-delayed backdrop-blur-sm flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          
          <div className="absolute bottom-32 left-32 w-24 h-24 bg-purple-500/30 rounded-2xl rotate-12 chat-bubble flex items-center justify-center backdrop-blur-sm">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
          </div>
          
          <div className="absolute bottom-40 right-20 w-14 h-14 bg-blue-500/30 rounded-full chat-bubble-delayed backdrop-blur-sm flex items-center justify-center">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          
          <div className="absolute top-1/2 left-10 w-12 h-12 bg-cyan-500/30 rounded-lg animate-float backdrop-blur-sm flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          
          {/* Floating shapes */}
          <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full animate-float-slow backdrop-blur-sm"></div>
          <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-full animate-float-delayed backdrop-blur-sm"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex items-center justify-center w-full">
          <div className="text-center text-white p-12 max-w-lg">
            {/* Logo */}
            <div className="mb-8 animate-fade-in-up">
              <div className="w-20 h-20 mx-auto mb-6 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h2 className="text-5xl font-bold mb-4 animate-fade-in-up">Welcome Back!</h2>
              <p className="text-xl text-indigo-100 mb-8 animate-fade-in-up-delay">
                Sign in to continue your conversations with friends and family
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4 text-left animate-fade-in-up-delay-2">
              <div className="flex items-center space-x-4 p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                <div className="w-10 h-10 bg-green-500/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-indigo-100">End-to-end encrypted messages</span>
              </div>
              <div className="flex items-center space-x-4 p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                <div className="w-10 h-10 bg-blue-500/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-indigo-100">Real-time chat experience</span>
              </div>
              <div className="flex items-center space-x-4 p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                <div className="w-10 h-10 bg-purple-500/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-indigo-100">Share photos, videos & more</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Container - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
          </div>

          <div className="text-center mb-8 animate-fade-in-up">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Sign In</h1>
            <p className="text-gray-500">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 animate-fade-in-up-delay">
            {/* Email Input */}
            <div className="floating-input-group">
              <div className="relative">
                <input
                  {...register('email')}
                  type='email'
                  className={`floating-input ${errors.email ? 'input-error' : ''}`}
                  placeholder="Email address"
                />
                <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <label className="floating-label">Email address</label>
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="floating-input-group">
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? "text" : "password"}
                  className={`floating-input pr-12 ${errors.password ? 'input-error' : ''}`}
                  placeholder="Password"
                />
                <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <label className="floating-label">Password</label>
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <a href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Server Error Display */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-2 error-shake">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">{errors.general.message}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full submit-btn bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 px-6 rounded-xl font-semibold transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 divider animate-fade-in-up-delay-2">
            <span>Or continue with</span>
          </div>

          {/* Google Button */}
          <div className="mt-6 animate-fade-in-up-delay-2">
            <GoogleButton />
          </div>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-gray-600 animate-fade-in-up-delay-2">
            Don't have an account?{' '}
            <a href="/register" className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
              Sign up free
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

