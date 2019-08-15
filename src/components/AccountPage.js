import React from 'react';
import Auth from '../Auth'

class Account extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    this.getUserDetails();
  }

  getUserDetails = async () => {
    // Get auth token
    const token = Auth.getToken();

    // Request user data

    // You must include the JWT token as the authorization
    // header whenever requesting resources from protected
    // endpoints.
    const res = await fetch('https://wildlife-id-api-staging.herokuapp.com/users/me',
    {
      headers: {
        Authorization: `JWT ${token}`,
      }
    });

    // TODO: Error checking
    const resJson = await res.json();
    this.setState({
      user: resJson.user
    })
  }

  render() {
    const { user } = this.state
    return (
      <div>
        <h1>Account</h1>
        <p>Ya'll only see this if you've logged in</p>
        {user && (
          <div>
            <p>Logged in as:</p>
            <p>{user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Account;
