import Link from 'next/link';
import styles from "./nav.module.css";

export default function NavLinks() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">D&D Party Manager</Link>
        </div>
        
        <ul className={styles.navList}>
          <li>
            <Link className={styles.navLink} href="/">
              Home
            </Link>
          </li>   
          <li>
            <Link className={styles.navLink} href="/filter/all">
              Classes
            </Link>
          </li> 
        </ul>
      </div>
    </nav>
  );
}