import React, { Component, Fragment } from 'react';
import './WeaponEdit.css';
import Loader from 'react-loader-spinner';

import weaponService from './../../../services/weapon-service';
import characterService from './../../../services/character-service';
import { OK } from './../../../constants/http-responses';
import { notifTypes } from '../../../constants/common';
import { errorNotifs } from '../../../constants/notification-messages';
import collectionManager from './../../../utilities/collection-manager';

const collectionNames = {
    affilations: 0,
    images: 1,
    owners: 2
};

class WeaponEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            weaponId: '',
            info: '',
            affilations: [],
            images: [],
            owners: [],
            currAffilation: '',
            currImg: '',
            currOwner: '',
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
        const weaponId = this.props.match.params.weaponId;

        weaponService.getWeaponById(weaponId)
          .then(res => {
              if (res.status === OK) {
                  res.json().then(response => {
                    this.setState({
                        weaponId,
                        info: response.data.weapon.info,
                        affilations: response.data.weapon.affilations,
                        images: response.data.weapon.images,
                        owners: response.data.weapon.owners
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
                    })
              } else {
                  res.json().then(err => {
                    this.props.notifHanlder(err.message, notifTypes.error);
                    setTimeout(() => { this.props.history.push('/weapons'); }, 2000);
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
        } else if (collectionName === collectionNames.owners) {
            const owner = collectionManager.getItemNameAndId(this.state.currOwner, this.state.characters);
            const doAdd = collectionManager.doAddItem(owner, this.state.owners);

            if (owner && doAdd) {
                const newOwners = collectionManager.addItem(owner, this.state.owners);
                this.setState({ owners: newOwners, currOwner: '' });
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
                this.setState({ owners: newOwners });
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
            info: this.state.info,
            affilations: this.state.affilations,
            images: this.state.images,
            owners: this.state.owners.map(owner => owner._id)
        };
        
        weaponService.editWeaponById(this.state.weaponId, weapon)
          .then(res => {
            if (res.status === OK) {
                res.json().then(response => {
                    this.props.notifHandler(response.data.msg, notifTypes.success);
                    setTimeout(() => { this.props.history.push(`/weapon/${this.state.weaponId}`) }, 2000);
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
            <div className="WeaponEdit">
                {
                    this.state.isLoading ?
                    <Loader type="Ball-Triangle" color="black" height="750" />
                    :
                    <form onSubmit={this.handleSubmit}>
                        <label>Info:</label>
                        <br />
                        <textarea type="text" name="info" value={this.state.info} onChange={this.handleChange}></textarea>
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
    
                        <label>Add an owner:</label>
                        <br />
                        <input type="text" name="currOwner" value={this.state.currOwner} onChange={this.handleChange} />
                        <button type="button" onClick={() => this.addItem(collectionNames.owners)}>Add</button>
                        <br />
                        {this.state.owners.length > 0 ?
                        <Fragment>
                            <label>Owners:</label>
                            <br />
                            <ul>
                                {this.state.owners.map((owner, index) => {
                                    return (
                                        <li key={index}>{owner.name} <button type="button" onClick={() => this.removeItem(collectionNames.owners, owner)}>X</button></li>
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

export default WeaponEdit;
