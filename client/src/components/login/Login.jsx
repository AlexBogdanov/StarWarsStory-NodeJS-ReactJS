import React, { Component } from 'react';
import './Login.css';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import userService from './../../services/user-service';
import { errorNotifs } from './../../constants/notification-messages';
import { OK } from './../../constants/http-responses';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            rememberMe: false,
            isLoading: false
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
        
        if (this.state.username.lenght < 3) {
            NotificationManager.error(errorNotifs.USERNAME_SHOULD_BE_ATLEAST_3_CHARACTERS_LONG);
            return;
        }

        if (this.state.password.length < 6) {
            NotificationManager.error(errorNotifs.PASSWORD_SHOULD_BE_ATLEAST_6_CHARACTERS_LONG);
            return;
        }

        const user = {
            username: this.state.username,
            password: this.state.password
        };

        this.setState({ isLoading: true });
        
        userService.login(user)
          .then(res => {
            if (res.status === OK) {
                res.json().then(response => {
                    if (this.state.rememberMe) {
                        localStorage.setItem('token', response.data.token);
                    } else {
                        sessionStorage.setItem('token', response.data.token);
                    }

                    NotificationManager.success(response.data.msg);
                    setTimeout(() => { window.location.href = '/'; }, 2000);
                });
            } else {
                res.json().then(err => {
                    NotificationManager.error(err.data.msg);
                    this.setState({ isLoading: false });
                });
            }
          });
    }

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <label>Username:</label>
                    <br />
                    <input name="username" type="text" onChange={this.handleChange} />
                    <br />
                    <label>Password:</label>
                    <br />
                    <input name="password" type="password" onChange={this.handleChange} />
                    <br />
                    <label>Remember me:</label> <input name="rememberMe" type="checkbox" onChange={this.handleChange} />
                    <br />
                    <button type="submit">Login</button>
                </form>

                <NotificationContainer />
            </div>
        );
    };
};

export default Login;
