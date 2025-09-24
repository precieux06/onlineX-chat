import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import CreatePost from '../components/CreatePost'
import Feed from '../components/Feed'

export default function FeedPage({ user }) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (user) {
      fetchPosts()
      subscribeToPosts()
    }
  }, [user])

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        profiles:user_id (username, avatar_url),
        likes (id, user_id),
        comments (id, content, created_at, profiles:user_id (username))
      `)
      .order('created_at', { ascending: false })
    
    if (!error) setPosts(data || [])
  }

  const subscribeToPosts = () => {
    return supabase
      .channel('posts')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'posts' },
        (payload) => {
          setPosts(current => [payload.new, ...current])
        }
      )
      .subscribe()
  }

  if (!user) {
    return <div>Veuillez vous connecter</div>
  }

  return (
    <div className="container">
      <h1>Fil d'actualité</h1>
      <CreatePost onPostCreated={fetchPosts} />
      <Feed posts={posts} />
    </div>
  )
}