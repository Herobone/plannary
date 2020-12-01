import firebase from 'firebase';
import React, { Component, ReactElement } from 'react';
import { Redirect } from 'react-router';
import * as gapiHelpers from '../../helper/gapiHelpers';
import * as Alerts from '../../helper/AlertTypes';
import { FormattedMessage } from 'react-intl';

interface Props {
    createAlert: (type: Alerts.Alert | number | string, message: string | ReactElement, header?: ReactElement | null) => void;
}
interface State {
    
}

export default class Logout extends Component<Props, State> {
    state = {}

    componentDidMount() {
        gapiHelpers.signOutGAPI();
        firebase.auth().signOut();
        this.props.createAlert(1, <FormattedMessage id="account.descriptions.signout.success"/>, <FormattedMessage id="elements.alerts.success"/>);
    }

    render() {
        return (
            <Redirect to="/login" />
        )
    }
}
