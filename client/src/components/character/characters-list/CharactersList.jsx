import React, { Component } from 'react';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import characterService from '../../../services/character-service';
import { OK } from '../../../constants/http-responses';

class CharactersList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            characters: null,
            doRender: false
        };

        this.fetchCharacters = this.fetchCharacters.bind(this);
    }

    componentDidMount() {
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

    render() {
        return (
            <div className="ListItems">
                {this.state.doRender ?
                this.state.characters.map((character, index) => {
                    return (
                        <div key={index} className="item">
                            <span>{character.name}</span>
                        </div>
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
