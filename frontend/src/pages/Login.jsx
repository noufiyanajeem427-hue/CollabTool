import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Triangle, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '../store/authStore'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const setUser = useAuthStore((s) => s.setUser)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      if (email && password.length >= 6) {
        setUser({ name: email.split('@')[0], email })
        navigate('/dashboard')
      } else {
        setError('Please enter a valid email and password (min 6 chars)')
        setLoading(false)
      }
    }, 500)
  }

  return (
    <div className="min-h-screen bg-brand-cream flex">
      {/* Left — Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260820_010308_b1636845-4c15-4ab6-b0c9-9a29bfb0c6e3.mp4"
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark/70 via-brand-dark/30 to-transparent" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link to="/" className="inline-flex items-center gap-2 w-fit">
            <Triangle className="w-6 h-6 text-white fill-white" />
            <span className="text-2xl text-white tracking-tight">Palomar</span>
          </Link>

          <div>
            <h2 className="text-4xl xl:text-5xl text-white leading-[1.1] tracking-tight mb-4 max-w-md">
              Plan. Collaborate. Build Better.
            </h2>
            <p className="text-white/70 text-base max-w-md">
              Join thousands of teams shipping faster with Palomar.
            </p>
          </div>

          <div className="flex items-center gap-3 text-white/60 text-xs uppercase tracking-[0.2em]">
            <span>Backed by</span>
            <span className="w-8 h-px bg-white/30" />
            <span className="font-playfair text-sm normal-case tracking-normal">Meridian</span>
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        <div className="lg:hidden px-6 py-5">
          <Link to="/" className="inline-flex items-center gap-2">
            <Triangle className="w-5 h-5 text-brand-dark fill-brand-dark" />
            <span className="text-xl text-brand-dark tracking-tight">Palomar</span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 lg:px-12 py-8">
          <div className="w-full max-w-md animate-fade-up">
            <div className="mb-10">
              <p className="text-xs uppercase tracking-[0.25em] text-brand-dark/50 mb-3">Welcome back</p>
              <h1 className="text-4xl md:text-5xl text-brand-dark tracking-tight leading-[1.05] mb-3">
                Sign in to Palomar
              </h1>
              <p className="text-brand-dark/60 text-sm">Enter your details to access your workspace</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl mb-5 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-brand-dark/50 mb-2">Email</label>
                <div className="relative group">
                  <Mail className="w-4 h-4 text-brand-dark/40 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-brand-dark/15 bg-white text-brand-dark placeholder-brand-dark/30 focus:outline-none focus:border-brand-dark/60 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-brand-dark/50 mb-2">Password</label>
                <div className="relative group">
                  <Lock className="w-4 h-4 text-brand-dark/40 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-11 py-3.5 rounded-xl border border-brand-dark/15 bg-white text-brand-dark placeholder-brand-dark/30 focus:outline-none focus:border-brand-dark/60 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-dark/40 hover:text-brand-dark"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-brand-dark text-white rounded-full hover:bg-brand-green transition-all uppercase tracking-wider text-sm disabled:opacity-60 flex items-center justify-center gap-2 group"
              >
                {loading ? 'Signing in...' : (
                  <>Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-brand-dark/60 mt-8">
              New to Palomar?{' '}
              <Link to="/register" className="text-brand-dark font-medium underline underline-offset-4 hover:text-brand-green transition-colors">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}