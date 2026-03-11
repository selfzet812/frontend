import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createNote } from '../api/client'
import NoteFormFields from '../components/NoteFormFields'

const INITIAL = {
  title:    '',
  content:  '',
  category: 'General',
  color:    '#7c3aed',
  pinned:   false,
}

export default function NewNote() {
  const navigate    = useNavigate()
  const [form,  setForm]  = useState(INITIAL)
  const [saving, setSaving] = useState(false)
  const [error,  setError]  = useState('')

  const handleCreate = async () => {
    if (!form.title.trim()) { setError('Title is required'); return }
    setSaving(true)
    setError('')
    try {
      const r = await createNote(form)
      navigate(`/notes/${r.data.id}`)
    } catch {
      setError('Failed to create note. Please try again.')
      setSaving(false)
    }
  }

  return (
    <div className="page-enter max-w-4xl mx-auto px-5 py-6">
      {/* Back */}
      <Link
        to="/notes"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors mb-8 text-sm group"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:-translate-x-0.5">
          <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
        </svg>
        Back to Notes
      </Link>

      <div className="glass rounded-3xl overflow-hidden">
        {/* Live color preview bar */}
        <div
          className="h-1.5 transition-all duration-300"
          style={{ background: `linear-gradient(90deg, ${form.color} 0%, ${form.color}00 75%)` }}
        />

        <div className="p-7 md:p-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-1">
                New Note
              </p>
              <h1 className="text-2xl font-black text-slate-100">Capture your idea</h1>
            </div>
            <div className="flex gap-2.5">
              <Link to="/notes" className="btn-secondary">Cancel</Link>
              <button
                onClick={handleCreate}
                disabled={saving || !form.title.trim()}
                className="btn-primary"
              >
                {saving ? 'Creating…' : 'Create Note'}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              className="mb-6 p-4 rounded-xl text-sm text-red-400"
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}
            >
              {error}
            </div>
          )}

          <NoteFormFields form={form} setForm={setForm} />
        </div>
      </div>

      {/* Tip */}
      <p className="text-center text-slate-600 text-xs mt-6">
        Tip: pick an accent colour to visually distinguish notes at a glance.
      </p>
    </div>
  )
}
