import { Download, TrendingUp, CheckCircle2, Clock, AlertTriangle } from 'lucide-react'

export default function Reports() {
  const burndownData = [40, 36, 32, 28, 24, 22, 18, 15, 12, 10, 6, 3]
  const velocityData = [18, 26, 35, 28]
  const maxY = 45

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl text-slate-900 font-medium mb-1">Sprint 1 Report</h1>
          <p className="text-sm text-slate-500">Apr 21 — May 4, 2025 · Completed</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-5 py-2.5 rounded-lg text-sm font-medium">
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Completed', value: '18', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'In Progress', value: '5', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Story Points', value: '32', icon: TrendingUp, color: 'text-teal-600', bg: 'bg-teal-50' },
          { label: 'Blocked', value: '2', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-200">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">{s.label}</p>
              <p className="text-3xl text-slate-900 font-light">{s.value}</p>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Burndown */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h3 className="text-base font-medium text-slate-900 mb-6">Sprint Burndown</h3>
          <div className="relative h-48">
            <svg viewBox="0 0 500 180" className="w-full h-full">
              {[0, 1, 2, 3, 4].map((i) => (
                <line key={i} x1="0" y1={i * 40} x2="500" y2={i * 40} stroke="#f1f5f9" strokeWidth="1" />
              ))}
              <polyline
                points={burndownData.map((d, i) => `${i * 45},${160 - (d / maxY) * 160}`).join(' ')}
                fill="none"
                stroke="#14b8a6"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <polyline
                points={burndownData.map((d, i) => `${i * 45},${140 - (i / 11) * 100}`).join(' ')}
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
            </svg>
          </div>
          <div className="flex items-center justify-center gap-4 mt-4 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-teal-500" /> Actual
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-slate-300 border-dashed" /> Ideal
            </span>
          </div>
        </div>

        {/* Velocity */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h3 className="text-base font-medium text-slate-900 mb-6">Velocity</h3>
          <div className="flex items-end justify-around h-48 gap-4">
            {velocityData.map((v, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full flex flex-col items-center">
                  <span className="text-xs text-slate-500 mb-1">{v}</span>
                  <div
                    className="w-full bg-gradient-to-t from-teal-600 to-teal-400 rounded-t-lg transition-all"
                    style={{ height: `${(v / 40) * 160}px` }}
                  />
                </div>
                <span className="text-xs text-slate-400">Sprint {i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Retrospective */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-medium text-slate-900">Retrospective Notes</h3>
          <button className="text-xs text-teal-600 hover:text-teal-700 font-medium">
            Start Retrospective
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-green-700 mb-1">✓ What went well</p>
            <p className="text-sm text-slate-600">Good collaboration, smooth code reviews, delivered key features.</p>
          </div>
          <div>
            <p className="text-sm font-medium text-amber-700 mb-1">! What could be improved</p>
            <p className="text-sm text-slate-600">Earlier testing, better estimation for complex tasks.</p>
          </div>
          <div>
            <p className="text-sm font-medium text-blue-700 mb-1">→ Action Items</p>
            <p className="text-sm text-slate-600">Improve estimation process, add more QA resources, refine DoD.</p>
          </div>
        </div>
      </div>
    </div>
  )
}