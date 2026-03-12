import { createContext, useContext, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [email, setEmail] = useState(() => localStorage.getItem('email'))
  const navigate = useNavigate()

  const login = useCallback((newToken, newEmail) => {
    localStorage.setItem('token', newToken)
    localStorage.setItem('email', newEmail)
    setToken(newToken)
    setEmail(newEmail)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    setToken(null)
    setEmail(null)
    navigate('/login')
  }, [navigate])

  return (
    <AuthContext.Provider value={{ token, email, login, logout, isAuth: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
