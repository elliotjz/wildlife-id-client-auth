import React from 'react';
import { Link } from 'react-router-dom'
import Auth from '../Auth';

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errorMessage: "",
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  loginSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    const data = { email, password };
    const res = await fetch('https://wildlife-id-api.herokuapp.com/auth/login',
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

    if (res.status !== 200) {
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
        <h1>Login</h1>
        <form onSubmit={this.loginSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
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
          <button type="submit">Login</button>
        </form>
        {errorMessage !== "" && <p>{errorMessage}</p>}
        <p>Don't have an account yet? <Link to="/register">Register</Link></p>
      </div>
    );
  }
};

export default Login;