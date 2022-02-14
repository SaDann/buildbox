import React from 'react';
import styles from './styles.module.scss';

function Header() {
  return (
    <header className={styles.topBar}>
        <img src="logo.png" />
    </header>
  );
}

export default Header;
