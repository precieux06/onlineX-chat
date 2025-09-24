// components/CreatePost.js
import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function CreatePost({ onPostCreated }) {  // ✅ Correction du nom de prop
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim()) return

    setLoading(true)
    try {
      const { error } = await supabase
        .from('posts')
        .insert([{ content }])
      
      if (!error) {
        setContent('')
        onPostCreated()  // ✅ Appel correct de la fonction
      }
    } catch (error) {
      console.error('Error creating post:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="create-post">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Quoi de neuf ?"
        rows={3}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Publication...' : 'Publier'}
      </button>
    </form>
  )
}
