import React from 'react';

class Account extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    this.getUserDetails();
  }

  getUserDetails = async () => {
    const res = await fetch('http://localhost:8080/auth/me', {
      credentials: 'include',
    });
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
