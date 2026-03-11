import { Link } from 'react-router-dom'

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    title: 'Capture Instantly',
    desc: 'Write thoughts, ideas, and notes the moment inspiration strikes. Lightning-fast creation with a beautiful editor.',
    color: '#7c3aed',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
    title: 'Organize Effortlessly',
    desc: 'Categorize notes by context — Work, Personal, Ideas, Learning. Pin the most important ones to the top.',
    color: '#06b6d4',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    title: 'Track Your Progress',
    desc: 'Visual analytics show your knowledge-building habits. See your stats and category distribution at a glance.',
    color: '#be185d',
  },
]

export default function Home() {
  return (
    <div
      className="min-h-screen grid-bg relative overflow-x-hidden"
      style={{ backgroundColor: '#07071a' }}
    >
      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="animate-orb1 absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-[0.13]"
          style={{ background: 'radial-gradient(circle at center, #7c3aed, transparent 65%)' }}
        />
        <div
          className="animate-orb2 absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.10]"
          style={{ background: 'radial-gradient(circle at center, #06b6d4, transparent 65%)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle at center, #be185d, transparent 65%)' }}
        />
      </div>

      {/* ── NAVBAR ── */}
      <nav className="relative z-50 px-5 pt-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}
            >
              <svg width="17" height="17" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L10 6H15L11 9.5L12.5 15L8 11.5L3.5 15L5 9.5L1 6H6L8 1Z" fill="white" />
              </svg>
            </div>
            <span className="font-black text-xl tracking-tight gradient-text">LUMINARY</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="btn-secondary py-2 px-4 text-sm hidden sm:inline-flex">
              Dashboard
            </Link>
            <Link to="/new" className="btn-primary py-2 px-5 text-sm">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative z-10 flex flex-col items-center text-center px-5 pt-24 pb-28">
        {/* Pill badge */}
        <div className="glass rounded-full px-4 py-1.5 text-xs font-medium text-violet-300 inline-flex items-center gap-2 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          Beautiful notes for focused minds
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black leading-none tracking-tight mb-6">
          <span className="gradient-text">Illuminate</span>
          <br />
          <span className="text-slate-100">Your Mind</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed mb-12">
          A beautifully crafted space to capture ideas, organise thoughts, and unlock your
          intellectual potential.{' '}
          <span className="text-slate-300">Where great thinking begins.</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link to="/new" className="btn-primary px-8 py-3.5 text-base">
            Start Writing &rarr;
          </Link>
          <Link to="/dashboard" className="btn-secondary px-8 py-3.5 text-base">
            View Dashboard
          </Link>
        </div>

        {/* Micro-stats */}
        <div className="flex flex-wrap justify-center items-center gap-6 mt-14 text-sm text-slate-500">
          {[
            { value: '∞', label: 'unlimited notes', color: '#a78bfa' },
            { value: '5',  label: 'categories',     color: '#67e8f9' },
            { value: '0',  label: 'distractions',   color: '#f9a8d4' },
          ].map(({ value, label, color }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-xl font-black" style={{ color }}>{value}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* Floating preview card */}
        <div className="mt-20 w-full max-w-lg animate-float">
          <div className="glass rounded-2xl overflow-hidden shadow-2xl text-left">
            <div className="h-[3px]" style={{ background: 'linear-gradient(90deg, #7c3aed, #06b6d4)' }} />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="badge text-[0.7rem]" style={{ background: '#7c3aed1a', color: '#a78bfa', border: '1px solid #7c3aed30' }}>Ideas</span>
                <span className="text-amber-400 text-xs">📌</span>
              </div>
              <h3 className="font-bold text-slate-100 text-lg mb-2">Build a habit tracker app</h3>
              <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                Users should be able to set daily goals, log completions, and see streaks over time. 
                Consider gamification — badges, XP, leaderboard with friends...
              </p>
              <div className="flex justify-between mt-4 pt-3 border-t border-white/[0.06]">
                <span className="text-slate-500 text-xs">just now</span>
                <span className="text-violet-400 text-xs font-medium">Read more →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="relative z-10 px-5 pb-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-100 mb-4">
              Everything you need to think clearly
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-base leading-relaxed">
              Luminary strips away the noise and gives you a focused, beautiful environment for your
              most important thoughts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {FEATURES.map(({ icon, title, desc, color }) => (
              <div
                key={title}
                className="glass-card rounded-2xl p-8 text-center group"
                style={{ '--card-color': color }}
              >
                <div
                  className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${color}18`, border: `1px solid ${color}30`, color }}
                >
                  {icon}
                </div>
                <h3 className="font-bold text-slate-100 text-lg mb-3">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="relative z-10 px-5 pb-28">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-slate-100 mb-4">Simple by design</h2>
            <p className="text-slate-400">Three steps to organise your thinking.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Create a note', desc: 'Hit "+ New Note" and start writing. Give it a title, add content and pick a category.', color: '#7c3aed' },
              { step: '02', title: 'Organise & pin', desc: 'Assign colours, categories, and pin your most critical ideas to always keep them visible.', color: '#06b6d4' },
              { step: '03', title: 'Review & reflect', desc: 'Browse your collection, search instantly, and track growth from the beautiful dashboard.', color: '#be185d' },
            ].map(({ step, title, desc, color }) => (
              <div key={step} className="glass rounded-2xl p-7 relative overflow-hidden">
                <span
                  className="absolute top-4 right-5 text-5xl font-black opacity-[0.07] select-none"
                  style={{ color }}
                >
                  {step}
                </span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-4 text-xs font-black" style={{ background: `${color}20`, color }}>
                  {step}
                </div>
                <h3 className="font-bold text-slate-100 mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative z-10 px-5 pb-28">
        <div className="max-w-3xl mx-auto">
          <div className="glass rounded-3xl p-12 text-center relative overflow-hidden">
            <div
              className="absolute inset-0 rounded-3xl"
              style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(6,182,212,0.08))' }}
            />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-100 mb-4 leading-tight">
                Ready to illuminate<br />your thinking?
              </h2>
              <p className="text-slate-400 mb-8 max-w-sm mx-auto">
                Start capturing your ideas today — completely free, no sign-up required.
              </p>
              <Link to="/new" className="btn-primary px-10 py-3.5 text-base">
                Create Your First Note &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-white/[0.05] py-8 px-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="gradient-text font-black text-lg">LUMINARY</span>
          <span className="text-slate-600 text-sm">
            Built with ✦ passion — notes app by a creative mind
          </span>
          <div className="flex gap-5 text-sm text-slate-500">
            <Link to="/dashboard" className="hover:text-slate-300 transition-colors">Dashboard</Link>
            <Link to="/notes"     className="hover:text-slate-300 transition-colors">Notes</Link>
            <Link to="/new"       className="hover:text-slate-300 transition-colors">New Note</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
