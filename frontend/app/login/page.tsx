// app/login/page.tsx
'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    console.log(data)

    if (error) {
      setError(error.message)
    } else {
      router.push('/account')
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl mb-4">Log In</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input className="w-full border p-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full border p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-red-600">{error}</p>}
        <button className="bg-black text-white px-4 py-2 w-full">Login</button>
      </form>
    </div>
  )
}
