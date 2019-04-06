import React, { Component, Fragment } from 'react';
import './CharacterCreate.css';
import Loader from 'react-loader-spinner';

import characterService from './../../../services/character-service';
import weaponService from './../../../services/weapon-service';
import spaceshipService from './../../../services/spaceship-service';

import { OK } from './../../../constants/http-responses';
import { notifTypes } from './../../../constants/common';
import { errorNotifs } from './../../../constants/notification-messages';
import collectionManager from './../../../utilities/collection-manager';

const collectionNames = {
    affilations: 0,
    images: 1,
    weapons: 2,
    vehicles: 3
};

class CharacterCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            race: '',
            sex: '',
            shortStory: '',
            height: '',
            weight: '',
            affilations: [],
            weapons: [],
            vehicles: [],
            images: [],
            currAffilation: '',
            currWeapon: '',
            currVehicle: '',
            currImg: '',
            weaponsDB: [],
            vehiclesDB: [],
            isLoading: false
        };

        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.setState({ isLoading: true });
        
        weaponService.getAllWeapons()
          .then(res => {
              if (res.status === OK) {
                  res.json().then(response => {
                      this.setState({ weaponsDB: response.data.weapons });
                      return spaceshipService.getAllSpaceships();
                  }).then(res => {
                      if (res.status === OK) {
                          res.json().then(response => {
                              this.setState({ vehiclesDB: response.data.spaceships, isLoading: false });
                          });
                      } else {
                          res.json().then(() => {
                            this.props.notifHandler(errorNotifs.SOMETHING_WENT_WRONG, notifTypes.error);
                            setTimeout(() => { this.props.history.push('/characters'); }, 2000);
                          });
                      }
                  });
              } else {
                res.json().then(() => {
                  this.props.notifHandler(errorNotifs.SOMETHING_WENT_WRONG, notifTypes.error);
                  setTimeout(() => { this.props.history.push('/characters'); }, 2000);
                });
              }
          })
    }

    addItem(collectionName) {
        if (collectionName === collectionNames.affilations) {
            const doAdd = collectionManager.doAddItem(this.state.currAffilation, this.state.affilations);

            if (doAdd) {
                const newAffilations = collectionManager.addItem(this.state.currAffilation, this.state.affilations);
                this.setState({ affilations: newAffilations, currAffilation: '' });
            }
        } else if (collectionName === collectionNames.images) {
            const doAdd = collectionManager.doAddItem(this.state.currImg, this.state.images);

            if (doAdd) {
                const newImgs = collectionManager.addItem(this.state.currImg, this.state.images);
                this.setState({ images: newImgs, currImg: '' });
            }
        } else if (collectionName === collectionNames.weapons) {
            const weapon = collectionManager.getItemNameAndId(this.state.currWeapon, this.state.weaponsDB);
            const doAdd = collectionManager.doAddItem(weapon, this.state.weapons);

            if (weapon && doAdd) {
                const newWeapons = collectionManager.addItem(weapon, this.state.weapons);
                this.setState({ weapons: newWeapons, currWeapon: '' });
            }
        } else if (collectionName === collectionNames.vehicles) {
            const vehicle = collectionManager.getItemNameAndId(this.state.currVehicle, this.state.vehiclesDB);
            const doAdd = collectionManager.doAddItem(vehicle, this.state.vehicles);

            if (vehicle && doAdd) {
                const newVehicles = collectionManager.addItem(vehicle, this.state.vehicles);
                this.setState({ vehicles: newVehicles, currVehicle: '' });
            }
        }
    }

    removeItem(collectionName, item) {
        if (collectionName === collectionNames.affilations) {
            const index = collectionManager.getIndexOfItem(item, this.state.affilations);

            if (index !== -1) {
                const newAffilations = collectionManager.removeItem(index, this.state.affilations);
                this.setState({ affilations: newAffilations });
            }
        } else if (collectionName === collectionNames.images) {
            const index = collectionManager.getIndexOfItem(item, this.state.images);

            if (index !== -1) {
                const newImgs = collectionManager.removeItem(index, this.state.images);
                this.setState({ images: newImgs });
            }
        } else if (collectionName === collectionNames.weapons) {
            const index = collectionManager.getIndexOfItem(item, this.state.weapons);

            if (index !== -1) {
                const newWeapons = collectionManager.removeItem(index, this.state.weapons);
                this.setState({ weapons: newWeapons });
            }
        } else if (collectionName === collectionNames.vehicles) {
            const index = collectionManager.getIndexOfItem(item, this.state.vehicles);

            if (index !== -1) {
                const newVehicles = collectionManager.removeItem(index, this.state.vehicles);
                this.setState({ vehicles: newVehicles });
            }
        }
    }

    handleChange(e) {
        const change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ isLoading: true });

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

        if (this.state.images.length < 1) {
            this.props.notifHandler(errorNotifs.IMAGE_IS_REQUIRED, notifTypes.error);
            this.setState({ isLoading: false });
            return;
        }

        const character = {
            name: this.state.name,
            race: this.state.race,
            sex: this.state.sex,
            affilations: this.state.affilations,
            shortStory: this.state.shortStory,
            height: this.state.height,
            weight: this.state.weight,
            weapons: this.state.weapons.map(weapon => weapon._id),
            vehicles: this.state.vehicles.map(vehicle => vehicle._id),
            images: this.state.images
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
                    <Loader type="Ball-Triangle" color="#00BFFF" height="750" />
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

                        <label>Add an affilation:</label>
                        <br />
                        <input type="text" name="currAffilation" value={this.state.currAffilation} onChange={this.handleChange} />
                        <button type="button" onClick={() => this.addItem(collectionNames.affilations)}>Add</button>
                        <br />
                        {this.state.affilations.length > 0 ?
                        <Fragment>
                            <label>Affilations:</label>
                            <br />
                            <ul>
                                {this.state.affilations.map((affilation, index) => {
                                    return (
                                        <li key={index}>{affilation} <button type="button" onClick={() => this.removeItem(collectionNames.affilations, affilation)}>X</button></li>
                                    );
                                })}
                            </ul>
                        </Fragment>:null}
                        <br />
                        
                        <label>Add weapon:</label>
                        <br />
                        <input type="text" name="currWeapon" value={this.state.currWeapon} onChange={this.handleChange} />
                        <button type="button" onClick={() => this.addItem(collectionNames.weapons)}>Add</button>
                        <br />
                        {this.state.weapons.length > 0 ?
                        <Fragment>
                            <label>Weapons:</label>
                            <br />
                            <ul>
                                {this.state.weapons.map((weapon, index) => {
                                    return (
                                        <li key={index}>{weapon.name} <button type="button" onClick={() => this.removeItem(collectionNames.weapons, weapon)}>X</button></li>
                                    );
                                })}
                            </ul>
                        </Fragment>:null}
                        <br />
                        
                        <label>Add vehicle:</label>
                        <br />
                        <input type="text" name="currVehicle" value={this.state.currVehicle} onChange={this.handleChange} />
                        <button type="button" onClick={() => this.addItem(collectionNames.vehicles)}>Add</button>
                        <br />
                        {this.state.vehicles.length > 0 ?
                        <Fragment>
                            <label>Vehicles:</label>
                            <br />
                            <ul>
                                {this.state.vehicles.map((vehicle, index) => {
                                    return (
                                        <li key={index}>{vehicle.name} <button type="button" onClick={() => this.removeItem(collectionNames.vehicles, vehicle)}>X</button></li>
                                    );
                                })}
                            </ul>
                        </Fragment>:null}
                        <br />
                        
                        <label>Add an image:</label>
                        <br />
                        <input type="text" name="currImg" value={this.state.currImg} onChange={this.handleChange} />
                        <button type="button" onClick={() => this.addItem(collectionNames.images)}>Add</button>
                        <br />
                        {this.state.images.length > 0 ?
                        <Fragment>
                            <label>Images:</label>
                            <br />
                            <ul>
                                {this.state.images.map((img, index) => {
                                    return (
                                        <li key={index}>{img} <button type="button" onClick={() => this.removeItem(collectionNames.images, img)}>X</button></li>
                                    );
                                })}
                            </ul>
                        </Fragment>:null}
                        <br />

                        <button type="submit">Create</button>
                    </form>
                }
            </div>
        );
    };
}

export default CharacterCreate;
