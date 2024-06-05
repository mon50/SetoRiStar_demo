"use client";
import { Button, Icon } from "@mui/material";
import styles from "./home.button.module.css";
import { useRouter } from "next/navigation";
import StarIcon from '@mui/icons-material/Star';

export default function HomeButton() {
    const router = useRouter();

    const handleClick = () => {
      router.push('/main');
    };

  return (
      <Button className={`${styles.button} ${styles.horizontal}`} onClick={handleClick}>
        <StarIcon className={styles.icon}></StarIcon>
        <p className={styles.text}>SetoRiStar</p>
      </Button>
  );
}