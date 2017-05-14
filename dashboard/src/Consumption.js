import React, { Component } from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import {FormattedNumber} from 'react-intl';
import {BarChart, Bar, XAxis, YAxis} from 'recharts';
import {fetch} from './utils/api';
import $ from 'jquery';

class Consumption extends Component { timerId = 0;

    constructor(props) {
        super(props);
        this.state = {
            monthSpent: 0,
            monthPaid: 0,
            daily: [],
        };
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    componentWillMount() {
        this.fetchData(true);
        this.updateInterval = setInterval(this.fetchData, 2000);
    }

    fetchData = (initialRequest) => {
        fetch('/municipality/').then(stats => {;
            stats.monthSpent = stats.consumed;
            stats.monthPaid = stats.paid;

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

    render() {
        return (
            <Card style={{marginTop: '20px', marginBottom: '20px', fontSize: '20px'}}>
                <CardTitle>Σύνοψη - Μάιος 2017</CardTitle>
                <CardText>
                    <List className='list'>
						<ListItem
                            key='1'
							primaryText="Κατανάλωση μήνα"
                            style={{textAlign: 'left'}}
							rightToggle={
                                <span style={{fontSize: '20px', fontWeight: 'bold', width: 'auto'}}>
                                    <FormattedNumber value={this.state.monthSpent / 100} style='currency' currency='EUR' />
                                </span>
							}
						/>
						<ListItem
                            key='2'
							primaryText="Πληρωτέα μήνα"
                            style={{textAlign: 'left'}}
							rightToggle={
                                <span style={{fontSize: '20px', fontWeight: 'bold', width: 'auto'}}>
                                    <FormattedNumber value={this.state.monthPaid / 100} style='currency' currency='EUR' />
                                </span>
							}
						/>
						<ListItem
                            key='3'
							primaryText="Χρέος"
                            style={{textAlign: 'left'}}
							rightToggle={
                                <span style={{fontSize: '20px', fontWeight: 'bold', width: 'auto'}} className='red'>
                                    <FormattedNumber value={(this.state.monthSpent - this.state.monthPaid) / 100} style='currency' currency='EUR' />
                                </span>
							}
						/>
                    </List>

                    <h2 style={{marginTop: '30px', fontWeight: 'normal'}}>Συνολική κατανάλωση (&euro;): <strong style={{marginLeft: '5px'}}>1 Μαΐου - 31 Μαΐου</strong></h2>
                    <BarChart width={$(window).width() - 50} height={300} data={this.fixGraphData()} style={{marginTop: '10px'}}>
                        <Bar dataKey='consumption' fill='#00bcd4' isAnimationActive={false} />
                        <XAxis dataKey="name"/>
                        <YAxis/>
                    </BarChart>
                </CardText>
            </Card>
        );
    }
}

export default Consumption;
