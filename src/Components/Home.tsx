// Copyright (C) 2020 Herobone & Aynril
// 
// This file is part of Lapislar.
// 
// Lapislar is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// Lapislar is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with Lapislar.  If not, see <http://www.gnu.org/licenses/>.

import React from 'react';
import '../css/App.css';
import Column from "./Column"
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

interface Props {
  user: firebase.User | null;
}

class Home extends React.Component<Props> {
  // The component's Local state.

  render() {
    const currentUser = this.props.user;
    let profilePicture = "";
    if (currentUser && currentUser.photoURL) {
      profilePicture = currentUser.photoURL;
    }
    let userName = "Logged Out";
    if (currentUser && currentUser.displayName) {
      userName = currentUser.displayName;
    }

    return (
      <div className="Home" >
        {
          currentUser &&
          <div className="w3-row-padding">
            {
              (currentUser.displayName === null ||
                currentUser.displayName.length <= 0) &&
              <Redirect to="/login" />
            }
            <Column additionalClasses="w3-quarter">
              <h4 className="w3-center"><b><u><FormattedMessage id="time.today" /></u></b></h4>
              <p className="w3-center"><img src={profilePicture} className="w3-circle" style={{ "height": "106px", "width": "106px" }} alt="Avatar" /></p>
              My Profile
            </Column>
            <Column additionalClasses="w3-quarter w3-center">
              <Link
                to="/tag/create"
                className="w3-button w3-round w3-xlarge w3-blue">
                <FormattedMessage id="tags.navigation.create" />
              </Link>
            </Column>
            <Column additionalClasses="w3-quarter w3-center">
              <Link
                to="/tag/found"
                className="w3-button w3-round w3-xlarge w3-teal">
                <FormattedMessage id="tags.navigation.found" />
              </Link>
            </Column>
            <Column additionalClasses="w3-quarter">
              <h4 className="w3-center">{userName}</h4>
              <p className="w3-center"><img src={profilePicture} className="w3-circle" style={{ "height": "106px", "width": "106px" }} alt="Avatar" /></p>
              Test
            </Column>
          </div>
        }
      </div>
    );
  }
}

export default Home;
