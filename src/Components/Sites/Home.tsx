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

import React, { ReactElement } from 'react';
import '../../css/App.css';
import Column from "../Visuals/Column"
import * as firebase from 'firebase/app';
import { FormattedMessage } from 'react-intl';
import * as Alerts from '../../helper/AlertTypes';
import ContextMenu from '../Visuals/ContextMenu';
import OnlyAuthed from '../Functional/OnlyAuthed';

interface Props {
  createAlert: (type: Alerts.Alert | number | string, message: string | ReactElement, header?: ReactElement | null) => void;
}

class Home extends React.Component<Props> {
  // The component's Local state.

  prepareContextMenu(): Map<number, string> {
    const menu: Map<number, string> = new Map<number, string>();

    menu.set(0, "contextmenu.home.schedule");
    menu.set(1, "contextmenu.home.calender");
    menu.set(2, "contextmenu.home.exams");

    return menu;
  }

  render() {
    const currentUser = firebase.auth().currentUser;
    let profilePicture = "";
    if (currentUser && currentUser.photoURL) {
      profilePicture = currentUser.photoURL;
    }
    let userName = "Logged Out";
    if (currentUser && currentUser.displayName) {
      userName = currentUser.displayName;
    }

    return (
      <OnlyAuthed className="w3-container Home app-content" >
        {
          currentUser &&
          <div className="w3-row-padding">
            <Column additionalClasses="w3-quarter">
              <h4 className="w3-center"><b><u><FormattedMessage id="time.today" /></u></b></h4>
              <p className="w3-center"><img src={profilePicture} className="w3-circle" style={{ "height": "106px", "width": "106px" }} alt="Avatar" /></p>
              My Profile
            </Column>
            <Column additionalClasses="w3-quarter w3-center">
              <button
                onClick={() => this.props.createAlert(1, "Hi")}
                className="w3-button w3-round w3-xlarge w3-blue">
                <FormattedMessage id="general.placeholder" />
              </button>
            </Column>
            <Column additionalClasses="w3-quarter w3-center">
              <button
                onClick={() => {
                  let user = gapi.auth2.getAuthInstance().currentUser.get();
                  this.props.createAlert(1, "Hi " + user.getBasicProfile().getName());
                }}
                className="w3-button w3-round w3-xlarge w3-teal">
                <FormattedMessage id="general.placeholder" />
              </button>
            </Column>
            <Column additionalClasses="w3-quarter">
              <h4 className="w3-center">{userName}</h4>
              <p className="w3-center"><img src={profilePicture} className="w3-circle" style={{ "height": "106px", "width": "106px" }} alt="Avatar" /></p>
              Test
            </Column>
          </div>
        }
        <ContextMenu content={this.prepareContextMenu()} callback={(lol: number) => console.log(lol)} />
      </OnlyAuthed>
    );
  }
}

export default Home;
