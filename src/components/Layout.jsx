import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className="min-h-screen grid-bg relative" style={{ backgroundColor: '#07071a' }}>
      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="animate-orb1 absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.12]"
          style={{ background: 'radial-gradient(circle at center, #7c3aed, transparent 70%)' }}
        />
        <div
          className="animate-orb2 absolute -bottom-32 -right-32 w-[420px] h-[420px] rounded-full opacity-[0.10]"
          style={{ background: 'radial-gradient(circle at center, #06b6d4, transparent 70%)' }}
        />
      </div>

      <Navbar />

      <main className="relative z-10 pt-24 pb-16">
        <Outlet />
      </main>
    </div>
  )
}
