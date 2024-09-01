import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // const session = supabase.auth.getSession()
    // // console.log(session)

    // setUser(session?.user ?? null)
    // setLoading(false)

    // const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
    //   console.log('Auth state changed:', event, session)

    //   setUser(session?.user ?? null)
    //   setLoading(false)
    // })

    // return () => {
    //   listener?.unsubscribe?.()
    // }

    const getUserSession = async () => {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession()

      if (error) {
        console.error('Error getting session:', error)
      } else {
        console.log('Session:', session.user.email)
        console.log('Session:', session.user.id)
        setUser(session?.user ?? null)
      }

      setLoading(false)
    }

    getUserSession()

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      // console.log('Auth state changed:', event, session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      listener?.unsubscribe?.()
    }
  }, [])

  const value = {
    // 회원가입 후 자동 로그인 방지
    signUp: async (data) => {
      const { user, error } = await supabase.auth.signUp(data)

      if (error) {
        console.error('Signup error:', error)
        return { error }
      }

      // 여기서 로그인을 따로 진행하지 않고, 필요한 경우 사용자가 직접 로그인을 시도
      return { user }
    },
    signIn: (data) => supabase.auth.signInWithPassword(data),
    signOut: () => supabase.auth.signOut(),
    user
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
