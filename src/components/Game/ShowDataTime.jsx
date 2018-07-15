import React, {Component} from 'react';

class ShowDateTime extends Component {
    constructor(props) {
        super(props);
        this.state = {seconds: 0};
    }

    tick() {
        this.setState(prevState => ({
            seconds: prevState.seconds + 1
        }));
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        let minutes = Math.floor(this.state.seconds / 6),
            seconds = this.state.seconds % 60,
            minuteTime = (minutes === 0) ? '' : (minutes === 1) ? `${minutes} minute ` : `${minutes} minutes `,
            secondsTime = (seconds === 1) ? `${seconds} second` : `${seconds} seconds`;
        return (
            <div>
                {minuteTime + secondsTime}
            </div>
        );
    }
}

export default ShowDateTime;