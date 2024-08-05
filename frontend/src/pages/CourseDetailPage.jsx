import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCourseByIdQuery, useEnrollMutation, useWithdrawMutation, useGetMyCoursesQuery, useGetFilesForCourseQuery } from '../services/apiSlice';

const CourseDetailPage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetCourseByIdQuery(id);
  const { data: myCoursesData, refetch } = useGetMyCoursesQuery();
  const [enroll, { isLoading: isEnrolling, isError: isEnrollError, isSuccess: isEnrollSuccess }] = useEnrollMutation();
  const [withdraw, { isLoading: isWithdrawing, isError: isWithdrawError, isSuccess: isWithdrawSuccess }] = useWithdrawMutation();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [withdrawalReason, setWithdrawalReason] = useState('');
  const [hasAppliedForWithdrawal, setHasAppliedForWithdrawal] = useState(false);
  const [withdrawalStatus, setWithdrawalStatus] = useState(null);
  const { data: filesData, error: filesError, isLoading: filesLoading } = useGetFilesForCourseQuery(id);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (myCoursesData) {
      const enrolledCourses = myCoursesData.data.courses || [];
      setIsEnrolled(enrolledCourses.some((course) => course._id === id));
    }
  }, [myCoursesData, id]);

  useEffect(() => {
    if (data && data.data.course) {
      setWithdrawalStatus(data.data.course.withdrawalStatus || null);
    }
  }, [data]);

  if (isLoading || filesLoading) return <p>Loading course details...</p>;

  if (error) {
    console.error('Error fetching course details:', error);
    return <p>Error loading course details: {error.data?.message || error.message || 'Unknown error'}</p>;
  }

  if (filesError) {
    console.error('Error fetching files:', filesError);
    return <p>Error loading files: {filesError.data?.message || filesError.message || 'Unknown error'}</p>;
  }

  const course = data?.data.course;
  const files = filesData?.data.files;

  const handleEnroll = async () => {
    try {
      await enroll({ courseId: course._id }).unwrap();
      refetch();
    } catch (err) {
      console.error('Error enrolling in course:', err);
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawalReason) {
      alert('Please provide a reason for withdrawal.');
      return;
    }

    try {
      const response = await withdraw({ courseId: course._id, userId: user._id, reason: withdrawalReason }).unwrap();
      setWithdrawalStatus(response.data.withdrawal.status);
      setHasAppliedForWithdrawal(true);
      refetch();
    } catch (err) {
      console.error('Error withdrawing from course:', err);
    }
  };

  return (
    <div>
      <h1>{course?.title}</h1>
      <p>{course?.description}</p>
      {user && (
        <div>
          {isEnrolled ? (
            withdrawalStatus === 'pending' ? (
              <div>
                <p>Your withdrawal request is pending approval.</p>
                <button disabled>Withdraw</button>
              </div>
            ) : (
              <div>
                <textarea
                  placeholder="Reason for withdrawal"
                  value={withdrawalReason}
                  onChange={(e) => setWithdrawalReason(e.target.value)}
                />
                <button onClick={handleWithdraw} disabled={isWithdrawing}>Withdraw</button>
                {isWithdrawError && <p>Error withdrawing: {isWithdrawError.message}</p>}
                {isWithdrawSuccess && <p>Withdrawal request submitted successfully!</p>}
              </div>
            )
          ) : (
            <button onClick={handleEnroll} disabled={isEnrolling}>Enroll</button>
          )}
        </div>
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
        <p>No files available for this course.</p>
      )}
    </div>
  );
};

export default CourseDetailPage;
