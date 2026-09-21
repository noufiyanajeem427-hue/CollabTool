import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  DndContext, closestCorners, PointerSensor, useSensor, useSensors,
} from '@dnd-kit/core'
import { Plus, MoreHorizontal, Users, Filter, Grid3x3, List, ChevronDown, Calendar } from 'lucide-react'
import Column from '../components/Column'
import TaskModal from '../components/TaskModal'

export default function Board() {
  const navigate = useNavigate()

  const [board, setBoard] = useState({
    name: 'Sprint 1 Planning',
    lists: [
      { _id: 'todo', name: 'To Do', color: '#64748b' },
      { _id: 'progress', name: 'In Progress', color: '#f59e0b' },
      { _id: 'testing', name: 'Testing', color: '#3b82f6' },
      { _id: 'done', name: 'Done', color: '#22c55e' },
    ],
    tasks: [
      { _id: 't1', listId: 'todo', title: 'Implement User Authentication', priority: 'high', assignee: 'Sarah', due: 'Today', progress: 20 },
      { _id: 't2', listId: 'todo', title: 'Setup Socket.io', priority: 'high', assignee: 'Mike', progress: 40 },
      { _id: 't3', listId: 'progress', title: 'Implement Test', priority: 'medium', assignee: 'Liam', progress: 60 },
      { _id: 't4', listId: 'progress', title: 'Setup Socket.io', priority: 'high', assignee: 'Mike', progress: 55 },
      { _id: 't5', listId: 'testing', title: 'Mathr Testing', priority: 'medium', assignee: 'Liam', progress: 80 },
      { _id: 't6', listId: 'testing', title: 'Implement this sprint', priority: 'medium', assignee: 'Sarah', progress: 70 },
      { _id: 't7', listId: 'done', title: 'Implement User Authentication', priority: 'high', assignee: 'Sarah', progress: 100 },
      { _id: 't8', listId: 'done', title: 'Implement this sprint', priority: 'medium', assignee: 'Liam', progress: 100 },
    ],
  })

  const [selectedTask, setSelectedTask] = useState(null)
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const handleDragEnd = ({ active, over }) => {
    if (!over) return
    const taskId = active.id
    const destinationListId = over.id
    const task = board.tasks.find((t) => t._id === taskId)
    if (!task || task.listId === destinationListId) return
    setBoard((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) => t._id === taskId ? { ...t, listId: destinationListId } : t),
    }))
  }

  const addTask = (listId, title) => {
    if (!title.trim()) return
    setBoard((prev) => ({
      ...prev,
      tasks: [...prev.tasks, { _id: Date.now().toString(), listId, title, priority: 'medium', progress: 0 }],
    }))
  }

  const deleteTask = (taskId) => {
    setBoard((prev) => ({ ...prev, tasks: prev.tasks.filter((t) => t._id !== taskId) }))
    setSelectedTask(null)
  }

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Board Header */}
      <div className="bg-white border-b border-slate-200 px-6 lg:px-8 py-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl text-slate-900 font-medium">Sprint 1</h1>
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-md font-medium">
                Active
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Apr 21 - May 4, 2025
              </span>
              <span>·</span>
              <span>68% complete</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-medium"
                  style={{ marginLeft: i > 1 ? '-8px' : 0, background: ['#ec4899', '#3b82f6', '#f59e0b', '#22c55e', '#8b5cf6'][i - 1] }}
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <Filter className="w-4 h-4 text-slate-500" />
            </button>
            <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <Grid3x3 className="w-4 h-4 text-slate-500" />
            </button>
            <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <MoreHorizontal className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-teal-500 rounded-full" style={{ width: '68%' }} />
        </div>
      </div>

      {/* Kanban */}
      <div className="flex-1 overflow-x-auto p-6">
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
          <div className="flex gap-5 min-h-full">
            {board.lists.map((list) => (
              <Column
                key={list._id}
                list={list}
                tasks={board.tasks.filter((t) => t.listId === list._id)}
                onTaskClick={setSelectedTask}
                onAddTask={addTask}
              />
            ))}
            <button className="flex-shrink-0 w-72 h-14 bg-white border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center gap-2 text-slate-400 hover:border-slate-300 hover:text-slate-600 transition-all">
              <Plus className="w-4 h-4" />
              <span className="text-sm">Add List</span>
            </button>
          </div>
        </DndContext>
      </div>

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onDelete={deleteTask}
        />
      )}
    </div>
  )
}