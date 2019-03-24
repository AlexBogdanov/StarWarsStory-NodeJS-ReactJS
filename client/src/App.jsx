import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import Navbar from './components/navbar/Navbar';
import Register from './components/register/Register';
import Login from './components/login/Login';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Navbar />
        <NotificationContainer />

        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
