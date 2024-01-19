import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const history = useHistory();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      const response = await fetch(`/api/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });

      if (response.ok) {
        history.push('/login'); // Redirect to login page after successful password reset
      } else {
        const data = await response.json();
        setError(data.message || 'Error resetting password');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Internal Server Error');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <div>
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default ResetPassword;
