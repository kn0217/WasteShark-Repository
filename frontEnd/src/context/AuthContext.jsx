/**
 * Authentication Context - Implements JWT-based Authentication Pattern
 * 
 * UML ANALYSIS:
 * This component implements a Singleton pattern for global authentication state.
 * It acts as a Facade, providing a simple interface to complex authentication logic.
 * 
 * ARCHITECTURAL PATTERNS:
 * 1. Context Pattern: Provides global authentication state
 * 2. Facade Pattern: Simplifies authentication operations
 * 3. Observer Pattern: Components re-render when auth state changes
 * 
 * JWT FLOW:
 * 1. Login -> Store token in localStorage
 * 2. Validate token on app mount
 * 3. Logout -> Clear token from localStorage
 */

import { createContext, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

// Context creation: Singleton pattern for global auth state
const AuthContext = createContext(null)

// Custom hook for accessing auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

// AuthProvider Component: Manages authentication state for entire app
export const AuthProvider = ({ children }) => {
  // State Management: User data and authentication token
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [loading, setLoading] = useState(true)

  // Initialize: Check for existing session on mount
  useEffect(() => {
    // TODO: Backend Integration - Validate JWT token
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // Login Handler: Implements JWT authentication flow
  const login = async (email, password) => {
    try {
      // TODO: Integrate with backend POST /login endpoint
      // Current implementation: Mock JWT token generation
      const mockToken = 'mock-jwt-token-' + Date.now()
      const mockUser = { email, id: '1', name: 'User' }
      
      // Store credentials: Persist to localStorage for session management
      setToken(mockToken)
      setUser(mockUser)
      localStorage.setItem('token', mockToken)
      localStorage.setItem('user', JSON.stringify(mockUser))
      
      toast.success('Login successful!')
      return { success: true }
    } catch (error) {
      toast.error('Login failed. Please try again.')
      return { success: false, error }
    }
  }

  // Logout Handler: Clears authentication state
  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    toast.success('Logged out successfully')
  }

  // Authorization Check: Determines if user is authenticated
  const isAuthenticated = () => {
    return !!token
  }

  // Context Value: Exposed API for child components
  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated,
    loading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
