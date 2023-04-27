import React, { useState, useEffect, useCallback, useMemo } from "react";
import Footer from "./footer";
import Menu from "./menu";

import styles from "../styles/layout.module.scss";
import MenuMobile from "./menuMobile";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [bgMenu, setBgMenu] = useState<boolean>(false);

  const [isActive, setIsActive] = useState<boolean>(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const menuStyle = useMemo(
    () => ({
      background: isActive ? "#1a1a1a" : bgMenu ? "#1a1a1a" : "transparent",
    }),
    [isActive, bgMenu]
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

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setIsActive(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.containLayout}>
      <div className={styles.containMenu} style={menuStyle}>
        <Menu toggle={handleToggle} state={isActive} />
      </div>
      {isActive && <MenuMobile toggle={handleToggle} />}

      {children}
      <div className={styles.containFooter}>
        <Footer />
      </div>
    </div>
  );
}
