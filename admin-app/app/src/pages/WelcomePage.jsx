import React from 'react';
import styles from '../styles/WelcomePage.module.css';

const WelcomePage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Welcome, Admin!</h1>
        <p className={styles.subtitle}>Here's an overview of the admin dashboard.</p>
      </header>
      <section className={styles.stats}>
        <div className={styles.card}>
          <h2>Course Statistics</h2>
          <p>Number of Courses: 35</p>
          <p>Active Enrollments: 120</p>
        </div>
        <div className={styles.card}>
          <h2>Recent Activities</h2>
          <ul>
            <li>New course "Advanced React" added.</li>
            <li>5 new withdrawal requests received.</li>
          </ul>
        </div>
        <div className={styles.card}>
          <h2>System Health</h2>
          <p>Status: All systems operational</p>
        </div>
      </section>
      <footer className={styles.footer}>
        <p>&copy; 2024 Your Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default WelcomePage;
