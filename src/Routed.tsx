import React, { Component, ReactElement } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import * as firebase from 'firebase/app';
import 'firebase/auth';
import Settings from './Components/Sites/Settings';
import Home from './Components/Sites/Home';
import * as Alerts from './helper/AlertTypes';
import Alert from './Components/Visuals/Alert';
import Login from './Components/Sites/Login';
import Calender from './Components/Sites/Calender';

import config from './helper/config'

interface Props {
    changeLanguage: (locale: string) => void;
    currentLocale: string
}

interface State {
    errorToDisplay: Map<number, ReactElement>;
    locale: string;
    isSignedIn: boolean;
    lastIndex: number;
}

export class Routed extends Component<Props, State> {

    unregisterAuthObserver!: firebase.Unsubscribe;

    constructor(props: Props) {
        super(props);
        this.state = {
            locale: navigator.language,
            isSignedIn: false,
            errorToDisplay: new Map<number, ReactElement>(),
            lastIndex: 0
        }
        this.createAlert = this.createAlert.bind(this);
    }

    // Listen to the Firebase Auth state and set the local state.
    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => {
                this.setState({ isSignedIn: !!user });
                console.log("State chganged to: " + !!user);
                console.log("User: ");
                console.log(user);
                if (user) {
                    user.getIdToken(true).then((id: string) => {
                        console.log("ID: " + id);
                        gapi.load("client", () => {
                            gapi.auth2.authorize({
                                response_type: 'permission',
                                client_id: config.clientId,
                                scope: config.scopes.join(' '),
                                login_hint: id,
                                prompt: 'none'
                            }, (response: gapi.auth2.AuthorizeResponse) => {
                                gapi.client.init({
                                    apiKey: config.apiKey,
                                    clientId: config.clientId,
                                    discoveryDocs: config.discoveryDocs,
                                    scope: config.scopes.join(' '),
                                }).then(() => {      // Make sure the Google API Client is properly signed in
                                    console.log("Init sucessful!");
                                }, (error: any) => {
                                    console.log("Error cause: " + error.details)
                                });
                            });
                        });
                    });
                }
            }
        );
    }

    // Make sure we un-register Firebase observers when the component unmounts.
    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    createAlert(type: Alerts.Alert | number | string, message: string | ReactElement, header?: ReactElement | null) {

        let alertType!: Alerts.Alert;

        if (type instanceof Alerts.Alert) {
            alertType = type;
        }
        else if (typeof type === "number") {
            if (type === 3) {
                alertType = new Alerts.Error()
            } else if (type === 2) {
                alertType = new Alerts.Warning()
            } else if (type === 1) {
                alertType = new Alerts.Success()
            } else {
                alertType = new Alerts.Info()
            }
        }
        else {
            if (type === "error") {
                alertType = new Alerts.Error()
            } else if (type === "warning") {
                alertType = new Alerts.Warning()
            } else if (type === "success") {
                alertType = new Alerts.Success()
            } else {
                alertType = new Alerts.Info()
            }
        }

        const { errorToDisplay, lastIndex } = this.state;
        const alertIndex = lastIndex + 1;
        const al = (
            <Alert key={"alert" + alertIndex} type={alertType} header={header} clear={() => {
                const { errorToDisplay } = this.state;
                errorToDisplay.delete(alertIndex);
                this.setState({ errorToDisplay: errorToDisplay });
            }}>
                {message}
            </Alert>
        )
        errorToDisplay.set(alertIndex, al);
        this.setState({ errorToDisplay: errorToDisplay, lastIndex: alertIndex })
    }

    prepareAlerts(): ReactElement[] {
        let vals: ReactElement[] = [];
        const fn = (val: ReactElement, k: number, m: Map<number, ReactElement>) => {
            vals.push(val)
        }
        this.state.errorToDisplay.forEach(fn);
        return vals;
    }

    render() {
        const currentUser = firebase.auth().currentUser;

        return (

            <Router>
                <div className="w3-container w3-content">
                    <div className="alert-area">
                        {this.prepareAlerts()}
                    </div>
                </div>
                {/*!this.state.isSignedIn && <Redirect to="/login" />*/}

                <Switch>
                    <Route path="/login">
                        <Login createAlert={this.createAlert} />
                    </Route>

                    <Route path="/calendar">
                        <Calender createAlert={this.createAlert} currentLocale={this.props.currentLocale} />
                    </Route>

                    <Route path="/settings">
                        <Settings changeLanguage={this.props.changeLanguage} currentLocale={this.props.currentLocale} user={currentUser} createAlert={this.createAlert} />
                    </Route>

                    <Route path="/">
                        <Home createAlert={this.createAlert} user={currentUser} />
                    </Route>
                </Switch>
            </Router >
        )
    }
}

export default Routed
