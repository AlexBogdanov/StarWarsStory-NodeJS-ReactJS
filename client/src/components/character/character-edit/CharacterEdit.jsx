import React, { Component } from 'react';
import './CharacterEdit.css';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import characterService from './../../../services/character-service';
import { OK } from './../../../constants/http-responses';

class CharacterEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            homePlanet: '',
            affilations: '',
            shortStory: '',
            birthday: '',
            height: '',
            weight: '',
            weapons: '',
            vehicles: '',
            images: '',
            isLoading: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        characterService.getCharacterById(this.props.match.params.characterId)
            .then(res => {
                if (res.status === OK) {
                    res.json().then(data => {
                        const character = {
                            homePlanet: data.result.homePlanet,
                            affilations: data.result.affilations.join(', '),
                            shortStory: data.result.shortStory,
                            birthday: data.result.birthday,
                            height: data.result.height,
                            weight: data.result.weight,
                            weapons: data.result.weapons.join(', '),
                            vehicles: data.result.vehicles.join(', '),
                            images: data.result.images.join(', ')
                        };
                        
                        this.setState(character);
                    });
                } else {
                    res.json().then(err => {
                        NotificationManager.error(err.message);
                    });
                }
            })
    }

    handleChange(e) {
        const change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const character = {
            homePlanet: this.state.homePlanet,
            affilations: this.state.affilations.split(', '),
            shortStory: this.state.shortStory,
            birthday: this.state.birthday,
            height: this.state.height,
            weight: this.state.weight,
            weapons: this.state.weapons.split(', '),
            vehicles: this.state.vehicles.split(', '),
            images: this.state.images.split(', ')
        };

        const characterId = this.props.match.params.characterId;

        characterService.editCharacter(characterId, character)
            .then(res => {
                if (res.status === OK) {
                    res.json().then(data => {
                        NotificationManager.success(data.message);
                        this.props.history.push(`/character/details/${characterId}`);
                    });
                } else {
                    res.json().then(err => {
                        NotificationManager.error(err.message);
                    })
                }
            });
    }

    render() {
        return (
            <div className="CharacterEdit">
                <form onSubmit={this.handleSubmit}>
                    <label>Home planet:</label>
                    <br />
                    <input type="text" name="homePlanet" value={this.state.homePlanet} onChange={this.handleChange} />
                    <br />
                    <label>Affilation:</label>
                    <br />
                    <textarea type="text" name="affilations" value={this.state.affilations} onChange={this.handleChange}></textarea>
                    <br />
                    <label>Short story:</label>
                    <br />
                    <textarea type="text" name="shortStory" value={this.state.shortStory} onChange={this.handleChange}></textarea>
                    <br />
                    <label>Birthday:</label>
                    <br />
                    <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleChange} />
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

                <NotificationContainer />
            </div>
        );
    };
};

export default CharacterEdit;
