import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const TrafficChart = (props) => {
    return (
      <BarChart
        width={1000}
        height={300}
        data={props.data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="display" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="cc_payments" fill="#8884d8" />
        <Bar dataKey="sea_vessel_position_reports" fill="#82ca9d" />
      </BarChart>
    );
}

export default TrafficChart
