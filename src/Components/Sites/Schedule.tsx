import React, { Component, ReactElement } from 'react';
import * as Alerts from '../../helper/AlertTypes';
import OnlyAuthed from '../Functional/OnlyAuthed';

interface Props {
    createAlert: (type: Alerts.Alert | number | string, message: string | ReactElement, header?: ReactElement | null) => void;
}
interface State {

}

export default class Schedule extends Component<Props, State> {
    state = {}

    render() {
        return (
            <OnlyAuthed className="w3-container app-content">
                <table className="schedule-table">
                    <tr className="schedule-day-header">
                        <td className="schedule-lesson-column">
                            <span className="schedule-cell-content">Lesson</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Monday</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Tuesday</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Wednesday</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Thursday</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Friday</span>
                        </td>
                    </tr>
                    <tr className="schedule-week-content">
                        <td className="schedule-lesson-column">
                        <span className="schedule-cell-content">1</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Monday</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Tuesday</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Wednesday</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Thursday</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Friday</span>
                        </td>
                    </tr>
                    <tr className="schedule-week-content">
                        <td className="schedule-lesson-column">
                        <span className="schedule-cell-content">1</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Monday</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Tuesday</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Wednesday</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Thursday</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Friday</span>
                        </td>
                    </tr>
                    <tr className="schedule-week-content">
                        <td className="schedule-lesson-column">
                        <span className="schedule-cell-content">1</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Monday</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Tuesday</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Wednesday</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Thursday</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Friday</span>
                        </td>
                    </tr>
                    <tr className="schedule-week-content">
                        <td className="schedule-lesson-column">
                        <span className="schedule-cell-content">1</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Monday</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Tuesday</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Wednesday</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Thursday</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Friday</span>
                        </td>
                    </tr>
                    <tr className="schedule-week-content">
                        <td className="schedule-lesson-column">
                        <span className="schedule-cell-content">1</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Monday</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Tuesday</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Wednesday</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Thursday</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Friday</span>
                        </td>
                    </tr>
                    <tr className="schedule-week-content">
                        <td className="schedule-lesson-column">
                        <span className="schedule-cell-content">1</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Monday</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Tuesday</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Wednesday</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Thursday</span>
                        </td>
                        <td className="schedule-cell">
                            <span className="schedule-cell-content">Friday</span>
                        </td>
                    </tr>
                </table>
            </OnlyAuthed>
        )
    }
}
