import React, { Component, Fragment } from 'react';
import Loader from 'react-loader-spinner';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';

import characterService from './../../../services/character-service';
import { OK } from './../../../constants/http-responses';
import { notifTypes, userRoles } from './../../../constants/common';
import { errorNotifs } from './../../../constants/notification-messages';

class CharacterDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userRole: '',
            character: null,
            isLoading: false
        };

        this.openEdit = this.openEdit.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentWillMount() {
        this.setState({ isLoading: true, userRole:
            window.localStorage.getItem('userRole') ? window.localStorage.getItem('userRole')
            : window.sessionStorage.getItem('userRole') });

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

    openEdit() {
        this.props.history.push(`/character/edit/${this.state.character._id}`);
    }

    delete() {
        this.setState({ isLoading: true });

        characterService.deleteCharacterById(this.state.character._id)
          .then(res => {
            if (res.status === OK) {
                res.json().then(response => {
                    this.props.notifHandler(response.data.msg, notifTypes.success);
                    setTimeout(() => { this.props.history.push('/characters') }, 2000);
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
            <MDBContainer style={{ 'backgroundColor': "white", opacity: "0.9 " }}>
                <MDBRow>
                    <MDBCol></MDBCol>
                    <MDBCol md="6">{this.state.character.name}</MDBCol>
                    <MDBCol></MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                    <MDBCol></MDBCol>
                    <MDBCol md="6">
                        {
                            this.state.character.images.map((img, index) => {
                                return (
                                    <Fragment key={index}>
                                        <img src={img} alt="" className="img-fluid" />
                                        <hr />
                                    </Fragment>
                                );
                            })
                        }
                    </MDBCol>
                    <MDBCol></MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol></MDBCol>
                    <MDBCol md="6"><span>{this.state.character.shortStory}</span></MDBCol>
                    <MDBCol></MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                    <MDBCol></MDBCol>
                    <MDBCol md="3">
                        Race: {this.state.character.race ? this.state.character.race : 'Unknown'}
                    </MDBCol>
                    <MDBCol md="3">
                        Sex: {this.state.character.sex ? this.state.character.sex : 'Unknown'}
                    </MDBCol>
                    <MDBCol></MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                    <MDBCol></MDBCol>
                    <MDBCol md="3">
                        Weapons:
                        {
                            this.state.character.weapons.length > 0 ?
                            this.state.character.weapons.map((weapon, index) => {
                                return (
                                    <div key={index}>
                                        <a href={`/weapon/${weapon._id}`}>{weapon.name}</a>
                                    </div>
                                );
                            })
                            : ' Unknown'
                        }
                    </MDBCol>
                    <MDBCol md="3">
                        Spaceships:
                        {
                            this.state.character.vehicles.length > 0 ?
                            this.state.character.vehicles.map((vehicle, index) => {
                                return (
                                    <div key={index}>
                                        <a href={`/vehicle/${vehicle._id}`}>{vehicle.name}</a>
                                    </div>
                                );
                            })
                            : ' Unknown'
                        }
                    </MDBCol>
                    <MDBCol></MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                    <MDBCol></MDBCol>
                    <MDBCol md="3">
                        Height: {this.state.character.height ? this.state.character.height : 'Unknow'}
                    </MDBCol>
                    <MDBCol md="3">
                        Weight: {this.state.character.weight ? this.state.character.weight : 'Unknown'}
                    </MDBCol>
                    <MDBCol></MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                    <MDBCol></MDBCol>
                    <MDBCol md="6">
                        Affilations:
                        {
                            this.state.character.affilations.length > 0 ?
                            this.state.character.affilations.map((affilation, index) => {
                                return (
                                    <div key={index}>{affilation}</div>
                                );
                            })
                            : ' Unknown'
                        }
                    </MDBCol>
                    <MDBCol></MDBCol>
                </MDBRow>
                {
                    this.state.userRole === userRoles.ADMIN ?
                    <MDBRow>
                        <MDBCol></MDBCol>
                        <MDBCol>
                            <MDBBtn type="button" onClick={this.openEdit}>Edit</MDBBtn>
                            <MDBBtn type="button" onClick={this.delete}>Delete</MDBBtn>
                        </MDBCol>
                        <MDBCol></MDBCol>
                    </MDBRow>
                    : null
                }
            </MDBContainer>
        );
    };
};

export default CharacterDetails;
