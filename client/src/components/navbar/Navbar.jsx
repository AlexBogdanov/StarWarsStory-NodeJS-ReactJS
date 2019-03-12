import React, { Fragment } from 'react';
import './Navbar.css'
import { Switch, Route, Link } from 'react-router-dom';

import Register from './../register/Register';
import Login from './../login/Login';
import CharactersList from './../character/characters-list/CharactersList';
import WeaponsList from './../weapon/weapons-list/WeaponsList';
import SpaceshipsList from './../spaceship/spaceships-list/SpaceshipsList';
import PlanetsList from './../planet/planets-list/PlanetsList';
import StoriesList from './../story/stories-list/StoriesList';
import MoviesList from './../movie/movies-list/MoviesList';

const Navbar = ({ setUser, logout }) => {
    const user = localStorage.getItem('userId');

    if (user) {
        return (
            <div className="Navbar">
                <Fragment>
                    <Link to="/characters">characters</Link>
                    <br />
                    <Link to="/weapons">weapons</Link>
                    <br />
                    <Link to="/spaceships">spaceships</Link>
                    <br />
                    <Link to="/planets">planets</Link>
                    <br />
                    <Link to="/stories">stories</Link>
                    <br />
                    <Link to="/movies">movies</Link>
                </Fragment>

                <Route path="/characters" component={CharactersList} />
                <Route path="/weapons" component={WeaponsList} />
                <Route path="/spaceships" component={SpaceshipsList} />
                <Route path="/planets" component={PlanetsList} />
                <Route path="/stories" component={StoriesList} />
                <Route path="/movies" component={MoviesList} />
            </div>
        );
    } else {
        return (
            <div className="Navbar">
                <Fragment>
                    <Link to="/login">login</Link>
                    <br />
                    <Link to="/register">register</Link>
                </Fragment>

                <Switch>
                    <Route path="/register" component={Register} />
                    <Route path="/login" render={() => <Login setUser={setUser} />} />
                </Switch>
            </div>
        );
    }
};

export default Navbar;
