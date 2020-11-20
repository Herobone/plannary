import React, { Component, ReactElement } from 'react';
import OnlyAuthed from '../Functional/OnlyAuthed';
import * as Alerts from '../../helper/AlertTypes';
import FullCalendar, { EventClickArg } from '@fullcalendar/react';
import timeGridPlugin from "@fullcalendar/timegrid";
import deLocale from '@fullcalendar/core/locales/de'
import enLocale from '@fullcalendar/core/locales/en-gb'
import { INITIAL_EVENTS} from "./events";
import firebase from 'firebase';


interface Props {
    createAlert: (type: Alerts.Alert | number | string, message: string | ReactElement, header?: ReactElement | null) => void;
    currentLocale: string;
}
interface State {
    idToken?: string;
    gToken?: string;
}

export default class Calender extends Component<Props, State> {
    state = {}

    constructor(props: Props) {
        super(props);
        this.handleEventClick = this.handleEventClick.bind(this);
        this.handleGotIdToken = this.handleGotIdToken.bind(this);
    }

    componentDidMount() {
        const currentProvider = firebase.auth().currentUser?.providerData[0]?.providerId;
        console.log(currentProvider);
        if (currentProvider === firebase.auth.GoogleAuthProvider.PROVIDER_ID) {
            console.log("Is google");
            firebase.auth().currentUser?.getIdToken().then(this.handleGotIdToken)
        }
    }

    handleEventClick(clickInfo: EventClickArg) {
        this.props.createAlert(1, clickInfo.event.title);
    }

    handleGotIdToken(idToken: string) {
        const cred = firebase.auth.GoogleAuthProvider.credential(idToken);
        this.setState({
            idToken: idToken,
            gToken: cred.accessToken
        });
        console.log(cred.accessToken);
    }

    render() {

        return (
            <OnlyAuthed className="w3-container app-content" >
                <FullCalendar
                    plugins={[timeGridPlugin]}
                    initialView="timeGridWeek"
                    locales={[deLocale, enLocale]}
                    locale={this.props.currentLocale}
                    selectable={true}
                    eventClick={this.handleEventClick}
                    initialEvents={INITIAL_EVENTS}
                />
            </OnlyAuthed>
        )
    }
}