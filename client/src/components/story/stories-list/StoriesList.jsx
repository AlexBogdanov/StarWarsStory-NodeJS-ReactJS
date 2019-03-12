import React, { Component } from 'react';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import storyService from './../../../services/story-service';
import { OK } from './../../../constants/http-responses';

class StoriesList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            stories: null,
            doRender: false
        };

        this.fetchStories = this.fetchStories.bind(this);
    }

    componentDidMount() {
        this.fetchStories();
    }

    fetchStories() {
        storyService.getAllStories()
            .then(res => {
                if (res.status === OK) {
                    res.json()
                        .then(data => {
                            this.setState({ stories: data.result, doRender: true });
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
                this.state.stories.map((story, index) => {
                    return (
                        <div key={index} className="item">
                            <span>{story.name}</span>
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

export default StoriesList;
