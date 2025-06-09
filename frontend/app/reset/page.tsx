// app/reset/page.tsx
'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function ResetPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/update-password`,
    })
    setMessage(error ? error.message : 'Check your email for the reset link')
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl mb-4">Reset Password</h2>
      <form onSubmit={handleReset} className="space-y-4">
        <input className="w-full border p-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {message && <p className="text-blue-600">{message}</p>}
        <button className="bg-black text-white px-4 py-2 w-full">Send Reset Link</button>
      </form>
    </div>
  )
}
