import React, { Fragment } from 'react';
import './Navbar.css'
import { Switch, Route, Link } from 'react-router-dom';

import Register from './../register/Register';
import Login from './../login/Login';

import CharactersList from './../character/characters-list/CharactersList';
import CharacterDetails from './../character/character-details/CharacterDetails';
import CharacterEdit from './../character/character-edit/CharacterEdit';
import CharacterCreate from './../character/character-create/CharacterCreate';

import WeaponsList from './../weapon/weapons-list/WeaponsList';
import WeaponDetails from './../weapon/weapon-details/WeaponDetails';
import WeaponEdit from './../weapon/weapon-edit/WeaponEdit';
import WeaponCreate from './../weapon/weapon-create/WeaponCreate';

import SpaceshipsList from './../spaceship/spaceships-list/SpaceshipsList';
import SpaceshipDetails from './../spaceship/spaceship-details/SpaceshipDetails';
import SpaceshipEdit from './../spaceship/spaceship-edit/SpaceshipEdit';
import SpaceshipCreate from './../spaceship/spaceship-create/SpaceshipCreate';

import PlanetsList from './../planet/planets-list/PlanetsList';
import PlanetDetails from './../planet/planet-details/PlanetDetails';
import PlanetEdit from './../planet/planet-edit/PlanetEdit';
import PlanetCreate from './../planet/planet-create/PlanetCreate';

import StoriesList from './../story/stories-list/StoriesList';
import MoviesList from './../movie/movies-list/MoviesList';

const Navbar = ({ setUser, logout }) => {
    const userRole = localStorage.getItem('role');

    if (userRole && userRole === 'Admin') {
        return (
            <div className="Navbar">
                <Fragment>
                    <Link to="/logout">Logout</Link>
                    <br />
                    <Link to="/characters">characters</Link> <Link to="/character/create">create character</Link>
                    <br />
                    <Link to="/weapons">weapons</Link> <Link to="/weapon/create">create weapon</Link>
                    <br />
                    <Link to="/spaceships">spaceships</Link> <Link to="/spaceship/create">create spaceship</Link>
                    <br />
                    <Link to="/planets">planets</Link> <Link to="/planet/create">create planet</Link>
                    <br />
                    <Link to="/stories">stories</Link>
                    <br />
                    <Link to="/movies">movies</Link>
                </Fragment>

                {/* Character */}
                <Route path="/characters" component={CharactersList} />
                <Route path="/character/details/:characterId" component={CharacterDetails} />
                <Route path="/character/edit/:characterId" component={CharacterEdit} />
                <Route path="/character/create" component={CharacterCreate} />

                {/* Weapon */}
                <Route path="/weapons" component={WeaponsList} />
                <Route path="/weapon/details/:weaponId" component={WeaponDetails} />
                <Route path="/weapon/edit/:weaponId" component={WeaponEdit} />
                <Route path="/weapon/create" component={WeaponCreate} />

                {/* Spaceship */}
                <Route path="/spaceships" component={SpaceshipsList} />
                <Route path="/spaceship/details/:spaceshipId" component={SpaceshipDetails} />
                <Route path="/spaceship/edit/:spaceshipId" component={SpaceshipEdit} />
                <Route path="/spaceship/create" component={SpaceshipCreate} />

                {/* Planet */}
                <Route path="/planets" component={PlanetsList} />
                <Route path="/planet/details/:planetId" component={PlanetDetails} />
                <Route path="/planet/edit/:planetId" component={PlanetEdit} />
                <Route path="/planet/create" component={PlanetCreate} />

                <Route path="/stories" component={StoriesList} />
                <Route path="/movies" component={MoviesList} />
            </div>
        );
    } else if (userRole && userRole === 'User') {
        return (
            <div className="Navbar">
                <Fragment>
                    <Link to="/logout">Logout</Link>
                    <br />
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

                {/* Character */}
                <Route path="/characters" component={CharactersList} />
                <Route path="/character/details/:characterId" component={CharacterDetails} />

                {/* Weapon */}
                <Route path="/weapons" component={WeaponsList} />
                <Route path="/weapon/details/:weaponId" component={WeaponDetails} />

                {/* Spaceship */}
                <Route path="/spaceships" component={SpaceshipsList} />
                <Route path="/spaceship/details/:spaceshipId" component={SpaceshipDetails} />

                {/* Planet */}
                <Route path="/planets" component={PlanetsList} />
                <Route path="/planet/details/:planetId" component={PlanetDetails} />

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
                    <br />
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

                <Switch>
                    <Route path="/register" component={Register} />
                    <Route path="/login" render={() => <Login setUser={setUser} />} />
                    <Route path="/characters" component={CharactersList} />
                    <Route path="/weapons" component={WeaponsList} />
                    <Route path="/spaceships" component={SpaceshipsList} />
                    <Route path="/planets" component={PlanetsList} />
                    <Route path="/stories" component={StoriesList} />
                    <Route path="/movies" component={MoviesList} />
                </Switch>
            </div>
        );
    }
};

export default Navbar;
