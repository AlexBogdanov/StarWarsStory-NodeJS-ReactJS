import React, { Fragment } from 'react';
import './ListItem.css';

import { userRoles } from './../../constants/common';

const ListItem = (props) => {
    let shortDescription = props.shortDescr.slice(0, 50);
    shortDescription += '...';

    return (
        <div className="ListItem">
            <img src={props.imageUrl} alt="" />
            <span>{props.name}</span>
            <span>{shortDescription}</span>
            {props.userRole === userRoles.ADMIN ?
            <Fragment>
                <button onClick={() => props.openItemDetails(props.itemId)}>Details</button>
                <button onClick={() => props.openItemEdit(props.itemId)}>Edit</button>
                <button onClick={() => props.deleteItem(props.itemId)}>Delete</button>
            </Fragment>
            : props.userRole === userRoles.USER ?
            <Fragment>
                <button onClick={() => props.openItemDetails(props.itemId)}>Details</button>
            </Fragment>
            : <Fragment>
                <span>Log in for more options</span>
              </Fragment>
            }
        </div>
    );
};

export default ListItem;
