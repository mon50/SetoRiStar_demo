"use client";
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { login, logout } from '../user/userSlice';
import supabase from '../../../utils/supabase/supabaseClient';
import { useRouter } from 'next/navigation';
import { GetEqualAuthId } from '@/app/api/sql/getUserData';

const LoginHook: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(event);
      if (event === 'SIGNED_IN') {
        try {
          const { user } = session ?? {};
          console.log(user);
          const userData = await GetEqualAuthId(user);

          const iconURL = userData?.display_image ?? 'http://flat-icon-design.com/f/f_object_163/s512_f_object_163_0bg.png';

          dispatch(
            login({
              uid: userData?.user_id ?? 'no_user_id',
              auth_id: user?.id ?? 'no_auth_id',
              photo: iconURL,
              email: user?.email ?? 'no_email',
              displayName: userData?.display_name ?? 'no_display_name',
            })
          );
          // ログイン後のリダイレクト処理を追加
          router.push('/main');
        } catch (error) {
          console.error('Error during sign-in:', error);
        }
      } else if (event === 'SIGNED_OUT') {
        dispatch(logout());
      }
    });

    // クリーンアップ関数を追加
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [dispatch, router]);

  return null;
};

export default LoginHook;