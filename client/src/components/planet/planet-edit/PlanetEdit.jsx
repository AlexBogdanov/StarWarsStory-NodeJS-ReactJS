import React, { Component, Fragment } from 'react';
import './PlanetEdit.css';
import Loader from 'react-loader-spinner';

import planetService from './../../../services/planet-service';
import characterService from './../../../services/character-service';
import { OK } from './../../../constants/http-responses';
import { notifTypes } from '../../../constants/common';
import { errorNotifs } from '../../../constants/notification-messages';

class PlanetEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            planetId: '',
            info: '',
            affilations: '',
            climate: '',
            terrain: '',
            images: '',
            natives: [],
            currNative: '',
            characters: [],
            isLoading: false
        };

        this.addCharacter = this.addCharacter.bind(this);
        this.removeCharacter = this.removeCharacter.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.setState({ isLoading: true });
        const planetId = this.props.match.params.planetId;

        planetService.getPlanetById(planetId)
          .then(res => {
            if (res.status === OK) {
                res.json().then(response => {
                    this.setState({
                        planetId,
                        info: response.data.planet.info,
                        affilations: response.data.planet.affilations.join(', '),
                        climate: response.data.planet.climate,
                        terrain: response.data.planet.terrain,
                        images: response.data.planet.images.join(', '),
                        natives: response.data.planet.natives
                    });
                });

                characterService.getAllCharacters()
                .then(res => {
                    if (res.status === OK) {
                        res.json().then(response => {
                            this.setState({ characters: response.data.characters, isLoading: false });
                        });
                    } else {
                        res.json().then(() => {
                            this.props.notifHanlder(errorNotifs.SOMETHING_WENT_WRONG, notifTypes.error);
                            setTimeout(() => { this.props.history.push('/planets'); }, 2000);
                        });
                    }
                });
            } else {
                res.json().then(err => {
                    this.props.notifHanlder(err.message, notifTypes.error);
                    setTimeout(() => { this.props.history.push('/planets'); }, 2000);
                });
            }
          });
    }

    addCharacter() {
        const character = this.state.characters.find(ch => ch.name === this.state.currNative);

        if (!character) {
            this.props.notifHandler(errorNotifs.INVALID_CHARACTER, notifTypes.warning);
            return;
        }

        if (this.state.natives.find(ch => ch.name === this.state.currNative)) {
            this.props.notifHandler(errorNotifs.CHARACTER_ALREADY_ADDED, notifTypes.warning);
            return;
        }



        const newNatives = this.state.natives.slice();
        newNatives.push(character);

        this.setState({ natives: newNatives, currNative: '' });
    }

    removeCharacter(name) {
        const character = this.state.natives.find(ch => ch.name === name);
        const index = this.state.natives.indexOf(character);
        const newNatives = this.state.natives.slice();
        newNatives.splice(index, 1);

        this.setState({ natives: newNatives });
    }

    handleChange(e) {
        const change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ isLoading: true });

        if (this.state.info.length < 10) {
            this.props.notifHandler(errorNotifs.PLANET_INFO_TOO_SHORT, notifTypes.error);
            this.setState({ isLoading: false });
            return;
        }

        const images = this.state.images.split(', ').filter(img => img);

        if (images.length < 1) {
            this.props.notifHandler(errorNotifs.IMAGE_IS_REQUIRED, notifTypes.error);
            this.setState({ isLoading: false });
            return;
        }

        const natives = this.state.natives.map(native => native.name);

        const planet = {
            info: this.state.info,
            affilations: this.state.affilations.split(', ').filter(aff => aff),
            climate: this.state.climate,
            terrain: this.state.terrain,
            images,
            natives
        };

        planetService.editPlanet(this.state.planetId, planet)
          .then(res => {
            if (res.status === OK) {
                res.json().then(response => {
                    this.props.notifHandler(response.data.msg, notifTypes.success);
                    setTimeout(() => { this.props.history.push(`/planet/${this.state.planetId}`); }, 2000);
                });
            } else {
                res.json().then(err => {
                    this.setState({ isLoading: false });
                    this.props.notifHandler(err.message, notifTypes.error);
                });
            }
          });
    }

    render() {
        return (
            <div className="PlanetEdit">
                {
                    this.state.isLoading ?
                    <Loader type="Ball-Triangle" color="#00BFFF" height="750" />
                    :
                    <form onSubmit={this.handleSubmit}>
                        <label>Info:</label>
                        <br />
                        <textarea type="text" name="info" value={this.state.info} onChange={this.handleChange}></textarea>
                        <br />
                        <label>Affilations:</label>
                        <br />
                        <textarea type="text" name="affilations" value={this.state.affilations} onChange={this.handleChange}></textarea>
                        <br />
                        <label>Climate:</label>
                        <br />
                        <input type="text" name="climate" value={this.state.climate} onChange={this.handleChange} />
                        <br />
                        <label>Terrain:</label>
                        <br />
                        <input type="text" name="terrain" value={this.state.terrain} onChange={this.handleChange} />
                        <br />
                        <label>Images:</label>
                        <br />
                        <textarea type="text" name="images" value={this.state.images} onChange={this.handleChange}></textarea>
                        <br />

                        <label>Add native:</label>
                        <br />
                        <input type="text" name="currNative" value={this.state.currNative} onChange={this.handleChange} />
                        <button type="button" onClick={this.addCharacter}>Add</button>
                        <br />

                        {
                            this.state.natives.length > 0 ?
                            <Fragment>
                                <ul>
                                    {this.state.natives.map((character, index) => {
                                        return(
                                            <li key={index} >{character.name} <button type="button" onClick={() => this.removeCharacter(character.name)}>X</button></li>
                                        );
                                    })}
                                </ul>
                            </Fragment>
                            : null
                        }
                        <br />

                        <button type="submit">Edit</button>
                    </form>
                }
            </div>
        );
    };
};

export default PlanetEdit;
