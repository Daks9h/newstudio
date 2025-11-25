'use client';

import { useState, useEffect } from 'react';
import { useAuth, useFirebase } from '@/firebase/provider';
import { getUserApplications } from '@/firebase/firestore/queries';
import type { Application } from '@/lib/types';
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
import { Loader2, Archive } from 'lucide-react';
import { format } from 'date-fns';

export default function MyApplicationsPage() {
  const { user } = useAuth();
  const { firestore } = useFirebase() as any;
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && firestore) {
      getUserApplications(firestore, user.uid)
        .then((apps) => {
          setApplications(apps);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching applications: ", error);
          setLoading(false);
        });
    }
  }, [user, firestore]);

  const getStatusVariant = (status: Application['status']) => {
    switch (status) {
      case 'Pending':
        return 'secondary';
      case 'Approved':
        return 'default';
      case 'Rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <h1 className="text-3xl font-bold tracking-tight font-headline">
        My Applications
      </h1>
      <p className="text-muted-foreground">
        Track the status of all your submitted scheme applications.
      </p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Submitted Applications</CardTitle>
          <CardDescription>
            Here is a list of all the schemes you have applied for.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : applications.length > 0 ? (
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Scheme Name</TableHead>
                    <TableHead>Submission Date</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">
                        {app.schemeName}
                      </TableCell>
                      <TableCell>
                        {app.submissionDate?.seconds 
                          ? format(new Date(app.submissionDate.seconds * 1000), 'PPP')
                          : 'Date not available'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant={getStatusVariant(app.status)}>
                          {app.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg h-full">
              <div className="p-3 bg-secondary rounded-full mb-4">
                  <Archive className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">You have not submitted any applications yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
