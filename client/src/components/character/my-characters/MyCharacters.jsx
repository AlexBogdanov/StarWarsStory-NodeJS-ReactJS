import React, { Component, Fragment } from 'react';
import Loader from 'react-loader-spinner';
import { MDBRow } from 'mdbreact';

import ListItem from './../../list-item/ListItem';
import characterService from '../../../services/character-service';
import { OK } from '../../../constants/http-responses';
import { notifTypes } from '../../../constants/common';

class MyCharacters extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            characters: [],
            isLoading: false,
            doRender: false,
            userRole: ''
        };

        this.openCharacterDetails = this.openCharacterDetails.bind(this);
        this.openCharacterEdit = this.openCharacterEdit.bind(this);
        this.deleteCharacter = this.deleteCharacter.bind(this);
    }

    componentWillMount() {
        this.setState({ isLoading: true });

        if (localStorage.getItem('userRole')) {
            this.setState({ userRole: localStorage.getItem('userRole') });
        } else if (sessionStorage.getItem('userRole')) {
            this.setState({ userRole: sessionStorage.getItem('userRole') });
        }

        characterService.getUserCharacters()
          .then(res => {
              if (res.status === OK) {
                  res.json().then(response => {
                    if (response.data.length > 0) {
                        this.setState({ characters: response.data.map(character => {
                            character.isOwned = true;
                            return character;
                        }), doRender: true, isLoading: false });
                        return;
                    }

                    this.setState({ isLoading: false });
                  });
              } else {
                  res.json().then(err => {
                    this.setState({ isLoading: false });
                    this.props.notifHandler(err.message, notifTypes.error);
                    this.props.history.push('/');
                  });
              }
          });
    }

    openCharacterDetails(id) {
        this.props.history.push(`/character/${id}`);
    }

    openCharacterEdit(id) {
        this.props.history.push(`/character/edit/${id}`);
    }

    deleteCharacter(id) {
        this.setState({ isLoading: true });
        
        characterService.deleteCharacterById(id)
          .then(res => {
            if (res.status === OK) {
                res.json().then(response => {
                    this.props.notifHandler(response.data.msg, notifTypes.success);
                    setTimeout(() => { window.location.reload(); }, 2000);
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
            <div className="ListItems">
                {
                    this.state.isLoading ?
                    <Loader type="Ball-Triangle" color="black" height="120" />
                    :
                    <Fragment>
                        {this.state.doRender ?
                            <MDBRow className="padding">
                            {this.state.characters.map((character, index) => {
                                return (
                                    <ListItem
                                    key={index}
                                    itemId={character._id}
                                    name={character.name}
                                    shortDescr={character.shortStory}
                                    imageUrl={character.images[0]}
                                    userRole={this.state.userRole}
                                    openItemDetails={this.openCharacterDetails}
                                    openItemEdit={this.openCharacterEdit}
                                    deleteItem={this.deleteCharacter}
                                    isOwned={character.isOwned} />
                                );
                            })}
                            </MDBRow>
                        :
                        <div> No results </div>
                        }
                    </Fragment>
                }
            </div>
        );
    };
         
};

export default MyCharacters;
