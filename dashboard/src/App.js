import React, { Component } from 'react';

import Consumption from "./Consumption"
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import FlatButton from 'material-ui/FlatButton';
import './App.css';

import http from "http"

injectTapEventPlugin();

class App extends Component {
    render() {
        return (
            <div className="App">
                <AppBar
                    title='Διαχείριση Νερού'
                    iconElementRight={<FlatButton label="Δημος Τρικκαιων" />}
                    style={{textAlign: 'left'}}
                />

                <Consumption />
            </div>
        );
    }
}

export default App;
