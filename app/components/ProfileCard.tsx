import { Artist } from '@/types/ArtistType'
import { useRouter } from 'next/navigation';
import React from 'react'
import FavoriteButton from './button/favorite/favorite.button';
import QueueMusicTwoToneIcon from '@mui/icons-material/QueueMusicTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';

export default function ProfileCard ({artist,userId}: {artist: Artist,userId:string | null}) {
    const {artist_id, artist_name, artist_image, music_type} = artist;
    const router = useRouter();
    const handler = (path: string) => {
      router.push(path);
    }
  return (
    <div className="flex items-center justify-center h-screen">
    <div className="rounded-lg shadow-lg w-64">
      <div className="h-24 bg-green-600 rounded-t-lg" />
      <div className='w-32 h-32 rounded-full -mt-12 overflow-hidden mx-auto bg-green-100'>
        <img
          src={artist_image}
          height="100%"
          width="100%"
          className="rounded-full  border-4 border-white mx-auto object-contain"
          alt="Artist avatar"
        />
      </div>
      <div className="text-center mt-2">
        <h2 className="text-lg font-semibold">{artist_name}</h2>
        <p className="text-gray-500">{music_type}</p>
      </div>
      
      <div className="flex justify-around my-4">
        <div className="text-center w-1/3">
          <QueueMusicTwoToneIcon className="h-full" />
        </div>
        <div className="text-center  w-1/3">
          <FavoriteButton artistId={artist_id} userId={userId}/>
        </div>
        <div className="text-center w-1/3">
        <CalendarMonthTwoToneIcon className=" h-full" />
        </div>
      </div>
      <div className="px-6 py-6">
        <button className="w-full h-full bg-green-400 py-3 text-white rounded-lg" onClick={()=>handler(`/artists/${artist.artist_id}`)}>詳しく見る</button>
      </div>
    </div>
  </div>
  )
}
