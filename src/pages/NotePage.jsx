import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getNote, updateNote, deleteNote } from '../api/client'
import NoteFormFields from '../components/NoteFormFields'

const CAT_COLORS = {
  General:  '#7c3aed',
  Work:     '#0891b2',
  Personal: '#be185d',
  Ideas:    '#d97706',
  Learning: '#059669',
}

function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso.endsWith('Z') ? iso : iso + 'Z')
  return d.toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export default function NotePage() {
  const { id }     = useParams()
  const navigate   = useNavigate()
  const [note,     setNote]     = useState(null)
  const [form,     setForm]     = useState({})
  const [editing,  setEditing]  = useState(false)
  const [loading,  setLoading]  = useState(true)
  const [saving,   setSaving]   = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error,    setError]    = useState('')

  useEffect(() => {
    getNote(id)
      .then(r => { setNote(r.data); setForm(r.data) })
      .catch(() => navigate('/notes'))
      .finally(() => setLoading(false))
  }, [id, navigate])

  const handleSave = async () => {
    if (!form.title?.trim()) { setError('Title is required'); return }
    setSaving(true)
    setError('')
    try {
      const r = await updateNote(id, {
        title:    form.title,
        content:  form.content,
        category: form.category,
        color:    form.color,
        pinned:   form.pinned,
      })
      setNote(r.data)
      setEditing(false)
    } catch {
      setError('Failed to save changes. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete this note? This action cannot be undone.')) return
    setDeleting(true)
    try {
      await deleteNote(id)
      navigate('/notes')
    } catch {
      setDeleting(false)
    }
  }

  const handleCancelEdit = () => {
    setForm(note)
    setEditing(false)
    setError('')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="spinner" />
      </div>
    )
  }

  const catColor = CAT_COLORS[note.category] ?? '#7c3aed'
  const accentColor = editing ? form.color : note.color

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
        {/* Color accent bar — updates live when editing */}
        <div
          className="h-1.5 transition-all duration-300"
          style={{ background: `linear-gradient(90deg, ${accentColor} 0%, ${accentColor}00 75%)` }}
        />

        <div className="p-7 md:p-10">
          {/* Error */}
          {error && (
            <div className="mb-6 p-4 rounded-xl text-sm text-red-400"
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
              {error}
            </div>
          )}

          {editing ? (
            /* ── Edit mode ── */
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-1">Editing</p>
                  <h2 className="text-xl font-bold text-slate-100">Edit Note</h2>
                </div>
                <div className="flex gap-2.5">
                  <button onClick={handleCancelEdit} className="btn-secondary">Cancel</button>
                  <button
                    onClick={handleSave}
                    disabled={saving || !form.title?.trim()}
                    className="btn-primary"
                  >
                    {saving ? 'Saving…' : 'Save Changes'}
                  </button>
                </div>
              </div>
              <NoteFormFields form={form} setForm={setForm} />
            </div>
          ) : (
            /* ── View mode ── */
            <div>
              {/* Title + actions */}
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span
                      className="badge text-[0.7rem]"
                      style={{ background: `${catColor}1a`, color: catColor, border: `1px solid ${catColor}30` }}
                    >
                      {note.category}
                    </span>
                    {note.pinned && (
                      <span className="badge text-[0.7rem] text-amber-400"
                        style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)' }}>
                        📌 Pinned
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-100 leading-tight break-words">
                    {note.title}
                  </h1>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => setEditing(true)} className="btn-secondary">Edit</button>
                  <button onClick={handleDelete} disabled={deleting} className="btn-danger">
                    {deleting ? '…' : 'Delete'}
                  </button>
                </div>
              </div>

              {/* Metadata */}
              <p className="text-slate-500 text-xs mb-8">
                Updated {formatDate(note.updated_at)}
                {note.created_at !== note.updated_at && ` · Created ${formatDate(note.created_at)}`}
              </p>

              {/* Divider */}
              <div className="border-t border-white/[0.06] mb-8" />

              {/* Content */}
              {note.content ? (
                <div
                  className="text-slate-300 leading-[1.85] whitespace-pre-wrap text-[0.9375rem]"
                  style={{ wordBreak: 'break-word' }}
                >
                  {note.content}
                </div>
              ) : (
                <div className="text-slate-500 italic text-sm">
                  No content yet.{' '}
                  <button onClick={() => setEditing(true)} className="text-violet-400 hover:text-violet-300 transition-colors not-italic">
                    Click Edit to add some.
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
