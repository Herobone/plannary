import React, { Component, ReactElement } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Settings from '../Sites/Settings';
import Home from '../Sites/Home';
import * as Alerts from '../../helper/AlertTypes';
import Login from '../Sites/Login';
import Calender from '../Sites/Calender';
import Schedule from '../Sites/Schedule';

interface Props {
    changeLanguage: (locale: string) => void;
    currentLocale: string;
    createAlert: (type: Alerts.Alert | number | string, message: string | ReactElement, header?: ReactElement | null) => void;
}

interface State {
    locale: string;
}

export class Routed extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            locale: navigator.language
        }
    }

    render() {
        return (
            <Router>

                <Switch>
                    <Route path="/login">
                        <Login createAlert={this.props.createAlert} />
                    </Route>

                    <Route path="/schedule">
                        <Schedule createAlert={this.props.createAlert} />
                    </Route>

                    <Route path="/calendar">
                        <Calender createAlert={this.props.createAlert} currentLocale={this.props.currentLocale} />
                    </Route>

                    <Route path="/settings">
                        <Settings
                            changeLanguage={this.props.changeLanguage}
                            currentLocale={this.props.currentLocale}
                            createAlert={this.props.createAlert}
                        />
                    </Route>

                    <Route path="/">
                        <Home createAlert={this.props.createAlert}/>
                    </Route>
                </Switch>
            </Router >
        )
    }
}

export default Routed;
