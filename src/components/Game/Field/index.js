import React, {Component} from 'react';
import Cell from '../Cell/index';
import GameScoreCounter from  '../GameScoreCounter'

class Field extends Component {

    render() {
        let snakeField = this.props.board.map(row => {
            return row.map(cell => {
                return <Cell key={cell.key} snake={cell.snake} apple={cell.apple}/>;
            })
        });
        return (
            <div
                className="board"
                style={{
                    width: (this.props.size.boardWidth * 48) + 'px',
                    height: (this.props.size.boardHeight * 48) + 'px',
                    margin: "auto"
                }}>
                <p><GameScoreCounter score = {this.props.score}/></p>
                {snakeField}
            </div>
        );
    }
}

export default Field;