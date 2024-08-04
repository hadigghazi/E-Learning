import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetCourseByIdQuery } from '../services/apiSlice';

const CourseDetailPage = () => {
  const { id } = useParams(); 
  const { data, error, isLoading } = useGetCourseByIdQuery(id);

  if (isLoading) return <p>Loading course details...</p>;

  if (error) {
    console.error('Error fetching course details:', error);
    return <p>Error loading course details: {error.data?.message || error.message || 'Unknown error'}</p>;
  }

  const course = data?.data.course;

  return (
    <div>
      <h1>{course?.title}</h1>
      <p>{course?.description}</p>
    </div>
  );
};

export default CourseDetailPage;
