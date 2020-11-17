import "../css/App.css"
import React, { Component } from 'react'
import Mascot from "../media/MascottAlpha.png"
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

interface HeaderProps {
    user: firebase.User | null
}

interface HeaderState {

}

export class Header extends Component<HeaderProps, HeaderState> {

    mobileNavRef: React.RefObject<HTMLDivElement>;

    constructor(props: any) {
        super(props)
        this.mobileNavRef = React.createRef();
        this.toggleNav = this.toggleNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
    }

    toggleNav() {
        if (!this.mobileNavRef) {
            return;
        }
        if (this.mobileNavRef.current) {
            const cur = this.mobileNavRef.current;
            if (cur.className.indexOf("w3-show") === -1) {
                cur.className += " w3-show";
            } else {
                cur.className = cur.className.replace(" w3-show", "");
            }
        }
    }

    closeNav() {
        if (this.mobileNavRef === null) {
            return;
        }
        if (this.mobileNavRef.current !== null) {
            const cur = this.mobileNavRef.current;
            cur.className = cur.className.replace(" w3-show", "");
        }
    }

    render() {
        const { user } = this.props;
        let profilePicture = Mascot;
        if (user && user.photoURL) {
            profilePicture = user.photoURL;
        }
        return (
            <div>
                <nav className="w3-sidebar w3-bar-block w3-small w3-hide-small w3-center">
                    <div className="w3-theme-d2">
                        <Link to="/" className="w3-bar-item w3-button w3-padding-large w3-theme-d4 w3-left" onClick={this.closeNav}>
                            <img src={Mascot} className="logo-header" alt="Logo" />
                            <p>Plannery</p>
                        </Link>
                        <Link to="/settings" className="w3-bar-item w3-button w3-padding-large w3-hover-white w3-left" title="Account">
                            <img src={profilePicture} className="w3-circle app-profile-avatar-header" alt="Avatar" />
                        </Link>
                    </div>
                </nav>
                <div className="w3-top w3-bar w3-theme-d2 w3-left-align w3-hide-large w3-hide-medium">
                    <button
                        className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-left w3-padding-large w3-hover-white w3-theme-d2 w3-large"
                        onClick={this.toggleNav}
                    >
                        <i className="fa fa-bars"></i>
                    </button>
                </div>
                <div
                    id="mobileNav"
                    className="w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium w3-large app-header-compensate"
                    ref={this.mobileNavRef}
                >
                    <div className="w3-bar-item w3-button w3-padding-large" onClick={this.closeNav}>
                        <FormattedMessage id="general.placeholder" />
                    </div>
                    <div className="w3-bar-item w3-button w3-padding-large" onClick={this.closeNav}>
                        <FormattedMessage id="general.placeholder" />
                    </div>
                    {
                        user &&
                        <div>
                            <div className="w3-bar-item w3-button w3-padding-large" onClick={this.closeNav}>
                                <FormattedMessage id="navigation.startgame" />
                            </div>
                            <Link to="/settings" className="w3-bar-item w3-button w3-padding-large" onClick={this.closeNav}>
                                <FormattedMessage id="navigation.myprofile" />
                            </Link>
                            <button className="w3-bar-item w3-button w3-red w3-padding-large" onClick={() => { this.closeNav(); firebase.auth().signOut() }}>
                                <FormattedMessage id="account.actions.logout" />
                            </button>
                        </div>
                    }
                    {
                        !user &&
                        <Link to="/login" className="w3-bar-item w3-button w3-padding-large" onClick={this.closeNav}>
                            <FormattedMessage id="account.actions.login" />
                        </Link>
                    }
                </div>
            </div>
        )
    }
}

export default Header
