import { createClient } from "@/utils/supabase/server"
import ArtistProfile  from "./ArtistProfile"

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
    <ArtistProfile artistId = {params.artistId} user= {user}/>

    </>
  )
}