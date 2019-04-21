import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';

import movieService from './../../../services/movie-service';
import { OK } from './../../../constants/http-responses';
import { notifTypes, movieTypes } from '../../../constants/common';
import { errorNotifs } from '../../../constants/notification-messages';
import collectionManager from './../../../utilities/collection-manager';

const collectionNames = {
    writers: 0,
    actors: 1
};

class MovieEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movieId: '',
            name: '',
            type: NaN,
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

    componentWillMount() {
        this.setState({ isLoading: true });
        const movieId = this.props.match.params.movieId;

        movieService.getMovieById(movieId)
          .then(res => {
            if (res.status === OK) {
                res.json().then(response => {
                    this.setState({
                        movieId,
                        name: response.data.movie.name,
                        type: response.data.movie.type,
                        info: response.data.movie.info,
                        director: response.data.movie.director,
                        writers: response.data.movie.writers,
                        actors: response.data.movie.actors,
                        cover: response.data.movie.cover,
                        isLoading: false
                    });
                });
            } else {
                res.json().then(err => {
                    this.props.notifHanlder(err.message, notifTypes.error);
                    setTimeout(() => { this.props.history.push('/movies'); }, 2000);
                });
            }
          });
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

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ isLoading: true });

        if (this.state.type < 0 && this.state.type > 3) {
            this.props.notifHandler(errorNotifs.MOVIE_TYPE_REQUIRED, notifTypes.error);
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

        const movie = {
            type: this.state.type,
            info: this.state.info,
            director: this.state.director,
            writers: this.state.writers,
            actors: this.state.actors,
            cover: this.state.cover
        };

        movieService.editMovie(this.state.movieId, movie)
          .then(res => {
            if (res.status === OK) {
                res.json().then(response => {
                    this.props.notifHandler(response.data.msg, notifTypes.success);
                    setTimeout(() => { this.props.history.push(`/movie/${this.state.movieId}`) }, 2000);
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
            <MDBContainer>
                <MDBRow>
                    <MDBCol></MDBCol>
                    <MDBCol md="6" style={{ 'background-color': "white", opacity: "0.9" }}>
                        <form onSubmit={this.handleSubmit}>
                            <p className="h5 text-center mb-4">{this.state.name}</p>
                            <div className="grey-text">
                                <MDBDropdown>
                                    <MDBDropdownToggle caret color="primary">
                                        Select a type
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu basic>
                                        {
                                            Object.keys(movieTypes).map((movieType, index) => {
                                                return (
                                                    <MDBDropdownItem key={index} onClick={() => this.setMovieType(movieType)}>{movieType}</MDBDropdownItem>
                                                );
                                            })
                                        }
                                    </MDBDropdownMenu>
                                </MDBDropdown>

                                <MDBInput
                                label="Info"
                                type="textarea"
                                rows="5"
                                name="info"
                                value={this.state.info}
                                onChange={this.handleChange} />

                                <MDBInput
                                label="Director"
                                type="text"
                                name="director"
                                value={this.state.director}
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
                                value={this.state.cover}
                                onChange={this.handleChange} />
                            </div>
                            <div className="text-center">
                                <MDBBtn type="submit" color="primary">Edit</MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                    <MDBCol></MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    };
};

export default MovieEdit;
