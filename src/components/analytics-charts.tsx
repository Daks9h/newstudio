
"use client";

import { Line, LineChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { AnalyticsStat } from "@/lib/types";

const chartData = [
  { date: "2024-01-01", users: 28 },
  { date: "2024-02-01", users: 45 },
  { date: "2024-03-01", users: 76 },
  { date: "2024-04-01", users: 92 },
  { date: "2024-05-01", users: 118 },
  { date: "2024-06-01", users: 150 },
];

const chartConfig = {
  users: {
    label: "Active Users",
    color: "hsl(var(--primary))",
  },
};

interface AnalyticsChartsProps {
    stats: AnalyticsStat[];
}

export function AnalyticsCharts({ stats }: AnalyticsChartsProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
            <Card key={stat.name}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className={`text-xs ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change} from last month
                    </p>
                </CardContent>
            </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Active Users Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80 w-full">
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", { month: "short" });
                }}
              />
              <Tooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                dataKey="users"
                type="natural"
                stroke="var(--color-users)"
                strokeWidth={2}
                dot={true}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
