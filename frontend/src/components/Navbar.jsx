import { useNavigate } from 'react-router-dom'
import { Triangle, LogOut } from 'lucide-react'
import { useAuthStore } from '../store/authStore'

export default function Navbar() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-brand-dark/10 px-6 lg:px-8 py-3 flex justify-between items-center sticky top-0 z-40">
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 hover:opacity-70 transition-opacity"
      >
        <Triangle className="w-5 h-5 text-brand-dark fill-brand-dark" />
        <span className="text-xl text-brand-dark tracking-tight font-helvetica-neue">
          Palomar
        </span>
      </button>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-brand-dark text-white flex items-center justify-center text-sm font-medium">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <span className="text-sm text-brand-dark/70">{user?.name}</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-sm text-brand-dark/60 hover:text-brand-dark transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </nav>
  )
}
