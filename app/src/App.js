/* eslint-disable */

import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {fetch} from './utils/api';
import './App.css';
import {FormattedNumber} from 'react-intl';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import {BarChart, Bar, XAxis, YAxis} from 'recharts';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add'; 

injectTapEventPlugin();

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            daily: [],
            balance: localStorage.getItem('balance') || 35,
            todaySpent: 0,
            monthSpent: 0,
        };
    }

    fetchData = (initialRequest) => {
        fetch('/user/').then(stats => {;
            if (this.fetched) {
                stats.daily = [12];
            }
            this.fetched = true;
            const todaySpent = stats.daily[stats.daily.length - 1];
            const monthSpent = stats.daily.reduce((a, b) => a + b, 0);

            stats.todaySpent = todaySpent;
            stats.monthSpent = monthSpent;

            if (!initialRequest) {
                const prevStats = this.state;

                if (prevStats.todaySpent < stats.todaySpent) {
                    stats.balance = prevStats.balance - (stats.todaySpent - prevStats.todaySpent);
                    localStorage.setItem('balance', stats.balance);
                    // TODO: trigger transaction
                }
            }

            this.setState(stats);
        }).catch(err => {
            console.log(err);
        });
    }

    fixGraphData() {
        let graphData = [];

        this.state.daily.forEach((item, index) => {
            graphData.push({
                name: index + 1, // date
                consumption: item
            });
        });

        const items = graphData.length;
        if (items < 31) {
            for (let i = items + 1; i <= 31; ++i) {
                graphData.push({
                    name: i, // date
                    consumption: 0
                });
            }
        }

        return graphData;
    }

    componentWillUnmount() {
        clearInterval(this.updateInterval);
    }

    componentWillMount() {
        this.fetchData(true);
        this.updateInterval = setInterval(this.fetchData, 2000);
    }

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

        return (
            <div className='App'>
                <AppBar
                    title=''
                />

				<Card style={balanceCardStyle}>
					<CardTitle>Υπόλοιπο</CardTitle>
					<CardText style={balanceStyle}>
						<FormattedNumber value={this.state.balance} style='currency' currency='EUR' />
                        <FloatingActionButton mini={true} style={balanceUpdateStyle}>
                            <ContentAdd />
                        </FloatingActionButton>
					</CardText>
				</Card>

				<Card style={subCardsStyles.cardStyle}>
					<CardTitle style={{padding: '10px'}}>Σημερινή κατανάλωση</CardTitle>
					<CardText style={subCardsStyles.balanceStyle}>
                        <span className='green'>
                            <FormattedNumber value={this.state.todaySpent || 0} style='currency' currency='EUR' />
                        </span>
					</CardText>
				</Card>

				<Card style={subCardsStyles.cardStyle}>
					<CardTitle style={{padding: '10px'}}>Συνολική κατανάλωση του μήνα</CardTitle>
					<CardText style={subCardsStyles.balanceStyle}>
                        <span className='red' style={{marginBottom: '20px', display: 'block'}}>
                            <FormattedNumber value={this.state.monthSpent || 0} style='currency' currency='EUR' />
                        </span>
                        <div style={{padding: '0px', marginLeft: '-25px', fontWeight: 'normal', fontSize: '13px'}}>
                            <BarChart width={350} height={100} data={this.fixGraphData()}>
                                <Bar dataKey='consumption' fill='#00bcd4' isAnimationActive={false} />
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
