import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import "./styles/globals.css";
import styles from "./styles/layout.module.css";
import { Link } from "@mui/material";
import LoginHook from "@/lib/features/signin/LoginHook";
import SignOutButton from "./components/button/Button.signout";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
      <html lang="jp">
        <body>
        <StoreProvider>
          <LoginHook/>
          <section className={styles.container}>

            <header className={styles.header}>
              <Link href={'/main'}>←BackToMain</Link>
              <SignOutButton/>
            </header>

            <main className={styles.main}>{children}</main>

            <footer className={styles.footer}>
              <a> This is Footer</a>
            </footer>
          </section>
          </StoreProvider>
        </body>
      </html>
  );
}
