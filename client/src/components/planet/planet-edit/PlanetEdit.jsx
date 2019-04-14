import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';

import planetService from './../../../services/planet-service';
import characterService from './../../../services/character-service';
import { OK } from './../../../constants/http-responses';
import { notifTypes } from '../../../constants/common';
import { errorNotifs } from '../../../constants/notification-messages';
import collectionManager from './../../../utilities/collection-manager';

const collectionNames = {
    affilations: 0,
    images: 1,
    natives: 2
};

class PlanetEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            planetId: '',
            name: '',
            info: '',
            climate: '',
            terrain: '',
            affilations: [],
            images: [],
            natives: [],
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
        const planetId = this.props.match.params.planetId;

        planetService.getPlanetById(planetId)
          .then(res => {
            if (res.status === OK) {
                res.json().then(response => {
                    this.setState({
                        planetId,
                        name: response.data.planet.name,
                        info: response.data.planet.info,
                        affilations: response.data.planet.affilations,
                        climate: response.data.planet.climate,
                        terrain: response.data.planet.terrain,
                        images: response.data.planet.images,
                        natives: response.data.planet.natives
                    });
                });

                characterService.getAllCharacters()
                .then(res => {
                    if (res.status === OK) {
                        res.json().then(response => {
                            const nativesNames = this.state.natives.map(native => native.name);
                            const characters = response.data.characters.filter(ch => !nativesNames.includes(ch.name));
                            this.setState({ characters, isLoading: false });
                        });
                    } else {
                        res.json().then(() => {
                            this.props.notifHanlder(errorNotifs.SOMETHING_WENT_WRONG, notifTypes.error);
                            setTimeout(() => { this.props.history.push('/planets'); }, 2000);
                        });
                    }
                });
            } else {
                res.json().then(err => {
                    this.props.notifHanlder(err.message, notifTypes.error);
                    setTimeout(() => { this.props.history.push('/planets'); }, 2000);
                });
            }
          });
    }

    addItem(collectionName, item) {
        if (item) {
            if (collectionName === collectionNames.natives) {
                const native = collectionManager.getItemNameAndId(null, this.state.characters, item);
                const doAdd = collectionManager.doAddItem(native, this.state.natives);

                if (native && doAdd) {
                    const newNatives = collectionManager.addItem(native, this.state.natives);
                    const index = collectionManager.getIndexOfItem(item, this.state.characters);
                    const newCharacters = collectionManager.removeItem(index, this.state.characters);
                    this.setState({ natives: newNatives, characters: newCharacters });
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
        } else if (collectionName === collectionNames.natives) {
            const index = collectionManager.getIndexOfItem(item, this.state.natives);

            if (index !== -1) {
                const newNatives = collectionManager.removeItem(index, this.state.natives);
                const newCharacters = collectionManager.addItem(item, this.state.characters);
                this.setState({ natives: newNatives, characters: newCharacters });
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

        if (this.state.info.length < 10) {
            this.props.notifHandler(errorNotifs.PLANET_INFO_TOO_SHORT, notifTypes.error);
            this.setState({ isLoading: false });
            return;
        }

        if (this.state.images.length < 1) {
            this.props.notifHandler(errorNotifs.IMAGE_IS_REQUIRED, notifTypes.error);
            this.setState({ isLoading: false });
            return;
        }

        const planet = {
            info: this.state.info,
            affilations: this.state.affilations,
            climate: this.state.climate,
            terrain: this.state.terrain,
            images: this.state.images,
            natives: this.state.natives.map(native => native._id)
        };

        planetService.editPlanet(this.state.planetId, planet)
          .then(res => {
            if (res.status === OK) {
                res.json().then(response => {
                    this.props.notifHandler(response.data.msg, notifTypes.success);
                    setTimeout(() => { this.props.history.push(`/planet/${this.state.planetId}`); }, 2000);
                });
            } else {
                res.json().then(err => {
                    this.setState({ isLoading: false });
                    this.props.notifHandler(err.message, notifTypes.error);
                });
            }
          });
    }

    render() {
        return (
            this.state.isLoading ?
            <Loader type="Ball-Triangle" color="black" height="120" />
            :
            <MDBContainer>
                <MDBRow>
                    <MDBCol></MDBCol>
                    <MDBCol md="6" style={{ 'background-color': "white", opacity: "0.9" }}>
                        <form onSubmit={this.handleSubmit}>
                            <p className="h5 text-center mb-4">{this.state.name}</p>
                            <div className="grey-text">
                                <MDBInput
                                label="Info"
                                type="textarea"
                                rows="5"
                                name="info"
                                value={this.state.info}
                                onChange={this.handleChange} />

                                <MDBInput
                                label="Climate"
                                type="text"
                                name="climate"
                                value={this.state.climate}
                                onChange={this.handleChange} />

                                <MDBInput
                                label="Terrain"
                                type="text"
                                name="terrain"
                                value={this.state.terrain}
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
                                                        <MDBDropdownItem key={index} onClick={() => this.addItem(collectionNames.natives, character)}>{character.name}</MDBDropdownItem>
                                                    );
                                                })
                                            }
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                    : null
                                }
                                {
                                    this.state.natives.length > 0 ?
                                    <MDBDropdown>
                                        <MDBDropdownToggle caret color="primary">
                                            Natives
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu basic>
                                            {
                                                this.state.natives.map((native, index) => {
                                                    return (
                                                        <MDBDropdownItem key={index} onClick={() => this.removeItem(collectionNames.natives, native)}>{native.name}</MDBDropdownItem>
                                                    );
                                                })
                                            }
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                    : null
                                }
                            </div>
                            <div className="text-center">
                                <MDBBtn type="submit" color="primary">Edit</MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                    <MDBCol></MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    };
};

export default PlanetEdit;
