import React, { Component } from 'react'
import Column from './Column';
import Dropdown from './Dropdown';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import ContextMenu from './ContextMenu';

interface Props {
    changeLanguage: (locale: string) => void;
    currentLocale: string;
    user: firebase.User | null;
}

export class Settings extends Component<Props> {

    public handleChange = (e: any) => {
        this.props.changeLanguage(e.target.value);
        console.log("Changed to " + e.target.value)
    }

    standardContextMenu = {
        1: "Option Eins",
        2: "Option Zwei",
        3: "Option Drei"
    };

    render() {
        const options = {
            "de": "Deutsch",
            "en": "English"
        };
        const currentUser = this.props.user;
        let userName = "Logged Out";
        if (currentUser && currentUser.displayName) {
            userName = currentUser.displayName;
        }
        return (
            <Column additionalClasses="app-content">
                <h1><FormattedMessage id="account.navigation.settings" /></h1>
                <h3>Hi {userName}!</h3>
                <hr />
                <h5><FormattedMessage id="settings.labels.selectlanguage" /></h5>
                <Dropdown callback={this.props.changeLanguage} content={options} selected={this.props.currentLocale} />
                <hr />
                <br />
                <Link to="/login" className="w3-bar-item w3-button w3-red" onClick={() => firebase.auth().signOut()}>
                    <FormattedMessage id="account.actions.logout" />
                </Link>
                <ContextMenu content={this.standardContextMenu} callback={(lol: string) => console.log(lol)}/>
            </Column>
        )
    }
}

export default Settings
