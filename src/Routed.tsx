import React, { Component, ReactElement } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Header from "./Components/Navigation"
import * as firebase from 'firebase/app';
import 'firebase/auth';
import Settings from './Components/Settings';
import Home from './Components/Home';
import Login from './Components/Login';
import Alert from './Components/Alert';
import * as Alerts from './helper/AlertTypes';
import ContextMenu from './Components/ContextMenu';
import { IfFirebaseUnAuthed } from '@react-firebase/auth'

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

    standardContextMenu = {
        "1": "contextmenu.text.schedule",
        "2": "contextmenu.text.calender",
        "3": "contextmenu.text.exams"
    };

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

    render() {
        const currentUser = firebase.auth().currentUser;
        console.log("Username is " + currentUser?.displayName)

        let vals : ReactElement[] = [];
        const fn = (val: ReactElement, k: number, m: Map<number, ReactElement>) => {
            vals.push(val)
        }
        this.state.errorToDisplay.forEach(fn);

        return (

            <Router>
                <Header user={currentUser} />
                <div className="w3-container w3-content">
                    <div>
                        {vals}
                    </div>
                    <IfFirebaseUnAuthed>
                        {({ isSignedIn, user, providerId }) => {
                            return (
                                <Redirect to="/login" />
                            );
                        }}
                    </IfFirebaseUnAuthed>

                    <Switch>
                        <Route path="/login">
                            <Login createAlert={this.createAlert} />
                        </Route>

                        <Route path="/settings">
                            <Settings changeLanguage={this.props.changeLanguage} currentLocale={this.props.currentLocale} user={currentUser} />
                        </Route>

                        <Route path="/">
                            <Home createAlert={this.createAlert} user={currentUser} />
                        </Route>
                    </Switch>
                </div>
                <ContextMenu content={this.standardContextMenu} callback={(lol: string) => console.log(lol)} />
            </Router >
        )
    }
}

export default Routed
