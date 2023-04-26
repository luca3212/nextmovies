import React, { useState, useEffect, useCallback, useMemo } from "react";
import Footer from "./footer";
import Menu from "./menu";

import styles from "../styles/layout.module.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [bgMenu, setBgMenu] = useState<boolean>(false);

  const menuStyle = useMemo(
    () => ({
      background: bgMenu ? "#1a1a1a" : "transparent",
      // : "linear-gradient(360deg, transparent, #0d0d0e)",
    }),
    [bgMenu]
  );

  const handleScroll = useCallback(() => {
    if (window.scrollY > 0) {
      setBgMenu(true);
    } else {
      setBgMenu(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className={styles.containLayout}>
      <div className={styles.containMenu} style={menuStyle}>
        <Menu />
      </div>
      {children}
      <div className={styles.containFooter}>
        <Footer />
      </div>
    </div>
  );
}
