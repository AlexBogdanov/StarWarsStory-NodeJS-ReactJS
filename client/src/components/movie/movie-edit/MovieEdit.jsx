import React, { Component, Fragment } from 'react';
import './MovieEdit.css';
import Loader from 'react-loader-spinner';

import movieService from './../../../services/movie-service';
import { OK } from './../../../constants/http-responses';
import { notifTypes, movieTypesName, movieTypes } from '../../../constants/common';
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
        this.selectOption = this.selectOption.bind(this);
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

    selectOption(e) {
        this.setState({ type: e.target.value });
    }

    handleChange(e) {
        const change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ isLoading: true });

        if (!this.state.type) {
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
            <div className="WeaponEdit">
                {
                    this.state.isLoading ?
                    <Loader type="Ball-Triangle" color="#00BFFF" height="750" />
                    :
                    <form onSubmit={this.handleSubmit}>
                        <select value={this.state.type} onChange={this.selectOption}>
                            <option hidden>Choose type</option>
                            {Object.keys(movieTypes).map((movieType, index) => {
                                return (
                                    <option key={index} value={movieTypes[movieType]}>{movieTypesName[movieTypes[movieType]]}</option>
                                );
                            })}
                        </select>
                        <br />
                        <label>Info:</label>
                        <br />
                        <textarea type="text" name="info" value={this.state.info} onChange={this.handleChange}></textarea>
                        <br />
                        <label>Director:</label>
                        <br />
                        <input type="text" name="director" value={this.state.director} onChange={this.handleChange} />
                        <br />

                        <label>Add a writer:</label>
                        <br />
                        <input type="text" name="currWriter" value={this.state.currWriter} onChange={this.handleChange} />
                        <button type="button" onClick={() => this.addItem(collectionNames.writers)}>Add</button>
                        <br />
                        {this.state.writers.length > 0 ?
                        <Fragment>
                            <label>Writers:</label>
                            <br />
                            <ul>
                                {this.state.writers.map((writer, index) => {
                                    return (
                                        <li key={index}>{writer} <button type="button" onClick={() => this.removeItem(collectionNames.writers, writer)}>X</button></li>
                                    );
                                })}
                            </ul>
                        </Fragment>:null}
                        <br />

                        <label>Add an actor:</label>
                        <br />
                        <input type="text" name="currActor" value={this.state.currActor} onChange={this.handleChange} />
                        <button type="button" onClick={() => this.addItem(collectionNames.actors)}>Add</button>
                        <br />
                        {this.state.actors.length > 0 ?
                        <Fragment>
                            <label>Actors:</label>
                            <br />
                            <ul>
                                {this.state.actors.map((actor, index) => {
                                    return (
                                        <li key={index}>{actor} <button type="button" onClick={() => this.removeItem(collectionNames.actors, actor)}>X</button></li>
                                    );
                                })}
                            </ul>
                        </Fragment>:null}
                        <br />
    
                        <label>Cover:</label>
                        <br />
                        <input type="text" name="cover" value={this.state.cover} onChange={this.handleChange} />
                        <br />
                        <button type="submit">Edit</button>
                    </form>
                }
            </div>
        );
    };
};

export default MovieEdit;
