import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const NAV_LINKS = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/notes',     label: 'Notes' },
]

export default function Navbar() {
  const { isAuth, email, logout } = useAuth()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <div className="max-w-7xl mx-auto">
        <div
          className="glass rounded-2xl px-5 py-3 flex items-center justify-between"
          style={{ boxShadow: '0 4px 30px rgba(0,0,0,0.35)' }}
        >
          <Link to="/" className="flex items-center gap-2.5 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L10 6H15L11 9.5L12.5 15L8 11.5L3.5 15L5 9.5L1 6H6L8 1Z" fill="white" />
              </svg>
            </div>
            <span className="font-black text-lg tracking-tight gradient-text">LUMINARY</span>
          </Link>

          <div className="hidden sm:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-violet-600/20 text-violet-300 border border-violet-500/25'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {isAuth ? (
              <>
                <span className="hidden sm:block text-xs text-slate-500 max-w-[140px] truncate">
                  {email}
                </span>
                <Link to="/new" className="btn-primary text-xs py-2 px-4 gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
                    <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  New Note
                </Link>
                <button
                  onClick={logout}
                  className="btn-secondary text-xs py-2 px-3"
                  title="Sign out"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-secondary text-xs py-2 px-4">
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary text-xs py-2 px-4">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
