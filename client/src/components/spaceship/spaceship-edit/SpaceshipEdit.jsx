import React, { Component, Fragment } from 'react';
import './SpaceshipEdit.css';
import Loader from 'react-loader-spinner';

import spaceshipService from './../../../services/spaceship-service';
import characterService from './../../../services/character-service';
import { OK } from './../../../constants/http-responses';
import { notifTypes } from '../../../constants/common';
import { errorNotifs } from '../../../constants/notification-messages';
import collectionManager from './../../../utilities/collection-manager';

const collectionNames = {
    affilations: 0,
    images: 1,
    pilots: 2
};

class SpaceshipEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            spaceshipId: '',
            dimension: '',
            info: '',
            affilations: [],
            images: [],
            pilots: [],
            currAffilation: '',
            currImg: '',
            currPilot: '',
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
        const spaceshipId = this.props.match.params.spaceshipId;

        spaceshipService.getSpacehipById(spaceshipId)
          .then(res => {
            if (res.status === OK) {
                res.json().then(response => {
                    this.setState({
                        spaceshipId,
                        dimension: response.data.spaceship.dimension,
                        affilations: response.data.spaceship.affilations,
                        info: response.data.spaceship.info,
                        images: response.data.spaceship.images,
                        pilots: response.data.spaceship.pilots
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
                            setTimeout(() => { this.props.history.push('/weapons'); }, 2000);
                        });
                    }
                  });
            } else {
                res.json().then(err => {
                    this.props.notifHanlder(err.message, notifTypes.error);
                    setTimeout(() => { this.props.history.push('/spaceships'); }, 2000);
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
        } else if (collectionName === collectionNames.pilots) {
            const pilot = collectionManager.getItemNameAndId(this.state.currPilot, this.state.characters);
            const doAdd = collectionManager.doAddItem(pilot, this.state.pilots);

            if (pilot && doAdd) {
                const newPilots = collectionManager.addItem(pilot, this.state.pilots);
                this.setState({ pilots: newPilots, currPilot: '' });
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
                this.setState({ pilots: newPilots });
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
            dimension: this.state.dimension,
            affilations: this.state.affilations,
            info: this.state.info,
            images: this.state.images,
            pilots: this.state.pilots.map(pilot => pilot._id)
        };

        spaceshipService.editSpaceshipById(this.state.spaceshipId, spaceship)
          .then(res => {
            if (res.status === OK) {
                res.json().then(response => {
                    this.props.notifHandler(response.data.msg, notifTypes.success);
                    setTimeout(() => { this.props.history.push(`/spaceship/${this.state.spaceshipId}`); }, 2000);

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
            <div className="SpaceshipEdit">
                {
                    this.state.isLoading ?
                    <Loader type="Ball-Triangle" color="black" height="750" />
                    :
                    <form onSubmit={this.handleSubmit}>
                        <label>Info:</label>
                        <br />
                        <textarea type="text" name="info" value={this.state.info} onChange={this.handleChange}></textarea>
                        <br />
                        <label>Dimension:</label>
                        <br />
                        <input type="text" name="dimension" value={this.state.dimension} onChange={this.handleChange} />
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

                        <label>Add pilot:</label>
                        <br />
                        <input type="text" name="currPilot" value={this.state.currPilot} onChange={this.handleChange} />
                        <button type="button" onClick={() => this.addItem(collectionNames.pilots)}>Add</button>
                        <br />
                        {this.state.pilots.length > 0 ?
                        <Fragment>
                            <label>Pilots:</label>
                            <br />
                            <ul>
                                {this.state.pilots.map((pilot, index) => {
                                    return (
                                        <li key={index}>{pilot.name} <button type="button" onClick={() => this.removeItem(collectionNames.pilots, pilot)}>X</button></li>
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

export default SpaceshipEdit;
