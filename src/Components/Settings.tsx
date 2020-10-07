import React, { Component } from 'react'
import Column from './Column';
import Dropdown from './Dropdown';
import { FormattedMessage } from 'react-intl';

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
            <Column>
                <h1><FormattedMessage id="account.navigation.settings" /></h1>
                <h3>Hi {userName}!</h3>
                <hr />
                <h5><FormattedMessage id="settings.labels.selectlanguage" /></h5>
                <Dropdown callback={this.props.changeLanguage} content={options} selected={this.props.currentLocale} />
                <hr />
            </Column>
        )
    }
}

export default Settings
