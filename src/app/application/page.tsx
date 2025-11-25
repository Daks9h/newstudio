'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ArrowLeft } from 'lucide-react';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];

const applicationSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  village: z.string().min(1, 'Village is required'),
  phone: z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit phone number'),
  aadhaar: z.string().regex(/^\d{12}$/, 'Please enter a valid 12-digit Aadhaar number'),
  document: z
    .any()
    .refine((files) => files?.length == 1, 'Document is required.')
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 2MB.`)
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png, .webp and .pdf files are accepted.'
    ),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

function ApplicationForm() {
    const searchParams = useSearchParams();
    const scheme = searchParams.get('scheme') || 'the selected scheme';
    const { toast } = useToast();

    const form = useForm<ApplicationFormValues>({
        resolver: zodResolver(applicationSchema),
        defaultValues: {
            fullName: '',
            village: '',
            phone: '',
            aadhaar: '',
            document: undefined,
        },
    });

    function onSubmit(data: ApplicationFormValues) {
        console.log(data);
        toast({
            title: 'Application Submitted!',
            description: `Your application for ${scheme.replace(/-/g, ' ')} has been received.`,
        });
        form.reset();
    }

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Application for {scheme.replace(/-/g, ' ')}</CardTitle>
                <CardDescription>Please fill out the form below to apply.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your full name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="village"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Village</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your village name" {...field} />
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
                                        <Input type="tel" placeholder="Enter your 10-digit mobile number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="aadhaar"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Aadhaar Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your 12-digit Aadhaar number" {...field} />
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
                                    <FormLabel>Upload Document</FormLabel>
                                    <FormControl>
                                        <Input type="file" accept={ACCEPTED_FILE_TYPES.join(',')} {...form.register('document')} />
                                    </FormControl>
                                    <FormDescription>
                                        Upload ID proof, address proof, etc. (Max 2MB, PDF/Image).
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">Submit Application</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

export default function ApplicationPage() {
  const router = useRouter();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Go back</span>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Scheme Application</h1>
        </div>
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
