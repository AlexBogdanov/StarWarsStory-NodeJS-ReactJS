import React, { Component, Fragment } from 'react';
import './CharacterDetails.css';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import characterService from './../../../services/character-service';
import { OK } from './../../../constants/http-responses';

class CharacterDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            character: null,
            isLoading: true
        };
    }

    componentWillMount() {
        characterService.getCharacterById(this.props.match.params.characterId)
            .then(res => {
                if (res.status === OK) {
                    res.json().then(data => {
                        this.setState({ character: data.result, isLoading: false });
                    });
                } else {
                    res.json().then(err => {
                        NotificationManager.error(err.message);
                    });
                }
            })
    }

    render() {
        return (
            <div className="CharacterDetails">
                {this.state.isLoading
                ? <Fragment>
                    Loading...
                  </Fragment>
                : <Fragment>
                    {this.state.character.images.map((image, index) => {
                        return <img key={index} src={image} alt="" />
                    })}
                    <br />
                    <label>Name:</label>
                    <span> {this.state.character.name}</span>
                    <br />
                    <label>Race:</label>
                    <span> {this.state.character.race}</span>
                    <br />
                    <label>Sex:</label>
                    <span> {this.state.character.sex}</span>
                    <br />
                    <label>Home planet:</label>
                    <span> {this.state.character.homePlanet}</span>
                    <br />
                    <label>Birthday:</label>
                    <span> {this.state.character.birthdat}</span>
                    <br />
                    <label>Height:</label>
                    <span> {this.state.character.height}</span>
                    <br />
                    <label>Weight:</label>
                    <span> {this.state.character.weight}</span>
                    <br />
                    <div>{this.state.character.shortStory}</div>
                    <br />
                    <label>Affilations:</label> <br />
                    <ul>
                        {this.state.character.affilations.map((affilation, index) => {
                            return <li key={index}>{affilation}</li>
                        })}
                    </ul>
                    <br />
                    <label>Weapons:</label> <br />
                    <ul>
                        {this.state.character.weapons.map((weapon, index) => {
                            return <li key={index}>{weapon}</li>
                        })}
                    </ul>
                    <br />
                    <label>Vehicles:</label> <br />
                    <ul>
                        {this.state.character.vehicles.map((vehicle, index) => {
                            return <li key={index}>{vehicle}</li>
                        })}
                    </ul>
                  </Fragment>}

                <NotificationContainer />
            </div>
        );
    };
};

export default CharacterDetails;
