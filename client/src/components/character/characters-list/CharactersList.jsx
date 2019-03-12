import React, { Component } from 'react';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import ListItem from './../../list-item/ListItem';
import characterService from '../../../services/character-service';
import { OK } from '../../../constants/http-responses';

class CharactersList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            userRole: null,
            characters: null,
            doRender: false
        };

        this.fetchCharacters = this.fetchCharacters.bind(this);
        this.openCharacterDetails = this.openCharacterDetails.bind(this);
        this.openCharacterEdit = this.openCharacterEdit.bind(this);
        this.deleteCharacter = this.deleteCharacter.bind(this);
    }

    componentDidMount() {
        const userRole = localStorage.getItem('role');

        if (userRole) {
            this.setState({ userRole });
        }

        this.fetchCharacters();
    }

    fetchCharacters() {
        characterService.getAllCharacters()
            .then(res => {
                if (res.status === OK) {
                    res.json()
                        .then(data => {
                            this.setState({ characters: data.result, doRender: true });
                        });
                } else {
                    res.json()
                        .then(err => {
                            NotificationManager.error(err.message);
                        })
                }
            })
    }

    openCharacterDetails(id) {
        this.props.history.push(`/character/details/${id}`);
    }

    openCharacterEdit(id) {
        this.props.history.push(`/character/edit/${id}`);
    }

    deleteCharacter(id) {
        characterService.deleteCharacterById(id)
            .then(res => {
                if (res.status === OK) {
                    res.json().then(data => {
                        NotificationManager.success(data.message);
                        window.location.reload();
                    });
                } else {
                    res.json().then(err => {
                        Notification.error(err.message);
                    });
                }
            });
    }

    render() {
        return (
            <div className="ListItems">
                {this.state.doRender ?
                this.state.characters.map((character, index) => {
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
                        deleteItem={this.deleteCharacter} />
                    );
                })
                :
                <div> No results </div>
                }

                <NotificationContainer />
            </div>
        );
    };
};

export default CharactersList;
