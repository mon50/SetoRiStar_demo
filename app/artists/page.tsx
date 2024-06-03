import { createClient } from "@/utils/supabase/server"
import ArtistList from "./artists-list"

export default async function ArtistsPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return <ArtistList user={user}/>
}