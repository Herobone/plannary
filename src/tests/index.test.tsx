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
import { render } from '@testing-library/react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import LanguageContainer from '../translations/LanguageContainer';
import { CookiesProvider } from 'react-cookie';
import { act as domAct } from "react-dom/test-utils";
import { act as testAct, create } from "react-test-renderer";
import config from '../helper/config'
import ReactDOM, { unmountComponentAtNode } from 'react-dom';

firebase.initializeApp(config);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)

let container: HTMLDivElement | null = null;
let script: HTMLScriptElement | null = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
  script = document.createElement("script");
  script.src = "https://apis.google.com/js/api.js";
  script.type = "text/javascript";
  document.head.appendChild(script);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container?.remove();
  script?.remove();
  script = null;
  container = null;
});

test('Renders the Language Container', () => {
  //const { getByText } = render(<LanguageContainer />);
  //const linkElement = getByText(/learn react/i);
  //expect(linkElement).toBeInTheDocument();
  domAct(() => {
    ReactDOM.render(
      <React.StrictMode>
        <LanguageContainer />
      </React.StrictMode>,
      container);
  });
});
