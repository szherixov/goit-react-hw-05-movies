import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

function Navigation() {
  return (
    <nav>
      <ul className={styles.navList}>
        <li>
          <NavLink exact to="/" className={styles.link} activeClassName={styles.active}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/movies" className={styles.link} activeClassName={styles.active}>
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
