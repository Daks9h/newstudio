'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, HeartPulse, Users, Home, Flame, Shield, Droplets, Banknote, School, Sprout } from "lucide-react";
import type { GovernmentScheme } from "@/lib/types";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from 'next/link';

const schemesData: GovernmentScheme[] = [
  {
    name: "PM-KISAN",
    description: "Income support for all landholding farmer families.",
    icon: Leaf,
    applyLink: "/application?scheme=PM-KISAN",
  },
  {
    name: "Ayushman Bharat",
    description: "Health insurance coverage for vulnerable families.",
    icon: HeartPulse,
    applyLink: "/application?scheme=Ayushman-Bharat",
  },
  {
    name: "MGNREGA",
    description: "Guaranteed 100 days of wage employment in a financial year.",
    icon: Users,
    applyLink: "/application?scheme=MGNREGA",
  },
  {
    name: "PM Awas Yojana",
    description: "Provides affordable housing to the urban and rural poor.",
    icon: Home,
    applyLink: "/application?scheme=PM-Awas-Yojana",
  },
  {
    name: "Ujjwala Yojana",
    description: "Provides clean cooking fuel (LPG) to women from BPL households.",
    icon: Flame,
    applyLink: "/application?scheme=Ujjwala-Yojana",
  },
  {
    name: "PM Fasal Bima Yojana",
    description: "Crop insurance for farmers against yield losses.",
    icon: Shield,
    applyLink: "/application?scheme=PM-Fasal-Bima-Yojana",
  },
   {
    name: "Jal Jeevan Mission",
    description: "Aims to provide safe and adequate drinking water through individual household tap connections.",
    icon: Droplets,
    applyLink: "/application?scheme=Jal-Jeevan-Mission",
  },
  {
    name: "PM Jan Dhan Yojana",
    description: "National mission for financial inclusion to ensure access to financial services.",
    icon: Banknote,
    applyLink: "/application?scheme=PM-Jan-Dhan-Yojana",
  },
  {
    name: "Samagra Shiksha Abhiyan",
    description: "An integrated scheme for school education, extending from pre-school to senior secondary.",
    icon: School,
    applyLink: "/application?scheme=Samagra-Shiksha-Abhiyan",
  },
   {
    name: "National Food Security Mission",
    description: "Aims to increase the production of rice, wheat, pulses, and coarse cereals.",
    icon: Sprout,
    applyLink: "/application?scheme=National-Food-Security-Mission",
  },
];

export default function SchemesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Government Schemes</h1>
        <div className="md:hidden">
          <SidebarTrigger />
        </div>
      </div>
      <p className="text-muted-foreground">
        Find and apply for government schemes available to you.
      </p>

      <div className="grid gap-6 pt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {schemesData.map((scheme) => (
          <Card key={scheme.name} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <scheme.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-headline">{scheme.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <p className="text-sm text-muted-foreground mb-4">{scheme.description}</p>
              <Link href={scheme.applyLink} passHref>
                <Button className="w-full mt-auto">Apply Now</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
