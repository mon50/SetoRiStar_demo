"use client";
import LoginHook from "@/lib/features/signin/LoginHook";
import { auth, googleProvider } from "@/lib/firebase";
import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";

const LoginWithGoogle = () => {
    const signIn = () => {
      signInWithPopup(auth, googleProvider).catch((error) => {
        alert(error.message);
      });
    };
  
    return (
      <LoginHook>
        {/* <h2>ログインページです。</h2> */}
        <Button onClick={signIn}>Googleでログイン</Button>
      </LoginHook>
    );
  };
  
  export default LoginWithGoogle;