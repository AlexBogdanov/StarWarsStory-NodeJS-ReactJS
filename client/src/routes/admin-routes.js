import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './../components/home/Home';

// Character
import CharacterList from './../components/character/characters-list/CharactersList';
import CharacterDetails from './../components/character/character-details/CharacterDetails';
import CharacterCreate from './../components/character/character-create/CharacterCreate';
import CharacterEdit from './../components/character/character-edit/CharacterEdit';

// Weapon
import WeaponList from './../components/weapon/weapons-list/WeaponsList';
import WeaponDetails from './../components/weapon/weapon-details/WeaponDetails';
import WeaponCreate from './../components/weapon/weapon-create/WeaponCreate';
import WeaponEdit from './../components/weapon/weapon-edit/WeaponEdit';

// Planet
import PlanetList from './../components/planet/planets-list/PlanetsList';
import PlanetDetails from './../components/planet/planet-details/PlanetDetails';
import PlanetCreate from './../components/planet/planet-create/PlanetCreate';
import PlanetEdit from './../components/planet/planet-edit/PlanetEdit';

// Spaceship
import SpaceshipList from './../components/spaceship/spaceships-list/SpaceshipsList';
import SpaceshipDetails from './../components/spaceship/spaceship-details/SpaceshipDetails';
import SpaceshipCreate from './../components/spaceship/spaceship-create/SpaceshipCreate';
import SpaceshipEdit from './../components/spaceship/spaceship-edit/SpaceshipEdit';

// Movie
import MovieList from './../components/movie/movies-list/MoviesList';
import MovieDetails from './../components/movie/movie-details/MovieDetails';
import MovieCreate from './../components/movie/movie-create/MovieCreate';
import MovieEdit from './../components/movie/movie-edit/MovieEdit';

const AdminRoutes = (props) => {
    return (
        <Fragment>
            <CharacterCreate notifHandler={props.notifHandler} isOpen={props.openCharacterCreate} toggle={props.toggleCharacter} />
            <WeaponCreate notifHandler={props.notifHandler} isOpen={props.openWeaponCreate} toggle={props.toggleWeapon} />
            <PlanetCreate notifHandler={props.notifHandler} isOpen={props.openPlanetCreate} toggle={props.togglePlanet} />
            <SpaceshipCreate notifHandler={props.notifHandler} isOpen={props.openSpaceshipCreate} toggle={props.toggleSpaceship} />
            <MovieCreate notifHandler={props.notifHandler} isOpen={props.openMovieCreate} toggle={props.toggleMovie} />
            <Switch>
                <Route exact path="/" render={({ history }) => <Home history={history} />} />

                {/* Character */}
                <Route exact path="/characters" render={({ history }) => <CharacterList history={history} notifHandler={props.notifHandler} />} />
                <Route exact path="/character/edit/:characterId" render={({ match, history }) => <CharacterEdit match={match} history={history} notifHandler={props.notifHandler} />} />
                <Route exact path="/character/:characterId" render={({ match, history }) => <CharacterDetails match={match} history={history} notifHandler={props.notifHandler} />} />

                {/* Weapon */}
                <Route exact path="/weapons" render={({ history }) => <WeaponList history={history} notifHandler={props.notifHandler} />} />
                <Route exact path="/weapon/edit/:weaponId" render={({ match, history }) => <WeaponEdit match={match} history={history} notifHandler={props.notifHandler} />} />
                <Route exact path="/weapon/:weaponId" render={({ match, history }) => <WeaponDetails match={match} history={history} notifHandler={props.notifHandler} />} />

                {/* Planet */}
                <Route exact path="/planets" render={({ history }) => <PlanetList history={history} notifHandler={props.notifHandler} />} />
                <Route exact path="/planet/edit/:planetId" render={({ match, history }) => <PlanetEdit match={match} history={history} notifHandler={props.notifHandler} />} />
                <Route exact path="/planet/:planetId" render={({ match, history }) => <PlanetDetails match={match} history={history} notifHandler={props.notifHandler} />} />

                {/* Spaceship */}
                <Route exact path="/spaceships" render={({ history }) => <SpaceshipList history={history} notifHandler={props.notifHandler} />} />
                <Route exact path="/spaceship/edit/:spaceshipId" render={({ match, history }) => <SpaceshipEdit match={match} history={history} notifHandler={props.notifHandler} />} />
                <Route exact path="/spaceship/:spaceshipId" render={({ match, history }) => <SpaceshipDetails match={match} history={history} notifHandler={props.notifHandler} />} />
                       
                {/* Movie */}
                <Route exact path="/movies" render={({ history }) => <MovieList history={history} notifHandler={props.notifHandler} />} />
                <Route exact path="/movie/edit/:movieId" render={({ match, history }) => <MovieEdit match={match} history={history} notifHandler={props.notifHandler} />} />
                <Route exact path="/movie/:movieId" render={({ match, history }) => <MovieDetails match={match} history={history} notifHandler={props.notifHandler} />} />
            </Switch>
        </Fragment>
    );
};

export default AdminRoutes;
