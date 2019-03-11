import React, { Component } from 'react';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import userService from './../../services/user-service';
import { errorNotifs } from './../../constants/notification-messages';
import { OK } from './../../constants/http-responses';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            repeatPassword: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    handleSubmit(e) {
        e.preventDefault();
        
        if (this.state.username.length < 3) {
            NotificationManager.error(errorNotifs.USERNAME_SHOULD_BE_ATLEAST_3_CHARACTERS_LONG);
            return;
        }

        if (this.state.password.length < 6) {
            NotificationManager.error(errorNotifs.PASSWORD_SHOULD_BE_ATLEAST_6_CHARACTERS_LONG);
            return;
        }

        if (this.state.password !== this.state.repeatPassword) {
            NotificationManager.error(errorNotifs.PASSWORDS_DO_NOT_MATCH);
            return;
        }

        const user = {
            username: this.state.username,
            password: this.state.password
        };
        
        const promise = userService.register(user);
        promise.then(res => {
            if (res.status === OK) {
                res.json()
                    .then(data => {
                        NotificationManager.success(data.message);
                        window.location.href = '/';
                    });
            } else {
                res.json()
                    .then(err => {
                        NotificationManager.error(err.message);
                    });
            }
        })
    }

    render() {
        return (
            <div className="Register">
                <form onSubmit={this.handleSubmit}>
                    <label>Username:</label>
                    <br />
                    <input name="username" type="text" onChange={this.handleChange} />
                    <br />
                    <label>Password:</label>
                    <br />
                    <input name="password" type="password" onChange={this.handleChange} />
                    <br />
                    <label>Repeat password:</label>
                    <br />
                    <input name="repeatPassword" type="password" onChange={this.handleChange} />
                    <br />
                    <button type="submit">Register</button>
                </form>

                <NotificationContainer />
            </div>
        );
    };
};

export default Register;
