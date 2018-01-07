import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
var Highcharts = require('highcharts/highstock');
// Load module after Highcharts is loaded
require('highcharts/modules/exporting')(Highcharts);

class MessageChart extends React.Component {
    constructor(props) {
        super(props);
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        this.state = {
            chartData: [],
        }
    }

    componentDidMount() {
        const chartData = this.state.chartData;
        // Create the chart
        this.chart = Highcharts.stockChart('chart', {

            chart: {
                events: {

                }
            },

            rangeSelector: {
                buttons: [{
                    count: 1,
                    type: 'hour',
                    text: '1H'
                }, {
                    count: 24,
                    type: 'hour',
                    text: '24H'
                }, {
                    type: 'all',
                    text: 'All'
                }],
                inputEnabled: false,
                selected: 0
            },

            title: {
                text: 'Sensor Data'
            },

            exporting: {
                enabled: false
            },

            series: [{
                name: 'Average Temperature',
                data: chartData
            }],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        chart: {
                            height: 300
                        },
                        subtitle: {
                            text: null
                        },
                        navigator: {
                            enabled: false
                        }
                    }
                }]
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.messages.length === 0) {
            this.setState({ chartData: [] })
            this.chart.redraw();
        } else if (nextProps.messages.length > this.state.chartData.length) {
            var series = this.chart.series[0];

            const newData = nextProps.messages.slice(this.state.chartData.length)
                .map(message => ({ x: message.timestamp, y: message.value.avgTemperature }));
            newData.forEach(message => {
                series.addPoint([message.x, Math.round(message.y * 100) / 100], false);
            });
            this.setState({ chartData: this.state.chartData.concat(newData) })
            this.chart.redraw();
        }
    }

    componentDidUpdate() {
        if (this.chart && this.chart.series) {
        }
    }

    render() {
        return (
            <nav className="panel">
                <div className="panel-block">
                    <div className="container hero is-primary">
                        <div id="chart" />
                    </div>
                </div>
            </nav>);
    }
}

MessageChart.defaultProps = {
};

MessageChart.propTypes = {
};


export default MessageChart;
