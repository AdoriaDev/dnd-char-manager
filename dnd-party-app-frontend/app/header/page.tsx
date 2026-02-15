// StAuth10222: I Adoria Stevens, 000754661 certify that this material is my original work. 
// No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

import styles from './header.module.css';

export default function Header() {
  return (
    <header className={styles.heroHeader}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Welcome to the D&D Party Manager</h1>
        <p className={styles.heroSubtitle}>
          Manage your party quickly, easily, and efficiently to keep your game running smoothly
        </p>
      </div>
    </header>
  );
}