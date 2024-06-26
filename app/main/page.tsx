//app/main/page.tsx
import { createClient } from "@/utils/supabase/server"
import MainForm from "./main-form"
import { redirect } from "next/navigation"

export default async function Main() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/signin')
  }

  return <MainForm user={user} />
}