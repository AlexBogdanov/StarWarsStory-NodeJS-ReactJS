import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { MDBModal, MDBModalHeader, MDBModalBody, MDBRow, MDBCol, MDBInput, MDBBtn, MDBContainer, MDBFooter,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';

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

    addItem(collectionName, item) {
        if (item) {
            if (collectionName === collectionNames.weapons) {
                const weapon = collectionManager.getItemNameAndId(null, this.state.weaponsDB, item);
                const doAdd = collectionManager.doAddItem(weapon, this.state.weapons);

                if (weapon && doAdd) {
                    const newWeapons = collectionManager.addItem(weapon, this.state.weapons);
                    const index = collectionManager.getIndexOfItem(item, this.state.weaponsDB);
                    const newWeaponsDb = collectionManager.removeItem(index, this.state.weaponsDB);
                    this.setState({ weapons: newWeapons, weaponsDB: newWeaponsDb });
                }
            } else if (collectionName === collectionNames.vehicles) {
                const vehicle = collectionManager.getItemNameAndId(null, this.state.vehiclesDB, item);
                const doAdd = collectionManager.doAddItem(vehicle, this.state.vehicles);

                if (vehicle && doAdd) {
                    const newVehicles = collectionManager.addItem(vehicle, this.state.vehicles);
                    const index = collectionManager.getIndexOfItem(item, this.state.vehiclesDB);
                    const newVehiclesDB = collectionManager.removeItem(index, this.state.vehiclesDB);
                    this.setState({ vehicles: newVehicles, vehiclesDB: newVehiclesDB });
                }
            }
        } else {
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
                const newWeaponsDB = collectionManager.addItem(item, this.state.weaponsDB);
                this.setState({ weapons: newWeapons, weaponsDB: newWeaponsDB });
            }
        } else if (collectionName === collectionNames.vehicles) {
            const index = collectionManager.getIndexOfItem(item, this.state.vehicles);

            if (index !== -1) {
                const newVehicles = collectionManager.removeItem(index, this.state.vehicles);
                const newVehiclesDB = collectionManager.addItem(item, this.state.vehiclesDB);
                this.setState({ vehicles: newVehicles, vehiclesDB: newVehiclesDB });
            }
        }
    }

    handleChange(e) {
        const change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    handleSubmit() {
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

        if (this.state.shortStory.length < 20) {
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
                        console.log(this.props);
                        this.props.notifHandler(response.data.msg, notifTypes.success);
                        setTimeout(() => { window.location.href = `/character/${response.data.characterId}`; }, 2000);
                    });
                } else {
                    res.json().then(err => {
                        this.props.notifHandler(err.message, notifTypes.error);
                        setTimeout(() => { this.setState({ isLoading: false }); });
                    });
                }
            });
    }

    render() {
        return (
            this.state.isLoading ?
            <Loader type="Ball-Triangle" color="black" height="120" />
            :
            <MDBModal isOpen={this.props.isOpen}>
                <MDBModalHeader toggle={this.props.toggle}>Create character</MDBModalHeader>
                <MDBModalBody>
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol>
                                <MDBInput
                                label="Name"
                                type="text"
                                name="name"
                                onChange={this.handleChange} />

                                <MDBInput
                                label="Race"
                                type="text"
                                name="race"
                                onChange={this.handleChange} />

                                <MDBInput
                                label="Sex"
                                type="text"
                                name="sex"
                                onChange={this.handleChange} />

                                <MDBInput
                                label="Short story"
                                type="textarea"
                                rows="5"
                                name="shortStory"
                                onChange={this.handleChange} />

                                <MDBInput
                                label="Height"
                                type="number"
                                name="height"
                                onChange={this.handleChange} />

                                <MDBInput
                                label="Weight"
                                type="number"
                                name="weight"
                                onChange={this.handleChange} />

                                <MDBInput
                                label="Affilaton"
                                type="text"
                                name="currAffilation"
                                value={this.state.currAffilation}
                                onChange={this.handleChange} />
                                {
                                    this.state.affilations.length > 0 ?
                                    <MDBDropdown>
                                        <MDBDropdownToggle caret color="primary">
                                            Affilations
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu basic>
                                            {
                                                this.state.affilations.map((affilation, index) => {
                                                    return (
                                                        <MDBDropdownItem key={index} onClick={() => this.removeItem(collectionNames.affilations, affilation)}>{affilation}</MDBDropdownItem>
                                                    );
                                                })
                                            }
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                    : null
                                }
                                <MDBBtn type="button" onClick={() => this.addItem(collectionNames.affilations)}>Add</MDBBtn>

                                {
                                    this.state.weaponsDB.length > 0 ?
                                    <MDBDropdown>
                                        <MDBDropdownToggle caret color="primary">
                                            Weapons
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu basic>
                                            {
                                                this.state.weaponsDB.map((weapon, index) => {
                                                    return (
                                                        <MDBDropdownItem key={index} onClick={() => this.addItem(collectionNames.weapons, weapon)}>{weapon.name}</MDBDropdownItem>
                                                    );
                                                })
                                            }
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                    : null
                                }
                                {
                                    this.state.weapons.length > 0 ?
                                    <MDBDropdown>
                                        <MDBDropdownToggle caret color="primary">
                                            Selected Weapons
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu basic>
                                            {
                                                this.state.weapons.map((weapon, index) => {
                                                    return (
                                                        <MDBDropdownItem key={index} onClick={() => this.removeItem(collectionNames.weapons, weapon)}>{weapon.name}</MDBDropdownItem>
                                                    );
                                                })
                                            }
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                    : null
                                }

                                {
                                    this.state.vehiclesDB.length > 0 ?
                                    <MDBDropdown>
                                        <MDBDropdownToggle caret color="primary">
                                            Spaceships
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu basic>
                                            {
                                                this.state.vehiclesDB.map((vehicle, index) => {
                                                    return (
                                                        <MDBDropdownItem key={index} onClick={() => this.addItem(collectionNames.vehicles, vehicle)}>{vehicle.name}</MDBDropdownItem>
                                                    );
                                                })
                                            }
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                    : null
                                }
                                {
                                    this.state.vehicles.length > 0 ?
                                    <MDBDropdown>
                                        <MDBDropdownToggle caret color="primary">
                                            Selected Spaceships
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu basic>
                                            {
                                                this.state.vehicles.map((vehicle, index) => {
                                                    return (
                                                        <MDBDropdownItem key={index} onClick={() => this.removeItem(collectionNames.vehicles, vehicle)}>{vehicle.name}</MDBDropdownItem>
                                                    );
                                                })
                                            }
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                    : null
                                }

                                <MDBInput
                                label="Image"
                                type="text"
                                name="currImg"
                                value={this.state.currImg}
                                onChange={this.handleChange} />
                                {
                                    this.state.images.length > 0 ?
                                    <MDBDropdown>
                                        <MDBDropdownToggle caret color="primary">
                                            Images
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu basic>
                                            {
                                                this.state.images.map((img, index) => {
                                                    return (
                                                        <MDBDropdownItem key={index} onClick={() => this.removeItem(collectionNames.images, img)}>{img}</MDBDropdownItem>
                                                    );
                                                })
                                            }
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                    : null
                                }
                                <MDBBtn type="button" onClick={() => this.addItem(collectionNames.images)}>Add</MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </MDBModalBody>
                <MDBFooter>
                    <MDBBtn onClick={this.handleSubmit}>Create</MDBBtn>
                </MDBFooter>
            </MDBModal>
        );
    };
}

export default CharacterCreate;
