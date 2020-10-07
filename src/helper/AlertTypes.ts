export class Alert {
    defaultHeader: string = "";
    color: string = "";
}

export class Warning extends Alert {
    defaultHeader = "elements.alerts.warning";
    color = "w3-yellow"
}

export class Success extends Alert {
    defaultHeader = "elements.alerts.success";
    color = "w3-green"
}

export class Info extends Alert {
    defaultHeader = "elements.alerts.info";
    color = "w3-blue"
}

export class Error extends Alert {
    defaultHeader = "elements.alerts.error"
    color = "w3-red"
}