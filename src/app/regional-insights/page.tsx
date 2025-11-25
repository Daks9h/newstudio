import { RegionalInsightsForm } from "@/components/regional-insights-form";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function RegionalInsightsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
       <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Regional Insights Generator</h1>
         <div className="md:hidden">
          <SidebarTrigger />
        </div>
      </div>
      <p className="text-muted-foreground">
        A tool to customize content based on real-world trends and user activity.
      </p>

      <div className="pt-6">
        <RegionalInsightsForm />
      </div>
    </div>
  );
}
