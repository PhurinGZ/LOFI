import React, { useState } from 'react';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending a password reset email
    console.log(`Password reset email sent to: ${email}`);
    // You can add logic here to send a request to the server for password reset
    // and handle the response accordingly.
    // For now, let's just close the modal.
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={openModal}>Forgot Password?</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <form onSubmit={handleSubmit}>
              <label>
                Email:
                <input type="email" value={email} onChange={handleEmailChange} />
              </label>
              <button type="submit">Send Email</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
