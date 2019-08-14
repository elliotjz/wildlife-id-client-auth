import React from 'react';

import Auth from '../Auth'

const LogoutBtn = ({ loggedIn, logoutCallback }) => {
  return (
    <div>
    {
      loggedIn && (
        <button onClick={() => {
          Auth.deauthenticateUser();
          logoutCallback();
        }}>
          Logout
        </button>
      )
    }
    </div>
  );
};

export default LogoutBtn;
