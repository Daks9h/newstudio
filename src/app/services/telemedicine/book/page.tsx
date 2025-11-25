
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
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { useAuth, useFirebase } from '@/firebase/provider';
import { bookTelemedicineConsultation } from '@/firebase/firestore/mutations';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar as CalendarIcon, Video, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const consultationSchema = z.object({
  patientName: z.string().min(1, 'Patient name is required.').regex(/^[a-zA-Z\s]+$/, 'Only alphabetic characters are allowed'),
  age: z.coerce.number().min(1, 'Please enter a valid age.').max(120, 'Age must be between 1 and 120'),
  phone: z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit phone number.'),
  consultationDate: z.date({
    required_error: 'A date for the consultation is required.',
  }).min(new Date(new Date().setDate(new Date().getDate() - 1)), 'Consultation date cannot be in the past.'),
  timeSlot: z.enum(['Morning', 'Evening'], { required_error: 'Please select a time slot.'}),
  consultationType: z.enum(['Video', 'Phone'], { required_error: 'Please select a consultation type.'}),
  healthIssue: z.string().min(20, 'Please describe your health issue in at least 20 characters.'),
});

type ConsultationFormValues = z.infer<typeof consultationSchema>;

export default function BookTelemedicinePage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const { firestore } = useFirebase() as any;
  const router = useRouter();

  const form = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
    mode: 'onChange',
  });

  const { formState } = form;

  function onSubmit(data: ConsultationFormValues) {
    if (!user || !firestore) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: 'You must be logged in to book a consultation.',
      });
      return;
    }
    
    const bookingId = bookTelemedicineConsultation(firestore, { userId: user.uid, ...data });
    
    toast({
      title: 'Consultation Booked Successfully!',
      description: `Dr. Sharma will connect via ${data.consultationType} on ${format(data.consultationDate, 'PPP')} in the ${data.timeSlot}. Ref: ${bookingId}`,
    });
    form.reset();
    // In a real app, you might redirect to a 'my-consultations' page.
    router.push('/services/telemedicine');
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Go back</span>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Book Tele-Consultation
        </h1>
      </div>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            Consultation Booking Form
          </CardTitle>
          <CardDescription>
            Fill out your details to schedule a remote consultation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="patientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patient Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter patient's full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Patient's age" {...field} />
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
                      <FormLabel>Contact Phone</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="10-digit mobile number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="consultationDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Preferred Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1)) || date.getDay() === 0}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="timeSlot"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Time</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a slot" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Morning">Morning (10am-1pm)</SelectItem>
                          <SelectItem value="Evening">Evening (4pm-7pm)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="consultationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Consultation Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="How should we contact you?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Video">
                          <div className="flex items-center gap-2"><Video className="h-4 w-4" /> Video Call</div>
                        </SelectItem>
                        <SelectItem value="Phone">
                          <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> Phone Call</div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="healthIssue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Health Issue</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please describe your symptoms and health concerns in detail."
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={!formState.isValid}>
                Confirm Consultation
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
