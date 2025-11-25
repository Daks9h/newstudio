
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, HeartPulse, Users, Home, Flame, Shield, Droplets, Banknote, School, Sprout, ShieldAlert, HeartHandshake, IndianRupee, UserCheck, Baby, ArrowRight } from "lucide-react";
import type { GovernmentScheme } from "@/lib/types";
import { SidebarTrigger } from "@/components/ui/sidebar";

const schemesData: GovernmentScheme[] = [
  {
    name: "PM-KISAN",
    description: "Provides income support of ₹6,000 per year to all landholding farmer families. To apply, visit the website and look for the 'New Farmer Registration' option in the 'Farmer's Corner' section.",
    icon: Leaf,
    applyLink: "https://pmkisan.gov.in/",
  },
  {
    name: "Ayushman Bharat (PM-JAY)",
    description: "Offers health insurance coverage up to ₹5 lakh per family per year for secondary and tertiary care hospitalization. To check eligibility, use the 'Am I Eligible' portal on the homepage.",
    icon: HeartPulse,
    applyLink: "https://pmjay.gov.in/",
  },
  {
    name: "MGNREGA",
    description: "Guarantees 100 days of wage employment in a financial year to a rural household whose adult members volunteer to do unskilled manual work. Job cards are typically issued via the Gram Panchayat.",
    icon: Users,
    applyLink: "https://nrega.nic.in/",
  },
  {
    name: "PM Awas Yojana (Gramin)",
    description: "Provides financial assistance for constructing a pucca house with basic amenities. Look for the 'Awaassoft' section and 'Data Entry' for registration, usually done by local officials.",
    icon: Home,
    applyLink: "https://pmayg.nic.in/netiay/home.aspx",
  },
  {
    name: "PM Ujjwala Yojana",
    description: "Provides clean cooking fuel (LPG) to women from BPL households, protecting them from smoke. Click 'Apply for New Ujjwala 2.0 Connection' on the homepage to start.",
    icon: Flame,
    applyLink: "https://www.pmuy.gov.in/",
  },
  {
    name: "PM Fasal Bima Yojana (PMFBY)",
    description: "Crop insurance for farmers against yield losses due to unforeseen events. Farmers can register through the 'Farmer Application' link on the homepage or through their bank.",
    icon: Shield,
    applyLink: "https://pmfby.gov.in/",
  },
  {
    name: "Jal Jeevan Mission",
    description: "Aims to provide safe and adequate drinking water through individual household tap connections to all households in rural India. This is an infrastructure mission; no individual application is needed.",
    icon: Droplets,
    applyLink: "https://jaljeevanmission.gov.in/",
  },
  {
    name: "PM Jan Dhan Yojana (PMJDY)",
    description: "National mission for financial inclusion to ensure access to financial services like a basic savings bank account, credit, insurance, and pension. You can open an account at any bank branch or Business Correspondent outlet.",
    icon: Banknote,
    applyLink: "https://pmjdy.gov.in/",
  },
  {
    name: "Samagra Shiksha Abhiyan",
    description: "An integrated scheme for school education from pre-school to senior secondary level. It focuses on improving school infrastructure and quality of education. This is a program for schools, not individuals.",
    icon: School,
    applyLink: "https://samagra.education.gov.in/",
  },
   {
    name: "National Food Security Mission",
    description: "Aims to increase the production of rice, wheat, and pulses through various interventions. This scheme is for states and agricultural bodies, not direct farmer application.",
    icon: Sprout,
    applyLink: "https://www.nfsm.gov.in/",
  },
  {
    name: "Atal Pension Yojana (APY)",
    description: "A pension scheme for citizens in the unorganized sector, providing a fixed monthly pension after the age of 60. To apply, you need to visit your bank branch and fill out the APY registration form.",
    icon: IndianRupee,
    applyLink: "https://www.npscra.nsdl.co.in/scheme-details.php",
  },
  {
    name: "Sukanya Samriddhi Yojana (SSY)",
    description: "A small savings scheme for the girl child, encouraging parents to build a fund for their future education and marriage expenses. An account can be opened at any Post Office or authorized bank branch.",
    icon: Baby,
    applyLink: "https://www.indiapost.gov.in/Financial/Pages/Content/sukanya-samriddhi-yojana.aspx",
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
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">{scheme.description}</p>
            </CardContent>
            <CardFooter>
              <a href={scheme.applyLink} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button className="w-full">
                    Visit Website <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
