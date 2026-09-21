import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { MoreVertical } from 'lucide-react'

const priorityStyles = {
  high: 'bg-red-50 text-red-600',
  medium: 'bg-amber-50 text-amber-600',
  low: 'bg-green-50 text-green-600',
}

const avatarColors = ['bg-pink-500', 'bg-blue-500', 'bg-amber-500', 'bg-teal-500', 'bg-purple-500']

export default function TaskCard({ task, onClick }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task._id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className="bg-white p-4 rounded-xl border border-slate-200 cursor-pointer hover:shadow-md hover:border-slate-300 transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-full ${avatarColors[task.assignee?.charCodeAt(0) % 5 || 0]} flex items-center justify-center text-white text-xs font-medium`}>
            {task.assignee?.[0] || 'U'}
          </div>
          <span className="text-xs text-slate-500">{task.assignee || 'Unassigned'}</span>
        </div>
        <button className="p-0.5 rounded hover:bg-slate-100">
          <MoreVertical className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>

      {/* Priority */}
      {task.priority && (
        <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md font-medium inline-block mb-2 ${priorityStyles[task.priority]}`}>
          {task.priority}
        </span>
      )}

      {/* Title */}
      <p className="text-sm text-slate-900 font-medium leading-snug mb-3">
        {task.title}
      </p>

      {/* Progress */}
      {task.progress !== undefined && (
        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${
              task.progress >= 80 ? 'bg-green-500' :
              task.progress >= 50 ? 'bg-teal-500' :
              task.progress >= 20 ? 'bg-amber-500' : 'bg-red-500'
            }`}
            style={{ width: `${task.progress}%` }}
          />
        </div>
      )}
    </div>
  )
}