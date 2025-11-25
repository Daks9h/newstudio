
'use client';

import { useState, useEffect } from 'react';
import { useAuth, useFirebase } from '@/firebase/provider';
import { getUserHealthAppointments } from '@/firebase/firestore/queries';
import { cancelHealthAppointment } from '@/firebase/firestore/mutations';
import type { HealthAppointment } from '@/lib/types';
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CalendarX2, X } from 'lucide-react';
import { format } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function MyAppointmentsPage() {
  const { user } = useAuth();
  const { firestore } = useFirebase() as any;
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<HealthAppointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && firestore) {
      fetchAppointments();
    } else if (!user) {
        setLoading(false);
    }
  }, [user, firestore]);

  const fetchAppointments = async () => {
    if(!user || !firestore) return;
    try {
        setLoading(true);
        const apps = await getUserHealthAppointments(firestore, user.uid);
        setAppointments(apps);
    } catch (error) {
        console.error("Error fetching appointments: ", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not fetch your appointments."
        })
    } finally {
        setLoading(false);
    }
  }

  const handleCancelAppointment = async (appointmentId: string) => {
    if(!firestore) return;
    cancelHealthAppointment(firestore, appointmentId);
    toast({
        title: "Appointment Cancelled",
        description: "Your appointment has been successfully cancelled.",
    })
    // Refresh the list
    fetchAppointments();
  };

  const getStatusVariant = (status: HealthAppointment['status']) => {
    switch (status) {
      case 'Scheduled':
        return 'default';
      case 'Completed':
        return 'secondary';
      case 'Cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <h1 className="text-3xl font-bold tracking-tight font-headline">
        My Appointments
      </h1>
      <p className="text-muted-foreground">
        View and manage your health appointments.
      </p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Your Scheduled Appointments</CardTitle>
          <CardDescription>
            Here is a list of your upcoming and past appointments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : appointments.length > 0 ? (
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">
                        {app.appointmentDate?.seconds
                          ? `${format(new Date(app.appointmentDate.seconds * 1000), 'PPP')} - ${app.timeSlot}`
                          : 'Date not available'}
                      </TableCell>
                      <TableCell>{app.reason}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(app.status)}>
                          {app.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {app.status === 'Scheduled' && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                    <X className="h-4 w-4" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure you want to cancel?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently cancel your appointment.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Back</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleCancelAppointment(app.id!)}>
                                    Yes, Cancel Appointment
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg h-full">
              <div className="p-3 bg-secondary rounded-full mb-4">
                  <CalendarX2 className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">You have not booked any appointments yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
