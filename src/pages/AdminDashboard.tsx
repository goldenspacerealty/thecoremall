
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, Search, RefreshCw, Trash2, Mail, Phone, MessageSquare, Users, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { apiGet, apiDelete } from '@/lib/api'

interface Inquiry {
  _id?: string
  id?: string
  name: string
  email: string
  phone?: string
  message?: string
  source?: string
  status?: string
  createdAt?: string
  created_at?: string
  }

  export default function AdminDashboard() {
  const navigate = useNavigate()
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selected, setSelected] = useState<Inquiry | null>(null)

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      navigate('/admin')
      return
    }
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    setLoading(true)
    try {
      const data = await apiGet('/api/inquiries')
      setInquiries(data.data || data.inquiries || [])
    } catch {
      setInquiries([])
    }
    setLoading(false)
  }

  const deleteInquiry = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return
    await apiDelete(`/api/inquiries/${id}`)
    setInquiries(prev => prev.filter(i => (i._id || i.id) !== id))
    if (selected && (selected._id || selected.id) === id) setSelected(null)
  }

  const logout = () => {
    localStorage.removeItem('adminAuth')
    navigate('/admin')
  }

  const filtered = inquiries.filter(i => {
    const matchSearch = !search ||
      i.name?.toLowerCase().includes(search.toLowerCase()) ||
      i.email?.toLowerCase().includes(search.toLowerCase()) ||
      i.phone?.includes(search)
    const matchStatus = !statusFilter || i.status === statusFilter
    return matchSearch && matchStatus
  })

  const stats = {
    total: inquiries.length,
    new: inquiries.filter(i => i.status === 'new' || !i.status).length,
    contacted: inquiries.filter(i => i.status === 'contacted').length,
    resolved: inquiries.filter(i => i.status === 'resolved').length,
  }

  const formatDate = (d?: string) => {
    if (!d) return '—'
    return new Date(d).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  const statusColor: Record<string, string> = {
    new: 'bg-yellow-500/20 text-yellow-400',
    contacted: 'bg-blue-500/20 text-blue-400',
    'in-progress': 'bg-purple-500/20 text-purple-400',
    resolved: 'bg-green-500/20 text-green-400',
    closed: 'bg-gray-500/20 text-gray-400',
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">

      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.avif" alt="" className="h-8" />
          <div>
            <h1 className="font-black text-white text-lg">Admin Panel</h1>
            <p className="text-gray-400 text-xs">The Core Mall</p>
          </div>
        </div>
        <button onClick={logout} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <aside className="w-56 bg-gray-900 border-r border-gray-800 p-4 hidden md:block">
          <nav className="space-y-1">
            <div className="px-3 py-2 rounded-lg bg-purple-600/20 text-purple-400 font-semibold text-sm flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> Inquiries
            </div>
          </nav>

          {/* Stats */}
          <div className="mt-6 space-y-3">
            {[
              { label: 'Total', value: stats.total, icon: Users, color: 'text-purple-400' },
              { label: 'New', value: stats.new, icon: AlertCircle, color: 'text-yellow-400' },
              { label: 'Contacted', value: stats.contacted, icon: Clock, color: 'text-blue-400' },
              { label: 'Resolved', value: stats.resolved, icon: CheckCircle, color: 'text-green-400' },
            ].map(s => (
              <div key={s.label} className="bg-gray-800 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <s.icon className={`w-4 h-4 ${s.color}`} />
                  <span className="text-gray-400 text-xs">{s.label}</span>
                </div>
                <span className={`font-black text-lg ${s.color}`}>{s.value}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-auto p-6">

          {/* Controls */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                placeholder="Search name, email, phone..." />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40">
              <option value="">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
            <button onClick={fetchInquiries}
              className="px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-gray-300 hover:text-white flex items-center gap-2 transition-colors">
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
          </div>

          {/* Table */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-gray-400">#</th>
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-gray-400">Name</th>
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-gray-400">Email</th>
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-gray-400">Phone</th>
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-gray-400">Status</th>
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-gray-400">Date</th>
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={7} className="text-center py-12 text-gray-500">Loading...</td></tr>
                  ) : filtered.length === 0 ? (
                    <tr><td colSpan={7} className="text-center py-12 text-gray-500">No inquiries found</td></tr>
                  ) : filtered.map((inq, i) => (
                    <tr key={inq._id || inq.id || i}
                      className="border-b border-gray-800/50 hover:bg-gray-800/50 transition-colors cursor-pointer"
                      onClick={() => setSelected(inq)}>
                      <td className="px-4 py-3 text-gray-500 text-sm">{i + 1}</td>
                      <td className="px-4 py-3 font-semibold text-white text-sm">{inq.name}</td>
                      <td className="px-4 py-3 text-purple-400 text-sm">{inq.email}</td>
                      <td className="px-4 py-3 text-gray-400 text-sm">{inq.phone || '—'}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor[inq.status || 'new'] || statusColor.new}`}>
                          {inq.status || 'new'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">{formatDate(inq.createdAt || inq.created_at)}</td>
                      <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                        <div className="flex gap-2">
                          <a href={`mailto:${inq.email}`} className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors">
                            <Mail className="w-3.5 h-3.5" />
                          </a>
                          {inq.phone && (
                            <a href={`tel:${inq.phone}`} className="p-1.5 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors">
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <button onClick={() => deleteInquiry(inq._id || inq.id || '')}
                            className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* Detail Panel */}
        {selected && (
          <aside className="w-80 bg-gray-900 border-l border-gray-800 p-6 overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-white">Inquiry Detail</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-white text-xl">×</button>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-xl p-4">
                <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center mb-3">
                  <span className="text-purple-400 font-black text-lg">{selected.name[0]?.toUpperCase()}</span>
                </div>
                <h4 className="font-black text-white text-lg">{selected.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor[selected.status || 'new'] || statusColor.new}`}>
                  {selected.status || 'new'}
                </span>
              </div>
              {[
                { icon: Mail, label: 'Email', value: selected.email, href: `mailto:${selected.email}` },
                { icon: Phone, label: 'Phone', value: selected.phone || '—', href: selected.phone ? `tel:${selected.phone}` : undefined },
              ].map(item => (
                <div key={item.label} className="bg-gray-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <item.icon className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-400 uppercase tracking-wider">{item.label}</span>
                  </div>
                  {item.href ? (
                    <a href={item.href} className="text-purple-400 hover:underline text-sm">{item.value}</a>
                  ) : (
                    <p className="text-white text-sm">{item.value}</p>
                  )}
                </div>
              ))}
              {selected.message && (
                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-400 uppercase tracking-wider">Message</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{selected.message}</p>
                </div>
              )}
              <div className="bg-gray-800 rounded-xl p-4 text-xs text-gray-400">
                <p>Received: {formatDate(selected.createdAt || selected.created_at)}</p>
                {selected.source && <p className="mt-1">Source: {selected.source}</p>}
              </div>
              <div className="flex gap-2">
                <a href={`mailto:${selected.email}`}
                  className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-xl text-center transition-all">
                  Send Email
                </a>
                <button onClick={() => deleteInquiry(selected._id || selected.id || '')}
                  className="px-4 py-2.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-xl transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
