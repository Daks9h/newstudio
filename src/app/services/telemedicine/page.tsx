
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
  PhoneCall,
  Video,
  List,
  Stethoscope,
  HeartPulse,
  Syringe,
  Baby,
  CalendarPlus,
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const specializations = [
  { name: 'General Physician', icon: Stethoscope },
  { name: 'Gynecologist', icon: Baby },
  { name: 'Pediatrician', icon: HeartPulse },
  { name: 'Dermatologist', icon: Syringe },
];

const commonIssues = [
    'Fever, Cough, Cold',
    'Headaches and Migraines',
    'Skin Rashes and Allergies',
    'Stomach Aches and Digestion Issues',
    'Follow-up Consultations',
    'Women\'s Health Concerns',
    'Child Health Queries',
];

export default function TelemedicinePage() {
  const router = useRouter();

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Go back</span>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Telemedicine Services
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline">
            Consult with a Doctor from Home
          </CardTitle>
          <CardDescription>
            Get professional medical advice via phone or video call.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* How it works & Hours */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">How It Works</h3>
              </div>
              <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-1">
                <li>Book a consultation slot using the form.</li>
                <li>Receive a confirmation with doctor details.</li>
                <li>Get a call or a video link at your scheduled time.</li>
                <li>Receive a digital prescription after the call.</li>
              </ol>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Consultation Hours</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Monday - Saturday:
                <br />
                Morning: 10:00 AM - 1:00 PM
                <br />
                Evening: 4:00 PM - 7:00 PM
              </p>
            </Card>
          </div>

          {/* Specializations */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <List className="h-5 w-5 text-primary" />
              Available Specializations
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {specializations.map((spec) => (
                <div
                  key={spec.name}
                  className="flex flex-col items-center text-center p-4 border rounded-lg bg-secondary/50"
                >
                  <spec.icon className="h-8 w-8 text-primary mb-2" />
                  <p className="text-sm font-medium">{spec.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Common Issues */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-primary" />
              Common Health Issues Addressed
            </h3>
            <div className="flex flex-wrap gap-2">
                {commonIssues.map((issue) => (
                    <Badge key={issue} variant="outline">{issue}</Badge>
                ))}
            </div>
             <p className="text-xs text-muted-foreground mt-3">For emergencies, please visit the nearest hospital immediately.</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center items-center gap-4 pt-4">
          <Link href="/services/telemedicine/book" className="w-full md:w-auto">
            <Button size="lg" className="w-full">
              <CalendarPlus className="mr-2 h-4 w-4" />
              Book a Consultation
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
