import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Auth from '../components/Auth'
import { supabase } from '../lib/supabase'

export default function Home({ user }) {
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/feed')
    }
  }, [user, router])

  if (user) {
    return <div>Redirection...</div>
  }

  return (
    <div className="container">
      <h1>Bienvenue sur SocialApp</h1>
      <Auth />
    </div>
  )
}