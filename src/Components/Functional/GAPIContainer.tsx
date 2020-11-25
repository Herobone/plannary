import React, { Component, ReactElement } from 'react'
import * as Alerts from '../../helper/AlertTypes';
import config from '../../helper/config';
import * as firebase from 'firebase/app';
import 'firebase/auth';

interface Props {
    createAlert: (type: Alerts.Alert | number | string, message: string | ReactElement, header?: ReactElement | null) => void;
}
interface State {
    gapiInitDone: boolean;
}

export default class GAPIContainer extends Component<Props, State> {

    unregisterAuthObserver!: firebase.Unsubscribe;

    state = {
        gapiInitDone: false
    }

    constructor(props: Props) {
        super(props);
        this.initGAPI = this.initGAPI.bind(this);
        this.initAuth2 = this.initAuth2.bind(this);
    }

    componentDidMount() {
        gapi.load("client:auth2", this.initGAPI);
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => {
                
            }
        );
    }

    // Make sure we un-register Firebase observers when the component unmounts.
    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    initGAPI() {
        gapi.client.init({
            apiKey: config.apiKey,
            clientId: config.clientId,
            discoveryDocs: config.discoveryDocs,
            scope: config.scopes.join(' '),
        }).then(() => {      // Make sure the Google API Client is properly signed in
            console.log("Init sucessful!");
            this.setState({ gapiInitDone: true });
        }, (error: any) => {
            console.log("Error cause: " + error.details)
            this.props.createAlert(3, error.details);
        });

        this.initAuth2();
    }

    initAuth2() {
        const auth2 = gapi.auth2.getAuthInstance();
        gapi.auth2.getAuthInstance().isSignedIn.listen(isSignedIn => {
            if (isSignedIn) {
                console.log("User was signed in!");
                const currentUser = auth2.currentUser.get()
                const authResponse = currentUser.getAuthResponse(true)
                const credential = firebase.auth.GoogleAuthProvider.credential(
                    authResponse.id_token,
                    authResponse.access_token
                );
                firebase.auth().signInWithCredential(credential);
            } else {
                console.log("User was signed out!");
                firebase.auth().signOut();
                this.props.createAlert(1, "Signed Out!");
            }
        });
    }


    render() {
        return (
            <div>
                {!this.state.gapiInitDone &&
                    <div className="w3-display-middle w3-xlarge">
                        <span className="w3-center w3-padding-large">Loading</span>
                        <br />
                        <i className="w3-center fas fa-spinner fa-spin fa-7x"></i>
                    </div>
                }
                {this.state.gapiInitDone &&
                    this.props.children}
            </div>
        )
    }
}
