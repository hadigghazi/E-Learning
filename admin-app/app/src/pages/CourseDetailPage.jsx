import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCourseByIdQuery, useGetStudentsInCourseQuery } from '../services/apiSlice';

const CourseDetailPage = () => {
  const { id } = useParams();
  const { data: courseData, error: courseError, isLoading: courseLoading } = useGetCourseByIdQuery(id);
  const { data: studentsData, error: studentsError, isLoading: studentsLoading } = useGetStudentsInCourseQuery(id);

  if (courseLoading || studentsLoading) return <p>Loading course details...</p>;

  if (courseError) {
    console.error('Error fetching course details:', courseError);
    return <p>Error loading course details: {courseError.data?.message || courseError.message || 'Unknown error'}</p>;
  }

  if (studentsError) {
    console.error('Error fetching enrolled students:', studentsError);
    return <p>Error loading enrolled students: {studentsError.data?.message || studentsError.message || 'Unknown error'}</p>;
  }

  const course = courseData?.data.course;
  const students = studentsData?.data.students;

  return (
    <div>
      <h1>{course?.title}</h1>
      <p>{course?.description}</p>
      
      <h2>Enrolled Students</h2>
      {students && students.length > 0 ? (
        <ul>
          {students.map(student => (
            <li key={student._id}>{student.name}</li>
          ))}
        </ul>
      ) : (
        <p>No students enrolled in this course.</p>
      )}
    </div>
  );
};

export default CourseDetailPage;
