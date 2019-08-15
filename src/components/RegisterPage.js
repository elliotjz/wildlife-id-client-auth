import React from 'react';
import { Link } from 'react-router-dom'
import Auth from '../Auth';

class Register extends React.Component {
  state = {
    email: "",
    username: "",
    password: "",
    errorMessage: "",
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  registerSubmit = async event => {
    event.preventDefault();
    const { email, username, password } = this.state;
    const data = { email, username, password };
    const res = await fetch('https://wildlife-id-api-staging.herokuapp.com/auth/register',
      {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    const resJson = await res.json();
    
    if (res.status !== 200 && res.status !== 201) {
      // Error
      const err = resJson.err.toString();
      this.setState({ errorMessage: err });
    } else {
      Auth.authenticateUser(resJson.token);
      this.props.loginCallback();
    }
  }

  render() {
    const { errorMessage } = this.state;
    return (
      <div>
          <h1>Register</h1>
          <form onSubmit={this.registerSubmit}>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                onChange={this.onChange}
              />
            </div>
            <div>
              <label>Username</label>
              <input
                type="text"
                name="username"
                onChange={this.onChange}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={this.onChange}
              />
            </div>
            <button type="submit">Register</button>
          </form>
          {errorMessage !== "" && <p>{errorMessage}</p>}
          <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    );
  }
};

export default Register;
