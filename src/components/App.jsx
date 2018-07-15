import React, {Component} from 'react';
import SnakeProcessor from './Game/SnakeProcessor';

class App extends Component {

    render() {
        return (
            <div>
                <h1>Snake!</h1>
                <SnakeProcessor/>
            </div>
        );
    };
};


export default App;