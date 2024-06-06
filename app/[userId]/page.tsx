// pages/[userId]/page.tsx
import { createClient } from "@/utils/supabase/server"
import UserProfile from "./userProfile"

export default async function UserPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return <>
  <UserProfile user={user}/>
  </>
}
