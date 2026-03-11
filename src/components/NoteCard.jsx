import { Link } from 'react-router-dom'

const CAT_COLORS = {
  General:  '#7c3aed',
  Work:     '#0891b2',
  Personal: '#be185d',
  Ideas:    '#d97706',
  Learning: '#059669',
}

function timeAgo(iso) {
  if (!iso) return ''
  const date = new Date(iso.endsWith('Z') ? iso : iso + 'Z')
  const diff = Date.now() - date.getTime()
  const min  = Math.floor(diff / 60_000)
  const hr   = Math.floor(diff / 3_600_000)
  const day  = Math.floor(diff / 86_400_000)
  if (min < 1)  return 'just now'
  if (min < 60) return `${min}m ago`
  if (hr  < 24) return `${hr}h ago`
  if (day < 30) return `${day}d ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function NoteCard({ note }) {
  const catColor = CAT_COLORS[note.category] ?? '#7c3aed'

  return (
    <Link to={`/notes/${note.id}`} className="block h-full">
      <article
        className="glass-card rounded-2xl overflow-hidden h-full flex flex-col"
        style={{ minHeight: '160px' }}
      >
        {/* Top color accent */}
        <div
          className="h-[3px] w-full flex-shrink-0"
          style={{ background: `linear-gradient(90deg, ${note.color} 0%, transparent 80%)` }}
        />

        <div className="p-5 flex flex-col flex-1 gap-3">
          {/* Title row */}
          <div className="flex items-start gap-2">
            <h3 className="font-semibold text-slate-100 text-[0.9375rem] leading-snug line-clamp-2 flex-1">
              {note.title}
            </h3>
            {note.pinned && (
              <span className="text-amber-400 flex-shrink-0 mt-0.5" title="Pinned">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/>
                </svg>
              </span>
            )}
          </div>

          {/* Content preview */}
          {note.content && (
            <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 flex-1">
              {note.content}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] mt-auto">
            <span
              className="badge text-[0.7rem]"
              style={{ background: `${catColor}1a`, color: catColor, border: `1px solid ${catColor}30` }}
            >
              {note.category}
            </span>
            <span className="text-slate-500 text-xs">{timeAgo(note.updated_at)}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
