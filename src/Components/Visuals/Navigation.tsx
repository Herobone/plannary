import "../../css/App.css"
import React, { Component } from 'react'
import Mascot from "../../media/MascottAlpha.png"
import firebase from 'firebase';
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

interface NavigationProps {
    user: firebase.User | null
}

interface NavigationState {

}

export class Navigation extends Component<NavigationProps, NavigationState> {

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
            <div className="navigation-provider">
                <nav id="desktop-nav" className="sidebar w3-theme-d2 w3-hide-small">
                    <Link to="/" className="logo-sidebar" onClick={this.closeNav}>
                        <img src={Mascot} className="logo-sidebar" alt="Logo" />
                    </Link>
                    <Link to="/calendar" className="sidebar-element far fa-calendar-alt">
                    </Link>
                    <Link to="/schedule" className="sidebar-element schedule-icon">
                    </Link>
                    <div className="user-section-sidebar">
                        <div className="inner-user-sidebar">
                            <Link to="/settings" className="user-settings-sidebar" title="Account">
                                <img src={profilePicture} className="user-image-sidebar" alt="Avatar" />
                            </Link>
                            <div className="username-sidebar">
                                {user?.displayName}
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="w3-top w3-bar w3-theme-d2 w3-left-align w3-hide-large w3-hide-medium">
                    <button
                        className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-left w3-padding-large w3-hover-white w3-theme-d2 w3-large"
                        onClick={this.toggleNav}
                    >
                        <i className="fa fa-bars" />
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
                            <Link to="/logout" className="w3-bar-item w3-button w3-red w3-padding-large" onClick={this.closeNav}>
                                <FormattedMessage id="account.actions.logout" />
                            </Link>
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

export default Navigation
