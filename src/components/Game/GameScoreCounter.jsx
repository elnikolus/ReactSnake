import React, {Component} from 'react';

class GameScoreCounter extends Component {

    render() {
        let count = (this.props.score < 2) ? `Score is ${this.props.score} parrot` : `Score is ${this.props.score} parrots`;
        return (
            <div>
                <p>{count}</p>
            </div>
        );
    }
}

export default GameScoreCounter;