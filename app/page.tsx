"use client";
import React, { useEffect } from 'react'
import { useAppSelector } from "@/lib/hooks";
import { usePathname, useRouter } from 'next/navigation';

export default function indexPage (){
    const pathname = usePathname();
    const loginState = useAppSelector((state) => state.user.signIn);
    const router = useRouter();

    useEffect(() => {
      // ユーザーがログインしていない場合は、/signinページにリダイレクト
      if (!loginState) {
        router.push('/signin');
      }else{
        if(pathname === '/'){
          router.push('/main');
        }
      }
    }, [loginState, router]);


    return (
        <div className="App">
          {loginState ? (
            <div>Loading...→Mainへ</div>
          ):(
            // Redirect to siginin page if user is not logged in
            <div>Loading...→サインインへ</div>
          )}
        </div>
    );
  }

