import React, { Component } from 'react';
import './App.css';

import Navbar from './components/navbar/Navbar';
import Content from './components/content/Content';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    }

    this.setUser = this.setUser.bind(this);
  }

  setUser(user) {
    this.setState({ user });
  }

  render() {
    return (
      <div className="App">
        <Navbar user={this.state.user} setUser={this.setUser} />
        <Content />
      </div>
    );
  }
}

export default App;
