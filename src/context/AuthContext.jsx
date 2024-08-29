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
        console.log('Session:', session)
        setUser(session?.user ?? null)
      }

      setLoading(false)
    }

    getUserSession()

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      listener?.unsubscribe?.()
    }
  }, [])

  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signInWithPassword(data),
    signOut: () => supabase.auth.signOut(),

    user
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
