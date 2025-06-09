// app/account/page.tsx
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AccountPage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl">Welcome, {user.email}</h1>
      <p>This is your dashboard.</p>
    </div>
  )
}
