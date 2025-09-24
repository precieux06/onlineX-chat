import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(true)

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      } else {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        alert('Check your email for verification link!')
      }
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  // Styles inline pour éviter Tailwind
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    card: {
      maxWidth: '400px',
      width: '100%',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '20px',
      padding: '40px',
      color: 'white'
    },
    title: {
      textAlign: 'center',
      fontSize: '32px',
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #22d3ee, #3b82f6)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
      marginBottom: '10px'
    },
    input: {
      width: '100%',
      padding: '15px',
      margin: '10px 0',
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '10px',
      color: 'white',
      fontSize: '16px'
    },
    button: {
      width: '100%',
      padding: '15px',
      background: 'linear-gradient(45deg, #06b6d4, #3b82f6)',
      border: 'none',
      borderRadius: '10px',
      color: 'white',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '20px'
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>SocialSphere</h1>
        <p style={{textAlign: 'center', color: '#d1d5db', marginBottom: '30px'}}>
          {isLogin ? 'Connectez-vous à votre compte' : 'Rejoignez notre communauté'}
        </p>

        <form onSubmit={handleAuth}>
          <input
            type="email"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          
          <input
            type="password"
            placeholder="Votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <button 
            type="submit" 
            disabled={loading}
            style={{...styles.button, opacity: loading ? 0.6 : 1}}
          >
            {loading ? 'Chargement...' : (isLogin ? 'Se connecter' : "S'inscrire")}
          </button>
        </form>

        <button 
          onClick={() => setIsLogin(!isLogin)}
          style={{
            background: 'none',
            border: 'none',
            color: '#60a5fa',
            cursor: 'pointer',
            marginTop: '15px',
            width: '100%',
            textAlign: 'center'
          }}
        >
          {isLogin ? "Pas de compte ? S'inscrire" : 'Déjà un compte ? Se connecter'}
        </button>

        <p style={{textAlign: 'center', color: '#9ca3af', fontSize: '12px', marginTop: '30px'}}>
          Rejoignez la révolution sociale
        </p>
      </div>
    </div>
  )
}
