import React, { Fragment } from 'react';
import './ListItem.css';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow } from 'mdbreact'

import { userRoles } from './../../constants/common';

const ListItem = (props) => {
    let shortDescription = props.shortDescr.slice(0, 50);
    shortDescription += '...';

    return (
            <MDBCol className="col-md-3">
                <MDBCard style={{ width: '22rem' }}>
                    <MDBCardImage className="img-fluid" src={props.imageUrl} waves />
                    <MDBCardBody>
                        <MDBCardTitle>{props.name}</MDBCardTitle>
                        <MDBCardText>{shortDescription}</MDBCardText>
                        
                        {
                            props.userRole === userRoles.ADMIN ?
                            <Fragment>
                                <MDBBtn onClick={() => props.openItemDetails(props.itemId)}>Details</MDBBtn>
                                <MDBBtn onClick={() => props.openItemEdit(props.itemId)}>Edit</MDBBtn>
                                <MDBBtn onClick={() => props.deleteItem(props.itemId)}>Delete</MDBBtn>
                            </Fragment>
                            : props.userRole === userRoles.USER ?
                            <Fragment>
                                <MDBBtn onClick={() => props.opentItemDetails(props.itemId)}>Details</MDBBtn>
                            </Fragment>
                            :
                            <Fragment>
                                <MDBCardText>Log in for more options</MDBCardText>
                            </Fragment>
                        }
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
    );
};

export default ListItem;
