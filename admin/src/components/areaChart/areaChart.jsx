import "./areachart.css";
import React from "react";
import {
  Area,
    AreaChart,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { XAxis,YAxis } from 'recharts';
export default function areaChart({ title, data, dataKey1, dataKey2}) {
  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey={dataKey1} stackId="1" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey={dataKey2} stackId="1" stroke="#82ca9d" fill="#82ca9d" />
          
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
