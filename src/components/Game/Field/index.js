import React, {Component} from 'react';
import Cell from '../Cell/index';

class Field extends Component {

    render() {
        return (
            <div
                className="board"
                style={{
                    width: (this.props.size.boardWidth * 48) + 'px',
                    height: (this.props.size.boardHeight * 48) + 'px',
                    margin: "auto"
                }}>
                <p>Score is {this.props.score} parrots</p>
                {
                    this.props.board.map(row => {
                        return row.map(cell => {
                            //console.log('Cell render - ', cell.snake)
                            return <Cell key={cell.key} snake={cell.snake} apple={cell.apple}/>;
                        })
                    })
                }
            </div>
        );
    }
}

export default Field;