// hooks/useAuth.ts
import { useAppSelector } from "@/lib/hooks"; // あなたのstoreの型定義ファイルに応じてパスを調整してください

const useAuth = () => {
  const user = useAppSelector((state) => state.user.user);
  const signIn = useAppSelector((state) => state.user.signIn);
  return { user, signIn };
};

export default useAuth;