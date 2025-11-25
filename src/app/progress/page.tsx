'use client';

import { useState, useEffect } from 'react';
import { useAuth, useFirebase } from '@/firebase/provider';
import { getUserProgress } from '@/firebase/firestore/queries';
import type { Progress } from '@/lib/types';
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
import { Loader2, Archive, Award } from 'lucide-react';
import { format } from 'date-fns';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function ProgressPage() {
  const { user } = useAuth();
  const { firestore } = useFirebase() as any;
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && firestore) {
      getUserProgress(firestore, user.uid)
        .then((data) => {
          setProgress(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching progress: ", error);
          setLoading(false);
        });
    } else if (!user) {
      setLoading(false);
    }
  }, [user, firestore]);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Progress Tracking</h1>
         <div className="md:hidden">
          <SidebarTrigger />
        </div>
      </div>
      <p className="text-muted-foreground">
        Monitor engagement and the development of digital skills across the community.
      </p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>My Course Completions</CardTitle>
          <CardDescription>
            Here is a list of all the courses you have completed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : progress.length > 0 ? (
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Name</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead className="text-right">Completion Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {progress.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.course}
                      </TableCell>
                      <TableCell>
                        <Badge variant={item.score >= 75 ? 'default' : 'secondary'}>
                          {item.score}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {item.completedAt?.seconds 
                          ? format(new Date(item.completedAt.seconds * 1000), 'PPP')
                          : 'Date not available'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg h-full">
              <div className="p-3 bg-secondary rounded-full mb-4">
                  <Award className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">You have not completed any courses yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
