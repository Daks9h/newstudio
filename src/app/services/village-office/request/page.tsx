
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth, useFirebase } from '@/firebase/provider';
import { saveServiceRequest } from '@/firebase/firestore/mutations';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import type { ServiceRequestForm, VillageService } from '@/lib/types';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'application/pdf',
];

const villageServices: Pick<VillageService, 'name' | 'processingTime'>[] = [
  { name: 'Land Records (Pahani/ROR)', processingTime: '7-15 days' },
  { name: 'Birth Certificate', processingTime: '5-7 days' },
  { name: 'Death Certificate', processingTime: '5-7 days' },
  { name: 'Caste Certificate', processingTime: '15-21 days' },
  { name: 'Income Certificate', processingTime: '7-10 days' },
  { name: 'Local Permits (e.g., small construction)', processingTime: '21-30 days' },
  { name: 'No Objection Certificate (NOC)', processingTime: '10-15 days' },
];

const requestSchema = z.object({
  serviceType: z.string({ required_error: 'Please select a service.' }),
  applicantName: z.string().min(1, 'Applicant name is required.').regex(/^[a-zA-Z\s]+$/, 'Only alphabetic characters are allowed'),
  phone: z
    .string()
    .regex(/^\d{10}$/, 'Please enter a valid 10-digit phone number.'),
  purpose: z
    .string()
    .min(10, 'Please provide a brief purpose (at least 10 characters).'),
  document: z
    .any()
    .refine((files) => files?.length == 1, 'A supporting document is required.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 2MB.`
    )
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png, and .pdf files are accepted.'
    ),
});

export default function ServiceRequestPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const { firestore } = useFirebase() as any; // Firestore is not typed in the provider yet
  const router = useRouter();

  const form = useForm<ServiceRequestForm>({
    resolver: zodResolver(requestSchema),
    mode: 'onChange',
  });

  const { formState } = form;

  function onSubmit(data: ServiceRequestForm) {
    if (!user || !firestore) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'You must be logged in to submit a request.',
      });
      return;
    }

    const requestId = saveServiceRequest(firestore, user.uid, data);

    const selectedService = villageServices.find(s => s.name === data.serviceType);
    
    toast({
      title: 'Service Request Submitted!',
      description: `Your request for a ${data.serviceType} has been received. Est. time: ${selectedService?.processingTime}. Ref: ${requestId}`,
    });
    form.reset();
    router.push('/services/village-office');
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Go back</span>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Request a Service
        </h1>
      </div>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            Service Request Form
          </CardTitle>
          <CardDescription>
            Please fill out the form below to request a service from the
            village office.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service to request" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {villageServices.map((service) => (
                          <SelectItem key={service.name} value={service.name}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="applicantName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Applicant Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Enter your 10-digit mobile number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purpose of Request</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Briefly describe why you need this service"
                        className="min-h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="document"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Supporting Document</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept={ACCEPTED_FILE_TYPES.join(',')}
                        {...form.register('document')}
                      />
                    </FormControl>
                    <FormDescription>
                      Upload any required document (e.g., Aadhaar card). Max
                      2MB.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={!formState.isValid}>
                Submit Request
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
