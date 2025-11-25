
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, HeartPulse, Users, Home, Flame, Shield, Droplets, Banknote, School, Sprout, IndianRupee, Baby, ArrowRight } from "lucide-react";
import type { GovernmentScheme } from "@/lib/types";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from 'next/link';
import { allSchemeDetails } from "@/lib/scheme-details";

const schemesData: GovernmentScheme[] = allSchemeDetails.map(scheme => ({
  name: scheme.name,
  description: scheme.shortDescription,
  icon: scheme.icon,
  slug: scheme.slug,
}));

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
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">{scheme.description}</p>
            </CardContent>
            <CardFooter>
              <Link href={`/schemes/${scheme.slug}`} className="w-full">
                <Button className="w-full">
                    Learn More & Apply <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
