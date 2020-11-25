import React, { Component, ReactElement } from 'react';
import * as Alerts from '../../helper/AlertTypes';
import Alert from '../../Components/Visuals/Alert';

interface Props {

}
interface State {
    errorToDisplay: Map<number, ReactElement>;
    lastIndex: number;
}

export default class AlertProvider extends Component<Props, State> {
    state = {
        errorToDisplay: new Map<number, ReactElement>(),
        lastIndex: 0,
    }

    constructor(props: Props) {
        super(props);
        this.createAlert = this.createAlert.bind(this);
    }


    createAlert(type: Alerts.Alert | number | string, message: string | ReactElement, header?: ReactElement | null) {

        let alertType!: Alerts.Alert;

        if (type instanceof Alerts.Alert) {
            alertType = type;
        }
        else if (typeof type === "number") {
            if (type === 3) {
                alertType = new Alerts.Error()
            } else if (type === 2) {
                alertType = new Alerts.Warning()
            } else if (type === 1) {
                alertType = new Alerts.Success()
            } else {
                alertType = new Alerts.Info()
            }
        }
        else {
            if (type === "error") {
                alertType = new Alerts.Error()
            } else if (type === "warning") {
                alertType = new Alerts.Warning()
            } else if (type === "success") {
                alertType = new Alerts.Success()
            } else {
                alertType = new Alerts.Info()
            }
        }

        const { errorToDisplay, lastIndex } = this.state;
        const alertIndex = lastIndex + 1;
        const al = (
            <Alert key={"alert" + alertIndex} type={alertType} header={header} clear={() => {
                const { errorToDisplay } = this.state;
                errorToDisplay.delete(alertIndex);
                this.setState({ errorToDisplay: errorToDisplay });
            }}>
                {message}
            </Alert>
        )
        errorToDisplay.set(alertIndex, al);
        this.setState({ errorToDisplay: errorToDisplay, lastIndex: alertIndex })
    }

    prepareAlerts(): ReactElement[] {
        let vals: ReactElement[] = [];
        const fn = (val: ReactElement, k: number, m: Map<number, ReactElement>) => {
            vals.push(val)
        }
        this.state.errorToDisplay.forEach(fn);
        return vals;
    }

    render() {
        return (
            <div>
                <div className="w3-container w3-content">
                    <div className="alert-area">
                        {this.prepareAlerts()}
                    </div>
                </div>
                {this.props.children}
            </div>
        )
    }
}
