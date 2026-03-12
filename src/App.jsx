import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Notes from './pages/Notes'
import NotePage from './pages/NotePage'
import NewNote from './pages/NewNote'
import Login from './pages/Login'
import Register from './pages/Register'

function ProtectedRoute({ children }) {
  const { isAuth } = useAuth()
  return isAuth ? children : <Navigate to="/login" replace />
}

function GuestRoute({ children }) {
  const { isAuth } = useAuth()
  return isAuth ? <Navigate to="/dashboard" replace /> : children
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<GuestRoute><Login /></GuestRoute>}
        />
        <Route
          path="/register"
          element={<GuestRoute><Register /></GuestRoute>}
        />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/notes"     element={<ProtectedRoute><Notes /></ProtectedRoute>} />
          <Route path="/notes/:id" element={<ProtectedRoute><NotePage /></ProtectedRoute>} />
          <Route path="/new"       element={<ProtectedRoute><NewNote /></ProtectedRoute>} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
