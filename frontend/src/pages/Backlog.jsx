import { Plus, Filter, Search, ChevronDown } from 'lucide-react'

const ITEMS = [
  { id: '#12', epic: 'Epic: User Authentication', title: 'Implement login with email & password', assignee: 'Sarah Wilson', priority: 'High', status: 'To Do', points: 5 },
  { id: '#13', epic: '', title: 'Add social login (Google, GitHub)', assignee: 'Mike Chen', priority: 'Medium', status: 'In Progress', points: 3 },
  { id: '#14', epic: '', title: 'Implement password reset flow', assignee: 'Priya Nair', priority: 'Medium', status: 'To Do', points: 4 },
  { id: '#18', epic: 'Epic: Payment Integration', title: 'Integrate Stripe payment gateway', assignee: 'Alex Johnson', priority: 'High', status: 'In Progress', points: 8 },
  { id: '#19', epic: '', title: 'Handle payment webhooks', assignee: 'Sarah Wilson', priority: 'Medium', status: 'To Do', points: 5 },
  { id: '#20', epic: '', title: 'Refund flow implementation', assignee: 'Mike Chen', priority: 'Medium', status: 'To Do', points: 3 },
  { id: '#21', epic: '', title: 'Subscription management', assignee: 'Priya Nair', priority: 'Low', status: 'Done', points: 4 },
  { id: '#24', epic: 'Epic: UI/UX Improvements', title: 'Redesign dashboard layout', assignee: 'Alex Johnson', priority: 'High', status: 'In Progress', points: 5 },
  { id: '#25', epic: '', title: 'Improve mobile responsiveness', assignee: 'Sarah Wilson', priority: 'High', status: 'In Progress', points: 5 },
  { id: '#26', epic: '', title: 'Add dark mode support', assignee: 'Mike Chen', priority: 'Low', status: 'To Do', points: 3 },
]

const priorityBadge = {
  High: 'bg-red-50 text-red-600',
  Medium: 'bg-amber-50 text-amber-600',
  Low: 'bg-green-50 text-green-600',
}

const statusBadge = {
  'To Do': 'bg-slate-100 text-slate-600',
  'In Progress': 'bg-blue-50 text-blue-600',
  'Done': 'bg-green-50 text-green-600',
}

export default function Backlog() {
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl text-slate-900 font-medium mb-1">Product Backlog</h1>
          <p className="text-sm text-slate-500">Manage epics, user stories and tasks</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium">
          <Plus className="w-4 h-4" />
          Create Story
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <select className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm">
          <option>All Epics</option>
        </select>
        <select className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm">
          <option>All Priorities</option>
        </select>
        <select className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm">
          <option>All Assignees</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-left text-xs uppercase tracking-wider text-slate-500">
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Story Points</th>
              <th className="px-4 py-3 font-medium">Assignee</th>
              <th className="px-4 py-3 font-medium">Priority</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {ITEMS.map((item) => (
              <>
                {item.epic && (
                  <tr key={item.epic} className="bg-slate-50/50 border-t border-slate-100">
                    <td colSpan={6} className="px-4 py-2 text-xs font-medium text-slate-700">
                      <span className="inline-flex items-center gap-2">
                        <ChevronDown className="w-3.5 h-3.5" />
                        {item.epic}
                      </span>
                    </td>
                  </tr>
                )}
                <tr key={item.id} className="border-t border-slate-100 hover:bg-slate-50/50">
                  <td className="px-4 py-3 text-sm text-slate-500">{item.id}</td>
                  <td className="px-4 py-3 text-sm text-slate-800">{item.title}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{item.points}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center text-white text-xs">
                        {item.assignee[0]}
                      </div>
                      <span className="text-sm text-slate-600">{item.assignee}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-md font-medium ${priorityBadge[item.priority]}`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-md font-medium ${statusBadge[item.status]}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}