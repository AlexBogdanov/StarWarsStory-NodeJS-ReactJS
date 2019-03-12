import React, { Component } from 'react';
import './App.css';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import Navbar from './components/navbar/Navbar';
import { successNotifs } from './constants/notification-messages';

class App extends Component {
  constructor() {
    super();
    this.setUser = this.setUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  setUser(user) {
    localStorage.setItem('userId', user.id);
    localStorage.setItem('username', user.username);
    localStorage.setItem('role', user.roles.includes('Admin') ? 'Admin' : 'User');
  }

  logout() {
    localStorage.clear();
    NotificationManager.success(successNotifs.LOGOUT_SUCCESSFULL);
    setTimeout(() => window.location.href = '/', 1500);
  }

  render() {
    return (
      <div className="App">
        <Navbar setUser={this.setUser} logout={this.logout} />
        <NotificationContainer />
      </div>
    );
  }
}

export default App;
