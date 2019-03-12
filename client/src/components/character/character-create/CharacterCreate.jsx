import React, { Component } from 'react';
import './CharacterCreate.css';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import characterService from './../../../services/character-service';
import { OK } from './../../../constants/http-responses';

class CharacterCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            race: '',
            sex: '',
            homePlanet: '',
            affilations: '',
            shortStory: '',
            birthday: '',
            height: '',
            weight: '',
            weapons: '',
            vehicles: '',
            images: ''
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

        const character = {
            name: this.state.name,
            race: this.state.race,
            sex: this.state.sex,
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

        characterService.createCharacter(character)
            .then(res => {
                if (res.status === OK) {
                    res.json().then(data => {
                        NotificationManager.success(data.message);
                        this.props.history.push(`/character/details/${data.result}`);
                    });
                } else {
                    res.json().then(err => {
                        NotificationManager.error(err.message);
                    });
                }
            });
    }

    render() {
        return (
            <div className="CharacterCreate">
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
                    <label>Home planet:</label>
                    <br />
                    <input type="text" name="homePlanet" onChange={this.handleChange} />
                    <br />
                    <label>Affilations:</label>
                    <br />
                    <textarea type="text" name="affilations" onChange={this.handleChange}></textarea>
                    <br />
                    <label>Short story:</label>
                    <br />
                    <textarea type="text" name="shortStory" onChange={this.handleChange}></textarea>
                    <br />
                    <label>Birthday:</label>
                    <br />
                    <input type="text" name="birthday" onChange={this.handleChange} />
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

                <NotificationContainer />
            </div>
        );
    };
}

export default CharacterCreate;
