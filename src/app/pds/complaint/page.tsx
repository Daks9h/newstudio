
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth, useFirebase } from '@/firebase/provider';
import { savePDSComplaint } from '@/firebase/firestore/mutations';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import type { PDSComplaint } from '@/lib/types';

const complaintSchema = z.object({
  rationCardNumber: z.string().min(10, 'Please enter a valid ration card number.'),
  shopName: z.string().min(1, 'Fair price shop name is required.'),
  description: z.string().min(20, 'Please provide a detailed description of at least 20 characters.'),
});

type ComplaintFormValues = z.infer<typeof complaintSchema>;

export default function PDSComplaintPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const { firestore } = useFirebase();
  const router = useRouter();

  const form = useForm<ComplaintFormValues>({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      rationCardNumber: '',
      shopName: '',
      description: '',
    },
  });

  function onSubmit(data: ComplaintFormValues) {
    if (!user || !firestore) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "You must be logged in to submit a complaint.",
        });
        return;
    }
    
    const complaintData: Omit<PDSComplaint, 'complaintDate' | 'status'> = {
        userId: user.uid,
        ...data,
    };
    
    savePDSComplaint(firestore, complaintData);

    toast({
      title: 'Complaint Registered!',
      description: 'Your complaint has been submitted. You will be notified of any updates.',
    });
    form.reset();
    router.push('/pds');
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
       <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Go back</span>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Register PDS Complaint</h1>
      </div>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">PDS Grievance Form</CardTitle>
          <CardDescription>Please provide details about the issue you are facing.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="rationCardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Ration Card Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your 10-digit ration card number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shopName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fair Price Shop Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the name of the shop" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complaint Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the issue in detail (e.g., shop was closed, received less grain, etc.)"
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Submit Complaint</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
