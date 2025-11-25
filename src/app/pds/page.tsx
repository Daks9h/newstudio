
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
                    <p className="mb-2">Your family's eligibility for a ration card depends on your income and is decided by your state government. Here is a simple explanation of the main categories:</p>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>
                        <strong>Antyodaya Anna Yojana (AAY):</strong> This is for the 'poorest of the poor' families. This includes families with no stable income, widows, or households headed by disabled persons. They get the highest subsidy and receive 35kg of foodgrains per month at very low prices.
                      </li>
                      <li>
                        <strong>Below Poverty Line (BPL):</strong> These cards are for families whose income is below the poverty line set by the government. They receive 15kg to 35kg of foodgrains per family per month at a subsidized price, which is more than AAY but still very low.
                      </li>
                      <li>
                        <strong>Above Poverty Line (APL):</strong> These cards are for families whose income is above the poverty line. They are entitled to 15kg to 35kg of foodgrains per family per month, but the price is higher than for BPL families.
                      </li>
                       <li>
                        <strong>Annapurna Yojana (AY):</strong> This is for poor senior citizens (above 65 years) who are not receiving any other pension. They are eligible for 10kg of foodgrains for free every month.
                      </li>
                    </ul>
                     <p className="mt-4 text-xs text-muted-foreground">Note: The exact income levels and rules can vary slightly from state to state.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How to Apply for a New Card</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2 font-semibold">Follow these steps to apply for a new ration card:</p>
                    <ol className="list-decimal pl-5 space-y-2 text-sm">
                        <li>
                            <strong>Get the Application Form:</strong> You can get the form from your local Ration Office (also known as the Food and Supply Office or Circle Office) or download it from your state's food portal website.
                        </li>
                        <li>
                            <strong>Fill the Form:</strong> Fill out the application form carefully. You will need details for all family members.
                        </li>
                        <li>
                            <strong>Attach Required Documents:</strong> You will need copies of the following documents:
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li><strong>Proof of Identity:</strong> Aadhaar Card or Voter ID card of the head of the family.</li>
                                <li><strong>Proof of Address:</strong> Electricity bill, water bill, or first page of your bank passbook.</li>
                                <li><strong>Photographs:</strong> Two passport-sized photos of the head of the family.</li>
                                <li><strong>Family Member Details:</strong> Copies of Aadhaar cards for all members.</li>
                                <li><strong>Income Proof:</strong> An income certificate from the relevant authority (like the village panchayat or revenue office).</li>
                                <li><strong>Surrender Certificate:</strong> If you are moving from another place, you need a certificate to prove you have surrendered your old ration card.</li>
                                <li><strong>Bank Account Details:</strong> A copy of the first page of your bank passbook.</li>
                            </ul>
                        </li>
                         <li>
                            <strong>Submit the Form:</strong> Submit the filled form along with all the documents at the Ration Office. Ask for a receipt or an acknowledgement slip.
                        </li>
                        <li>
                            <strong>Verification:</strong> An inspector from the food office may visit your home to verify the details you provided.
                        </li>
                         <li>
                            <strong>Receive Your Card:</strong> After successful verification, your ration card will be issued. This can take 2 to 4 weeks.
                        </li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How to Update Existing Card</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2 font-semibold">You need to update your ration card when there are changes in your family. Here’s how:</p>
                     <div className="space-y-4 text-sm">
                        <div>
                            <h4 className="font-medium mb-1">To Add a New Family Member (e.g., a newborn baby):</h4>
                             <ol className="list-decimal pl-5 space-y-1">
                                <li>Get the specific form for adding a member from the Ration Office.</li>
                                <li>Submit the form along with the child's birth certificate and a copy of your ration card.</li>
                             </ol>
                        </div>
                         <div>
                            <h4 className="font-medium mb-1">To Add a Family Member (e.g., a new bride):</h4>
                             <ol className="list-decimal pl-5 space-y-1">
                                <li>Her name must first be removed from her family's ration card. Get a "surrender certificate" for this.</li>
                                <li>Submit the application form, your ration card, the surrender certificate, and the marriage certificate at your Ration Office.</li>
                             </ol>
                        </div>
                         <div>
                            <h4 className="font-medium mb-1">To Remove a Family Member (e.g., due to death):</h4>
                             <ol className="list-decimal pl-5 space-y-1">
                                <li>Get the form for member deletion from the Ration Office.</li>
                                <li>Submit the form along with the person's death certificate and the original ration card.</li>
                             </ol>
                        </div>
                         <div>
                            <h4 className="font-medium mb-1">To Change Address:</h4>
                             <ol className="list-decimal pl-5 space-y-1">
                                <li>Get the address change form from your new local Ration Office.</li>
                                <li>Submit it with proof of your new address (like a new electricity bill) and a surrender certificate from your old Ration Office.</li>
                             </ol>
                        </div>
                     </div>
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
