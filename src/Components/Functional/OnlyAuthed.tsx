import React, { Component } from 'react'
import Naviagation from '../Visuals/Navigation'
import firebase from 'firebase';

interface Props {
    className?: string
}
interface State {

}

export default class OnlyAuthed extends Component<Props, State> {
    state = {}

    render() {
        const currentUser = firebase.auth().currentUser;

        return (
            <div className="only-authed">
                <Naviagation user={currentUser} />
                <div className={this.props.className}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
