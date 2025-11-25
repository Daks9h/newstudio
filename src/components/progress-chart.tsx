"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ProgressData } from "@/lib/types";

const chartConfig = {
  completed: {
    label: "Modules Completed",
    color: "hsl(var(--primary))",
  },
};

interface ProgressChartProps {
    data: ProgressData[];
}

export function ProgressChart({ data }: ProgressChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Digital Skills Progress</CardTitle>
        <CardDescription>
          Number of learning modules completed per month.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <BarChart data={data} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <Tooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey="completed"
              fill="var(--color-completed)"
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
