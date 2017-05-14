/* eslint-disable */

import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {fetch} from './utils/api';
import './App.css';
import {FormattedNumber} from 'react-intl';
import http from 'http';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import {BarChart, Bar, XAxis, YAxis} from 'recharts';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Login from "./Login";
import ContentAdd from 'material-ui/svg-icons/content/add'; 
import $ from 'jquery';
import Snackbar from 'material-ui/Snackbar';

injectTapEventPlugin();

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            daily: [],
            balance: localStorage.getItem('balance') || 0,
            todaySpent: 0,
            monthSpent: 0,
            loggedIn: false,
            paid: false,
            notificationOpen: false,
            leak: false,
        };
    }

    login = () => {
        this.setState({loggedIn: true});
    }

    handleNotificationClose = () => {
        this.setState({notificationOpen: false});
    }

    fetchData = (initialRequest) => {
        fetch('/user/').then(stats => {;
            /*
            if (this.fetched) {
                stats.daily = [400];
            }
            this.fetched = true;
            */

            const todaySpent = stats.daily[stats.daily.length - 1];
            const monthSpent = stats.daily.reduce((a, b) => a + b, 0);

            stats.todaySpent = todaySpent;
            stats.monthSpent = monthSpent;

            if (!initialRequest) {
                const prevStats = this.state;

                if (prevStats.todaySpent < stats.todaySpent) {
                    let newBalance = prevStats.balance - (stats.todaySpent - prevStats.todaySpent);
                    stats.notificationOpen = true;

                    if (stats.todaySpent - prevStats.todaySpent >= 1000) {
                        stats.leak = true;
                    }

                    if (!this.state.paid) {
                        stats.paid = true;
                        http.get('http://dionyziz.com:3001/pay');
                    }

                    localStorage.setItem('balance', newBalance);
                    let balanceUpdateInterval = setInterval(() => {
                        if (this.state.balance !== newBalance) {
                            const balance = this.state.balance - 1;
                            this.setState({balance});
                        } else {
                            clearInterval(balanceUpdateInterval);
                        }
                    }, 5);
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
                consumption: item / 100
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
                marginBottom: '5px',
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
                {this.state.loggedIn ? (
                <div>
                    <AppBar title='' /> <Card style={balanceCardStyle}> <CardTitle>Υπόλοιπο</CardTitle> <CardText style={balanceStyle}> <FormattedNumber value={this.state.balance / 100} style='currency' currency='EUR' /> <FloatingActionButton mini={true} style={balanceUpdateStyle}> <ContentAdd /> </FloatingActionButton> </CardText>
                    </Card>

                    {this.state.leak ? (
                    <Card style={{background: '#f2dede', color: '#a94442'}}>
                        <CardTitle style={{color: '#a94442'}}>
                            <i
                                style={{position: 'relative', top: '5px', left:
                                '-10px'}}
                                className="material-icons">warning
                            </i>
                            Πιθανότητα Διαρροής
                        </CardTitle>
                        <CardText style={{color: '#a94442'}}>
                            Εντοπίστηκε συνεχής αυξημένη ροή νερού.
                        </CardText>
                    </Card>
                    ) : (null)}

                    <Card style={subCardsStyles.cardStyle}>
                        <CardTitle style={{padding: '10px'}}>Σημερινή κατανάλωση</CardTitle>
                        <CardText style={subCardsStyles.balanceStyle}>
                            <span className='green'>
                                <FormattedNumber value={this.state.todaySpent / 100 || 0} style='currency' currency='EUR' />
                            </span>
                        </CardText>
                    </Card>

                    <Card style={subCardsStyles.cardStyle}>
                        <CardTitle style={{padding: '10px'}}>Συνολική κατανάλωση του μήνα<br /><strong style={{marginTop: '5px', display: 'block'}}>1 Μαΐου - 31 Μαΐου</strong></CardTitle>
                        <CardText style={subCardsStyles.balanceStyle}>
                            <span className='red' style={{marginBottom: '20px', display: 'block'}}>
                                <FormattedNumber value={this.state.monthSpent / 100|| 0} style='currency' currency='EUR' />
                            </span>
                            <div style={{padding: '0px', marginLeft: '-25px', fontWeight: 'normal', fontSize: '13px'}}>
                                <BarChart width={$(window).width() - 20} height={100} data={this.fixGraphData()}>
                                    <Bar dataKey='consumption' fill='#00bcd4' isAnimationActive={false} />
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                </BarChart>
                            </div>
                        </CardText>
                    </Card>

					<Snackbar
						open={this.state.notificationOpen}
						message="Ολοκληρώθηκε χρέωση για κατανάλωση νερού"
                        onRequestClose={this.handleNotificationClose}
						autoHideDuration={4000}
					/>
                </div>
                ) : (<Login onSubmit={this.login}/>)}
            </div>
        );
    }
}

export default App;
