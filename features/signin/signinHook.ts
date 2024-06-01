"use server";
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation';

export async function signinHook() {
  const supabase = createClient()

  const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
    console.log(event); //TODO: onAuthStateChangeが発火していない状態。原因を調査し、修正
    if (event === 'SIGNED_IN') {
      const { user } = session ?? {};
      console.log(user);
      console.log('User signed in<Sign In hook>');

    } else if (event === 'SIGNED_OUT') {
      console.log('User signed out<Sign In hook>');
      
    } else if (event === 'USER_UPDATED') {
      const { user } = session ?? {};
      
    }
  });

}