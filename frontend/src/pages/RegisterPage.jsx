import React, { useState } from 'react';
import { useRegisterMutation } from '../services/apiSlice';
import styles from '../styles/RegisterPage.module.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });

  const [register, { isLoading }] = useRegisterMutation();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirm) {
      setError('Passwords do not match');
      return;
    }
    try {
      const user = await register(formData).unwrap();
      console.log('User registered:', user);
      setError('');
    } catch (err) {
      console.error('Failed to register:', err);
      setError('Failed to register');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className={styles.input} required />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} className={styles.input} required />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} className={styles.input} required />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Confirm Password:</label>
        <input type="password" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleChange} className={styles.input} required />
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <button type="submit" className={styles.button} disabled={isLoading}>Register</button>
    </form>
  );
};

export default RegisterPage;
