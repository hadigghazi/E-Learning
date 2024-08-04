import React from 'react';
import { useGetMyCoursesQuery } from '../services/apiSlice';
import { useNavigate } from 'react-router-dom';

const MyCoursesPage = () => {
  const { data, error, isLoading } = useGetMyCoursesQuery();
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate(); 

  const handleCourseClick = (id) => {
    navigate(`/courses/${id}`);
  };

  if (isLoading) return <p>Loading your courses...</p>;

  if (error) {
    console.error('Error fetching your courses:', error);
    return <p>Error loading your courses: {error.data?.message || error.message || 'Unknown error'}</p>;
  }

  const courses = data?.data.courses || [];

  return (
    <div>
      <h1>My Courses</h1>
      {courses.length > 0 ? (
        <ul>
          {courses.map((course) => (
            <li key={course._id} onClick={() => handleCourseClick(course._id)}>
              <h2>{course.title}</h2>
              <p>{course.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>You are not enrolled in any courses.</p>
      )}
    </div>
  );
};

export default MyCoursesPage;
