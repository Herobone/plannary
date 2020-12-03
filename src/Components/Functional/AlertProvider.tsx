import React, {Component, ReactElement} from 'react';
import Alerts, {Alert as IAlert} from '../../helper/AlertTypes';
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

    instanceOfAlert(object: string | number | IAlert): object is IAlert {
        if (typeof object === "number" || typeof object === "string") {
            return false;
        }
        return 'defaultHeader' in object && 'color' in object;
    }


    createAlert(type: IAlert | number | string, message: string | ReactElement, header?: ReactElement | null) {

        let alertType!: IAlert;

        if (this.instanceOfAlert(type)) {
            alertType = type;
        } else if (typeof type === "number") {
            if (type === 3) {
                alertType = Alerts.ERROR;
            } else if (type === 2) {
                alertType = Alerts.WARNING;
            } else if (type === 1) {
                alertType = Alerts.SUCCESS;
            } else {
                alertType = Alerts.INFO;
            }
        } else {
            if (type === "error") {
                alertType = Alerts.ERROR;
            } else if (type === "warning") {
                alertType = Alerts.WARNING;
            } else if (type === "success") {
                alertType = Alerts.SUCCESS;
            } else {
                alertType = Alerts.INFO;
            }
        }

        const {errorToDisplay, lastIndex} = this.state;
        const alertIndex = lastIndex + 1;
        const al = (
            <Alert key={"alert" + alertIndex} type={alertType} header={header} clear={() => {
                const {errorToDisplay} = this.state;
                errorToDisplay.delete(alertIndex);
                this.setState({errorToDisplay: errorToDisplay});
            }}>
                {message}
            </Alert>
        )
        errorToDisplay.set(alertIndex, al);
        this.setState({errorToDisplay: errorToDisplay, lastIndex: alertIndex})
    }

    prepareAlerts(): ReactElement[] {
        let vals: ReactElement[] = [];
        const fn = (val: ReactElement) => {
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
