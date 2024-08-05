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
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>CourseHub</Link> 
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <Link to="/courses" className={styles.link}>Courses</Link>
        </li>
        <li className={styles.listItem}>
          <Link to="/my-courses" className={styles.link}>My Courses</Link>
        </li>
        {loggedin ? (
          <li className={styles.listItem}>
            <button onClick={handleLogout} className={styles.button}>Logout</button>
          </li>
        ) : (
          <>
            <li className={styles.listItem}>
              <Link to="/login" className={styles.link}>Login</Link>
            </li>
            <li className={styles.listItem}>
              <Link to="/register" className={styles.link}>Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
