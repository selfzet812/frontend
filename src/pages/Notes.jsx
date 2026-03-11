import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { getNotes, getCategories } from '../api/client'
import NoteCard from '../components/NoteCard'

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  )
}

export default function Notes() {
  const [notes,          setNotes]          = useState([])
  const [categories,     setCategories]     = useState(['All'])
  const [search,         setSearch]         = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading,        setLoading]        = useState(true)
  const [view,           setView]           = useState('grid') // 'grid' | 'list'

  const fetchNotes = useCallback(() => {
    setLoading(true)
    getNotes({
      search:   search || undefined,
      category: activeCategory !== 'All' ? activeCategory : undefined,
    })
      .then(r => setNotes(r.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [search, activeCategory])

  useEffect(() => {
    getCategories().then(r => setCategories(r.data))
  }, [])

  useEffect(() => {
    const t = setTimeout(fetchNotes, 280)
    return () => clearTimeout(t)
  }, [fetchNotes])

  return (
    <div className="page-enter max-w-7xl mx-auto px-5 py-6">
      {/* Header */}
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-violet-400 text-xs font-semibold uppercase tracking-widest mb-2">
            Collection
          </p>
          <h1 className="text-4xl font-black text-slate-100 mb-1">All Notes</h1>
          <p className="text-slate-400 text-sm">
            {loading ? 'Loading…' : `${notes.length} ${notes.length === 1 ? 'note' : 'notes'}`}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* View toggle */}
          <div className="glass rounded-xl p-1 flex gap-1">
            {(['grid', 'list']).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  view === v
                    ? 'bg-violet-600/30 text-violet-300'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {v === 'grid' ? (
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                    <rect x="0" y="0" width="6" height="6" rx="1"/>
                    <rect x="10" y="0" width="6" height="6" rx="1"/>
                    <rect x="0" y="10" width="6" height="6" rx="1"/>
                    <rect x="10" y="10" width="6" height="6" rx="1"/>
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                    <rect x="0" y="1" width="16" height="3" rx="1"/>
                    <rect x="0" y="7" width="16" height="3" rx="1"/>
                    <rect x="0" y="13" width="16" height="3" rx="1"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
          <Link to="/new" className="btn-primary text-xs py-2 px-4">
            + New Note
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder="Search notes…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input-field pl-11"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-violet-600/25 text-violet-300 border border-violet-500/35'
                : 'glass text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notes */}
      {loading ? (
        <div className="flex justify-center py-24">
          <div className="spinner" />
        </div>
      ) : notes.length > 0 ? (
        <div
          className={
            view === 'grid'
              ? 'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
              : 'flex flex-col gap-3'
          }
        >
          {notes.map(note => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-28 text-center">
          <div className="text-6xl mb-6 opacity-60">✦</div>
          <h3 className="text-xl font-bold text-slate-300 mb-3">
            {search ? 'No notes match your search' : 'No notes yet'}
          </h3>
          <p className="text-slate-500 text-sm mb-8 max-w-xs">
            {search
              ? 'Try different keywords or clear the search filter'
              : 'Start capturing your ideas — hit the button below'}
          </p>
          {!search && (
            <Link to="/new" className="btn-primary text-sm">
              Create Your First Note
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
