import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getStats } from '../api/client'
import NoteCard from '../components/NoteCard'

function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-[55vh]">
      <div className="spinner" />
    </div>
  )
}

function StatCard({ icon, label, value, color, sub }) {
  return (
    <div className="glass rounded-2xl p-6 relative overflow-hidden group">
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: `radial-gradient(ellipse at top left, ${color}12, transparent 65%)` }}
      />
      <div className="relative z-10">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-xl"
          style={{ background: `${color}18` }}
        >
          {icon}
        </div>
        <div className="text-3xl font-black mb-1 tabular-nums" style={{ color }}>
          {value}
        </div>
        <div className="text-slate-400 text-sm font-medium">{label}</div>
        {sub && <div className="text-slate-600 text-xs mt-0.5">{sub}</div>}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [stats, setStats]   = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getStats()
      .then(r => setStats(r.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Spinner />

  const statCards = [
    { icon: '📝', label: 'Total Notes',  value: stats.total,     color: '#7c3aed' },
    { icon: '📌', label: 'Pinned',       value: stats.pinned,    color: '#f59e0b' },
    { icon: '🏷️', label: 'Categories',  value: stats.categories.length, color: '#06b6d4' },
    { icon: '📅', label: 'This Week',   value: stats.this_week, color: '#10b981', sub: 'notes created' },
  ]

  const CAT_COLORS = ['#7c3aed', '#06b6d4', '#be185d', '#d97706', '#059669', '#1d4ed8']

  return (
    <div className="page-enter max-w-7xl mx-auto px-5 py-6">
      {/* Header */}
      <div className="mb-10">
        <p className="text-violet-400 text-xs font-semibold uppercase tracking-widest mb-2">
          Overview
        </p>
        <h1 className="text-4xl font-black text-slate-100 mb-2">Dashboard</h1>
        <p className="text-slate-400">Your creative space at a glance.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map(c => <StatCard key={c.label} {...c} />)}
      </div>

      {/* Two-col layout */}
      <div className="grid lg:grid-cols-3 gap-8">

        {/* Recent notes — 2/3 */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-100">Recent Notes</h2>
            <Link to="/notes" className="text-violet-400 text-sm hover:text-violet-300 transition-colors">
              View all &rarr;
            </Link>
          </div>

          {stats.recent.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {stats.recent.map(note => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          ) : (
            <div className="glass rounded-2xl p-12 text-center">
              <div className="text-5xl mb-4">✦</div>
              <p className="text-slate-400 mb-6 text-sm">
                No notes yet. Start capturing your ideas!
              </p>
              <Link to="/new" className="btn-primary text-sm py-2 px-5">
                Create First Note
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar — 1/3 */}
        <div className="space-y-8">
          {/* Category breakdown */}
          <div>
            <h2 className="text-xl font-bold text-slate-100 mb-5">By Category</h2>
            <div className="glass rounded-2xl p-5 space-y-4">
              {stats.categories.length > 0 ? (
                stats.categories.map((cat, i) => {
                  const pct = stats.total > 0 ? Math.round((cat.count / stats.total) * 100) : 0
                  const color = CAT_COLORS[i % CAT_COLORS.length]
                  return (
                    <div key={cat.category}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-slate-300 font-medium">{cat.category}</span>
                        <span className="text-slate-500 tabular-nums">
                          {cat.count} &middot; {pct}%
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${pct}%`, background: color }}
                        />
                      </div>
                    </div>
                  )
                })
              ) : (
                <p className="text-slate-500 text-sm text-center py-3">
                  No categories yet
                </p>
              )}
            </div>
          </div>

          {/* Quick actions */}
          <div>
            <h2 className="text-xl font-bold text-slate-100 mb-4">Quick Actions</h2>
            <div className="space-y-2.5">
              <Link
                to="/new"
                className="glass glass-card rounded-xl p-4 flex items-center gap-3 text-slate-300 text-sm font-medium"
              >
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: '#7c3aed20', color: '#a78bfa' }}
                >
                  +
                </span>
                Create new note
              </Link>
              <Link
                to="/notes"
                className="glass glass-card rounded-xl p-4 flex items-center gap-3 text-slate-300 text-sm font-medium"
              >
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-base"
                  style={{ background: '#06b6d420', color: '#67e8f9' }}
                >
                  ◈
                </span>
                Browse all notes
              </Link>
            </div>
          </div>

          {/* Tip */}
          <div
            className="rounded-2xl p-5"
            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(6,182,212,0.08))', border: '1px solid rgba(124,58,237,0.2)' }}
          >
            <p className="text-xs text-violet-300 font-semibold uppercase tracking-wider mb-2">💡 Tip</p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Pin your most important notes so they always appear at the top of your notes list.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
