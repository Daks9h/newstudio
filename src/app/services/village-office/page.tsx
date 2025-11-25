
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Building, Clock, FileText, Phone, List, Landmark, Info } from 'lucide-react';
import Link from 'next/link';
import type { VillageService } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// This data would eventually come from Firestore
const villageServices: VillageService[] | null = [
  {
    name: 'Land Records (Pahani/ROR)',
    documents: ['Aadhaar Card', 'Old Land Deed (if any)'],
    processingTime: '7-15 days',
    fees: 'Rs. 50',
  },
  {
    name: 'Birth Certificate',
    documents: [
      'Hospital Discharge Summary',
      'Parents Aadhaar Cards',
    ],
    processingTime: '5-7 days',
    fees: 'Rs. 20',
  },
  {
    name: 'Death Certificate',
    documents: ['Hospital Death Summary/Cremation Report', 'Deceased\'s ID Proof'],
    processingTime: '5-7 days',
    fees: 'Rs. 20',
  },
  {
    name: 'Caste Certificate',
    documents: [
      'Aadhaar Card',
      'Father\'s Caste Certificate or School Leaving Certificate',
      'Ration Card',
    ],
    processingTime: '15-21 days',
    fees: 'Rs. 30',
  },
  {
    name: 'Income Certificate',
    documents: [
      'Aadhaar Card',
      'Ration Card',
      'Salary Slip or Income Proof from Panchayat',
    ],
    processingTime: '7-10 days',
    fees: 'Rs. 25',
  },
  {
    name: 'Local Permits (e.g., small construction)',
    documents: [
      'Aadhaar Card',
      'Land Ownership Document',
      'Proposed Building Plan',
    ],
    processingTime: '21-30 days',
    fees: 'Varies',
  },
  {
    name: 'No Objection Certificate (NOC)',
    documents: [
      'Aadhaar Card',
      'Reason for NOC',
      'Supporting documents as per requirement',
    ],
    processingTime: '10-15 days',
    fees: 'Rs. 100',
  },
];


function PlaceholderMessage() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg h-full mt-6">
      <div className="p-3 bg-secondary rounded-full mb-4">
          <Info className="w-8 h-8 text-muted-foreground" />
      </div>
      <p className="text-muted-foreground">This service information is being updated. Please check back soon or contact the office directly.</p>
    </div>
  );
}


export default function VillageOfficePage() {
  const router = useRouter();
  // In a real app, you would use a state for loading as well.
  const [services, setServices] = useState(villageServices);

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Go back</span>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Village Office Services
        </h1>
      </div>

      {!services ? <PlaceholderMessage /> : (
        <Card>
          <CardHeader className="flex-row items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Landmark className="h-8 w-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-headline">
                Gram Panchayat Karyalay
              </CardTitle>
              <CardDescription>
                Your local hub for all government administrative services.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Office Hours & Contact */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Office Hours</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Monday - Friday: 10:00 AM - 5:00 PM
                  <br />
                  Saturday: 10:00 AM - 1:00 PM
                  <br />
                  Closed on Sundays and Public Holidays.
                </p>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Contact Details</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>VPO:</strong> Mr. Ramesh Kumar
                  <br />
                  <strong>Phone:</strong> 0123-456789
                  <br />
                  <strong>Address:</strong> Near Community Hall, Main Road
                </p>
              </Card>
            </div>

            {/* Services Table */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <List className="h-5 w-5 text-primary" />
                Available Services
              </h3>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service Name</TableHead>
                      <TableHead>Required Documents</TableHead>
                      <TableHead>Processing Time</TableHead>
                      <TableHead>Fees</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((service) => (
                      <TableRow key={service.name}>
                        <TableCell className="font-medium">
                          {service.name}
                        </TableCell>
                        <TableCell>
                          <ul className="list-disc pl-4 text-xs">
                            {service.documents.map((doc) => (
                              <li key={doc}>{doc}</li>
                            ))}
                          </ul>
                        </TableCell>
                        <TableCell>{service.processingTime}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{service.fees}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-xs text-muted-foreground mt-2">*Processing times are estimates and may vary.</p>
            </div>

            <div className="text-center pt-4">
              <Link href="/services/village-office/request">
                  <Button size="lg">
                      <FileText className="mr-2 h-4 w-4" />
                      Request a Service
                  </Button>
              </Link>
            </div>

          </CardContent>
        </Card>
      )}
    </div>
  );
}
