import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetCourseByIdQuery, useEnrollMutation } from '../services/apiSlice';

const CourseDetailPage = () => {
  const { id } = useParams(); 
  const { data, error, isLoading } = useGetCourseByIdQuery(id);
  const [enroll, { isLoading: isEnrolling, isError, isSuccess }] = useEnrollMutation();
  const user = JSON.parse(localStorage.getItem('user'));

  if (isLoading) return <p>Loading course details...</p>;

  if (error) {
    console.error('Error fetching course details:', error);
    return <p>Error loading course details: {error.data?.message || error.message || 'Unknown error'}</p>;
  }

  const course = data?.data.course;

  const handleEnroll = async () => {
    try {
      await enroll({ courseId: course._id }).unwrap();
    } catch (err) {
      console.error('Error enrolling in course:', err);
    }
  };

  return (
    <div>
      <h1>{course?.title}</h1>
      <p>{course?.description}</p>
      {user && (
        <button onClick={handleEnroll} disabled={isEnrolling}>
          {isEnrolling ? 'Enrolling...' : 'Enroll'}
        </button>
      )}
      {isError && <p>Error enrolling in course.</p>}
      {isSuccess && <p>Successfully enrolled in the course!</p>}
    </div>
  );
};

export default CourseDetailPage;
