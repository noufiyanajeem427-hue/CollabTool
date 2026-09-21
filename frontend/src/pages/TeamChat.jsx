import { useState } from 'react'
import { Hash, Plus, Send, Search, MoreVertical, Smile, Paperclip } from 'lucide-react'

const CHANNELS = [
  { id: 'general', name: 'General', unread: 0 },
  { id: 'sprint1', name: 'Sprint 1', unread: 2 },
  { id: 'development', name: 'Development', unread: 0 },
  { id: 'design', name: 'Design', unread: 5 },
  { id: 'product', name: 'Product', unread: 0 },
  { id: 'announcements', name: 'Announcements', unread: 0 },
]

const DMS = [
  { id: 'd1', name: 'Sarah Wilson', status: 'online' },
  { id: 'd2', name: 'Mike Chen', status: 'away' },
  { id: 'd3', name: 'Priya Nair', status: 'online' },
  { id: 'd4', name: 'Alex Johnson', status: 'offline' },
]

const MESSAGES = [
  { id: 1, user: 'Sarah Wilson', time: '10:24 AM', text: 'Hi team! Just pushed the latest updates to the documentation.', color: 'bg-pink-500' },
  { id: 2, user: 'Mike Chen', time: '10:26 AM', text: 'Great! I\'ll review the API section this afternoon.', color: 'bg-blue-500' },
  { id: 3, user: 'Priya Nair', time: '10:28 AM', text: 'Can someone update the design mockups for the dashboard?', color: 'bg-amber-500' },
  { id: 4, user: 'Alex Johnson', time: '10:30 AM', text: 'Sure, I\'ll do that. Also added a new section for the release notes.', color: 'bg-teal-500' },
  { id: 5, user: 'Sarah Wilson', time: '10:32 AM', text: 'Perfect! @Mike can you check the JSON export format? We might need to adjust the field names.', color: 'bg-pink-500' },
]

export default function TeamChat() {
  const [activeChannel, setActiveChannel] = useState('general')
  const [message, setMessage] = useState('')

  return (
    <div className="flex h-full">
      {/* Channels sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-slate-200">
          <button className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg text-sm font-medium">
            <Plus className="w-4 h-4" />
            New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-2">Channels</p>
          <ul className="space-y-0.5 mb-6">
            {CHANNELS.map((ch) => (
              <li key={ch.id}>
                <button
                  onClick={() => setActiveChannel(ch.id)}
                  className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md text-sm transition-colors ${
                    activeChannel === ch.id ? 'bg-teal-50 text-teal-700 font-medium' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Hash className="w-3.5 h-3.5" />
                    {ch.name}
                  </span>
                  {ch.unread > 0 && (
                    <span className="text-[10px] bg-teal-500 text-white px-1.5 py-0.5 rounded-full font-medium">
                      {ch.unread}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>

          <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-2">Direct Messages</p>
          <ul className="space-y-0.5">
            {DMS.map((dm) => (
              <li key={dm.id}>
                <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-slate-600 hover:bg-slate-100 transition-colors">
                  <div className="relative">
                    <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center text-white text-xs">
                      {dm.name[0]}
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${
                      dm.status === 'online' ? 'bg-green-500' : dm.status === 'away' ? 'bg-amber-500' : 'bg-slate-300'
                    }`} />
                  </div>
                  {dm.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main chat */}
      <div className="flex-1 flex flex-col bg-slate-50">
        {/* Chat header */}
        <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-slate-400" />
            <h2 className="text-base font-medium text-slate-900">
              {CHANNELS.find((c) => c.id === activeChannel)?.name}
            </h2>
            <span className="text-xs text-slate-400">12 members</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-slate-100">
              <Search className="w-4 h-4 text-slate-500" />
            </button>
            <button className="p-2 rounded-lg hover:bg-slate-100">
              <MoreVertical className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {MESSAGES.map((msg) => (
            <div key={msg.id} className="flex gap-3">
              <div className={`w-9 h-9 rounded-full ${msg.color} flex items-center justify-center text-white text-sm font-medium flex-shrink-0`}>
                {msg.user[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-slate-900">{msg.user}</span>
                  <span className="text-xs text-slate-400">{msg.time}</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="bg-white border-t border-slate-200 p-4 flex-shrink-0">
          <div className="flex items-center gap-2 bg-slate-50 rounded-xl border border-slate-200 px-3 py-2">
            <button className="p-1.5 rounded hover:bg-slate-200">
              <Paperclip className="w-4 h-4 text-slate-400" />
            </button>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-transparent text-sm focus:outline-none text-slate-700 placeholder-slate-400"
            />
            <button className="p-1.5 rounded hover:bg-slate-200">
              <Smile className="w-4 h-4 text-slate-400" />
            </button>
            <button className="bg-teal-500 hover:bg-teal-600 text-white p-1.5 rounded-lg transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}