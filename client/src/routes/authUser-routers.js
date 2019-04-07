import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import CharacterList from './../components/character/characters-list/CharactersList';
import CharacterDetails from './../components/character/character-details/CharacterDetails';
import WeaponList from './../components/weapon/weapons-list/WeaponsList';
import WeaponDetails from './../components/weapon/weapon-details/WeaponDetails';
import PlanetList from './../components/planet/planets-list/PlanetsList';
import PlanetDetails from './../components/planet/planet-details/PlanetDetails';
import SpaceshipList from './../components/spaceship/spaceships-list/SpaceshipsList';
import SpaceshipDetails from './../components/spaceship/spaceship-details/SpaceshipDetails';
import MovieList from './../components/movie/movies-list/MoviesList';
import MovieDetails from './../components/movie/movie-details/MovieDetails';

const AuthUserRoutes = ({ notifHandler }) => {
    return (
        <Fragment>
            <Switch>
                <Route exact path="/characters" render={({ history }) => <CharacterList history={history} notifHandler={notifHandler} />} />
                <Route exact path="/character/:characterId" render={({ match, history }) => <CharacterDetails match={match} history={history} notifHandler={notifHandler} />} />
                <Route exact path="/weapons" render={({ history }) => <WeaponList history={history} notifHandler={notifHandler} />} />
                <Route exact path="/weapon/:weaponId" render={({ match, history }) => <WeaponDetails match={match} history={history} notifHandler={notifHandler} />} />
                <Route exact path="/planets" render={({ history }) => <PlanetList history={history} notifHandler={notifHandler} />} />
                <Route exact path="/planet/:planetId" render={({ match, history }) => <PlanetDetails match={match} history={history} notifHandler={notifHandler} />} />
                <Route exact path="/spaceships" render={({ history }) => <SpaceshipList history={history} notifHandler={notifHandler} />} />
                <Route exact path="/spaceship/:spaceshipId" render={({ match, history }) => <SpaceshipDetails match={match} history={history} notifHandler={notifHandler} />} />
                <Route exact path="/movies" render={({ history }) => <MovieList history={history} notifHandler={notifHandler} />} />
                <Route exact path="/movie/:movieId" render={({ match, history }) => <MovieDetails match={match} history={history} notifHandler={notifHandler} />} />
            </Switch>
        </Fragment>
    );
}

export default AuthUserRoutes;
