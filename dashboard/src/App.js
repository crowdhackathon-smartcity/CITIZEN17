import React, { Component } from 'react';

import Consumption from "./Consumption"
import Login from "./Login"
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import FlatButton from 'material-ui/FlatButton';
import './App.css';

injectTapEventPlugin();

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
        };
    }

    login = () => {
        this.setState({loggedIn: true});
    }

    render() {
        return (
            <div className="App">
                {this.state.loggedIn ? (
                <div>
                    <AppBar
                        title='Διαχείριση Νερού'
                        iconElementRight={<FlatButton label="Δημος Τρικκαιων" />}
                        style={{textAlign: 'left'}}
                    />

                    <Consumption />
                </div>) : (<Login onSubmit={this.login} />)}
            </div>
        );
    }
}

export default App;
