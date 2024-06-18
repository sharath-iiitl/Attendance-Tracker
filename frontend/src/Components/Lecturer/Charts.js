import React from 'react'
import './Charts.scss'
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", Total: 30 },
  { name: "Feb", Total: 21 },
  { name: "Mar", Total: 10 },
  { name: "Apr", Total: 16 }
];

export default function Charts() {
  return (
    <div className='charts'>
      <div className="title">Last 4 weeks data</div>
      <ResponsiveContainer width="100%" >
        <AreaChart
          width={'auto'}
          height={'auto'}
          data={data}
          margin={{ top: 0, right: 20, left: 20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
