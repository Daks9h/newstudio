'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';

function ApplicationForm() {
    const searchParams = useSearchParams();
    const scheme = searchParams.get('scheme') || 'the selected scheme';

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Application for {scheme.replace(/-/g, ' ')}</CardTitle>
                <CardDescription>Please fill out the form below to apply.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input id="fullName" placeholder="Enter your full name" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="aadhaar">Aadhaar Number</Label>
                            <Input id="aadhaar" placeholder="Enter your 12-digit Aadhaar number" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="Enter your 10-digit mobile number" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Full Address</Label>
                        <Input id="address" placeholder="Enter your full address" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="documents">Upload Documents</Label>
                        <Input id="documents" type="file" />
                         <p className="text-xs text-muted-foreground pt-1">
                            Please upload relevant documents (e.g., ID proof, address proof).
                        </p>
                    </div>
                    <Button type="submit" className="w-full">Submit Application</Button>
                </form>
            </CardContent>
        </Card>
    );
}

export default function ApplicationPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Scheme Application</h1>
        <div className="md:hidden">
          <SidebarTrigger />
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ApplicationForm />
      </Suspense>
    </div>
  );
}
