'use client';

import { AnalyticsCharts } from "@/components/analytics-charts";
import type { AnalyticsStat } from "@/lib/types";
import { Users, BookOpen, HandHelping, TrendingUp } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

const statsData: AnalyticsStat[] = [
    {
        name: "Total Users",
        value: "1,254",
        change: "+20.1%",
        changeType: "positive",
        icon: Users,
    },
    {
        name: "Resources Accessed",
        value: "4,802",
        change: "+18.3%",
        changeType: "positive",
        icon: BookOpen,
    },
    {
        name: "Services Used",
        value: "831",
        change: "+12.5%",
        changeType: "positive",
        icon: HandHelping,
    },
    {
        name: "Adoption Rate",
        value: "35%",
        change: "+5.2%",
        changeType: "positive",
        icon: TrendingUp,
    },
];

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Analytics Reporting</h1>
         <div className="md:hidden">
          <SidebarTrigger />
        </div>
      </div>
      <p className="text-muted-foreground">
        Insights into platform usage, service adoption, and digital inclusion impact.
      </p>

      <div className="pt-6">
        <AnalyticsCharts stats={statsData} />
      </div>
    </div>
  );
}
