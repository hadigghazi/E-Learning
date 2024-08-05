import React, { useState } from 'react';
import { useGetWithdrawalsQuery, useUpdateWithdrawalStatusMutation, useDeleteWithdrawalMutation } from '../services/apiSlice';
import styles from '../styles/WithdrawalsPage.module.css'; 

const WithdrawalsPage = () => {
  const { data: withdrawalsData, error, isLoading } = useGetWithdrawalsQuery();
  const [updateStatus] = useUpdateWithdrawalStatusMutation();
  const [deleteWithdrawal] = useDeleteWithdrawalMutation();
  const [statusError, setStatusError] = useState(null);

  if (isLoading) return <p>Loading withdrawals...</p>;
  if (error) return <p>Error loading withdrawals: {error.message}</p>;

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateStatus({ id, status: newStatus }).unwrap();
    } catch (err) {
      setStatusError('Failed to update withdrawal status.');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this withdrawal request?')) {
      try {
        await deleteWithdrawal(id).unwrap();
      } catch (err) {
        setStatusError('Failed to delete withdrawal request.');
        console.error(err);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Withdrawal Requests</h1>
      {statusError && <p className={styles.error}>{statusError}</p>}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Course</th>
            <th>Student</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {withdrawalsData?.data?.withdrawals.map((withdrawal) => (
            <tr key={withdrawal._id}>
              <td>{withdrawal?.courseId?.title}</td>
              <td>{withdrawal?.userId?.name}</td>
              <td>{withdrawal?.reason}</td>
              <td>{withdrawal?.status}</td>
              <td>
                {withdrawal.status === 'pending' && (
                  <>
                    <button className={styles.button} onClick={() => handleStatusChange(withdrawal._id, 'approved')}>Approve</button>
                    <button className={styles.button} onClick={() => handleStatusChange(withdrawal._id, 'rejected')}>Reject</button>
                  </>
                )}
                <button className={`${styles.button} ${styles.button-danger}`} onClick={() => handleDelete(withdrawal._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WithdrawalsPage;
