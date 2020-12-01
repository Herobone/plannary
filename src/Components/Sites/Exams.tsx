import firebase from 'firebase';
import React, { Component, ReactElement, RefObject } from 'react';
import { FormattedMessage } from 'react-intl';
import * as Alerts from '../../helper/AlertTypes';
import { Exam, examConverter } from '../../helper/models/exam';
import OnlyAuthed from '../Functional/OnlyAuthed';

interface Props {
    createAlert: (type: Alerts.Alert | number | string, message: string | ReactElement, header?: ReactElement | null) => void;
}
interface State {

}

export default class Exams extends Component<Props, State> {
    state = {}

    classIDRef!: RefObject<HTMLInputElement>;
    examDateRef!: RefObject<HTMLInputElement>;
    lessonNumberRef!: RefObject<HTMLInputElement>;
    examInfoRef!: RefObject<HTMLTextAreaElement>;

    constructor(props: Props) {
        super(props);
        this.classIDRef = React.createRef();
        this.examDateRef = React.createRef();
        this.lessonNumberRef = React.createRef();
        this.examInfoRef = React.createRef();

        this.handleExamSubmit = this.handleExamSubmit.bind(this);
    }

    handleExamSubmit() {
        const currentClassID = this.classIDRef.current,
            currentExamDate = this.examDateRef.current,
            currentLessonNumber = this.examDateRef.current,
            currentExamInfo = this.examInfoRef.current;

        if (!currentClassID ||
            !currentExamDate ||
            !currentLessonNumber ||
            !currentExamInfo) {
            return;
        }

        if (!currentExamDate.valueAsDate) {
            return;
        }
        const currentUser = firebase.auth().currentUser;
        if (!currentUser) {
            return;
        }
        const examDocRef = firebase.firestore().collection("userData").doc(currentUser.uid).collection("exams").doc().withConverter(examConverter);
        const exam = new Exam(examDocRef.id, currentClassID.value, currentExamDate.valueAsDate);
        examDocRef.set(exam);

    }

    render() {
        return (
            <OnlyAuthed className="w3-container app-content">
                <label htmlFor="classID">ClassID:</label><br />
                <input type="text" id="classID" name="classID" ref={this.classIDRef} /><br />

                <label htmlFor="examDate">Date:</label><br />
                <input type="date" id="examDate" name="examDate" ref={this.examDateRef} /><br />

                <label htmlFor="lessonNumber">Lesson Number:</label><br />
                <input type="number" id="lessonNumber" name="lessonNumber" ref={this.lessonNumberRef} /><br />

                <label htmlFor="examInfo">Additional Info</label><br />
                <textarea id="examInfo" name="examInfo" rows={4} cols={50} ref={this.examInfoRef} />
                <br />
                <button onClick={this.handleExamSubmit} >
                    <FormattedMessage id="general.add" />
                </button>
            </OnlyAuthed>
        )
    }
}
