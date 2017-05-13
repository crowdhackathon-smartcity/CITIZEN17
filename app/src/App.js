import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {List, ListItem} from 'material-ui/List';
import './App.css';
import {FormattedNumber} from 'react-intl';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add'; 
injectTapEventPlugin();

class App extends Component {
    render() {
		const balanceStyle = {
			fontSize: 25,
			fontWeight: 'bold',
            position: 'relative',
		};

        const balanceCardStyle = {
            marginTop: '20px',
            marginBottom: '30px',
        };

        const balanceUpdateStyle = {
            position: 'absolute',
            right: '20px',
            top: '11px',
        };

        const subCardsStyles = {
            cardStyle: {
                fontSize: 13,
                marginBottom: '10px',
            },

            balanceStyle: {
                fontSize: 20,
                fontWeight: 'bold',
                position: 'relative',
                padding: '10px',
            }
        };

		const data = [
			  {name: '1', uv: 3},
			  {name: '2', uv: 1},
			  {name: '3', uv: 2},
			  {name: '4', uv: 1.5},
			  {name: '5', uv: 2.2},
			  {name: '6', uv: 1.8},
			  {name: '7', uv: 1.5},
			  {name: '8', uv: 2.11},
			  {name: '9', uv: 2},
			  {name: '10', uv: 1.9},
			  {name: '11', uv: 2.8},
			  {name: '12', uv: 2.3},
			  {name: '13', uv: 1.3},
			  {name: '14', uv: 2.8},
			  {name: '15', uv: 0},
			  {name: '16', uv: 0},
			  {name: '17', uv: 0},
			  {name: '18', uv: 0},
			  {name: '19', uv: 0},
			  {name: '20', uv: 0},
			  {name: '21', uv: 0},
			  {name: '22', uv: 0},
			  {name: '23', uv: 0},
			  {name: '24', uv: 0},
			  {name: '25', uv: 0},
			  {name: '26', uv: 0},
			  {name: '27', uv: 0},
			  {name: '28', uv: 0},
			  {name: '29', uv: 0},
			  {name: '30', uv: 0},
			  {name: '31', uv: 0},
		];

        return (
            <div className='App'>
                <AppBar
                    title=''
                />

				<Card style={balanceCardStyle}>
					<CardTitle>Υπόλοιπο</CardTitle>
					<CardText style={balanceStyle}>
						<FormattedNumber value={23.42} style='currency' currency='EUR' />
                        <FloatingActionButton mini={true} style={balanceUpdateStyle}>
                            <ContentAdd />
                        </FloatingActionButton>
					</CardText>
				</Card>

				<Card style={subCardsStyles.cardStyle}>
					<CardTitle style={{padding: '10px'}}>Σημερινή κατανάλωση</CardTitle>
					<CardText style={subCardsStyles.balanceStyle}>
                        <span className='green'>
                            <FormattedNumber value={2.8} style='currency' currency='EUR' />
                        </span>
					</CardText>
				</Card>

				<Card style={subCardsStyles.cardStyle}>
					<CardTitle style={{padding: '10px'}}>Συνολική κατανάλωση του μήνα</CardTitle>
					<CardText style={subCardsStyles.balanceStyle}>
                        <span className='red' style={{marginBottom: '20px', display: 'block'}}>
                            <FormattedNumber value={15.42} style='currency' currency='EUR' />
                        </span>
                        <div style={{padding: '0px', marginLeft: '-25px', fontWeight: 'normal', fontSize: '13px'}}>
                            <BarChart width={350} height={100} data={data}>
                                <Bar dataKey='uv' fill='#00bcd4'/>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                            </BarChart>
                        </div>
					</CardText>
				</Card>
            </div>
        );
    }
}

export default App;
