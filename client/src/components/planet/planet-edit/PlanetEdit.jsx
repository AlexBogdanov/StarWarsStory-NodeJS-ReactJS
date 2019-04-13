import React, { Component, Fragment } from 'react';
import './PlanetEdit.css';
import Loader from 'react-loader-spinner';

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
            info: '',
            climate: '',
            terrain: '',
            affilations: [],
            images: [],
            natives: [],
            currAffilation: '',
            currImg: '',
            currNative: '',
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
                            this.setState({ characters: response.data.characters, isLoading: false });
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
        } else if (collectionName === collectionNames.natives) {
            const native = collectionManager.getItemNameAndId(this.state.currNative, this.state.characters);
            const doAdd = collectionManager.doAddItem(native, this.state.natives);

            if (native && doAdd) {
                const newNatives = collectionManager.addItem(native, this.state.natives);
                this.setState({ natives: newNatives, currNative: '' });
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
                this.setState({ natives: newNatives });
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
            <div className="PlanetEdit">
                {
                    this.state.isLoading ?
                    <Loader type="Ball-Triangle" color="black" height="750" />
                    :
                    <form onSubmit={this.handleSubmit}>
                        <label>Info:</label>
                        <br />
                        <textarea type="text" name="info" value={this.state.info} onChange={this.handleChange}></textarea>
                        <br />
                        <label>Climate:</label>
                        <br />
                        <input type="text" name="climate" value={this.state.climate} onChange={this.handleChange} />
                        <br />
                        <label>Terrain:</label>
                        <br />
                        <input type="text" name="terrain" value={this.state.terrain} onChange={this.handleChange} />
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

                        <label>Add native:</label>
                        <br />
                        <input type="text" name="currNative" value={this.state.currNative} onChange={this.handleChange} />
                        <button type="button" onClick={() => this.addItem(collectionNames.natives)}>Add</button>
                        <br />
                        {this.state.natives.length > 0 ?
                        <Fragment>
                            <label>Natives:</label>
                            <br />
                            <ul>
                                {this.state.natives.map((native, index) => {
                                    return (
                                        <li key={index}>{native.name} <button type="button" onClick={() => this.removeItem(collectionNames.natives, native)}>X</button></li>
                                    );
                                })}
                            </ul>
                        </Fragment>:null}
                        <br />

                        <button type="submit">Edit</button>
                    </form>
                }
            </div>
        );
    };
};

export default PlanetEdit;
