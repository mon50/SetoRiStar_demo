import FavoriteArtistList from "./favoriteArtist-list"


export default async function FavoritePage({
    params,
    searchParams,
  }: {
    params: { userId: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }) {
    return <FavoriteArtistList userId={params.userId}/>
}

