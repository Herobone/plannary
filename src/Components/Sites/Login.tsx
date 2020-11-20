import React, { Component, ReactElement } from 'react'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { Redirect } from 'react-router';
import { FormattedMessage } from 'react-intl';
import * as Alerts from "../../helper/AlertTypes";
import config from '../../helper/config'

interface Props {
    createAlert: (type: Alerts.Alert | number | string, message: string | ReactElement, header?: ReactElement | null) => void;
}

export class Login extends Component<Props> {

    nameInputRef!: React.RefObject<HTMLInputElement>;



    // Configure FirebaseUI.
    uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'redirect',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            {
                provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                scopes: config.scopes
            },
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            // Avoid redirects after sign-in.
            signInSuccessWithAuthResult: (result: any) => {
                console.log("Hi");
                if (result.credential.accessToken) {
                    console.log("GToken " + result.credential.accessToken)
                }
                return false;
            }
        }
    };

    constructor(props: Props) {
        super(props);
        this.nameInputRef = React.createRef();
        this.setName = this.setName.bind(this);
    }

    setName() {
        const currentUser = firebase.auth().currentUser,
            input = this.nameInputRef.current;

        if (!input || !currentUser) {
            this.props.createAlert(3, <FormattedMessage id="general.shouldnothappen" />);
            return;
        }

        if (input.value.length < 3) {
            this.props.createAlert(2, <FormattedMessage id="account.actions.noname" />);
            return;
        }

        currentUser.updateProfile({ displayName: input.value });
        this.forceUpdate();
    }

    render() {
        const currentUser = firebase.auth().currentUser;
        return (
            <div className="login-page">
                <h1 className="w3-center">
                    <FormattedMessage id="general.welcome" />!
                    <br />
                </h1>
                <h3 className="w3-center">
                    <FormattedMessage id="account.descriptors.signinneeded" />
                </h3>

                {
                    !currentUser &&
                    <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
                }
                {
                    currentUser &&
                    <div>
                        {
                            (currentUser.displayName === null ||
                                currentUser.displayName.length <= 0) &&
                            <div>
                                <h1>
                                    <FormattedMessage id="account.descriptors.finishsignup" />
                                </h1>
                                <p>
                                    <label><b><FormattedMessage id="account.descriptors.yourname" /></b></label>
                                    <br />
                                    <input
                                        ref={this.nameInputRef}
                                        className="w3-input w3-border w3-round"
                                        name="name"
                                        type="text"
                                        style={{ width: "40%" }}
                                        placeholder="Name"
                                    />
                                </p>
                                <br />
                                <button className="w3-button w3-round w3-theme-d5" onClick={this.setName}>
                                    <FormattedMessage id="general.done" />
                                </button>
                            </div>
                        }
                        {
                            currentUser.displayName !== null &&
                            currentUser.displayName.length > 0 &&
                            <Redirect to="/" />
                        }
                    </div>
                }
            </div>
        )
    }
}

export default Login;
