import React from 'react';

const ConfirmationSuccess: React.FC = () => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center min-vh-100 px-3 text-center"
      style={{
        backgroundColor: '#E6F5E9',
        color: '#212529',
        fontFamily: 'Poppins, sans-serif'
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
        rel="stylesheet"
      />

      <div className="p-4 bg-white rounded-3 shadow" style={{ maxWidth: '500px', width: '100%' }}>
        <h1 className="mb-3">✅ Email Confirmed</h1>
        <p className="mb-4">
          Thank you! Your email address has been successfully confirmed.
          You can now return to the TaskNote app and log in.
        </p>
        <a
          href="https://tasknote.app"
          className="btn btn-success px-4 py-2"
          style={{ fontWeight: 'bold', borderRadius: '6px' }}
        >
          Go to TaskNote
        </a>
      </div>
    </div>
  );
};

export default ConfirmationSuccess;
