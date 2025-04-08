
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { date: 'Jan', emissions: 34 },
  { date: 'Feb', emissions: 37 },
  { date: 'Mar', emissions: 30 },
  { date: 'Apr', emissions: 28 },
  { date: 'May', emissions: 25 },
  { date: 'Jun', emissions: 22 },
  { date: 'Jul', emissions: 19 },
  { date: 'Aug', emissions: 21 },
  { date: 'Sep', emissions: 18 },
  { date: 'Oct', emissions: 16 },
  { date: 'Nov', emissions: 15 },
  { date: 'Dec', emissions: 14 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 shadow rounded-md border">
        <p className="font-medium">{`${label}`}</p>
        <p className="text-sm">
          <span className="text-cs-green-500 font-medium">{`${payload[0].value} kgCO₂e`}</span>
        </p>
      </div>
    );
  }

  return null;
};

const EmissionsChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Carbon Emissions</CardTitle>
        <CardDescription>Your monthly carbon footprint over the past year</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 0,
                bottom: 20,
              }}
            >
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                stroke="#888888"
                fontSize={12}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                stroke="#888888"
                fontSize={12}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="emissions"
                stroke="url(#colorGradient)"
                strokeWidth={3}
                dot={{ r: 4, fill: '#4CAF50', strokeWidth: 2, stroke: '#2E7D32' }}
                activeDot={{ r: 6, fill: '#1565C0' }}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#4CAF50" />
                  <stop offset="100%" stopColor="#42A5F5" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmissionsChart;
