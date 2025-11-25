import { ProgressChart } from "@/components/progress-chart";
import type { ProgressData } from "@/lib/types";
import { SidebarTrigger } from "@/components/ui/sidebar";

const progressData: ProgressData[] = [
    { month: "January", completed: 12 },
    { month: "February", completed: 18 },
    { month: "March", completed: 25 },
    { month: "April", completed: 31 },
    { month: "May", completed: 28 },
    { month: "June", completed: 35 },
];

export default function ProgressPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Progress Tracking</h1>
         <div className="md:hidden">
          <SidebarTrigger />
        </div>
      </div>
      <p className="text-muted-foreground">
        Monitor engagement and the development of digital skills across the community.
      </p>

      <div className="pt-6">
        <ProgressChart data={progressData} />
      </div>
    </div>
  );
}
