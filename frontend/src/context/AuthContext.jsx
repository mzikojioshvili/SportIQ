import React, { createContext, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocalStorage } from '../hooks/useLocalStorage'
import client from '../api/client'
import { setUser, clearUser, fetchProfile } from '../store/store'

const AuthContext = createContext(undefined)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage('sportiq_token', null)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    if (token) {
      dispatch(fetchProfile())
    }
  }, [token, dispatch])

  const login = async (email, password) => {
    const response = await client.post('/api/auth/login', {
      email,
      password,
    })

    const { token: userToken, user: userData } = response.data

    setToken(userToken)
    dispatch(setUser(userData))
  }

  const register = async (payload) => {
    const response = await client.post('/api/auth/register', payload)

    const { token: userToken, user: userData } = response.data

    setToken(userToken)
    dispatch(setUser(userData))
  }

  const logout = () => {
    setToken(null)
    dispatch(clearUser())
  }

  const isAuthenticated = !!token && !!user.email

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}

export default AuthContext