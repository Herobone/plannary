import React, { Component, ReactElement, RefObject } from 'react';
import OnlyAuthed from '../Functional/OnlyAuthed';
import * as Alerts from '../../helper/AlertTypes';
import FullCalendar, { EventClickArg, EventSourceInput } from '@fullcalendar/react';
import timeGridPlugin from "@fullcalendar/timegrid";
import deLocale from '@fullcalendar/core/locales/de'
import enLocale from '@fullcalendar/core/locales/en-gb'
import { INITIAL_EVENTS } from "./events";
import firebase from 'firebase';
import { Event } from '../../helper/calendarTypes'

interface Props {
    createAlert: (type: Alerts.Alert | number | string, message: string | ReactElement, header?: ReactElement | null) => void;
    currentLocale: string;
}
interface State {
    events: EventSourceInput;
}

export default class Calender extends Component<Props, State> {


    calendarRef: RefObject<FullCalendar>;

    state = {
        events: INITIAL_EVENTS
    }

    constructor(props: Props) {
        super(props);
        this.calendarRef = React.createRef();
        this.handleEventClick = this.handleEventClick.bind(this);
        this.getEvents = this.getEvents.bind(this);
    }

    componentDidMount() {
        if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
            console.log("Is google");
            const api = this.calendarRef.current?.getApi();
            if (api) {
                this.getEvents(api.view.currentStart, api.view.currentEnd);
            }
        }
    }

    getEvents(from: Date | undefined, to: Date | undefined) {
        if (!(from && to) || !gapi.auth2.getAuthInstance().isSignedIn.get()) {
            return;
        }
        const api = this.calendarRef.current?.getApi();
        // @ts-expect-error
        const gcal: any = gapi.client.calendar;
        gcal.events.list({
            'calendarId': 'primary',
            'timeMin': from.toISOString(),
            "timeMax": to.toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'orderBy': 'startTime'
        }).then(function (response: any) {
            var events = response.result.items;
            console.log(events);
            if (events.length > 0) {
                for (let i = 0; i < events.length; i++) {
                    var event: Event = events[i];
                    var when = event.start.dateTime;
                    if (!when) {
                        when = event.start.date;
                    }
                    if (!api?.getEventById(event.id)) {
                        api?.addEvent({
                            title: event.summary,
                            editable: false,
                            start: when,
                            id: event.id
                        });
                    }
                }
            }
        })
    }

    handleEventClick(clickInfo: EventClickArg) {
        this.props.createAlert(1, clickInfo.event.title);
    }

    render() {
        const customs = {
            customprev: {
                text: "<",
                click: () => {
                    const api = this.calendarRef.current?.getApi();
                    api?.prev();
                    this.getEvents(api?.view.currentStart, api?.view.currentEnd);
                }
            },
            customnext: {
                text: ">",
                click: () => {
                    const api = this.calendarRef.current?.getApi();
                    api?.next();
                    this.getEvents(api?.view.currentStart, api?.view.currentEnd);
                }
            }
        }

        return (
            <OnlyAuthed className="w3-container app-content" >
                <FullCalendar
                    plugins={[timeGridPlugin]}
                    initialView="timeGridWeek"
                    locales={[deLocale, enLocale]}
                    locale={this.props.currentLocale}
                    selectable={true}
                    ref={this.calendarRef}
                    nowIndicator={true}
                    headerToolbar={{
                        left: 'title',
                        right: 'today customprev,customnext'
                    }}
                    customButtons={customs}
                    eventClick={this.handleEventClick}
                    initialEvents={INITIAL_EVENTS}
                    height={"95vh"}
                />
            </OnlyAuthed>
        )
    }
}