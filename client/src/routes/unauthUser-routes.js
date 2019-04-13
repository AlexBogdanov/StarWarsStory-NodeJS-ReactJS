import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import Register from './../components/register/Register';
import Login from './../components/login/Login';
import CharacterList from './../components/character/characters-list/CharactersList';
import WeaponList from './../components/weapon/weapons-list/WeaponsList';
import PlanetList from './../components/planet/planets-list/PlanetsList';
import SpaceshipList from './../components/spaceship/spaceships-list/SpaceshipsList';
import MovieList from './../components/movie/movies-list/MoviesList';

const UnauthUserRoutes = ({ notifHandler, openLogin, toggleLogin, openRegister, toggleRegister }) => {
    return (
        <Fragment>
            <Login notifHandler={notifHandler} isOpen={openLogin} toggle={toggleLogin} />
            <Register notifHandler={notifHandler} isOpen={openRegister} toggle={toggleRegister} />
            <Switch>
                <Route exact path="/characters" render={({ history }) => <CharacterList history={history} notifHandler={notifHandler} />} />
                <Route exact path="/weapons" render={({ history }) => <WeaponList history={history} notifHandler={notifHandler} />} />
                <Route exact path="/planets" render={({ history }) => <PlanetList history={history} notifHandler={notifHandler} />} />
                <Route exact path="/spaceships" render={({ history }) => <SpaceshipList history={history} notifHandler={notifHandler} />} />
                <Route exact path="/movies" render={({ history }) => <MovieList history={history} notifHandler={notifHandler} />} />
            </Switch>
        </Fragment>
    );
};

export default UnauthUserRoutes;
