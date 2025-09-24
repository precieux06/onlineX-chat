import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import CreatePost from '../components/CreatePost'

export default function FeedPage({ user }) {
  const [posts, setPosts] = useState([])

  // ... gardez tout le code existant ...

  const renderPosts = () => {
    if (!posts || posts.length === 0) {
      return <div>Aucun post à afficher</div>
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

  return (
    <div className="container">
      <h1>Fil d'actualité</h1>
      <CreatePost onPostCreated={fetchPosts} />
      {renderPosts()}
    </div>
  )
}
