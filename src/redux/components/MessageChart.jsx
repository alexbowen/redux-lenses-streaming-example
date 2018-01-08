import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
var moment = require('moment');
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

            tooltip: {
                formatter: function() {
                    return 'The average temperature on <b>' + moment(this.x).format("DD-MM-YYYY / HH:mm:ss")
                     +
                        '</b> was <b>' + Math.round(this.y*100)/100 + '</b>';
                }
            },

            title: {
                text: 'Sensor Data: Average Temperature'
            },

            exporting: {
                enabled: false
            },

            series: [{
                name: 'Average Temperature',
                data: []
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
        var series = this.chart.series[0];

        if ((nextProps.selectedSensor !== this.props.selectedSensor) || (nextProps.messages.length === 0)) {
            series.setData([]);
            this.chart.redraw();
        } else if (nextProps.messages.length > series.data.length) {
            const newData = nextProps.messages.slice(series.data.length)
                .map(message => ({ x: message.timestamp, y: message.value.avgTemperature }));
            newData.forEach(message => {
                series.addPoint([message.x, Math.round(message.y * 100) / 100], false);
            });
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
