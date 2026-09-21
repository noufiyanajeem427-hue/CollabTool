import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  FolderKanban,
  ListTodo,
  MessageSquare,
  BarChart3,
  Settings,
  HelpCircle,
  Plus,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  Sparkles,
} from 'lucide-react'

const NAV_MAIN = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Workspaces', icon: FolderKanban, path: '/workspaces' },
  { label: 'Backlog', icon: ListTodo, path: '/backlog' },
  { label: 'Sprint Board', icon: FolderKanban, path: '/board/board1' },
  { label: 'Team Chat', icon: MessageSquare, path: '/team-chat', badge: 3 },
  { label: 'Reports', icon: BarChart3, path: '/reports' },
]

const NAV_BOTTOM = [
  { label: 'Settings', icon: Settings, path: '#settings' },
  { label: 'Help', icon: HelpCircle, path: '#help' },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <aside
      className={`${
        collapsed ? 'w-[72px]' : 'w-64'
      } bg-navy-900 text-white flex flex-col transition-all duration-300 flex-shrink-0`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-white/5">
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-lg font-medium tracking-tight">CollabFlow</span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center mx-auto">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
        )}
      </div>

      {/* Workspace Switcher */}
      {!collapsed && (
        <div className="px-4 py-4 border-b border-white/5">
          <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-teal-500 flex items-center justify-center text-xs font-medium">
                C
              </div>
              <span className="text-sm">Collab 2</span>
            </div>
            <ChevronDown className="w-4 h-4 text-white/50" />
          </button>
        </div>
      )}

      {/* Main Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {!collapsed && (
          <p className="px-3 mb-3 text-[10px] uppercase tracking-[0.2em] text-white/30">
            Workspaces
          </p>
        )}
        <ul className="space-y-1">
          {NAV_MAIN.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <li key={item.label}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    active
                      ? 'bg-teal-500/15 text-teal-400'
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  } ${collapsed ? 'justify-center' : ''}`}
                  title={collapsed ? item.label : ''}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="text-sm flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <span className="bg-teal-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-medium">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              </li>
            )
          })}
        </ul>

        {/* Bottom Nav */}
        <div className="mt-6 pt-4 border-t border-white/5">
          <ul className="space-y-1">
            {NAV_BOTTOM.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.label}>
                  <button
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/60 hover:bg-white/5 hover:text-white transition-colors ${
                      collapsed ? 'justify-center' : ''
                    }`}
                    title={collapsed ? item.label : ''}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {!collapsed && <span className="text-sm">{item.label}</span>}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>

      {/* AI Assistant Card */}
      {!collapsed && (
        <div className="p-4 border-t border-white/5">
          <div className="bg-gradient-to-br from-teal-500/10 to-teal-700/10 border border-teal-500/20 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span className="text-xs font-medium">AI Assistant</span>
            </div>
            <p className="text-[11px] text-white/50 leading-relaxed mb-3">
              Get help, generate content, find answers and more.
            </p>
            <button className="w-full bg-teal-500 hover:bg-teal-600 text-white text-xs py-2 rounded-lg transition-colors font-medium">
              Open AI Assistant
            </button>
          </div>
        </div>
      )}

      {/* New Task Button */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={() => navigate('/board/board1')}
          className={`w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white py-2.5 rounded-lg transition-colors font-medium text-sm ${
            collapsed ? 'px-2' : ''
          }`}
        >
          <Plus className="w-4 h-4" />
          {!collapsed && 'New Task'}
        </button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute left-[60px] top-20 w-6 h-6 bg-navy-800 border border-white/10 rounded-full items-center justify-center text-white/50 hover:text-white transition-colors hidden"
      >
        {collapsed ? <ChevronsRight className="w-3 h-3" /> : <ChevronsLeft className="w-3 h-3" />}
      </button>
    </aside>
  )
}