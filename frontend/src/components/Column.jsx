import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import { Plus, X, MoreHorizontal } from 'lucide-react'
import TaskCard from './TaskCard'

export default function Column({ list, tasks, onTaskClick, onAddTask }) {
  const [adding, setAdding] = useState(false)
  const [title, setTitle] = useState('')
  const { setNodeRef, isOver } = useDroppable({ id: list._id })

  const submit = (e) => {
    e.preventDefault()
    onAddTask(list._id, title)
    setTitle('')
    setAdding(false)
  }

  return (
    <div
      ref={setNodeRef}
      className={`w-72 flex-shrink-0 rounded-2xl p-3 transition-colors ${
        isOver ? 'bg-teal-50' : 'bg-slate-100/70'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-2 py-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: list.color }} />
          <h3 className="font-medium text-slate-700 text-sm">{list.name}</h3>
          <span className="text-xs text-slate-400 bg-white px-1.5 py-0.5 rounded-full">{tasks.length}</span>
        </div>
        <button className="p-1 rounded hover:bg-white transition-colors">
          <MoreHorizontal className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>

      {/* Tasks */}
      <SortableContext items={tasks.map((t) => t._id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2.5 min-h-[10px]">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} onClick={() => onTaskClick(task)} />
          ))}
        </div>
      </SortableContext>

      {/* Add Task */}
      {adding ? (
        <form onSubmit={submit} className="mt-3">
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && setAdding(false)}
            placeholder="Task title..."
            className="w-full p-2.5 border border-slate-200 rounded-lg mb-2 text-sm bg-white focus:outline-none focus:border-teal-500"
          />
          <div className="flex gap-2">
            <button type="submit" className="bg-teal-500 text-white text-xs px-3 py-1.5 rounded-md uppercase tracking-wide hover:bg-teal-600">
              Add
            </button>
            <button type="button" onClick={() => setAdding(false)} className="p-1.5 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="mt-3 w-full text-sm text-slate-500 hover:text-slate-700 hover:bg-white p-2.5 rounded-lg flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add task
        </button>
      )}
    </div>
  )
}