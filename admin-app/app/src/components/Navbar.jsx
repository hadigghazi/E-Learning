import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../services/apiSlice';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const loggedin = localStorage.getItem('token');

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>CourseHub</div>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/courses" className={styles.navLink}>Courses</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/add-course" className={styles.navLink}>Add Course</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/withdrawals" className={styles.navLink}>Withdrawals</Link>
        </li>
        {loggedin ? (
          <li className={styles.navItem}>
            <button onClick={handleLogout} className={styles.navButton}>Logout</button>
          </li>
        ) : (
          <>
            <li className={styles.navItem}>
              <Link to="/login" className={styles.navLink}>Login</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/register" className={styles.navLink}>Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
