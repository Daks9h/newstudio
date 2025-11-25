
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
import { List, MapPin, Wheat, FileWarning, ArrowRight, Smartphone, Calendar as CalendarIcon } from 'lucide-react';
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
                    <p className="mb-2">Eligibility for ration cards depends on your family's income level and is determined by state government guidelines. The main categories are:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li><strong>BPL (Below Poverty Line):</strong> For families with low income. They receive food grains at highly subsidized prices.</li>
                      <li><strong>AAY (Antyodaya Anna Yojana):</strong> For the poorest of the poor families. They are entitled to the highest level of subsidy.</li>
                      <li><strong>APL (Above Poverty Line):</strong> For families with income above the poverty line. They receive food grains at a less subsidized rate.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How to Apply for a New Card</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">You can apply for a new ration card online through your state's food portal or offline at the local food and civil supplies office. You will generally need the following documents:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li><strong>Application Form:</strong> Correctly filled out.</li>
                        <li><strong>Identity Proof:</strong> Aadhaar Card, Voter ID, or Driving License.</li>
                        <li><strong>Address Proof:</strong> Electricity Bill, Water Bill, or Bank Passbook.</li>
                        <li><strong>Income Certificate:</strong> Issued by a competent authority.</li>
                        <li><strong>Photographs:</strong> Passport-sized photos of the head of the family.</li>
                        <li><strong>Family Details:</strong> Aadhaar cards of all family members.</li>
                        <li><strong>Affidavit:</strong> A declaration that you do not hold a ration card in any other state.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How to Update Existing Card</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">To make changes like adding or removing a family member, or correcting an address, you need to submit a specific form at the food office with supporting documents.</p>
                     <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li><strong>To Add a Member (e.g., newborn):</strong> Submit the child's birth certificate along with the ration card.</li>
                        <li><strong>To Add a Member (e.g., new bride):</strong> Submit the marriage certificate and a surrender certificate for her previous ration card.</li>
                        <li><strong>To Change Address:</strong> Provide new address proof like an electricity bill or rent agreement.</li>
                        <li><strong>To Remove a Member:</strong> A death certificate is required in case of a member's demise.</li>
                    </ul>
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

            <Card>
                <CardHeader className="flex-row items-center gap-4">
                    <Smartphone className="w-6 h-6 text-primary" />
                    <CardTitle className="font-headline">One Nation One Ration Card</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                        Use the "Mera Ration" app to locate fair price shops, check entitlements, and view transactions anywhere in the country.
                    </p>
                    <a href="https://web.umang.gov.in/landing/department/mera-ration.html" target="_blank" rel="noopener noreferrer">
                        <Button className="w-full">
                            Visit Mera Ration Website <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </a>
                </CardContent>
            </Card>

          {/* Distribution Schedule */}
          <Card>
            <CardHeader className="flex-row items-center gap-4">
                <CalendarIcon className="w-6 h-6 text-primary" />
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
