// pages/[userId]/page.tsx
import { createClient } from "@/utils/supabase/server"
import UserForm from "./user-form"

export default async function UserPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return <UserForm user={user} />
}
