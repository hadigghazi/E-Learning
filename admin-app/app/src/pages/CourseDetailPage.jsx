import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCourseByIdQuery, useEnrollMutation, useWithdrawMutation, useGetMyCoursesQuery } from '../services/apiSlice';

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
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (myCoursesData) {
      const enrolledCourses = myCoursesData.data.courses || [];
      setIsEnrolled(enrolledCourses.some((course) => course._id === id));
    }
  }, [myCoursesData, id]);

  useEffect(() => {
    if (data && data.data.course) {
      // Fetch existing withdrawal status if available
      setWithdrawalStatus(data.data.course.withdrawalStatus || null);
    }
  }, [data]);

  if (isLoading) return <p>Loading course details...</p>;

  if (error) {
    console.error('Error fetching course details:', error);
    return <p>Error loading course details: {error.data?.message || error.message || 'Unknown error'}</p>;
  }

  const course = data?.data.course;

  const handleEnroll = async () => {
    try {
      await enroll({ courseId: course._id }).unwrap();
      refetch(); // Refresh the list of enrolled courses
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
      refetch(); // Refresh the list of enrolled courses
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
            withdraw?.data?.withdrawal?.status === 'pending' ? (
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
                <button onClick={handleWithdraw} disabled={isWithdrawing}>
                  {isWithdrawing ? 'Applying...' : 'Apply for Withdrawal'}
                </button>
              </div>
            )
          ) : (
            <button onClick={handleEnroll} disabled={isEnrolling}>
              {isEnrolling ? 'Enrolling...' : 'Enroll'}
            </button>
          )}
        </div>
      )}
      {isEnrollError && <p>Error enrolling in course.</p>}
      {isEnrollSuccess && <p>Successfully enrolled in the course!</p>}
      {isWithdrawError && <p>Error applying for withdrawal.</p>}
      {isWithdrawSuccess && <p>Successfully applied for withdrawal!</p>}
    </div>
  );
};

export default CourseDetailPage;
