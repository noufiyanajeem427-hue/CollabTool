import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Triangle, Mail, Lock, User, ArrowRight, Check } from 'lucide-react'
import { useAuthStore } from '../store/authStore'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const setUser = useAuthStore((s) => s.setUser)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setUser({ name, email })
      navigate('/dashboard')
    }, 500)
  }

  return (
    <div className="min-h-screen bg-brand-cream flex">
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
            <h2 className="text-4xl xl:text-5xl text-white leading-[1.1] tracking-tight mb-6 max-w-md">
              Everything your team needs.
            </h2>
            <ul className="space-y-3">
              {['Unlimited workspaces', 'Real-time collaboration', 'Advanced task management'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-white/80 text-sm">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-3 text-white/60 text-xs uppercase tracking-[0.2em]">
            <span>Backed by</span>
            <span className="w-8 h-px bg-white/30" />
            <span className="font-playfair text-sm normal-case">Meridian</span>
          </div>
        </div>
      </div>

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
              <p className="text-xs uppercase tracking-[0.25em] text-brand-dark/50 mb-3">Get started</p>
              <h1 className="text-4xl md:text-5xl text-brand-dark tracking-tight leading-[1.05] mb-3">
                Create your account
              </h1>
              <p className="text-brand-dark/60 text-sm">Free forever. No credit card required.</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl mb-5 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { label: 'Full Name', icon: User, value: name, set: setName, type: 'text', ph: 'Your name' },
                { label: 'Email', icon: Mail, value: email, set: setEmail, type: 'email', ph: 'you@example.com' },
                { label: 'Password', icon: Lock, value: password, set: setPassword, type: 'password', ph: 'Min 6 characters' },
              ].map((f) => {
                const Icon = f.icon
                return (
                  <div key={f.label}>
                    <label className="block text-xs uppercase tracking-[0.15em] text-brand-dark/50 mb-2">{f.label}</label>
                    <div className="relative">
                      <Icon className="w-4 h-4 text-brand-dark/40 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type={f.type}
                        value={f.value}
                        onChange={(e) => f.set(e.target.value)}
                        placeholder={f.ph}
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-brand-dark/15 bg-white text-brand-dark placeholder-brand-dark/30 focus:outline-none focus:border-brand-dark/60 transition-all"
                        required
                        minLength={f.type === 'password' ? 6 : undefined}
                      />
                    </div>
                  </div>
                )
              })}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-brand-dark text-white rounded-full hover:bg-brand-green transition-all uppercase tracking-wider text-sm disabled:opacity-60 flex items-center justify-center gap-2 group"
              >
                {loading ? 'Creating...' : (
                  <>Create Account <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-brand-dark/60 mt-8">
              Already have an account?{' '}
              <Link to="/login" className="text-brand-dark font-medium underline underline-offset-4 hover:text-brand-green">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}