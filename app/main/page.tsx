//app/main/page.tsx
import { createClient } from "@/utils/supabase/server"
import MainForm from "./main-form"

export default async function Main() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return <MainForm user={user} />
}