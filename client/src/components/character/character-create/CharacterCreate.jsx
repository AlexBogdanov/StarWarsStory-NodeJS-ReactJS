import React, { Component } from 'react';
import './CharacterCreate.css';
import Loader from 'react-loader-spinner';

import characterService from './../../../services/character-service';
import { OK } from './../../../constants/http-responses';
import { notifTypes } from './../../../constants/common';
import { errorNotifs } from './../../../constants/notification-messages';

class CharacterCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            race: '',
            sex: '',
            affilations: '',
            shortStory: '',
            height: '',
            weight: '',
            weapons: '',
            vehicles: '',
            images: '',
            isLoading: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        if (this.state.name.length < 2) {
            this.props.notifHandler(errorNotifs.CHARACTER_NAME_TOO_SHORT, notifTypes.error);
            this.setState({ isLoading: false });
            return;
        }

        if (!this.state.sex) {
            this.props.notifHandler(errorNotifs.SEX_IS_REQUIRED, notifTypes.error);
            this.setState({ isLoading: false });
            return;
        }

        if (this.state.shortStory.length < 30) {
            this.props.notifHandler(errorNotifs.SHORT_STORY_TOO_SHORT, notifTypes.error);
            this.setState({ isLoading: false });
            return;
        }

        if (images.length < 1) {
            this.props.notifHandler(errorNotifs.IMAGE_IS_REQUIRED, notifTypes.error);
            this.setState({ isLoading: false });
            return;
        }

        const affilations = this.state.affilations.split(', ').filter(aff => aff);
        const weapons = this.state.weapons.split(', ').filter(weap => weap);
        const vehicles = this.state.vehicles.split(', ').filter(veh => veh);

        const character = {
            name: this.state.name,
            race: this.state.race,
            sex: this.state.sex,
            affilations,
            shortStory: this.state.shortStory,
            height: this.state.height,
            weight: this.state.weight,
            weapons,
            vehicles,
            images
        };

        characterService.createCharacter(character)
            .then(res => {
                if (res.status === OK) {
                    res.json().then(response => {
                        this.props.notifHandler(response.data.msg, notifTypes.success);
                        setTimeout(() => { this.props.history.push(`/character/${response.data.characterId}`); }, 2000);
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
            <div className="CharacterCreate">
                {
                    this.state.isLoading ?
                    <Loader type="Ball-Triangle" color="#00BFFF" height="750" wifth="750" />
                    :
                    <form onSubmit={this.handleSubmit}>
                        <label>Name:</label>
                        <br />
                        <input type="text" name="name" onChange={this.handleChange} />
                        <br />
                        <label>Race:</label>
                        <br />
                        <input type="text" name="race" onChange={this.handleChange} />
                        <br />
                        <label>Sex:</label>
                        <br />
                        <input type="text" name="sex" onChange={this.handleChange} />
                        <br />
                        <label>Affilations:</label>
                        <br />
                        <textarea type="text" name="affilations" onChange={this.handleChange}></textarea>
                        <br />
                        <label>Short story:</label>
                        <br />
                        <textarea type="text" name="shortStory" onChange={this.handleChange}></textarea>
                        <br />
                        <label>Height:</label>
                        <br />
                        <input type="text" name="height" onChange={this.handleChange} />
                        <br />
                        <label>Weight:</label>
                        <br />
                        <input type="text" name="weight" onChange={this.handleChange} />
                        <br />
                        <label>Weapons:</label>
                        <br />
                        <textarea type="text" name="weapons" onChange={this.handleChange}></textarea>
                        <br />
                        <label>Vehicles:</label>
                        <br />
                        <textarea type="text" name="vehicles" onChange={this.handleChange}></textarea>
                        <br />
                        <label>Images:</label>
                        <br />
                        <textarea type="text" name="images" onChange={this.handleChange}></textarea>
                        <br />
                        <button type="submit">Create</button>
                    </form>
                }
            </div>
        );
    };
}

export default CharacterCreate;
