import React, { Component } from 'react';
import './App.css';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { notifTypes } from './constants/common';

class App extends Component {
  constructor(props) {
    super(props);

    this.notifHandler = this.notifHandler.bind(this);
  }

  notifHandler(msg, type) {
    if (type === notifTypes.success) {
      NotificationManager.success(msg);
    } else if (type === notifTypes.error) {
      NotificationManager.error(msg);
    } else if (type === notifTypes.warning) {
      NotificationManager.warning(msg);
    } else if (type === notifTypes.info) {
      NotificationManager.info(msg);
    }
  }

  render() {
    return (
      <div className="App">
        <Navbar notifHandler={this.notifHandler} />
        <NotificationContainer />
        {/* <Footer /> */}
      </div>
    );
  }
}

export default App;
