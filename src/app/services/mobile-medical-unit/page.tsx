
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useFirebase } from '@/firebase/provider';
import { subscribeToMobileUnitAlerts } from '@/firebase/firestore/mutations';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Clock,
  Phone,
  List,
  Stethoscope,
  Pill,
  HeartPulse,
  Bell,
  MapPin,
  FileText,
  Info,
} from 'lucide-react';
import type { MobileUnitSchedule } from '@/lib/types';
import { addDays, format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

// Mock data representing the schedule fetched from Firestore
const today = new Date();
const scheduleData: MobileUnitSchedule[] | null = [
  { date: addDays(today, 1), village: 'Rampur', time: '10:00 AM - 1:00 PM', services: ['General Checkup', 'Medicines'] },
  { date: addDays(today, 2), village: 'Sitapur', time: '10:00 AM - 1:00 PM', services: ['General Checkup', 'Awareness'] },
  { date: addDays(today, 3), village: 'Gopalganj', time: '2:00 PM - 5:00 PM', services: ['General Checkup', 'Medicines'] },
  { date: addDays(today, 5), village: 'Devipur', time: '10:00 AM - 1:00 PM', services: ['General Checkup', 'Medicines', 'Awareness'] },
  { date: addDays(today, 6), village: 'Madhavpur', time: '2:00 PM - 5:00 PM', services: ['General Checkup'] },
];

function PlaceholderMessage() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg h-full mt-6">
      <div className="p-3 bg-secondary rounded-full mb-4">
          <Info className="w-8 h-8 text-muted-foreground" />
      </div>
      <p className="text-muted-foreground">This service information is being updated. Please check back soon or contact the office directly.</p>
    </div>
  );
}

export default function MobileMedicalUnitPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { firestore } = useFirebase() as any;
  const { toast } = useToast();
  const [subscribed, setSubscribed] = useState(false);
  const [schedule, setSchedule] = useState(scheduleData);

  const handleNotifyMe = () => {
    if (!user || !firestore) {
      toast({
        variant: 'destructive',
        title: 'Please log in',
        description: 'You need to be logged in to subscribe to alerts.',
      });
      return;
    }

    // Assuming user profile has a 'village' field. 
    // In a real app, you might fetch this or ask the user.
    const userVillage = 'Rampur'; // Hardcoded for demonstration
    subscribeToMobileUnitAlerts(firestore, user.uid, userVillage);
    
    setSubscribed(true);
    toast({
      title: 'Subscribed!',
      description: `We'll notify you when the mobile unit is in ${userVillage}.`,
    });
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Go back</span>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Mobile Medical Unit
        </h1>
      </div>

      {!schedule ? (
        <PlaceholderMessage />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-headline">
              Healthcare at Your Doorstep
            </CardTitle>
            <CardDescription>
              Schedule and services for the upcoming week.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Schedule */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Next 7 Days Schedule
              </h3>
              <div className="space-y-4">
                {schedule.map((item, index) => (
                  <Card key={index} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex-1">
                          <p className="font-bold text-base">{format(item.date, 'eeee, MMMM d')}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                              <MapPin className="h-4 w-4" />
                              <span>{item.village}</span>
                              <span className="text-foreground">|</span>
                              <Clock className="h-4 w-4" />
                              <span>{item.time}</span>
                          </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                          {item.services.map(service => (
                              <Badge key={service} variant="secondary">{service}</Badge>
                          ))}
                      </div>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Services & Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                      <List className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Services Offered</h3>
                  </div>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                      <li>General health checkups for all ages.</li>
                      <li>Distribution of basic medicines for common illnesses.</li>
                      <li>Health awareness sessions on nutrition and hygiene.</li>
                      <li>Blood pressure and sugar level monitoring.</li>
                  </ul>
              </Card>
              <Card className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">What to Bring</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                      Please bring any previous medical records or prescriptions you may have. An Aadhaar card is recommended for registration.
                  </p>
              </Card>
            </div>

          </CardContent>
          <CardFooter className="flex flex-col md:flex-row justify-center items-center gap-4 pt-4 border-t">
            <Button size="lg" className="w-full md:w-auto" onClick={handleNotifyMe} disabled={subscribed}>
              <Bell className="mr-2 h-4 w-4" />
              {subscribed ? 'Subscribed for Alerts' : 'Notify Me for My Village'}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
