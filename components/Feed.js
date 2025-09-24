// components/Feed.js
export default function Feed({ posts }) {
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
