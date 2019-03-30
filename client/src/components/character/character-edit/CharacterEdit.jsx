import React, { Component } from 'react';
import './CharacterEdit.css';
import Loader from 'react-loader-spinner';

import characterService from './../../../services/character-service';
import { OK } from './../../../constants/http-responses';
import { notifTypes } from '../../../constants/common';

class CharacterEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            characterId: '',
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

    componentWillMount() {
        this.setState({ isLoading: true });
        const characterId = this.props.match.params.characterId;

        characterService.getCharacterById(characterId)
          .then(res => {
            if (res.status === OK) {
                res.json().then(response => {
                    this.setState({
                        characterId,
                        race: response.data.character.race,
                        sex: response.data.character.sex,
                        affilations: response.data.character.affilations.join(', '),
                        shortStory: response.data.character.shortStory,
                        height: response.data.character.height,
                        weight: response.data.character.weight,
                        weapons: response.data.character.weapons.join(', '),
                        vehicles: response.data.character.vehicles.join(', '),
                        images: response.data.character.images.join(', '),
                        isLoading: false
                    });
                });
            } else {
                res.json().then(err => {
                    this.props.notifHandler(err.message, notifTypes.error);
                    setTimeout(() => { this.props.history.push('/characters'); }, 2000);
                });
            }
          });
    }

    handleChange(e) {
        const change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ isLoading: true });
        
        const character = {
            race: this.state.race,
            sex: this.state.sex,
            affilations: this.state.affilations.split(', '),
            shortStory: this.state.shortStory,
            height: this.state.height,
            weight: this.state.weight,
            weapons: this.state.weapons.split(', '),
            vehicles: this.state.vehicles.split(', '),
            images: this.state.images.split(', ')
        };
        
        characterService.editCharacter(this.state.characterId, character)
          .then(res => {
            if (res.status === OK) {
                res.json().then(response => {
                    this.props.notifHandler(response.data.msg, notifTypes.success);
                    setTimeout(() => { this.props.history.push(`/character/${this.state.characterId}`) }, 2000);
                });
            } else {
                res.json().then(err => {
                    this.setState({ isLoading: false });
                    this.props.notifHandler(err.message, notifTypes.error);
                })
            }
          });
    }

    render() {
        return (
            <div className="CharacterEdit">
                {
                    this.state.isLoading ?
                    <Loader type="Ball-Triangle" color="#00BFFF" height="750" wifth="750" />
                    :
                    <form onSubmit={this.handleSubmit}>
                        <label>Race:</label>
                        <br />
                        <input type="text" name="race" value={this.state.race} onChange={this.handleChange} />
                        <br />
                        <label>Sex:</label>
                        <br />
                        <input type="text" name="sex" value={this.state.sex} onChange={this.handleChange} />
                        <br />
                        <label>Affilations:</label>
                        <br />
                        <textarea type="text" name="affilations" value={this.state.affilations} onChange={this.handleChange}></textarea>
                        <br />
                        <label>Short story:</label>
                        <br />
                        <textarea type="text" name="shortStory" value={this.state.shortStory} onChange={this.handleChange}></textarea>
                        <br />
                        <label>Height:</label>
                        <br />
                        <input type="text" name="height" value={this.state.height} onChange={this.handleChange} />
                        <br />
                        <label>Weight:</label>
                        <br />
                        <input type="text" name="weight" value={this.state.weight} onChange={this.handleChange} />
                        <br />
                        <label>Weapons:</label>
                        <br />
                        <textarea type="text" name="weapons" value={this.state.weapons} onChange={this.handleChange}></textarea>
                        <br />
                        <label>Vehicles:</label>
                        <br />
                        <textarea type="text" name="vehicles" value={this.state.vehicles} onChange={this.handleChange}></textarea>
                        <br />
                        <label>Images:</label>
                        <br />
                        <textarea type="text" name="images" value={this.state.images} onChange={this.handleChange}></textarea>
                        <br />
                        <button type="submit">Edit</button>
                    </form>
                }
            </div>
        );
    };
};

export default CharacterEdit;
