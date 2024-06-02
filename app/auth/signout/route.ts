import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation';
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = createClient()

  // Check if a user's logged in
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    await supabase.auth.signOut()
  }

  revalidatePath('/')
  return NextResponse.redirect(new URL('/signin', req.url), {
    status: 302,
  })
}
