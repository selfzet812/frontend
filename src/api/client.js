import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const getNotes     = (params)    => api.get('/notes', { params })
export const getNote      = (id)        => api.get(`/notes/${id}`)
export const createNote   = (data)      => api.post('/notes', data)
export const updateNote   = (id, data)  => api.put(`/notes/${id}`, data)
export const deleteNote   = (id)        => api.delete(`/notes/${id}`)
export const getStats     = ()          => api.get('/stats')
export const getCategories = ()         => api.get('/categories')

export const registerApi  = (data)      => api.post('/auth/register', data)
export const loginApi     = (data)      => api.post('/auth/login', data)
