import * as firebase from 'firebase/app';

export interface IExam {
    id: string;
    classID: string;
    date: Date;
    lessonNumber?: number;
    info?: string;
}

interface IExamInternal {
    id: string;
    classID: string;
    date: firebase.firestore.Timestamp;
    lessonNumber?: number;
    info?: string;
}

export class Exam implements IExam {

    constructor(
        readonly id: string,
        readonly classID: string,
        readonly date: Date,
        readonly info?: string,
        readonly lessonNumber?: number
    ) { }

}

export const examConverter = {
    toFirestore(exam: Exam): firebase.firestore.DocumentData {
        let serialized: {
            classID: string,
            date: firebase.firestore.Timestamp,
            lessonNumber?: number;
            info?: string;
        } = {
            classID: exam.classID,
            date: firebase.firestore.Timestamp.fromDate(exam.date)
        }

        if (exam.info &&
            exam.info !== undefined) {
            serialized = {
                classID: exam.classID,
                date: firebase.firestore.Timestamp.fromDate(exam.date),
                info: exam.info
            }
        }

        if (exam.lessonNumber &&
            exam.lessonNumber !== undefined) {
            serialized = {
                classID: exam.classID,
                date: firebase.firestore.Timestamp.fromDate(exam.date),
                lessonNumber: exam.lessonNumber
            }
        }

        if (exam.lessonNumber &&
            exam.lessonNumber !== undefined &&
            exam.info &&
            exam.info !== undefined) {
            serialized = {
                classID: exam.classID,
                date: firebase.firestore.Timestamp.fromDate(exam.date),
                info: exam.info,
                lessonNumber: exam.lessonNumber
            }
        }
        return serialized;
    },
    fromFirestore(
        snapshot: firebase.firestore.QueryDocumentSnapshot<IExamInternal>,
        options: firebase.firestore.SnapshotOptions
    ): Exam {
        const data = snapshot.data(options)!;
        let exam: Exam = new Exam(data.id, data.classID, data.date.toDate());
        if (data.info &&
            data.info !== undefined) {
            exam = new Exam(data.id, data.classID, data.date.toDate(), data.info);
        }

        if (data.lessonNumber &&
            data.lessonNumber !== undefined) {
            exam = new Exam(data.id, data.classID, data.date.toDate(), undefined, data.lessonNumber);
        }

        if (data.lessonNumber &&
            data.lessonNumber !== undefined &&
            data.info &&
            data.info !== undefined) {
            exam = new Exam(data.id, data.classID, data.date.toDate(), data.info, data.lessonNumber);
        }
        return exam;
    }
}