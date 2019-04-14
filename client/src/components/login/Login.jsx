import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { MDBModal, MDBModalHeader, MDBModalBody, MDBRow, MDBCol, MDBInput, MDBBtn, MDBContainer, MDBFooter } from 'mdbreact';

import userService from './../../services/user-service';
import { errorNotifs } from './../../constants/notification-messages';
import { OK } from './../../constants/http-responses';
import { userRoles, notifTypes } from './../../constants/common';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
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

    handleSubmit() {
        if (this.state.username.length < 3) {
            this.props.notifHandler(errorNotifs.USERNAME_SHOULD_BE_ATLEAST_3_CHARACTERS_LONG, notifTypes.error);
            return;
        }

        if (this.state.password.length < 6) {
            this.props.notifHandler(errorNotifs.PASSWORD_SHOULD_BE_ATLEAST_6_CHARACTERS_LONG, notifTypes.error);
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
                    const userRole = response.data.user.roles.includes(userRoles.ADMIN)
                        ? userRoles.ADMIN : userRoles.USER;

                    // Setting credentials
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userRole', userRole);

                    this.props.notifHandler(response.data.msg, notifTypes.success);
                    setTimeout(() => { window.location.href = '/'; }, 2000);
                });
            } else {
                res.json().then(err => {
                    this.props.notifHandler(err.message, notifTypes.error);
                    setTimeout(() => { this.setState({ isLoading: false }); }, 1000);
                });
            }
          });
    }

    render() {
        return (
            this.state.isLoading ?
            <Loader type="Ball-Triangle" color="black" height="120"/>
            :
            <MDBModal isOpen={this.props.isOpen}>
                <MDBModalHeader toggle={this.props.toggle}>Sign in</MDBModalHeader>
                <MDBModalBody>
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol>
                                <MDBInput
                                name="username"
                                onChange={this.handleChange}
                                label="Type your username"
                                type="text"
                                validate
                                success="right"
                                error="wrong" />

                                <MDBInput
                                name="password"
                                onChange={this.handleChange}
                                label="Type your password"
                                type="password"
                                validate
                                success="right"
                                error="wrong" />
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </MDBModalBody>
                <MDBFooter>
                    <MDBBtn onClick={this.handleSubmit}>Login</MDBBtn>
                </MDBFooter>
            </MDBModal>
        );
    };
};

export default Login;
