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