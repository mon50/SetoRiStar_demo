import supabase from "@/utils/supabase/supabaseClient";
import { User } from "@supabase/supabase-js";

export async function GetEqualAuthId(user:  User | undefined){
    const { data: userData, error } = await supabase
    .from('users')
    .select('display_image,user_id,display_name')
    .eq('auth_id', user?.id)
    .single();

  if (error) {
    console.error(error);
  }
  return userData;
}


export async function GetLiveIdEqualUserId(id: string | undefined) {
    const { data: liveIdsData, error: liveIdsError } = await supabase
        .from('user_live_schedules')
        .select('live_id')
        .eq('user_id', id);

    if (liveIdsError) {
        console.error('Error fetching live IDs:', liveIdsError);
        return [];
    }

    const liveIds = liveIdsData.map((item) => item.live_id);
    return liveIds;
}

export async function GetLiveSchedule(liveIds: number[]) {
    const { data: liveData, error: liveDataError } = await supabase
        .from('lives')
        .select(`
            *,
            artists (
                artist_name
            )
        `)
        .in('live_id', liveIds);

    if (liveDataError) {
        console.error('Error fetching live data:', liveDataError);
        return [];
    }

    return liveData;
}