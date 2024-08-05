import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useGetCoursesQuery } from '../services/apiSlice';
import styles from '../styles/CoursesPage.module.css';  

const CoursesPage = () => {
  const { data, error, isLoading } = useGetCoursesQuery();
  const navigate = useNavigate(); 
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (isLoading) return <p>Loading courses...</p>;

  if (error) {
    console.error('Error fetching courses:', error);
    return <p>Error loading courses: {error.data?.message || error.message || 'Unknown error'}</p>;
  }

  const courses = data?.data.courses || [];

  const handleCourseClick = (id) => {
    navigate(`/courses/${id}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Explore Courses</h1>
      <p className={styles.greeting}>{user ? `Hello ${user.name} 👋! Enjoy The Courses` : 'Hello! Enjoy The Courses'}</p>
      {courses.length > 0 ? (
        <ul className={styles.courseList}>
          {courses.map((course) => (
            <li key={course._id} className={styles.courseItem} onClick={() => handleCourseClick(course._id)}>
              <h2 className={styles.courseTitle}>{course.title}</h2>
              <p className={styles.courseDescription}>{course.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No courses available</p>
      )}
    </div>
  );
};

export default CoursesPage;
