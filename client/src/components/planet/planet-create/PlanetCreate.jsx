import React, { Component, Fragment } from 'react';
import './PlanetCreate.css';
import Loader from 'react-loader-spinner';

import planetService from './../../../services/planet-service';
import characterService from './../../../services/character-service';
import { OK } from './../../../constants/http-responses';
import { errorNotifs } from '../../../constants/notification-messages';
import { notifTypes } from '../../../constants/common';

class PlanetCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            info: '',
            affilations: '',
            climate: '',
            terrain: '',
            images: '',
            natives: [],

            characters: [],
            currNative: '',
            isLoading: false
        };

        this.addCharacter = this.addCharacter.bind(this);
        this.removeCharacter = this.removeCharacter.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.setState({ isLoading: true });

        characterService.getAllCharacters()
          .then(res => {
            if (res.status === OK) {
                res.json().then(response => {
                    this.setState({ characters: response.data.characters, isLoading: false });
                });
            } else {
                res.json().then(() => {
                    this.props.notifHandler(errorNotifs.SOMETHING_WENT_WRONG, notifTypes.error);
                    setTimeout(() => { this.props.history.push('/vehicles'); }, 2000);
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

        if (this.state.natives.includes(character)) {
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

        const images = this.state.images.split(', ').filter(img => img);

        if (this.state.name.length < 3) {
            this.props.notifHandler(errorNotifs.PLANET_NAME_TOO_SHORT, notifTypes.error);
            this.setState({ isLoading: false });
            return;
        }

        if (this.state.info.length < 10) {
            this.props.notifHandler(errorNotifs.PLANET_INFO_TOO_SHORT, notifTypes.error);
            this.setState({ isLoading: false });
            return;
        }

        if (images.length < 1) {
            this.props.notifHandler(errorNotifs.IMAGE_IS_REQUIRED, notifTypes.error);
            this.setState({ isLoading: false });
            return;
        }

        const natives = this.state.natives.map(native => native.name);

        const planet = {
            name: this.state.name,
            info: this.state.info,
            affialtions: this.state.affilations.split(', ').filter(aff => aff),
            climate: this.state.climate,
            terrain: this.state.terrain,
            images,
            natives
        };

        planetService.createPlanet(planet)
          .then(res => {
            if (res.status === OK) {
                res.json().then(response => {
                    this.props.notifHandler(response.data.msg, notifTypes.success);
                    setTimeout(() => { this.props.history.push(`/planet/${response.data.planetId}`); }, 2000);
                });
            } else {
                res.json().then(err => {
                    this.props.notifHandler(err.message, notifTypes.error);
                    this.setState({ isLoading: false });
                });
            }
          });
    }

    render() {
        return (
            <div className="PlanetCreate">
                {
                    this.state.isLoading ?
                    <Loader type="Ball-Triangle" color="#00BFFF" height="750" />
                    :
                    <form onSubmit={this.handleSubmit}>
                        <label>Name:</label>
                        <br />
                        <input type="text" name="name" onChange={this.handleChange} />
                        <br />
                        <label>Info:</label>
                        <br />
                        <textarea type="text" name="info" onChange={this.handleChange}></textarea>
                        <br />
                        <label>Affilations:</label>
                        <br />
                        <textarea type="text" name="affilations" onChange={this.handleChange}></textarea>
                        <br />
                        <label>Climate:</label>
                        <br />
                        <input type="text" name="climate" onChange={this.handleChange} />
                        <br />
                        <label>Terrain:</label>
                        <br />
                        <input type="text" name="terrain" onChange={this.handleChange} />
                        <br />
                        <label>Images:</label>
                        <br />
                        <textarea type="text" name="images" onChange={this.handleChange}></textarea>
                        <br />

                        <label>Add native:</label>
                        <br />
                        <input type="text" name="currNative" value={this.state.currNative} onChange={this.handleChange} />
                        <button type="button" onClick={this.addCharacter}>Add</button>
                        <br />

                        {this.state.natives.length > 0 ?
                        <Fragment>
                            <ul>
                                {this.state.natives.map((character, index) => {
                                    return (
                                        <li key={index}>{character.name} <button type="button" onClick={() => this.removeCharacter(character.name)}>X</button></li>
                                    );
                                })}
                            </ul>
                        </Fragment>
                        : null}
                        <br />

                        <button type="submit">Create</button>
                    </form>
                }
            </div>
        );
    };
};

export default PlanetCreate;
