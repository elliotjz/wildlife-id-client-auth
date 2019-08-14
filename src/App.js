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
import Auth from './Auth'

class App extends React.Component {
  reloadComponent = () => {
    this.forceUpdate();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <LogoutBtn
            loggedIn={Auth.isUserAuthenticated()}
            logoutCallback={this.reloadComponent}
          />
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
              render={props => Auth.isUserAuthenticated() ? (
                <Redirect to={{ pathname: "/account" }} />
              ) : (
                <LoginPage {...props} loginCallback={this.reloadComponent}/>
              )}/>
            <Route
              exact
              path="/register"
              render={props => Auth.isUserAuthenticated() ? (
                <Redirect to={{ pathname: "/account" }} />
              ) : (
                <RegisterPage {...props} loginCallback={this.reloadComponent}/>
              )}/>
            <Route
              render={() =>
                Auth.isUserAuthenticated() ? <AccountPage /> : <Redirect to={{ pathname: "/login" }} />
              }/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
