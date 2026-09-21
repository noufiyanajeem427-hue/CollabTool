import { useState } from 'react'
import { X, Trash2, Calendar, Flag, User, Send, Clock } from 'lucide-react'

export default function TaskModal({ task, onClose, onDelete }) {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([
    { _id: 1, body: 'Looks good, let\'s ship it!', user: 'Sarah', time: '2h ago' },
    { _id: 2, body: 'Just pushed the latest changes.', user: 'Alex', time: '1h ago' },
  ])

  const addComment = () => {
    if (!comment.trim()) return
    setComments([...comments, { _id: Date.now(), body: comment, user: 'You', time: 'now' }])
    setComment('')
  }

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-start z-10">
          <div className="flex-1 pr-4">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Task Details</p>
            <h2 className="text-xl text-slate-900 font-medium">{task.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-6">
          <div className="mb-6">
            <h3 className="text-xs uppercase tracking-wider text-slate-400 mb-2">Description</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {task.description || 'No description provided.'}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { icon: Flag, label: 'Priority', value: task.priority || 'None', color: 'text-amber-600' },
              { icon: Calendar, label: 'Due Date', value: task.due || 'Not set', color: 'text-blue-600' },
              { icon: User, label: 'Assignee', value: task.assignee || 'Unassigned', color: 'text-teal-600' },
            ].map((m) => {
              const Icon = m.icon
              return (
                <div key={m.label} className="bg-slate-50 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Icon className={`w-3.5 h-3.5 ${m.color}`} />
                    <span className="text-[10px] uppercase tracking-wider text-slate-400">{m.label}</span>
                  </div>
                  <p className="text-sm text-slate-700 font-medium capitalize">{m.value}</p>
                </div>
              )
            })}
          </div>

          <div className="border-t border-slate-100 pt-5">
            <h3 className="text-xs uppercase tracking-wider text-slate-400 mb-4">Comments ({comments.length})</h3>
            <div className="space-y-3 mb-4">
              {comments.map((c) => (
                <div key={c._id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                    {c.user[0]}
                  </div>
                  <div className="flex-1 bg-slate-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-slate-800">{c.user}</span>
                      <span className="text-xs text-slate-400">{c.time}</span>
                    </div>
                    <p className="text-sm text-slate-600">{c.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addComment()}
                placeholder="Write a comment..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500"
              />
              <button
                onClick={addComment}
                disabled={!comment.trim()}
                className="bg-teal-500 text-white p-2.5 rounded-xl hover:bg-teal-600 disabled:opacity-40 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 flex justify-between">
            <button
              onClick={() => onDelete(task._id)}
              className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete Task
            </button>
            <button onClick={onClose} className="px-5 py-2 bg-slate-900 text-white rounded-full text-sm hover:bg-slate-800">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}