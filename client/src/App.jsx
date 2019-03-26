import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import Navbar from './components/navbar/Navbar';
import Register from './components/register/Register';
import Login from './components/login/Login';

//Character
import CharactersList from './components/character/characters-list/CharactersList';
import CharacterDetails from './components/character/character-details/CharacterDetails';
import CharacterCreate from './components/character/character-create/CharacterCreate';
import CharacterEdit from './components/character/character-edit/CharacterEdit';

import { userRoles } from './constants/common';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole: ''
    };

    this.setUser = this.setUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
  }

  setUser(userRole) {
    this.setState({ userRole });
  }

  removeUser() {
    this.setState({ userRole: '' });
  }

  render() {
    return (
      <div className="App">
        <Navbar removeUser={this.removeUser} />
        <NotificationContainer />

        {this.state.userRole === userRoles.ADMIN ?
        <Switch>
          <Route path="/characters" component={CharactersList} />
          <Route path="/character/:characterId" component={CharacterDetails} />
          <Route path="/character/create" component={CharacterCreate} />
          <Route path="/character/edit/:characterId" component={CharacterEdit} />
        </Switch>
        : this.state.userRole === userRoles.USER ?
        <Switch>
          <Route path="/characters" component={CharactersList} />
          <Route path="/character/:characterId" component={CharacterDetails} />
        </Switch>
        :
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" render={() => <Login setUser={this.setUser} />} />
          <Route path="/characters" component={CharactersList} />
        </Switch>
        }
      </div>
    );
  }
}

export default App;
