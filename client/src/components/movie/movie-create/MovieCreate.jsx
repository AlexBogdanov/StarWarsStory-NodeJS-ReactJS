import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { MDBModal, MDBModalHeader, MDBModalBody, MDBRow, MDBCol, MDBInput, MDBBtn, MDBContainer,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBModalFooter } from 'mdbreact';

import movieService from './../../../services/movie-service';
import collectionManager from './../../../utilities/collection-manager';
import { OK } from './../../../constants/http-responses';
import { errorNotifs } from './../../../constants/notification-messages';
import { movieTypes, movieTypesName, notifTypes } from './../../../constants/common';

const collectionNames = {
    writers: 0,
    actors: 1
};

class MovieCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            type: '',
            date: 0,
            month: 0,
            year: 0,
            info: '',
            director: '',
            writers: [],
            actors: [],
            cover: '',
            currWriter: '',
            currActor: '',
            isLoading: false
        };

        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.setMovieType = this.setMovieType.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    addItem(collectionName) {
        if (collectionName === collectionNames.writers) {
            const doAdd = collectionManager.doAddItem(this.state.currWriter, this.state.writers);

            if (doAdd) {
                const writers = collectionManager.addItem(this.state.currWriter, this.state.writers);
                this.setState({ writers, currWriter: '' });
            }
        } else if (collectionName === collectionNames.actors) {
            const doAdd = collectionManager.doAddItem(this.state.currActor, this.state.actors);

            if (doAdd) {
                const actors = collectionManager.addItem(this.state.currActor, this.state.actors);
                this.setState({ actors, currActor: '' });
            }
        }
    }

    removeItem(collectionName, item) {
        if (collectionName === collectionNames.writers) {
            const index = collectionManager.getIndexOfItem(item, this.state.writers);

            if (index !== -1) {
                const writers = collectionManager.removeItem(index, this.state.writers);
                this.setState({ writers });
            }
        } else if (collectionName === collectionNames.actors) {
            const index = collectionManager.getIndexOfItem(item, this.state.actors);

            if (index !== -1) {
                const actors = collectionManager.removeItem(index, this.state.actors);
                this.setState({ actors });
            }
        }
    }

    setMovieType(movieType) {
        this.setState({ type: movieTypes[movieType] });
    }

    handleChange(e) {
        const change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    handleSubmit() {
        this.setState({ isLoading: true });

        if (this.state.name.length < 5) {
            this.props.notifHandler(errorNotifs.MOVIE_NAME_TOO_SHORT, notifTypes.error);
            this.setState({ isLoading: false });
            return;
        }

        if (!this.state.type) {
            this.props.notifHandler(errorNotifs.MOVIE_TYPE_REQUIRED, notifTypes.error);
            this.setState({ isLoading: false });
            return;
        }

        if (!this.state.date || !this.state.month || !this.state.year) {
            this.props.notifHandler(errorNotifs.MOVIE_RELEASE_DATE_REQUIRED, notifTypes.error);
            this.setState({ isLoading: false });
            return;
        }

        if (this.state.date > 31 || this.state.month > 12 || this.state.year.toString().length > 4) {
            this.props.notifHandler(errorNotifs.INVALID_DATE, notifTypes.error);
            this.setState({ isLoading: false });
            return;
        }

        if (this.state.info.length < 30) {
            this.props.notifHandler(errorNotifs.MOVIE_INFO_TOO_SHORT, notifTypes.error);
            this.setState({ isLoading: false });
            return;
        }

        if (!this.state.cover) {
            this.props.notifHandler(errorNotifs.MOVIE_COVER_REQUIRED, notifTypes.error);
            this.setState({ isLoading: false });
            return;
        }

        const releaseDate = new Date(`${this.state.year.toString()}-${this.state.month.toString()}-${this.state.date.toString()}`);

        const movie = {
            name: this.state.name,
            type: this.state.type,
            releaseDate,
            info: this.state.info,
            director: this.state.director,
            writers: this.state.writers,
            actors: this.state.actors,
            cover: this.state.cover
        };

        movieService.createMovie(movie)
          .then(res => {
            if (res.status === OK) {
                res.json().then(response => {
                    this.props.notifHandler(response.data.msg, notifTypes.success);
                    setTimeout(() => { window.location.href = `/movie/${response.data.movieId}`; }, 2000);
                });
            } else {
                res.json().then(err => {
                    this.props.notifHandler(err.message, notifTypes.error);
                    this.setState({ isLoading: false });
                });
            }
          });
    }

    render() {
        return (
            this.state.isLoading ?
            <Loader type="Ball-Triangle" color="black" height="120" />
            :
            <MDBModal isOpen={this.props.isOpen}>
                <MDBModalHeader toggle={this.props.toggle}>Create movie</MDBModalHeader>
                <MDBModalBody>
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol>
                                <MDBInput
                                label="Name"
                                type="text"
                                name="name"
                                onChange={this.handleChange} />

                                <MDBDropdown>
                                    <MDBDropdownToggle caret color="primary">
                                        Select a type
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu basic>
                                        {
                                            Object.keys(movieTypes).map((movieType, index) => {
                                                return (
                                                    <MDBDropdownItem key={index} onClick={() => this.setMovieType(movieType)}>{movieTypesName[movieType]}</MDBDropdownItem>
                                                );
                                            })
                                        }
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                                
                                <MDBInput
                                label="dd"
                                type="number"
                                name="date"
                                onChange={this.handleChange} />
                                <MDBInput
                                label="mm"
                                type="number"
                                name="month"
                                onChange={this.handleChange} />
                                <MDBInput
                                label="yyyy"
                                type="number"
                                name="year"
                                onChange={this.handleChange} />

                                <MDBInput
                                label="Info"
                                type="textarea"
                                rows="5"
                                name="info"
                                onChange={this.handleChange} />

                                <MDBInput
                                label="Director"
                                type="text"
                                name="director"
                                onChange={this.handleChange} />

                                <MDBInput
                                label="Writer"
                                type="text"
                                name="currWriter"
                                value={this.state.currWriter}
                                onChange={this.handleChange} />
                                {
                                    this.state.writers.length > 0 ?
                                    <MDBDropdown>
                                        <MDBDropdownToggle caret color="primary">
                                            Writers
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu basic>
                                            {
                                                this.state.writers.map((writer, index) => {
                                                    return (
                                                        <MDBDropdownItem key={index} onClick={() => this.removeItem(collectionNames.writers, writer)}>{writer}</MDBDropdownItem>
                                                    );
                                                })
                                            }
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                    : null
                                }
                                <MDBBtn type="button" onClick={() => this.addItem(collectionNames.writers)}>Add</MDBBtn>

                                <MDBInput
                                label="Actor"
                                type="text"
                                name="currActor"
                                value={this.state.currActor}
                                onChange={this.handleChange} />
                                {
                                    this.state.actors.length > 0 ?
                                    <MDBDropdown>
                                        <MDBDropdownToggle caret color="primary">
                                            Actors
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu basic>
                                            {
                                                this.state.actors.map((actor, index) => {
                                                    return (
                                                        <MDBDropdownItem key={index} onClick={() => this.removeItem(collectionNames.actors, actor)}>{actor}</MDBDropdownItem>
                                                    );
                                                })
                                            }
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                    : null
                                }
                                <MDBBtn type="button" onClick={() => this.addItem(collectionNames.actors)}>Add</MDBBtn>

                                <MDBInput
                                label="Cover"
                                type="text"
                                name="cover"
                                onChange={this.handleChange} />
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn onClick={this.handleSubmit}>Create</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        );
    };
};

export default MovieCreate;
