import ArtistSchedule from "./artist-scedule"

export default async function ArtistPage({
  params,
  searchParams,
}: {
  params: { artistId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  console.log(params.artistId)

  return (
    <>

    <ArtistSchedule artistId = {params.artistId}/>
    </>
  )
}