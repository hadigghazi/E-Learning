import React, { useState } from 'react';
import { useLoginMutation } from '../services/apiSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from '../styles/LoginPage.module.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData).unwrap();
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setError('');
      navigate('/courses');
    } catch (err) {
      console.error('Failed to login:', err);
      setError('Failed to login');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <button type="submit" disabled={isLoading} className={styles.button}>
        Login
      </button>
    </form>
  );
};

export default LoginPage;
