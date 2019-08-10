import React from 'react';

const LogoutBtn = ({ loggedIn, handleLogout }) => {
  return (
    <div>
    {
      loggedIn && (
        <button onClick={handleLogout}>
          Logout
        </button>
      )
    }
    </div>
  );
};

export default LogoutBtn;
