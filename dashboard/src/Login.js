import React, { Component } from 'react';

import injectTapEventPlugin from 'react-tap-event-plugin';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
        };
    }

    render() {
        return (
            <div className="Login">
                <Card style={{width: '500px', margin: '30px auto 0 auto'}}>
                    <CardTitle style={{color: '#777b7c', fontWeight: '300', fontSize: '20px'}}>ΣΥΝΔΕΣΗ ΔΗΜΟΥ</CardTitle>
                    <CardText>
						<TextField
							floatingLabelText="Όνομα χρήστη"
                            floatingLabelFixed={true}
                            fullWidth={true}
                            required
						/>
						<TextField
							floatingLabelText="Κωδικός"
                            floatingLabelFixed={true}
                            fullWidth={true}
                            type='password'
                            required
						/>

                        <FlatButton
                            label="Εισοδος" primary={true}
                            style={{marginTop: '10px', color: '#fff'}}
                            backgroundColor="#00bcd4" fullWidth={true}
                            onClick={this.props.onSubmit}
                        />
                    </CardText>
                </Card>
            </div>
        );
    }
}

export default Login;
