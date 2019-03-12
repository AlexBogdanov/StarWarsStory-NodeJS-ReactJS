import React, { Component } from 'react';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import ListItem from './../../list-item/ListItem';
import spaceshipService from './../../../services/spaceship-service';
import { OK } from './../../../constants/http-responses';

class SpaceshipsList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            userRole: '',
            spaceships: null,
            doRender: false
        };

        this.fetchSpaceships = this.fetchSpaceships.bind(this);
        this.openSpaceshipDetails = this.openSpaceshipDetails.bind(this);
        this.openSpaceshipEdit = this.openSpaceshipEdit.bind(this);
        this.deleteSpaceship = this.deleteSpaceship.bind(this);
    }

    componentDidMount() {
        const userRole = localStorage.getItem('role');

        if (userRole) {
            this.setState({ userRole });
        }

        this.fetchSpaceships();
    }

    fetchSpaceships() {
        spaceshipService.getAllSpaceships()
            .then(res => {
                if (res.status === OK) {
                    res.json()
                        .then(data => {
                            this.setState({ spaceships: data.result, doRender: true });
                        });
                } else {
                    res.json()
                        .then(err => {
                            NotificationManager.error(err.message);
                        });
                }
            })
    }

    openSpaceshipDetails(id) {
        this.props.history.push(`/spaceship/details/${id}`);
    }

    openSpaceshipEdit(id) {
        this.props.history.push(`/spaceship/edit/${id}`);
    }

    deleteSpaceship(id) {
        spaceshipService.deleteSpaceship(id)
            .then(res => {
                if (res.status === OK) {
                    res.json().then(data => {
                        NotificationManager.success(data.message);
                        window.location.reload();
                    });
                } else {
                    res.json().then(err => {
                        NotificationManager.error(err.message);
                    });
                }
            });
    }

    render() {
        return (
            <div className="ListItems">
                {this.state.doRender ?
                this.state.spaceships.map((spaceship, index) => {
                    return (
                        <ListItem
                        key={index}
                        itemId={spaceship._id}
                        name={spaceship.name}
                        shortDescr={spaceship.info}
                        imageUrl={spaceship.images[0]}
                        userRole={this.state.userRole}
                        openItemDetails={this.openSpaceshipDetails}
                        openItemEdit={this.openSpaceshipEdit}
                        deleteItem={this.deleteSpaceship} />
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

export default SpaceshipsList;
