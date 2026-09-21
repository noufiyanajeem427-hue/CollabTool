import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, LayoutGrid, Search, MoreHorizontal, Users } from 'lucide-react'
import Navbar from '../components/Navbar'
import { useAuthStore } from '../store/authStore'

export default function Dashboard() {
  const user = useAuthStore((s) => s.user)
  const navigate = useNavigate()

  const [workspaces, setWorkspaces] = useState([
    {
      _id: 'ws1',
      name: 'Personal Projects',
      color: '#3d5a3e',
      members: [{}, {}, {}],
      boards: [
        { _id: 'board1', name: 'Sprint 1', tasks: 8 },
        { _id: 'board2', name: 'Sprint 2', tasks: 5 },
      ],
    },
    {
      _id: 'ws2',
      name: 'College Team',
      color: '#6b4f8a',
      members: [{}, {}],
      boards: [{ _id: 'board3', name: 'Final Year Project', tasks: 12 }],
    },
  ])

  const [newWs, setNewWs] = useState('')
  const [showCreate, setShowCreate] = useState(false)

  const createWorkspace = () => {
    if (!newWs.trim()) return
    setWorkspaces([
      ...workspaces,
      {
        _id: Date.now().toString(),
        name: newWs,
        color: '#2d3a2e',
        members: [{}],
        boards: [],
      },
    ])
    setNewWs('')
    setShowCreate(false)
  }

  const createBoard = (wsId) => {
    const name = prompt('Board name?')
    if (!name) return
    setWorkspaces((prev) =>
      prev.map((ws) =>
        ws._id === wsId
          ? {
              ...ws,
              boards: [
                ...ws.boards,
                { _id: Date.now().toString(), name, tasks: 0 },
              ],
            }
          : ws
      )
    )
  }

  return (
    <div className="min-h-screen bg-brand-cream font-helvetica-neue">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-16">
        {/* ==================== HEADER ==================== */}
        <div className="mb-12 animate-fade-up">
          <p className="text-xs uppercase tracking-[0.25em] text-brand-dark/50 mb-3">
            Your workspace
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-brand-dark tracking-tight leading-[1.05] mb-3">
            Welcome back, {user?.name?.split(' ')[0] || 'there'}
          </h1>
          <p className="text-brand-dark/60 text-base max-w-2xl">
            Manage your workspaces, boards, and team collaboration — all in one place.
          </p>
        </div>

        {/* ==================== QUICK STATS ==================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Workspaces', value: workspaces.length },
            {
              label: 'Boards',
              value: workspaces.reduce((a, w) => a + w.boards.length, 0),
            },
            {
              label: 'Tasks',
              value: workspaces.reduce(
                (a, w) => a + w.boards.reduce((x, b) => x + (b.tasks || 0), 0),
                0
              ),
            },
            {
              label: 'Members',
              value: workspaces.reduce((a, w) => a + (w.members?.length || 0), 0),
            },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`bg-white border border-brand-dark/10 rounded-2xl p-5 animate-fade-up stagger-${i + 1}`}
            >
              <p className="text-xs uppercase tracking-[0.15em] text-brand-dark/50 mb-2">
                {stat.label}
              </p>
              <p className="text-3xl text-brand-dark tracking-tight font-light">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* ==================== CREATE WORKSPACE ==================== */}
        <div className="mb-12">
          {!showCreate ? (
            <button
              onClick={() => setShowCreate(true)}
              className="inline-flex items-center gap-2 px-5 py-3 bg-brand-dark text-white rounded-full hover:bg-brand-green transition-all uppercase tracking-wider text-sm group"
            >
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              New Workspace
            </button>
          ) : (
            <div className="bg-white border border-brand-dark/10 rounded-2xl p-6 animate-fade-up">
              <label className="text-xs uppercase tracking-[0.2em] text-brand-dark/50 mb-3 block">
                Create new workspace
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  autoFocus
                  value={newWs}
                  onChange={(e) => setNewWs(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') createWorkspace()
                    if (e.key === 'Escape') setShowCreate(false)
                  }}
                  placeholder="e.g., Marketing Team, Product Sprint..."
                  className="flex-1 px-4 py-3 rounded-xl border border-brand-dark/15 bg-brand-cream text-brand-dark placeholder-brand-dark/30 focus:outline-none focus:border-brand-dark/60 focus:ring-2 focus:ring-brand-dark/5 transition-all"
                />
                <div className="flex gap-2">
                  <button
                    onClick={createWorkspace}
                    className="px-6 py-3 bg-brand-dark text-white rounded-xl hover:bg-brand-green transition-colors uppercase tracking-wide text-xs"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => setShowCreate(false)}
                    className="px-4 py-3 text-brand-dark/60 hover:text-brand-dark transition-colors text-xs uppercase tracking-wide"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ==================== WORKSPACES ==================== */}
        <div className="space-y-14">
          {workspaces.map((ws) => (
            <div key={ws._id} className="animate-fade-up">
              {/* Workspace Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-brand-dark/10">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-base font-medium"
                    style={{ backgroundColor: ws.color }}
                  >
                    {ws.name[0].toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-2xl text-brand-dark tracking-tight">
                      {ws.name}
                    </h2>
                    <p className="text-xs text-brand-dark/50 flex items-center gap-1.5">
                      <Users className="w-3 h-3" />
                      {ws.members?.length || 1} members
                      <span className="mx-1">·</span>
                      {ws.boards.length} boards
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => createBoard(ws._id)}
                  className="inline-flex items-center gap-1.5 text-sm text-brand-dark/60 hover:text-brand-dark transition-colors px-3 py-2 rounded-lg hover:bg-brand-dark/5"
                >
                  <Plus className="w-4 h-4" />
                  Add Board
                </button>
              </div>

              {/* Boards Grid */}
              {ws.boards.length === 0 ? (
                <div className="bg-white/50 border border-dashed border-brand-dark/15 rounded-2xl p-12 text-center">
                  <LayoutGrid className="w-8 h-8 text-brand-dark/30 mx-auto mb-3" />
                  <p className="text-brand-dark/50 text-sm mb-4">
                    No boards in this workspace yet
                  </p>
                  <button
                    onClick={() => createBoard(ws._id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-dark text-white rounded-lg hover:bg-brand-green transition-colors text-xs uppercase tracking-wide"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Create First Board
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ws.boards.map((board) => (
                    <button
                      key={board._id}
                      onClick={() => navigate(`/board/${board._id}`)}
                      className="group text-left bg-white border border-brand-dark/10 rounded-2xl p-5 hover:border-brand-dark/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-brand-dark/5 flex items-center justify-center group-hover:bg-brand-dark/10 transition-colors">
                          <LayoutGrid className="w-5 h-5 text-brand-dark" />
                        </div>
                        <MoreHorizontal className="w-4 h-4 text-brand-dark/30 group-hover:text-brand-dark/60 transition-colors" />
                      </div>
                      <h3 className="text-lg text-brand-dark tracking-tight mb-1">
                        {board.name}
                      </h3>
                      <p className="text-xs text-brand-dark/50">
                        {board.tasks || 0} tasks
                      </p>
                    </button>
                  ))}

                  {/* Add Board Card */}
                  <button
                    onClick={() => createBoard(ws._id)}
                    className="text-left bg-white/40 border-2 border-dashed border-brand-dark/15 rounded-2xl p-5 hover:border-brand-dark/40 hover:bg-white/60 transition-all duration-300 min-h-[140px] flex flex-col items-center justify-center gap-2"
                  >
                    <Plus className="w-6 h-6 text-brand-dark/40" />
                    <span className="text-sm text-brand-dark/50">New Board</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}