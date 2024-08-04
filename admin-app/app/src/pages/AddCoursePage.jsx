import React, { useState } from 'react';
import { useAddCourseMutation } from '../services/apiSlice';

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
    <div>
      <h1>Add New Class</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Class'}
        </button>
      </form>
      {isSuccess && <p>Class added successfully!</p>}
      {isError && <p>Error adding class: {error.message}</p>}
    </div>
  );
};

export default AddCoursePage;
