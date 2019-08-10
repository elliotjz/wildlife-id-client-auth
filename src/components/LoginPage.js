import React from 'react';
import { Link } from 'react-router-dom'

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
    const res = await fetch('http://localhost:8080/auth/login',
      {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      }
    );

    if (res.status !== 200) {
      // Error
      const resJson = await res.json();
      const err = resJson.err.toString();
      this.setState({ errorMessage: err });
    } else {
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