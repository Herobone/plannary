import React, { Component, ReactElement, RefObject } from 'react';
import AlertProvider from './Components/Functional/AlertProvider';
import GAPIContainer from './Components/Functional/GAPIContainer';
import LanguageContainer from './translations/LanguageContainer';
import './css/index.css';
import Routed from './Components/Functional/Routed';
import * as Alerts from './helper/AlertTypes';

interface Props {

}
interface State {
    createAlert: (type: Alerts.Alert | number | string, message: string | ReactElement, header?: ReactElement | null) => void;
    changeLanguage: (locale: string) => void;
    currentLocale: string;
}

export default class App extends Component<Props, State> {

    alertRef: RefObject<AlertProvider>;
    langRef: RefObject<LanguageContainer>;

    state = {
        createAlert: (type: Alerts.Alert | number | string, message: string | ReactElement, header?: ReactElement | null) => {
            console.error("Tried to create alert on unmounted AlertProvider!");
        },
        changeLanguage: (locale: string) => {
            console.error("Tried to create alert on unmounted LanguageContainer!");
        },
        currentLocale: "en"
    }

    constructor(props: Props) {
        super(props);
        this.alertRef = React.createRef();
        this.langRef = React.createRef();
    }

    componentDidMount() {
        if (this.alertRef.current) {
            this.setState({ createAlert: this.alertRef.current.createAlert });
        }
        if (this.langRef.current) {
            this.setState({
                changeLanguage: this.langRef.current.changeLanguage,
                currentLocale: this.langRef.current.getCurrentLocale()
            });
        }
    }

    render() {
        return (
            <React.StrictMode>
                <LanguageContainer ref={this.langRef}>
                    <AlertProvider ref={this.alertRef}>
                        <GAPIContainer createAlert={this.state.createAlert}>
                            <Routed changeLanguage={this.state.changeLanguage} currentLocale={this.state.currentLocale} createAlert={this.state.createAlert} />
                        </GAPIContainer>
                    </AlertProvider>
                </LanguageContainer>
            </React.StrictMode>
        )
    }
}
