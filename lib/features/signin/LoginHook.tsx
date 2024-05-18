"use client";
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { login, logout } from '../user/userSlice';
import { useAppSelector } from '../../hooks';
import React from 'react';
import supabase from '../../../lib/supabaseClient';

type Props = {
  children: React.ReactNode;
};

const LoginHook: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.user);
  console.log(user);

  useEffect(() => {
    const getUser = async () => {
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === 'SIGNED_IN') {
            const { user } = session ?? {};
            dispatch(
              login({
                uid: user?.id ?? '',
                photo: user?.user_metadata.avatar_url,
                email: user?.email ?? '',
                displayName: user?.user_metadata.display_name,
              })
            );
          } else if (event === 'SIGNED_OUT') {
            dispatch(logout());
          }
        }
      );

      return () => {
        authListener?.unsubscribe();
      };
    };

    getUser();
  }, [dispatch, supabase]);

  return <>{children}</>;
};

export default LoginHook;