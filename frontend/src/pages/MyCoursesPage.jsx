import React from 'react';
import { useGetMyCoursesQuery } from '../services/apiSlice';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/MyCoursesPage.module.css';

const MyCoursesPage = () => {
  const { data, error, isLoading } = useGetMyCoursesQuery();
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate(); 

  const handleCourseClick = (id) => {
    navigate(`/courses/${id}`);
  };

  if (isLoading) return <p className={styles.message}>Loading your courses...</p>;

  if (error) {
    console.error('Error fetching your courses:', error);
    return <p className={styles.message}>Error loading your courses: {error.data?.message || error.message || 'Unknown error'}</p>;
  }

  const courses = data?.data.courses || [];

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>My Courses</h1>
      {courses.length > 0 ? (
        <ul className={styles.courseList}>
          {courses.map((course) => (
            <li key={course._id} onClick={() => handleCourseClick(course._id)} className={styles.courseItem}>
              <h2 className={styles.courseTitle}>{course.title}</h2>
              <p className={styles.courseDescription}>{course.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.message}>You are not enrolled in any courses.</p>
      )}
    </div>
  );
};

export default MyCoursesPage;
