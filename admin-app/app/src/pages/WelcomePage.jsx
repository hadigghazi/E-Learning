import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/WelcomePage.module.css';

const WelcomePage = () => {
  return (
    <div className={styles.welcomeContainer}>
      <h1 className={styles.title}>Welcome to CourseHub!</h1>
      <p className={styles.description}>
        CourseHub is your go-to platform for discovering, enrolling, and managing your online courses. Join our community and start learning today!
      </p>
      <div className={styles.features}>
        <div className={styles.feature}>
          <h2>Discover Courses</h2>
          <p>Browse through a variety of courses and find the perfect one for you.</p>
        </div>
        <div className={styles.feature}>
          <h2>Enroll Easily</h2>
          <p>Sign up and enroll in courses with just a few clicks.</p>
        </div>
        <div className={styles.feature}>
          <h2>Track Your Progress</h2>
          <p>Keep track of your enrolled courses and monitor your progress.</p>
        </div>
      </div>
      <div className={styles.cta}>
        <Link to="/login" className={styles.button}>Log In</Link>
        <Link to="/register" className={styles.button}>Sign Up</Link>
      </div>
    </div>
  );
};

export default WelcomePage;
