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
                <div className="w3-sidebar w3-bar-block w3-small w3-hide-small w3-center">
                    <div className="w3-theme-d2">
                        <Link to="/" className="w3-bar-item w3-button w3-padding-large w3-theme-d4 w3-left" onClick={this.closeNav}>
                            <img src={Mascot} className="logo-header" alt="Logo" />
                            <p>Plannery</p>
                        </Link>
                        {/*<a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="News"><i className="fa fa-globe"></i></a>
                        <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Account Settings"><i className="fa fa-user"></i></a>
                        <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Messages"><i className="fa fa-envelope"></i></a>
                        <div className="w3-dropdown-hover w3-hide-small">
                            <button className="w3-button w3-padding-large" title="Notifications"><i className="fa fa-bell"></i><span className="w3-badge w3-right w3-small w3-green">3</span></button>
                            <div className="w3-dropdown-content w3-card-4 w3-bar-block" style={{ "width": "300px" }}>
                                <a href="#" className="w3-bar-item w3-button">One new friend request</a>
                                <a href="#" className="w3-bar-item w3-button">John Doe posted on your wall</a>
                                <a href="#" className="w3-bar-item w3-button">Jane likes your post</a>
                            </div>
                        </div>*/}
                        <Link to="/settings" className="w3-bar-item w3-button w3-padding-large w3-hover-white w3-left" title="Account">
                            <img src={profilePicture} className="w3-circle app-profile-avatar-header" alt="Avatar" />
                        </Link>
                    </div>
                </div>
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
                        <FormattedMessage id="tags.navigation.create" />
                    </div>
                    <div className="w3-bar-item w3-button w3-padding-large" onClick={this.closeNav}>
                        <FormattedMessage id="tags.navigation.found" />
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
