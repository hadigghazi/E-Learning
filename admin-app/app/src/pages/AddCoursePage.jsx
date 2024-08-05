import React, { useState } from 'react';
import { useAddCourseMutation } from '../services/apiSlice';
import styles from '../styles/AddCoursePage.module.css'; 

const AddCoursePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [addCourse, { isLoading, isSuccess, isError, error }] = useAddCourseMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCourse({ title, description }).unwrap();
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error('Failed to add course:', err);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Add New Class</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>Title:</label>
          <input
            type="text"
            id="title"
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>Description:</label>
          <textarea
            id="description"
            className={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Class'}
        </button>
      </form>
      {isSuccess && <p className={`${styles.message} ${styles.success}`}>Class added successfully!</p>}
      {isError && <p className={`${styles.message} ${styles.error}`}>Error adding class: {error.message}</p>}
    </div>
  );
};

export default AddCoursePage;
