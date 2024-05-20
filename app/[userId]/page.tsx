// pages/[userId]/page.tsx
"use client";
import { useAppSelector } from '@/lib/hooks';
import { Link } from "@mui/material";

const UserPage = () => {
    const loginState = useAppSelector((state) => state.user.signIn);
    const userData = useAppSelector((state) => state.user.user);
    console.log(loginState)
    console.log(userData)

  return (
    <div>
        <Link href={'/main'}>←Back to Home</Link>
        <h1>User Name</h1>
      <h1>User ID: {userData?.uid}</h1>
      {/* ユーザーIDに基づいたコンテンツを表示 */}
      <h2>User Name: {userData?.displayName}</h2>
      <h3>Email: {userData?.email}</h3>
      <img src={userData?.photo} alt="user icon" />
      <br/>
      <Link href={`/${userData?.uid}/list`}>Schedule→</Link>
    </div>
  );
};

export default UserPage;