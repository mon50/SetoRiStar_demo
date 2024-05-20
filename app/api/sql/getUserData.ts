import { InitialState } from "@/lib/Type";
import supabase from "@/lib/supabaseClient";
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
