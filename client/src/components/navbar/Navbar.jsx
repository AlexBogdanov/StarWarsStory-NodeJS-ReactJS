import React, { Fragment } from 'react';
import './Navbar.css';
import { Link, Switch, Route } from 'react-router-dom';

import { userRoles } from './../../constants/common';

import Register from './../register/Register';
import Login from './../login/Login';

// Character
import CharacterList from './../character/characters-list/CharactersList';
import CharacterDetails from './../character/character-details/CharacterDetails';
import CharacterCreate from './../character/character-create/CharacterCreate';
import CharacterEdit from './../character/character-edit/CharacterEdit';

// Weapon
import WeaponCreate from './../weapon/weapon-create/WeaponCreate';
import WeaponDetails from './../weapon/weapon-details/WeaponDetails';

const Navbar = (props) => {
    const logout = () => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/';
    };

    const userRole = localStorage.getItem('userRole')
        ? localStorage.getItem('userRole') : sessionStorage.getItem('userRole');
        
    return (
        <div className="Navbar">
            {
                userRole === userRoles.ADMIN ?
                <Fragment>
                    {/* Character */}
                    <Link to="/characters">Characters</Link>
                    <br />
                    <Link to="/character/create">Create character</Link>
                    <br />

                    {/* Weapon */}
                    <Link to="/weapon/create">Create weapon</Link>
                    <br />

                    <button onClick={logout}>Logout</button>
                </Fragment>
                : userRole === userRoles.USER ?
                <Fragment>
                    <Link to="/characters">Characters</Link>
                    <br />
                    <button onClick={logout}>Logout</button>
                </Fragment>
                :
                <Fragment>
                    <Link to="/register">Register</Link>
                    <br />
                    <Link to="/login">Login</Link>
                </Fragment>
            }

            {
                userRole === userRoles.ADMIN ?
                <Switch>
                    {/* Character */}
                    <Route path="/characters" render={({ history }) => <CharacterList history={history} notifHandler={props.notifHandler} />} />
                    <Route path="/character/create" render={({ history }) => <CharacterCreate history={history} notifHandler={props.notifHandler} />} />
                    <Route path="/character/edit/:characterId" render={({ match, history }) => <CharacterEdit match={match} history={history} notifHandler={props.notifHandler} />} />
                    <Route path="/character/:characterId" render={({ match, history }) => <CharacterDetails match={match} history={history} notifHandler={props.notifHandler} />} />

                    {/* Weapon */}
                    <Route path="/weapon/create" render={({ history }) => <WeaponCreate history={history} notifHandler={props.notifHandler} />} />
                    <Route path="/weapon/:weaponId" render={({ match, history }) => <WeaponDetails match={match} history={history} notifHandler={props.notifHandler} />} />
                </Switch>
                : userRole === userRoles.USER ?
                <Switch>
                    <Route path="/characters" render={({ history }) => <CharacterList history={history} notifHandler={props.notifHandler} />} />
                    <Route path="/character/:characterId" render={({ match, history }) => <CharacterDetails match={match} history={history} notifHandler={props.notifHandler} />} />
                    <Route path="/weapon/:weaponId" render={({ match, history }) => <WeaponDetails match={match} history={history} notifHandler={props.notifHandler} />} />
                </Switch>
                :
                <Switch>
                    <Route path="/register" render={() => <Register notifHandler={props.notifHandler} />} />
                    <Route path="/login" render={() => <Login notifHandler={props.notifHandler} />} />
                    <Route path="/characters" render={({ history }) => <CharacterList history={history} notifHandler={props.notifHandler} />} />
                </Switch>
            }
        </div>
        );
};

export default Navbar;
