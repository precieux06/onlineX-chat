import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  const handleAuth = async (e) => {
    e.preventDefault()
    
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) alert(error.message)
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username: email.split('@')[0] }
        }
      })
      if (error) alert(error.message)
      else alert('Inscription réussie ! Vérifiez votre email.')
    }
  }

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>
      <form onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">
          {isLogin ? 'Se connecter' : "S'inscrire"}
        </button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Pas de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
      </button>
    </div>
  )
}