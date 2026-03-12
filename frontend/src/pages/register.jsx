import { useState } from "react"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {registerUserSchema} from "../validation/register.js"
import {authApi as userApi} from "../api/auth.api.js"
import { useNavigate } from 'react-router-dom'
import GoogleButton from "../component/google.button.jsx"

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();
  
  const { register, reset, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
    resolver: zodResolver(registerUserSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      gender: ""
    }
  })

  async function onSubmit(data) {
    try {
      const res = await userApi.register(data);
       reset();
      navigate("/login")
      console.log(res, "Register")
    } catch (error) {
      if (error.response?.data?.message) {
        setError("general", { type: "server", message: error.response.data.message })
      } else {
        setError("general", { type: "server", message: "Failed to register user" })
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h2 className="text-5xl font-bold mb-4 animate-fade-in-up">Join Our Community!</h2>
              <p className="text-xl text-indigo-100 mb-8 animate-fade-in-up-delay">
                Create your account and start connecting with friends instantly
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
                <span className="text-indigo-100">Free to get started, no credit card</span>
              </div>
              <div className="flex items-center space-x-4 p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                <div className="w-10 h-10 bg-blue-500/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-indigo-100">Instant messaging with anyone</span>
              </div>
              <div className="flex items-center space-x-4 p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                <div className="w-10 h-10 bg-purple-500/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-indigo-100">Your data is always secure</span>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
          </div>

          <div className="text-center mb-8 animate-fade-in-up">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-500">Join us today and start chatting</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 animate-fade-in-up-delay">
            {/* Name Input */}
            <div className="floating-input-group">
              <div className="relative">
                <input
                  type='text'
                  {...register("name")}
                  className={`floating-input ${errors.name ? 'input-error' : ''}`}
                  placeholder="Full name"
                />
                <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <label className="floating-label">Full name</label>
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div className="floating-input-group">
              <div className="relative">
                <input
                  type="email"
                  {...register("email")}
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
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
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

            {/* Gender Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Gender</label>
              <div className="radio-group">
                <div className="radio-option">
                  <input
                    type='radio'
                    value="male"
                    id="male"
                    {...register("gender")}
                  />
                  <label htmlFor="male" className="radio-label">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Male
                  </label>
                </div>
                <div className="radio-option">
                  <input
                    type='radio'
                    value="female"
                    id="female"
                    {...register("gender")}
                  />
                  <label htmlFor="female" className="radio-label">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Female
                  </label>
                </div>
                <div className="radio-option">
                  <input
                    type='radio'
                    value="other"
                    id="other"
                    {...register("gender")}
                  />
                  <label htmlFor="other" className="radio-label">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Other
                  </label>
                </div>
              </div>
              {errors.gender && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.gender.message}
                </p>
              )}
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
              type='submit'
              disabled={isSubmitting}
              className="w-full submit-btn bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 px-6 rounded-xl font-semibold transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 divider animate-fade-in-up-delay-2">
            <span>Or sign up with</span>
          </div>

          {/* Google Button */}
          <div className="mt-6 animate-fade-in-up-delay-2">
            <GoogleButton />
          </div>

          {/* Sign In Link */}
          <p className="mt-8 text-center text-gray-600 animate-fade-in-up-delay-2">
            Already have an account?{' '}
            <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register

