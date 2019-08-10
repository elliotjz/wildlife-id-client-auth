import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom";

import './App.css';
import LoginPage from './components/LoginPage';
import LogoutBtn from './components/LogoutBtn';
import HomePage from './components/HomePage';
import AccountPage from './components/AccountPage';
import RegisterPage from './components/RegisterPage';

class App extends React.Component {
  state = {
    loggedIn: false,
  }

  loginCallback = () => {
    this.setState({
      loggedIn: true,
    })
  }

  handleLogout = async () => {
    const res = await fetch('http://localhost:8080/auth/logout', {
      credentials: 'include',
    });
    if (res.status === 200) {
      this.setState({
        loggedIn: false,
      })
    }
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <Router>
        <div className="App">
          <LogoutBtn loggedIn={loggedIn} handleLogout={this.handleLogout} />
          <ul>
            <li>
              <Link to="/">Home Page</Link>
            </li>
            <li>
              <Link to="/account">My Account</Link>
            </li>
          </ul>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route
              exact
              path="/login"
              render={props => loggedIn ? (
                <Redirect to={{ pathname: "/account" }} />
              ) : (
                <LoginPage {...props} loginCallback={this.loginCallback}/>
              )}/>
            <Route
              exact
              path="/register"
              render={props => loggedIn ? (
                <Redirect to={{ pathname: "/account" }} />
              ) : (
                <RegisterPage {...props} loginCallback={this.loginCallback}/>
              )}/>
            <Route
              render={() =>
                loggedIn ? <AccountPage /> : <Redirect to={{ pathname: "/login" }} />
              }/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
