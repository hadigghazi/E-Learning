import React, { useState } from 'react';
import { useRegisterMutation } from '../services/apiSlice';

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
      setError(''); // Clear error if registration is successful
    } catch (err) {
      console.error('Failed to register:', err);
      setError('Failed to register');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input type="password" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleChange} required />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={isLoading}>Register</button>
    </form>
  );
};

export default RegisterPage;
