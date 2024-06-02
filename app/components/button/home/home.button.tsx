"use client";
import styles from "./home.button.module.css";
import { useRouter } from "next/navigation";

export default function HomeButton() {
    const router = useRouter();

    const handleClick = () => {
      router.push('/main');
    };

  return (
      <button className={`${styles.button} ${styles.horizontal}`} onClick={handleClick}>Home</button>
  );
}