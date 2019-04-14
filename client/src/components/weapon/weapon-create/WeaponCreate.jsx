import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { MDBModal, MDBModalHeader, MDBModalBody, MDBRow, MDBCol, MDBInput, MDBBtn, MDBContainer,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBModalFooter } from 'mdbreact';

import weaponService from './../../../services/weapon-service';
import characterService from './../../../services/character-service';
import { OK } from './../../../constants/http-responses';
import { notifTypes } from './../../../constants/common';
import { errorNotifs } from './../../../constants/notification-messages';
import collectionManager from '../../../utilities/collection-manager';

const collectionNames = {
    affilations: 0,
    images: 1,
    owners: 2
};

class WeaponCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            info: '',
            currAffilation: '',
            currImg: '',
            affilations: [],
            images: [],
            owners: [],
            characters: [],
            isLoading: false
        };

        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.setState({ isLoading: true });

        characterService.getCharactersNamesAndIds()
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
    
    addItem(collectionName, item) {
        if (item) {
            if (collectionName === collectionNames.owners) {
                const owner = collectionManager.getItemNameAndId(null, this.state.characters, item);
                const doAdd = collectionManager.doAddItem(owner, this.state.owners);

                if (owner && doAdd) {
                    const newOwners = collectionManager.addItem(owner, this.state.owners);
                    const index = collectionManager.getIndexOfItem(item, this.state.characters);
                    const newCharacters = collectionManager.removeItem(index, this.state.characters);
                    this.setState({ owners: newOwners, characters: newCharacters });
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
        } else if (collectionName === collectionNames.owners) {
            const index = collectionManager.getIndexOfItem(item, this.state.owners);

            if (index !== -1) {
                const newOwners = collectionManager.removeItem(index, this.state.owners);
                const newCharacters = collectionManager.addItem(item, this.state.characters);
                this.setState({ owners: newOwners, characters: newCharacters });
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

        if (this.state.images.length < 1) {
            this.props.notifHandler(errorNotifs.IMAGE_IS_REQUIRED, notifTypes.error);
            this.setState({ isLoading: false });
            return;
        }

        const weapon = {
            name: this.state.name,
            affilations: this.state.affilations,
            info: this.state.info,
            images: this.state.images,
            owners: this.state.owners.map(owner => owner._id)
        };
        
        weaponService.createWeapon(weapon)
          .then(res => {
            if (res.status === OK) {
                res.json().then(response => {
                    this.props.notifHandler(response.data.msg, notifTypes.success);
                    setTimeout(() => {window.location.href = `/weapon/${response.data.weaponId}`; }, 2000);
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
            this.state.isLoading ?
            <Loader type="Ball-Triangle" color="black" height="120" />
            :
            <MDBModal isOpen={this.props.isOpen}>
                <MDBModalHeader toggle={this.props.toggle}>Create weapon</MDBModalHeader>
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
                                label="Info"
                                type="textarea"
                                rows="5"
                                name="info"
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

                                {
                                    this.state.characters.length > 0 ?
                                    <MDBDropdown>
                                        <MDBDropdownToggle caret color="primary">
                                            Characters
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu basic>
                                            {
                                                this.state.characters.map((character, index) => {
                                                    return (
                                                        <MDBDropdownItem key={index} onClick={() => this.addItem(collectionNames.owners, character)}>{character.name}</MDBDropdownItem>
                                                    );
                                                })
                                            }
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                    : null
                                }
                                {
                                    this.state.owners.length > 0 ?
                                    <MDBDropdown>
                                        <MDBDropdownToggle caret color="primary">
                                            Owners
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu basic>
                                            {
                                                this.state.owners.map((owner, index) => {
                                                    return (
                                                        <MDBDropdownItem key={index} onClick={() => this.removeItem(collectionNames.owners, owner)}>{owner.name}</MDBDropdownItem>
                                                    );
                                                })
                                            }
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                    : null
                                }
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn onClick={this.handleSubmit}>Create</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        );
    };
};

export default WeaponCreate;
