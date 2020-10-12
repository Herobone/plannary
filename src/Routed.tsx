import React, { Component, ReactElement } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Header from "./Components/Header"
import * as firebase from 'firebase/app';
import 'firebase/auth';
import Settings from './Components/Settings';
import Home from './Components/Home';
import Login from './Components/Login';
import Alert from './Components/Alert';
import * as Alerts from './helper/AlertTypes';

interface Props {
    changeLanguage: (locale: string) => void;
    currentLocale: string
}

interface State {
    errorToDisplay: ReactElement | null;
    locale: string;
    isSignedIn: boolean;
}

export class Routed extends Component<Props, State> {

    unregisterAuthObserver!: firebase.Unsubscribe;

    constructor(props: Props) {
        super(props);
        this.state = {
            locale: navigator.language,
            isSignedIn: false,
            errorToDisplay: null
        }
        this.displayError = this.displayError.bind(this);
        this.createAlert = this.createAlert.bind(this);
        this.clearAlerts = this.clearAlerts.bind(this);
    }

    // Listen to the Firebase Auth state and set the local state.
    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => this.setState({ isSignedIn: !!user })
        );
    }

    // Make sure we un-register Firebase observers when the component unmounts.
    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    displayError(err: ReactElement<Alert>) {
        this.setState({ errorToDisplay: err })
    }

    clearAlerts() {
        this.setState({ errorToDisplay: null });
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

        const al = (
            <Alert type={alertType} header={header} clear={this.clearAlerts}>
                {message}
            </Alert>
        )

        this.setState({ errorToDisplay: al });
    }

    render() {
        const currentUser = firebase.auth().currentUser;
        console.log("Username is " + currentUser?.displayName)
        return (

            <Router>
                <Header user={currentUser} />
                <div className="w3-container w3-content app-content">
                    {
                        this.state.errorToDisplay !== null &&
                        this.state.errorToDisplay
                    }

                    {
                        (currentUser &&
                        (currentUser.displayName === null ||
                            currentUser.displayName === "undefined" ||
                            currentUser.displayName.length <= 0)) &&
                        <Redirect to="/login" />
                    }

                    <Switch>
                        <Route path="/login">
                            <Login createAlert={this.createAlert} />
                        </Route>

                        <Route path="/settings">
                            <Settings changeLanguage={this.props.changeLanguage} currentLocale={this.props.currentLocale} user={currentUser} />
                        </Route>

                        <Route path="/">
                            <Home user={currentUser} />
                        </Route>

                    </Switch>
                </div>
            </Router >
        )
    }
}

export default Routed
