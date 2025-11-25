
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFirebase } from '@/firebase/provider';
import { getSchoolDetails } from '@/firebase/firestore/queries';
import { setSchoolDetails } from '@/firebase/firestore/mutations';
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
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { SchoolDetails } from '@/lib/types';

// Initial data to seed if Firestore is empty
const initialSchoolData: SchoolDetails = {
  schoolName: 'Govt. Senior Secondary School',
  address: 'Main Village Road, Rampur',
  phone: '0123-456789',
  email: 'contact@gss-rampur.edu',
  principalName: 'Mrs. Sunita Sharma',
  admissionCriteria:
    'Admission is open for residents of Rampur and nearby villages. Required documents include previous marksheet, transfer certificate, Aadhaar card of the student and parents, and birth certificate. Admissions for the new session start from April 1st.',
  academicCalendar: [
    { event: 'New Session Begins', date: 'April 1, 2024' },
    { event: 'Summer Vacation', date: 'May 15 - June 30, 2024' },
    { event: 'Half-Yearly Exams', date: 'September 10 - 25, 2024' },
    { event: 'Annual Sports Day', date: 'November 14, 2024' },
    { event: 'Winter Break', date: 'December 24, 2024 - January 5, 2025' },
    { event: 'Final Exams', date: 'March 5 - 20, 2025' },
  ],
  upcomingEvents: [
    { event: 'Annual Day Function', date: 'August 15, 2024' },
    { event: 'Parent-Teacher Meeting', date: 'August 28, 2024' },
    {
      event: 'Science Exhibition',
      date: 'October 2, 2024',
    },
  ],
};

export default function LocalSchoolPage() {
  const router = useRouter();
  const { firestore } = useFirebase() as any;
  const [schoolData, setSchoolData] = useState<SchoolDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!firestore) return;
      try {
        let data = await getSchoolDetails(firestore);
        if (!data) {
          // If no data exists, seed it
          await setSchoolDetails(firestore, initialSchoolData);
          data = initialSchoolData;
        }
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
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!schoolData) {
    return (
      <div className="text-center p-8">
        <p>Could not load school information.</p>
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
    </div>
  );
}

    