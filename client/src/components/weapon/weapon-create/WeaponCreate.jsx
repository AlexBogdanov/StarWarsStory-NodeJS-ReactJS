import React, { Component, Fragment } from 'react';
import './WeaponCreate.css';
import Loader from 'react-loader-spinner';

import weaponService from './../../../services/weapon-service';
import characterService from './../../../services/character-service';
import { OK } from './../../../constants/http-responses';
import { notifTypes } from './../../../constants/common';
import { errorNotifs } from './../../../constants/notification-messages';

class WeaponCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            affilations: '',
            info: '',
            images: '',
            owners: [],

            characters: [],
            currOwner: '',
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
                    setTimeout(() => { this.props.history.push('/weapons'); }, 2000);
                });
            }
          });
    }

    addCharacter() {
        const character = this.state.characters.find(ch => ch.name === this.state.currOwner);

        if (!character) {
            this.props.notifHandler(errorNotifs.INVALID_CHARACTER, notifTypes.warning);
            return;
        }

        if (this.state.owners.includes(character)) {
            this.props.notifHandler(errorNotifs.CHARACTER_ALREADY_ADDED, notifTypes.warning);
            return;
        }

        const newOwners = this.state.owners.slice();
        newOwners.push(character);

        this.setState({ owners: newOwners, currOwner: '' });
    }

    removeCharacter(name) {
        const character = this.state.owners.find(ch => ch.name === name);
        const index = this.state.owners.indexOf(character);
        const newOwners = this.state.owners.slice();
        newOwners.splice(index, 1);

        this.setState({ owners: newOwners });
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
            this.props.notifHandler(errorNotifs.WEAPON_NAME_TOO_SHORT, notifTypes.error);
            this.setState({ isLoading: false });
            return;
        }

        if (this.state.info.length < 10) {
            this.props.notifHandler(errorNotifs.WEAPON_INFO_TOO_SHORT, notifTypes.error);
            this.setState({ isLoading: false });
            return;
        }

        if (images.length < 1) {
            this.props.notifHandler(errorNotifs.IMAGE_IS_REQUIRED, notifTypes.error);
            this.setState({ isLoading: false });
            return;
        }

        const owners = this.state.owners.map(owner => owner.name);

        const weapon = {
            name: this.state.name,
            affilations: this.state.affilations.split(', ').filter(aff => aff),
            info: this.state.info,
            images,
            owners
        };
        
        weaponService.createWeapon(weapon)
          .then(res => {
            if (res.status === OK) {
                res.json().then(response => {
                    this.props.notifHandler(response.data.msg, notifTypes.success);
                    setTimeout(() => { this.props.history.push(`/weapon/${response.data.weaponId}`) }, 2000);
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
            <div className="WeaponCreate">
                {
                    this.state.isLoading ?
                    <Loader type="Ball-Triangle" color="#00BFFF" height="750" wifth="750" />
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
                        <label>Images:</label>
                        <br />
                        <textarea type="text" name="images" onChange={this.handleChange}></textarea>
                        <br />

                        <label>Add an owner:</label>
                        <br />
                        <input type="text" name="currOwner" value={this.state.currOwner} onChange={this.handleChange} />
                        <button type="button" onClick={this.addCharacter}>Add</button>
                        <br />

                        {this.state.owners.length > 0 ?
                        <Fragment>
                            <ul>
                                {this.state.owners.map((character, index) => {
                                    return (
                                        <li key={index} >{character.name} <button type="button" onClick={() => this.removeCharacter(character.name)}>X</button></li>
                                    );
                                })}
                            </ul>
                        </Fragment>
                        : null
                        }
                        <br />

                        <button type="submit">Create</button>
                    </form>
                }
            </div>
        );
    };
};

export default WeaponCreate;
