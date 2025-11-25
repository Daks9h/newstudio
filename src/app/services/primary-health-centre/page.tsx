
'use client';

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
  Syringe,
  Baby,
  CalendarPlus,
  CalendarCheck2,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const services = [
  { name: 'OPD Consultation', timings: '9 AM - 12 PM, 2 PM - 5 PM', icon: Stethoscope },
  { name: 'Basic Health Checkups', timings: 'During OPD hours', icon: HeartPulse },
  { name: 'Immunization', timings: 'Wednesdays, 10 AM - 1 PM', icon: Syringe },
  { name: 'Maternal Health Services', timings: 'Fridays, 10 AM - 1 PM', icon: Baby },
  { name: 'Medicine Dispensary', timings: '9 AM - 5 PM', icon: Pill },
];

const doctors = [
    { name: 'Dr. Priya Sharma', specialization: 'General Physician', schedule: 'Mon, Wed, Fri (Morning)' },
    { name: 'Dr. Raj Verma', specialization: 'General Physician', schedule: 'Tue, Thu, Sat (Morning)' },
    { name: 'Dr. Anjali Singh', specialization: 'Pediatrician', schedule: 'Wednesday (10 AM - 1 PM)'},
];

export default function PrimaryHealthCentrePage() {
  const router = useRouter();

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Go back</span>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Primary Health Centre
        </h1>
      </div>

      <Card>
        <CardHeader>
            <CardTitle className="text-2xl font-headline">
              Community Health Services
            </CardTitle>
            <CardDescription>
              Your local hub for essential healthcare services.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Contact & Hours */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">OPD Hours</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Morning: 9:00 AM - 12:00 PM
                <br />
                Afternoon: 2:00 PM - 5:00 PM
                <br />
                Closed on Sundays.
              </p>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <Phone className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Contact & Address</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                <strong>Emergency:</strong> 0123-987654
                <br />
                <strong>Address:</strong> 55, Health Campus, Near Water Tank
                <br/>
                 <a href="#" className="text-primary underline">View on Map</a>
              </p>
            </Card>
          </div>

           {/* Services Offered */}
           <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <List className="h-5 w-5 text-primary" />
              Services Offered
            </h3>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {services.map((service, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-4 border rounded-lg bg-secondary/50">
                            <service.icon className="h-8 w-8 text-primary mb-2" />
                            <p className="text-sm font-medium">{service.name}</p>
                            <p className="text-xs text-muted-foreground">{service.timings}</p>
                        </div>
                    ))}
                </div>
          </div>

           {/* Doctor's Schedule */}
           <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-primary" />
              Doctor's Schedule
            </h3>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Doctor Name</TableHead>
                    <TableHead>Specialization</TableHead>
                    <TableHead>Availability</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {doctors.map((doctor) => (
                    <TableRow key={doctor.name}>
                      <TableCell className="font-medium">{doctor.name}</TableCell>
                      <TableCell>{doctor.specialization}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{doctor.schedule}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

        </CardContent>
         <CardFooter className="flex flex-col md:flex-row justify-center items-center gap-4 pt-4">
             <Link href="/services/primary-health-centre/book" className="w-full md:w-auto">
                <Button size="lg" className="w-full">
                    <CalendarPlus className="mr-2 h-4 w-4" />
                    Book an Appointment
                </Button>
             </Link>
              <Link href="/my-appointments" className="w-full md:w-auto">
                <Button size="lg" variant="outline" className="w-full">
                    <CalendarCheck2 className="mr-2 h-4 w-4" />
                    View My Appointments
                </Button>
             </Link>
          </CardFooter>
      </Card>
    </div>
  );
}
