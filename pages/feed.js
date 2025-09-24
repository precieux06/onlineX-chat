import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import CreatePost from '../components/CreatePost'

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

  // Fonction pour afficher les posts directement
  const renderPosts = () => {
    if (!posts || posts.length === 0) {
      return <div className="no-posts">Aucun post à afficher</div>
    }

    return (
      <div className="feed">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <h3>{post.profiles?.username || 'Utilisateur inconnu'}</h3>
            <p>{post.content}</p>
            <small>{new Date(post.created_at).toLocaleDateString()}</small>
          </div>
        ))}
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container">
        <div>Veuillez vous connecter pour voir le fil d'actualité</div>
      </div>
    )
  }

  return (
    <div className="container">
      <h1>Fil d'actualité</h1>
      <CreatePost onPostCreated={fetchPosts} />
      {renderPosts()}
    </div>
  )
        }
