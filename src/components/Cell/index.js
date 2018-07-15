import React, { Component } from 'react';

class Cell extends Component {

    styleOfCell =() => {
        var style = {
            border: '1px solid grey',
            borderRadius: '2px',
            boxSizing: 'border-box',
            float: 'left',
            width: '48px',
            height: '48px'
        };
        style.background = 'black';
        if (this.props.snake)
            style.background = 'green';
        else if (this.props.apple)
            style.background = 'red';

        return style;
    }

    render() {
        return (
            <div style={this.styleOfCell()}></div>
        );
    }

}

export default Cell;