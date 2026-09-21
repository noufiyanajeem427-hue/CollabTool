import { Search, Bell, ChevronDown } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useLocation } from 'react-router-dom'

export default function Topbar() {
  const user = useAuthStore((s) => s.user)
  const location = useLocation()

  const getTitle = () => {
    const p = location.pathname
    if (p.includes('dashboard')) return 'Dashboard'
    if (p.includes('workspaces')) return 'Workspaces'
    if (p.includes('board')) return 'Sprint 1 Planning'
    if (p.includes('backlog')) return 'Backlog'
    if (p.includes('team-chat')) return 'Team Chat'
    if (p.includes('reports')) return 'Reports'
    return 'Dashboard'
  }

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between flex-shrink-0">
      {/* Left — Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-slate-400">Collab 2</span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-900 font-medium">{getTitle()}</span>
      </div>

      {/* Center — Search */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="w-full relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Global Search"
            className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
          <Bell className="w-4 h-4 text-slate-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="flex items-center gap-2 pl-3 border-l border-slate-200 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white text-sm font-medium">
            {user?.name?.[0]?.toUpperCase() || 'A'}
          </div>
          <div className="hidden md:block">
            <p className="text-sm text-slate-900 font-medium leading-tight">
              {user?.name || 'Alex'}
            </p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>
    </header>
  )
}