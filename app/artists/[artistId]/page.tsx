import { createClient } from "@/utils/supabase/server"
import ArtistSchedule from "./artist-scedule"

export default async function ArtistPage({
  params,
  searchParams,
}: {
  params: { artistId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  console.log(params.artistId)
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  
  return (
    <>

    <ArtistSchedule artistId = {params.artistId} user= {user}/>
    </>
  )
}