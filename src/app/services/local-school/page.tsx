
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFirebase } from '@/firebase/provider';
import { getSchoolDetails } from '@/firebase/firestore/queries';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Calendar,
  Contact,
  FileText,
  School,
  Mail,
  Phone,
  User,
  MapPin,
  Loader2,
  CalendarDays,
  Info,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { SchoolDetails } from '@/lib/types';
import { setInitialSchoolDetails } from '@/firebase/firestore/mutations';

function PlaceholderMessage() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg h-full">
      <div className="p-3 bg-secondary rounded-full mb-4">
          <Info className="w-8 h-8 text-muted-foreground" />
      </div>
      <p className="text-muted-foreground">This service information is being updated. Please check back soon or contact the office directly.</p>
    </div>
  );
}

export default function LocalSchoolPage() {
  const router = useRouter();
  const { firestore } = useFirebase() as any;
  const [schoolData, setSchoolData] = useState<SchoolDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!firestore) return;
      try {
        await setInitialSchoolDetails(firestore);
        const data = await getSchoolDetails(firestore);
        setSchoolData(data);
      } catch (error) {
        console.error('Error fetching school details:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [firestore]);
  
  if (loading) {
    return (
        <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
            <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Go back</span>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Local School Information
        </h1>
      </div>

      {!schoolData ? (
        <PlaceholderMessage />
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <School className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl font-headline">
                  {schoolData.schoolName}
                </CardTitle>
                <CardDescription>
                  All important information about your local school.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Contact Details */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Contact className="h-5 w-5 text-primary" />
                Contact Details
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                      <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <span>{schoolData.address}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                      <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <span>{schoolData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                      <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <span>{schoolData.email}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                      <User className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <span>Principal: {schoolData.principalName}</span>
                  </div>
              </div>
            </div>

            {/* Admission */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Admission Criteria
              </h3>
              <p className="text-sm text-muted-foreground">
                {schoolData.admissionCriteria}
              </p>
            </div>

            {/* Upcoming Events */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-primary" />
                Upcoming Events
              </h3>
              <div className="space-y-3">
                {schoolData.upcomingEvents.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="text-center w-16 flex-shrink-0">
                          <p className="font-bold text-primary">{new Date(item.date).getDate()}</p>
                          <p className="text-xs text-muted-foreground">{new Date(item.date).toLocaleString('default', { month: 'short' })}</p>
                      </div>
                      <p className="font-medium text-sm">{item.event}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Calendar */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Academic Calendar
              </h3>
              <ul className="space-y-2">
                {schoolData.academicCalendar.map((item, index) => (
                  <li key={index} className="flex justify-between items-center text-sm p-2 rounded-md hover:bg-secondary/50">
                    <span className="font-medium">{item.event}</span>
                    <Badge variant="outline">{item.date}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
