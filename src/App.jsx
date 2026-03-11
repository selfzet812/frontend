import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Notes from './pages/Notes'
import NotePage from './pages/NotePage'
import NewNote from './pages/NewNote'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/:id" element={<NotePage />} />
        <Route path="/new" element={<NewNote />} />
      </Route>
    </Routes>
  )
}
