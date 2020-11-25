import React, { Component, ReactElement } from 'react'
import Column from '../Visuals/Column';
import Dropdown from '../Visuals/Dropdown';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import ContextMenu from '../Visuals/ContextMenu';
import OnlyAuthed from '../Functional/OnlyAuthed';
import * as Alerts from '../../helper/AlertTypes';
import * as gapiHelpers from '../../helper/gapiHelpers';

interface Props {
    changeLanguage: (locale: string) => void;
    currentLocale: string;
    createAlert: (type: Alerts.Alert | number | string, message: string | ReactElement, header?: ReactElement | null) => void;
}

export class Settings extends Component<Props> {

    public handleChange = (e: any) => {
        this.props.changeLanguage(e.target.value);
        console.log("Changed to " + e.target.value)
    }

    prepareContextMenu(): Map<number, string> {
        const menu: Map<number, string> = new Map<number, string>();

        menu.set(0, "contextmenu.settings.schedule");
        menu.set(1, "contextmenu.settings.calender");
        menu.set(2, "contextmenu.settings.exams");

        return menu;
    }

    render() {
        const options = {
            "de": "Deutsch",
            "en": "English"
        };
        
        const currentUser = firebase.auth().currentUser;

        let userName = "Logged Out";
        if (currentUser && currentUser.displayName) {
            userName = currentUser.displayName;
        }
        return (
            <OnlyAuthed className="w3-container w3-content app-content">
                <Column additionalClasses="app-content">
                    <h1><FormattedMessage id="account.navigation.settings" /></h1>
                    <h3>Hi {userName}!</h3>
                    <hr />
                    <h5><FormattedMessage id="settings.labels.selectlanguage" /></h5>
                    <Dropdown callback={this.props.changeLanguage} content={options} selected={this.props.currentLocale} />
                    <hr />
                    <br />
                    <Link to="/logout" className="w3-bar-item w3-button w3-red">
                        <FormattedMessage id="account.actions.logout" />
                    </Link>
                    <ContextMenu content={this.prepareContextMenu()} callback={(lol: number) => console.log(lol)} />
                    <br />
                </Column>
            </OnlyAuthed>
        )
    }
}

export default Settings
