import React, { Component } from 'react';

class Consumption extends Component {
    timerId = 0;

    constructor(props) {
        super(props);
        this.state = {consumption: 0, paid: 0};
    }

    componentDidMount() {
        this.getData();
        this.timerId = setInterval(this.getData.bind(this), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    getData() {
        this.setState((prevState, props) => ({
            consumption: prevState.consumption + 10,
            paid: prevState.paid + 20
        }))
    }

    render() {
        return (
            <div className="consumption">
                <p>Μαϊος 2017</p>
                <p>Κατανάλωση μήνα: €{ this.state.consumption }</p>
                <p>Πληρωτέα μήνα: €{ this.state.paid }</p>
                <p>Graph</p>
            </div>
        );
    }
}

export default Consumption;
