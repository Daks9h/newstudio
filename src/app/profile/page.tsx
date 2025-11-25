
'use client';

import { useState, useEffect } from 'react';
import { useAuth, useFirebase } from '@/firebase/provider';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Loader2, User, Edit, Save, X, BookOpen, Award, CheckCircle } from 'lucide-react';
import type { UserProfile, Application, Progress } from '@/lib/types';
import { getUserApplications, getUserProgress } from '@/firebase/firestore/queries';
import { updateUserProfile } from '@/firebase/firestore/mutations';
import { doc, getDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import { allCourses } from '@/lib/courses';
import { Progress as ProgressUI } from '@/components/ui/progress';

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const { firestore } = useFirebase() as any;
  const router = useRouter();
  const { toast } = useToast();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '', village: '' });

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push('/login');
      return;
    }

    async function fetchData() {
      if (!user || !firestore) return;
      setLoading(true);
      try {
        // Fetch Profile
        const profileRef = doc(firestore, 'users', user.uid);
        const profileSnap = await getDoc(profileRef);
        if (profileSnap.exists()) {
            const data = profileSnap.data() as UserProfile;
            setProfile({
                ...data,
                email: user.email || '', // Ensure email from auth is used
                createdAt: (profileSnap.data() as any).createdAt,
            });
            setEditData({ name: data.name || '', village: data.village || '' });
        } else {
            // Create a basic profile if it doesn't exist
            const newProfile = { name: user.displayName || '', village: '' };
            await updateUserProfile(firestore, user.uid, newProfile);
            setProfile({ email: user.email!, ...newProfile });
            setEditData(newProfile);
        }

        // Fetch Applications & Progress
        const [apps, prog] = await Promise.all([
          getUserApplications(firestore, user.uid),
          getUserProgress(firestore, user.uid),
        ]);
        setApplications(apps);
        setProgress(prog);

      } catch (error) {
        console.error('Error fetching profile data:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not fetch your profile data.',
        });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [user, authLoading, router, firestore, toast]);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleSave = () => {
    if (!user || !firestore) return;
    updateUserProfile(firestore, user.uid, editData);
    setProfile(prev => prev ? { ...prev, ...editData } : null);
    setIsEditing(false);
    toast({
      title: 'Profile Updated',
      description: 'Your information has been saved successfully.',
    });
  };

  const getStatusVariant = (status: Application['status']) => {
    switch (status) {
      case 'Pending': return 'secondary';
      case 'Approved': return 'default';
      case 'Rejected': return 'destructive';
      default: return 'outline';
    }
  };

  const totalCourses = allCourses.length;
  const completedCourses = progress.length;
  const completionPercentage = totalCourses > 0 ? (completedCourses / totalCourses) * 100 : 0;

  if (authLoading || loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) {
    return <div>Could not load profile.</div>;
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-4">
        <User className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight font-headline">My Profile</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Profile & Stats */}
        <div className="lg:col-span-1 space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Personal Information</CardTitle>
                    {!isEditing && <Button variant="ghost" size="icon" onClick={handleEdit}><Edit className="h-4 w-4" /></Button>}
                </CardHeader>
                <CardContent className="space-y-4">
                    {isEditing ? (
                        <>
                         <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" value={editData.name} onChange={(e) => setEditData({...editData, name: e.target.value})} />
                         </div>
                         <div className="space-y-2">
                            <Label htmlFor="village">Village</Label>
                            <Input id="village" value={editData.village} onChange={(e) => setEditData({...editData, village: e.target.value})} />
                         </div>
                        </>
                    ) : (
                        <>
                          <div className="text-sm">
                            <Label>Name</Label>
                            <p className="font-medium">{profile.name || 'Not set'}</p>
                          </div>
                           <div className="text-sm">
                            <Label>Email</Label>
                            <p className="font-medium">{profile.email}</p>
                          </div>
                          <div className="text-sm">
                            <Label>Village</Label>
                            <p className="font-medium">{profile.village || 'Not set'}</p>
                          </div>
                          <div className="text-sm">
                            <Label>Member Since</Label>
                            <p className="font-medium">
                                {profile.createdAt ? format(new Date((profile.createdAt as any).seconds * 1000), 'PPP') : 'N/A'}
                            </p>
                          </div>
                        </>
                    )}
                </CardContent>
                {isEditing && (
                    <CardFooter className="flex justify-end gap-2">
                        <Button variant="ghost" onClick={handleCancel}><X className="mr-2 h-4 w-4" />Cancel</Button>
                        <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" />Save</Button>
                    </CardFooter>
                )}
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Course Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-muted-foreground">Courses Completed</span>
                        <span className="font-bold text-lg">{completedCourses} / {totalCourses}</span>
                    </div>
                    <ProgressUI value={completionPercentage} />
                    <div className="flex items-center justify-center text-sm text-muted-foreground pt-2">
                        <Award className="mr-2 h-4 w-4 text-primary" />
                        You have completed {completedCourses} course{completedCourses !== 1 ? 's' : ''}!
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* Right Column - Applications */}
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>My Submitted Applications</CardTitle>
                    <CardDescription>Track the status of your scheme applications.</CardDescription>
                </CardHeader>
                <CardContent>
                    {applications.length > 0 ? (
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
                                    <TableCell className="font-medium">{app.schemeName}</TableCell>
                                    <TableCell>
                                    {app.submissionDate?.seconds ? format(new Date(app.submissionDate.seconds * 1000), 'PPP') : 'N/A'}
                                    </TableCell>
                                    <TableCell className="text-right">
                                    <Badge variant={getStatusVariant(app.status)}>{app.status}</Badge>
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                            <BookOpen className="mx-auto h-8 w-8 mb-2" />
                            You have not submitted any applications yet.
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
