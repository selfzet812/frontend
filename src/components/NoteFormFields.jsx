const CATEGORIES = ['General', 'Work', 'Personal', 'Ideas', 'Learning']

const PALETTE = [
  { hex: '#7c3aed', name: 'Violet'  },
  { hex: '#0891b2', name: 'Cyan'    },
  { hex: '#be185d', name: 'Pink'    },
  { hex: '#047857', name: 'Emerald' },
  { hex: '#b45309', name: 'Amber'   },
  { hex: '#1d4ed8', name: 'Blue'    },
  { hex: '#9333ea', name: 'Purple'  },
  { hex: '#e11d48', name: 'Rose'    },
]

export default function NoteFormFields({ form, setForm }) {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Title <span className="text-violet-400">*</span>
        </label>
        <input
          type="text"
          value={form.title ?? ''}
          onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          placeholder="Give your note a title…"
          className="input-field text-lg font-semibold"
          autoFocus
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Content
        </label>
        <textarea
          value={form.content ?? ''}
          onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
          placeholder="Write your thoughts, ideas, plans…"
          rows={11}
          className="input-field"
        />
      </div>

      {/* Row: category + color */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Category */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Category
          </label>
          <select
            value={form.category ?? 'General'}
            onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
            className="input-field"
          >
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Color */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Accent Color
          </label>
          <div className="flex flex-wrap gap-2.5 pt-1">
            {PALETTE.map(({ hex, name }) => (
              <button
                key={hex}
                type="button"
                title={name}
                onClick={() => setForm(f => ({ ...f, color: hex }))}
                className="w-7 h-7 rounded-full transition-all duration-200 focus:outline-none"
                style={{
                  background: hex,
                  transform: form.color === hex ? 'scale(1.3)' : 'scale(1)',
                  boxShadow: form.color === hex
                    ? `0 0 0 2px #07071a, 0 0 0 4px ${hex}`
                    : 'none',
                }}
                aria-label={name}
                aria-pressed={form.color === hex}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Pin toggle */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={!!form.pinned}
          onClick={() => setForm(f => ({ ...f, pinned: !f.pinned }))}
          className="relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
          style={{ background: form.pinned ? '#f59e0b' : 'rgba(255,255,255,0.1)' }}
        >
          <span
            className="absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300"
            style={{ left: form.pinned ? '1.375rem' : '0.25rem' }}
          />
        </button>
        <span className="text-sm text-slate-400 select-none">
          {form.pinned ? (
            <span className="text-amber-400 font-medium">📌 Pinned — stays at the top</span>
          ) : (
            'Pin this note'
          )}
        </span>
      </div>
    </div>
  )
}
