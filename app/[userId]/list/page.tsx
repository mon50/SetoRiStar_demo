// pages/[userId]/page.tsx
import { createClient } from "@/utils/supabase/server"
import UserLiveForm from "./userLive-form"

export default async function UserPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return <UserLiveForm user={user} />
}
