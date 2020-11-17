import React, { Component } from 'react'

interface Props {
    content: { [key: string]: string };
    callback: (value: string) => void;
}
interface State {

}

class ContextMenu extends Component<Props, State> {
    state = {
        xPos: "0px",
        yPos: "0px:",
        showMenu: false
    }
    constructor(props: Props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleContextMenu = this.handleContextMenu.bind(this);
    }

    componentDidMount() {
        document.addEventListener("click", this.handleClick);
        document.addEventListener("contextmenu", this.handleContextMenu);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClick);
        document.removeEventListener("contextmenu", this.handleContextMenu);
    }

    handleClick(e: MouseEvent) {
        if (this.state.showMenu) this.setState({ showMenu: false });
    }

    handleContextMenuClick(e: string, element: string) {
        this.props.callback(e);
        this.setState({
            selected: element
        })
    }

    handleContextMenu(e: MouseEvent) {
        e.preventDefault();

        this.setState({
            xPos: `${e.pageX}px`,
            yPos: `${e.pageY}px`,
            showMenu: true,
        });
    }

    render() {
        const { showMenu, yPos, xPos } = this.state;
        if (showMenu) {
            let vals = [];
            for (const key in this.props.content) {
                if (this.props.content.hasOwnProperty(key)) {
                    const element = this.props.content[key];
                    vals.push(<li key={key} onClick={() => this.handleContextMenuClick(key, element)} className="w3-bar-item w3-button">{element}</li>)
                }
            }
            return (
                <ul
                    className="w3-block w3-black w3-dropdown-content w3-bar-block w3-border hb-context-menu"
                    style={{
                        top: yPos,
                        left: xPos,
                    }}
                >
                    {vals}
                </ul>
            );
        } else {
            return null;
        }
    }
}

export default ContextMenu