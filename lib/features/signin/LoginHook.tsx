"use client";
import { useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { useAppDispatch } from '../../hooks';
import { login, logout } from '../user/userSlice';
import { useAppSelector } from '../../hooks';
import React from 'react';


type Props = {
  children: React.ReactNode;
};

const LoginHook: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.user);
  console.log(user);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log('user is', authUser);
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return <>{children}</>;
};

export default LoginHook;