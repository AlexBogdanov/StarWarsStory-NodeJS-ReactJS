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
            characters: null,
            isLoading: false
        };

        this.openCharacterDetails = this.openCharacterDetails.bind(this);
        this.openCharacterEdit = this.openCharacterEdit.bind(this);
        this.deleteCharacter = this.deleteCharacter.bind(this);
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        characterService.getAllCharacters()
          .then(res => {
              if (res.status === OK) {
                  res.json().then(response => {
                      this.setState({
                          characters: response.data.characters,
                          isLoading: false
                      });
                      NotificationManager.success(response.data.msg);
                  });
              } else {
                  res.json().then(err => {
                    NotificationManager.error(err.message);
                    setTimeout(() => { window.location.href = '/'; }, 2000);
                  });
              }
          })
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
                  res.json(response => {
                    NotificationManager.success(response.data.msg);
                    setTimeout(() => { window.location.href = '/characters'; }, 2000);
                  });
              } else {
                  res.json().then(err => {
                    NotificationManager.error(err.message);
                    this.setState({ isLoading: false });
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
