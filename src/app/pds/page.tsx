
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Calendar } from '@/components/ui/calendar';
import { List, MapPin, Wheat, FileWarning, ArrowRight } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import Link from 'next/link';

const fairPriceShops = [
    { name: 'Janseva Kendra', address: '123, Main Road, Near Post Office' },
    { name: 'Annapurna Store', address: '45, Village Square, Beside Temple' },
    { name: 'Gramin Sahayata', address: '7, Farmer\'s Market Lane' },
];

export default function PDSPage() {
  const [rationCardNumber, setRationCardNumber] = useState('');
  const [rationStatus, setRationStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleStatusCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setRationStatus(null);
    // Simulate API call
    setTimeout(() => {
        if(rationCardNumber === '1234567890') {
            setRationStatus({
                cardType: 'BPL',
                familyMembers: 4,
                monthlyEntitlement: '35kg Rice, 10kg Wheat',
                lastCollectionDate: '2024-05-15',
            });
        } else {
            setRationStatus({ error: 'Ration card number not found.'});
        }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Public Distribution System (PDS)</h1>
        <div className="md:hidden">
          <SidebarTrigger />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-8">

        {/* Ration Card Status */}
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Check My Ration Card Status</CardTitle>
                <CardDescription>Enter your ration card number to view your details.</CardDescription>
            </CardHeader>
            <form onSubmit={handleStatusCheck}>
                <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="ration-card">Ration Card Number</Label>
                    <Input id="ration-card" value={rationCardNumber} onChange={(e) => setRationCardNumber(e.target.value)} placeholder="Enter 10-digit number" />
                </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Checking...' : 'Check Status'}
                    </Button>
                </CardFooter>
            </form>
            {rationStatus && (
            <CardContent>
                {rationStatus.error ? (
                    <p className="text-sm font-medium text-destructive">{rationStatus.error}</p>
                ) : (
                <div className="space-y-2 text-sm rounded-lg border p-4">
                    <h4 className="font-semibold mb-2">Your Ration Details</h4>
                    <p><strong>Card Type:</strong> {rationStatus.cardType}</p>
                    <p><strong>Family Members:</strong> {rationStatus.familyMembers}</p>
                    <p><strong>Monthly Entitlement:</strong> {rationStatus.monthlyEntitlement}</p>
                    <p><strong>Last Collection Date:</strong> {rationStatus.lastCollectionDate}</p>
                </div>
                )}
            </CardContent>
            )}
        </Card>

          {/* PDS Information */}
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Ration Card Services</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Eligibility Criteria</AccordionTrigger>
                  <AccordionContent>
                    Detailed information about who is eligible for BPL, APL, and other types of ration cards based on income and family size.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How to Apply for a New Card</AccordionTrigger>
                  <AccordionContent>
                    Step-by-step guide on the application process, required documents (Aadhaar, address proof, income certificate), and where to submit your application.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How to Update Existing Card</AccordionTrigger>
                  <AccordionContent>
                    Instructions for adding/removing family members, changing address, and correcting other details on your existing ration card.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

           {/* Complaints */}
           <Card className="bg-destructive/5 border-destructive/20">
             <CardHeader className="flex-row items-center gap-4">
                <FileWarning className="w-8 h-8 text-destructive" />
                <CardTitle className="font-headline text-destructive">Having an Issue?</CardTitle>
             </CardHeader>
             <CardContent>
                <p className="text-sm text-muted-foreground mb-4">If you have a problem with your ration allocation or the fair price shop, you can register a complaint.</p>
                <Link href="/pds/complaint">
                    <Button variant="destructive">Register Complaint</Button>
                </Link>
             </CardContent>
           </Card>

        </div>

        {/* Right Column */}
        <div className="space-y-8">
            {/* Current Month Allocation */}
            <Card>
                <CardHeader className="flex-row items-center gap-4">
                    <Wheat className="w-6 h-6 text-primary" />
                    <CardTitle className="font-headline">This Month's Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">The following items are available this month for BPL card holders:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                        <li>Rice: 35kg per family</li>
                        <li>Wheat: 10kg per family</li>
                        <li>Sugar: 1kg per family</li>
                        <li>Kerosene: 1 litre per family</li>
                    </ul>
                </CardContent>
            </Card>

          {/* Distribution Schedule */}
          <Card>
            <CardHeader className="flex-row items-center gap-4">
                <Calendar className="w-6 h-6 text-primary" />
              <CardTitle className="font-headline">Distribution Schedule</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={new Date()}
                className="rounded-md border"
              />
            </CardContent>
             <CardFooter>
                <p className="text-xs text-muted-foreground">Food grains are typically distributed from the 10th to the 20th of each month.</p>
            </CardFooter>
          </Card>

          {/* Fair Price Shops */}
          <Card>
            <CardHeader className="flex-row items-center gap-4">
                <MapPin className="w-6 h-6 text-primary" />
              <CardTitle className="font-headline">Nearby Fair Price Shops</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {fairPriceShops.map((shop, index) => (
                    <li key={index} className="flex flex-col p-3 border rounded-lg">
                        <span className="font-semibold text-sm">{shop.name}</span>
                        <span className="text-xs text-muted-foreground">{shop.address}</span>
                    </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
