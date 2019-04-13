import React, { Component, Fragment } from 'react';
import './CharacterDetails.css';
import Loader from 'react-loader-spinner';

import characterService from './../../../services/character-service';
import { OK } from './../../../constants/http-responses';
import { notifTypes } from './../../../constants/common';
import { errorNotifs } from './../../../constants/notification-messages';

class CharacterDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            character: null,
            isLoading: false
        };
    }

    componentWillMount() {
        this.setState({ isLoading: true });

        characterService.getCharacterById(this.props.match.params.characterId)
          .then(res => {
              if (res.status === OK) {
                  res.json().then(response => {
                    this.setState({ character: response.data.character, isLoading: false });
                  });
              } else {
                  res.json().then(() => {
                    this.props.notifHandler(errorNotifs.SOMETHING_WENT_WRONG, notifTypes.error);
                    setTimeout(() => { this.props.history.push('/characters'); }, 2000);
                  });
              }
          })
    }

    render() {
        return (
            <div className="CharacterDetails">
                {
                    this.state.isLoading ?
                    <Loader type="Ball-Triangle" color="black" height="750" />
                    :
                    <Fragment>
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
                                return (
                                    <li key={index}>
                                        <a href={`/weapon/${weapon._id}`}>{weapon.name}</a>
                                    </li>
                                );
                            })}
                        </ul>
                        <br />
                        <label>Vehicles:</label> <br />
                        <ul>
                            {this.state.character.vehicles.map((vehicle, index) => {
                                return (
                                    <li key={index}>
                                        <a href={`/spaceship/${vehicle._id}`}>{vehicle.name}</a>
                                    </li>
                                );
                            })}
                        </ul>
                    </Fragment>
                }
            </div>
        );
    };
};

export default CharacterDetails;
