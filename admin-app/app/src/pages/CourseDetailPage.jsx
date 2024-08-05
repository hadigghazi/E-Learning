import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCourseByIdQuery, useGetStudentsInCourseQuery, useGetFilesForCourseQuery, useUploadFileMutation } from '../services/apiSlice';

const CourseDetailPage = () => {
  const { id } = useParams();
  const { data: courseData, error: courseError, isLoading: courseLoading } = useGetCourseByIdQuery(id);
  const { data: studentsData, error: studentsError, isLoading: studentsLoading } = useGetStudentsInCourseQuery(id);
  const { data: filesData, error: filesError, isLoading: filesLoading } = useGetFilesForCourseQuery(id);
  const [uploadFile] = useUploadFileMutation();
  const [selectedFile, setSelectedFile] = useState(null);

  if (courseLoading || studentsLoading || filesLoading) return <p>Loading course details...</p>;

  if (courseError) {
    console.error('Error fetching course details:', courseError);
    return <p>Error loading course details: {courseError.data?.message || courseError.message || 'Unknown error'}</p>;
  }

  if (studentsError) {
    console.error('Error fetching enrolled students:', studentsError);
    return <p>Error loading enrolled students: {studentsError.data?.message || studentsError.message || 'Unknown error'}</p>;
  }

  if (filesError) {
    console.error('Error fetching files:', filesError);
    return <p>Error loading files: {filesError.data?.message || filesError.message || 'Unknown error'}</p>;
  }

  const course = courseData?.data.course;
  const students = studentsData?.data.students;
  const files = filesData?.data.files;

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('courseId', id);
    try {
      await uploadFile(formData).unwrap();
    } catch (err) {
      console.error('Error uploading file:', err);
    }
  };

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

      <h2>Course Files</h2>
      {files && files.length > 0 ? (
        <ul>
          {files.map(file => (
            <li key={file._id}>
              <a href={`http://localhost:5000/api/v1/files/download/${file._id}`} download>
                {file.fileName}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No files uploaded for this course.</p>
      )}

      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload File</button>
    </div>
  );
};

export default CourseDetailPage;
