import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function createSupabaseServerClient() {
  const cookieStore = await cookies() // ✅ await here

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () =>
        cookieStore.getAll().map(({ name, value }) => ({ name, value: value ?? '' })),
      setAll: () => {
        console.warn('⚠️ setAll not implemented — set cookies in middleware or API routes.')
      },
    },
  })
}
