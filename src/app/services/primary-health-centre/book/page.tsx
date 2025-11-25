
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
import { bookHealthAppointment } from '@/firebase/firestore/mutations';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const appointmentSchema = z.object({
  patientName: z.string().min(1, 'Patient name is required.'),
  age: z.coerce.number().min(1, 'Please enter a valid age.').max(120),
  phone: z
    .string()
    .regex(/^\d{10}$/, 'Please enter a valid 10-digit phone number.'),
  appointmentDate: z.date({
    required_error: 'A date for the appointment is required.',
  }),
  timeSlot: z.enum(['Morning', 'Afternoon']),
  reason: z
    .string()
    .min(10, 'Please provide a brief reason (at least 10 characters).'),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

export default function BookAppointmentPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const { firestore } = useFirebase() as any;
  const router = useRouter();

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
  });

  function onSubmit(data: AppointmentFormValues) {
    if (!user || !firestore) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: 'You must be logged in to book an appointment.',
      });
      return;
    }
    
    bookHealthAppointment(firestore, { userId: user.uid, ...data });
    
    toast({
      title: 'Appointment Booked Successfully!',
      description: `Your appointment is scheduled for ${format(data.appointmentDate, 'PPP')} in the ${data.timeSlot}.`,
    });
    form.reset();
    router.push('/my-appointments');
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Go back</span>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Book an Appointment
        </h1>
      </div>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            Appointment Booking Form
          </CardTitle>
          <CardDescription>
            Please fill out the form to schedule your visit.
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
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                        <Input type="tel" placeholder="10-digit mobile number" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>

              <FormField
                control={form.control}
                name="appointmentDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Preferred Date</FormLabel>
                     <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            {field.value ? (
                                format(field.value, "PPP")
                            ) : (
                                <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                    date < new Date(new Date().setDate(new Date().getDate() - 1)) || date.getDay() === 0
                                }
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
                    <FormLabel>Preferred Time Slot</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time slot" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Morning">Morning (9:00 AM - 12:00 PM)</SelectItem>
                        <SelectItem value="Afternoon">Afternoon (2:00 PM - 5:00 PM)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for Visit</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Briefly describe the reason for your appointment"
                        className="min-h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Confirm Appointment
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
