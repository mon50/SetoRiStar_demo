import type { ReactNode } from "react";
// import { StoreProvider } from "./StoreProvider";
import "./styles/globals.css";
import styles from "./styles/layout.module.css";
import HomeButton from "./components/button/home/home.button";
import LogoutButton from "./components/button/logout/logout.button";
import Header from "./components/header/Header";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
      <html lang="jp">
        <body>
        {/* <StoreProvider> */}
          <section className={styles.container}>

            <header className={styles.header}>
              <Header />
            </header>

            <main className={styles.main}>{children}</main>

            <footer className={styles.footer}>
              <a> This is Footer</a>
            </footer>
          </section>
          {/* </StoreProvider> */}
        </body>
      </html>
  );
}
