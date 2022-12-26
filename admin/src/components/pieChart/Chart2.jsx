import "./chart2.css";
import React from "react";
import {
    PieChart,
    Pie,
    ResponsiveContainer,
} from "recharts";
export default function Chart2({ title, data, dataKey}) {
  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <br></br>
      <ResponsiveContainer width="100%" aspect={1.5 / 1}>
      <PieChart width="100%" height="100%">
        <Pie data={data} dataKey={dataKey} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
