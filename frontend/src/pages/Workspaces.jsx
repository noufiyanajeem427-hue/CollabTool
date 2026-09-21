import { Plus, MoreVertical, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const WORKSPACES = [
  { id: 1, name: 'Sprint 1 Planning', members: 4, progress: 65, color: 'bg-teal-500', status: 'active' },
  { id: 2, name: 'Client Portal', members: 3, progress: 40, color: 'bg-blue-500', status: 'active' },
  { id: 3, name: 'UI/UX Design', members: 5, progress: 80, color: 'bg-purple-500', status: 'active' },
  { id: 4, name: 'Sprint 2 Planning', members: 4, progress: 30, color: 'bg-amber-500', status: 'active' },
  { id: 5, name: 'Sprint Template', members: 3, progress: 20, color: 'bg-red-500', status: 'review' },
  { id: 6, name: 'Design Development', members: 6, progress: 75, color: 'bg-green-500', status: 'active' },
  { id: 7, name: 'UI/UX Design', members: 3, progress: 55, color: 'bg-pink-500', status: 'active' },
  { id: 8, name: 'ClientProject', members: 2, progress: 90, color: 'bg-teal-500', status: 'done' },
  { id: 9, name: 'Sprint Workspace', members: 5, progress: 45, color: 'bg-indigo-500', status: 'active' },
]

export default function Workspaces() {
  const navigate = useNavigate()

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between mb-8 animate-fade-up">
        <div>
          <h1 className="text-3xl text-slate-900 font-light tracking-tight mb-2">Workspaces</h1>
          <p className="text-slate-500 text-sm">Manage all your workspaces in one place.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          New Workspace
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {WORKSPACES.map((ws, i) => (
          <div
            key={ws.id}
            className={`bg-white rounded-2xl p-5 border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all cursor-pointer animate-fade-up stagger-${(i % 6) + 1}`}
            onClick={() => navigate('/board/board1')}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${ws.color} flex items-center justify-center text-white font-medium`}>
                  {ws.name[0]}
                </div>
                <div>
                  <h3 className="text-base font-medium text-slate-900">{ws.name}</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <Users className="w-3 h-3" />
                    {ws.members} members
                  </p>
                </div>
              </div>
              <button className="p-1 rounded hover:bg-slate-100">
                <MoreVertical className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Avatars */}
            <div className="flex items-center mb-4">
              <div className="flex -space-x-2">
                {Array.from({ length: Math.min(ws.members, 3) }).map((_, j) => (
                  <div
                    key={j}
                    className={`w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-xs ${
                      ['bg-pink-500', 'bg-blue-500', 'bg-amber-500'][j]
                    }`}
                  >
                    {String.fromCharCode(65 + j)}
                  </div>
                ))}
                {ws.members > 3 && (
                  <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs text-slate-600 font-medium">
                    +{ws.members - 3}
                  </div>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${ws.color} transition-all`}
                  style={{ width: `${ws.progress}%` }}
                />
              </div>
            </div>
            <p className="text-xs text-slate-400">Active users avatars</p>
          </div>
        ))}
      </div>
    </div>
  )
}