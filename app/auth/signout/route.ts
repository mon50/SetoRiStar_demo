import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = createClient()

  // Check if a user's logged in
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    await supabase.auth.signOut()
  }
  cookies().delete('__session');//TODOこの処理が正しいか確認
  revalidatePath('/')
  revalidatePath('/main')
  return NextResponse.redirect(new URL('/signin', req.url), {
    status: 302,
  })
}