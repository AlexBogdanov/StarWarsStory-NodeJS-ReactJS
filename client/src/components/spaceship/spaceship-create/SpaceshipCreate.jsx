import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { MDBModal, MDBModalHeader, MDBModalBody, MDBRow, MDBCol, MDBInput, MDBBtn, MDBContainer,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBModalFooter } from 'mdbreact';

import spaceshipService from './../../../services/spaceship-service';
import characterService from './../../../services/character-service';
import { OK } from './../../../constants/http-responses';
import { notifTypes } from './../../../constants/common';
import { errorNotifs } from './../../../constants/notification-messages';
import collectionManager from './../../../utilities/collection-manager';

const collectionNames = {
    affilations: 0,
    images: 1,
    pilots: 2
};


class SpaceshipCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            dimension: '',
            info: '',
            affilations: [],
            images: [],
            pilots: [],
            currAffilation: '',
            currImg: '',
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

        characterService.getAllCharacters()
          .then(res => {
            if (res.status === OK) {
                res.json().then(response => {
                    this.setState({ characters: response.data.characters, isLoading: false });
                });
            } else {
                res.json().then(() => {
                    this.props.notifHandler(errorNotifs.SOMETHING_WENT_WRONG, notifTypes.error);
                    setTimeout(() => { this.props.history.push('/spaceships'); }, 2000);
                });
            }
          });
    }
    
    addItem(collectionName, item) {
        if (item) {
            if (collectionName === collectionNames.pilots) {
                const pilot = collectionManager.getItemNameAndId(null, this.state.characters, item);
                const doAdd = collectionManager.doAddItem(pilot, this.state.pilots);

                if (pilot && doAdd) {
                    const newPilots = collectionManager.addItem(pilot, this.state.pilots);
                    const index = collectionManager.getIndexOfItem(item, this.state.characters);
                    const newCharacters = collectionManager.removeItem(index, this.state.characters);
                    this.setState({ pilots: newPilots, characters: newCharacters });
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
        } else if (collectionName === collectionNames.pilots) {
            const index = collectionManager.getIndexOfItem(item, this.state.pilots);

            if (index !== -1) {
                const newPilots = collectionManager.removeItem(index, this.state.pilots);
                const newCharacters = collectionManager.addItem(item, this.state.characters);
                this.setState({ pilots: newPilots, characters: newCharacters });
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
            this.props.notifHandler(errorNotifs.SPACESHIP_NAME_TOO_SHORT, notifTypes.error);
            this.setState({ isLoading: false });
            return;
        }

        if (this.state.info.length < 10) {
            this.props.notifHandler(errorNotifs.SPACESHIP_INFO_TOO_SHORT, notifTypes.error);
            this.setState({ isLoading: false });
            return;
        }

        if (this.state.images.length < 1) {
            this.props.notifHandler(errorNotifs.IMAGE_IS_REQUIRED, notifTypes.error);
            this.setState({ isLoading: false });
            return;
        }

        if (!this.state.dimension) {
            this.props.notifHandler(errorNotifs.SPACESHIP_DIMENSION_REQUIRED, notifTypes.error);
            this.setState({ isLoading: false });
            return;
        }

        const spaceship = {
            name: this.state.name,
            dimension: this.state.dimension,
            affilations: this.state.affilations,
            info: this.state.info,
            images: this.state.images,
            pilots: this.state.pilots.map(pilot => pilot._id)
        };

        spaceshipService.createSpaceship(spaceship)
          .then(res => {
            if (res.status === OK) {
                res.json().then(response => {
                    this.props.notifHandler(response.data.msg, notifTypes.success);
                    setTimeout(() => { window.location.href = `/spaceship/${response.data.spaceshipId}`; }, 2000);
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
                <MDBModalHeader toggle={this.props.toggle}>Create spaceship</MDBModalHeader>
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
                                label="Dimension"
                                type="number"
                                name="dimension"
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
                                                        <MDBDropdownItem key={index} onClick={() => this.addItem(collectionNames.pilots, character)}>{character.name}</MDBDropdownItem>
                                                    );
                                                })
                                            }
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                    : null
                                }
                                {
                                    this.state.pilots.length > 0 ?
                                    <MDBDropdown>
                                        <MDBDropdownToggle caret color="primary">
                                            Pilots
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu basic>
                                            {
                                                this.state.pilots.map((pilot, index) => {
                                                    return (
                                                        <MDBDropdownItem key={index} onClick={() => this.removeItem(collectionNames.owners, pilot)}>{pilot.name}</MDBDropdownItem>
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

export default SpaceshipCreate;
