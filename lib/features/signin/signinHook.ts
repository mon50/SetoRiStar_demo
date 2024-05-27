"use server";
import { createClient } from '@/utils/supabase/server'
import {login,logout, update} from '@/lib/features/user/userSlice'
import { useAppDispatch } from '@/lib/hooks';
import { redirect } from 'next/navigation';

export async function signinHook() {
  const supabase = createClient()
  const dispatch = useAppDispatch();

  const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
    console.log(event); //TODO: onAuthStateChangeが発火していない状態。原因を調査し、修正
    if (event === 'SIGNED_IN') {
      const { user } = session ?? {};
      console.log(user);

      dispatch(
        login( //TODO: loginの引数を修正
        {
            user_id: user?.app_metadata?.user_id ?? 'no id',
            auth_id: user?.id,
            email: user?.email,
        })
      );
      // ログイン後のリダイレクト処理を追加
      redirect('/main')

    } else if (event === 'SIGNED_OUT') {
      dispatch(logout());
    } else if (event === 'USER_UPDATED') {
      const { user } = session ?? {};
      dispatch(
        update( //TODO: updateの引数を修正
        {
            user_id: user?.app_metadata?.user_id ?? 'no id',
            auth_id: user?.id,
            display_image: user?.app_metadata?.display_image ?? 'no image',
            email: user?.email,
            display_name: user?.app_metadata?.display_name ?? 'no name',
            birthday: user?.app_metadata?.birthday ?? 'no birthday',
            updated_at: user?.updated_at,
        })
      );
    }
  });

}