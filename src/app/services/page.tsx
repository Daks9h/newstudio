
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Landmark, HeartPulse, GraduationCap, Building2, Users, PhoneCall, School, ArrowRight } from "lucide-react";
import type { Service } from "@/lib/types";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";

const servicesData = [
  {
    category: "Government Services",
    services: [
      {
        name: "Village Office",
        description: "Land records, birth/death certificates, and local permits.",
        icon: Landmark,
        href: "/services/village-office",
      },
      {
        name: "Public Distribution",
        description: "Ration card services and food grain distribution schedules.",
        icon: Building2,
        href: "/pds",
      },
      {
        name: "Social Welfare Schemes",
        description: "Information on pensions, scholarships, and grants.",
        icon: Users,
        href: "/schemes?tab=social-welfare",
      },
    ],
  },
  {
    category: "Healthcare",
    services: [
      {
        name: "Primary Health Centre",
        description: "OPD, immunizations, and basic health check-ups.",
        icon: HeartPulse,
        href: "/services/primary-health-centre",
      },
      {
        name: "Mobile Medical Unit",
        description: "Schedule and locations for the mobile health clinic.",
        icon: HeartPulse,
        href: "/services/mobile-medical-unit",
      },
      {
        name: "Telemedicine Services",
        description: "Connect with doctors remotely for consultations.",
        icon: PhoneCall,
        href: "/services/telemedicine",
      },
    ],
  },
  {
    category: "Education",
    services: [
      {
        name: "Local School Information",
        description: "Admission info, academic calendar, and events.",
        icon: School,
        href: "/services/local-school",
      },
      {
        name: "Adult Literacy Program",
        description: "Enroll in evening classes to improve reading and writing.",
        icon: GraduationCap,
        href: "/resources", // Assuming this links to the general resources page
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Service Directory</h1>
         <div className="md:hidden">
          <SidebarTrigger />
        </div>
      </div>
      <p className="text-muted-foreground">
        Find essential services and information in your community.
      </p>

      <div className="space-y-8 pt-4">
        {servicesData.map((group) => (
          <div key={group.category}>
            <h2 className="text-2xl font-semibold tracking-tight mb-4 font-headline">{group.category}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {group.services.map((service) => (
                <Card key={service.name} className="flex flex-col">
                  <CardHeader className="flex-grow">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                         <service.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                          <CardTitle className="text-lg">{service.name}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-2">{service.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter>
                    <Link href={service.href || '#'} className="w-full">
                       <Button variant="outline" className="w-full">
                         View Details <ArrowRight className="ml-2 h-4 w-4" />
                       </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

    