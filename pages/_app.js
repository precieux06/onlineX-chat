import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return <Component {...pageProps} user={user} />
}