
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/firebase/provider';
import { useRouter } from 'next/navigation';
import {
  getAllServiceRequests,
  updateServiceRequestStatus,
} from '@/firebase/firestore/queries';
import type { ServiceRequest } from '@/lib/types';
import { Loader2, ShieldCheck, Server } from 'lucide-react';
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
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useFirebase } from '@/firebase/provider';
import { useToast } from '@/hooks/use-toast';

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const { firestore } = useFirebase() as any;
  const router = useRouter();
  const { toast } = useToast();

  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && user) {
      user.getIdTokenResult().then((idTokenResult) => {
        const isAdminClaim = !!idTokenResult.claims.admin;
        setIsAdmin(isAdminClaim);
        if (!isAdminClaim) {
          router.push('/');
        }
      });
    } else if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const fetchRequests = async () => {
    if (!firestore) return;
    try {
        setLoading(true);
        const allRequests = await getAllServiceRequests(firestore);
        setRequests(allRequests);
    } catch (error) {
        console.error("Error fetching service requests:", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not fetch service requests."
        });
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchRequests();
    }
  }, [isAdmin, firestore]);

  const handleStatusChange = async (requestId: string, newStatus: ServiceRequest['status']) => {
    if(!firestore || !requestId) return;
    await updateServiceRequestStatus(firestore, requestId, newStatus);
    toast({
        title: "Status Updated",
        description: `Request status has been changed to ${newStatus}.`,
    });
    fetchRequests(); // Refresh the list
  }

  const filterRequestsByStatus = (status: ServiceRequest['status']) => {
    return requests.filter(req => req.status === status);
  }

  const getStatusVariant = (status: ServiceRequest['status']) => {
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

  if (authLoading || isAdmin === null) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Or a more explicit "Access Denied" component
  }

  const renderTable = (data: ServiceRequest[]) => {
     if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
     }
    if (data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg h-full">
              <div className="p-3 bg-secondary rounded-full mb-4">
                  <Server className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">No requests with this status.</p>
            </div>
        )
    }
    return (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Service Type</TableHead>
                    <TableHead>Applicant Name</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {data.map((req) => (
                    <TableRow key={req.id}>
                        <TableCell className="font-medium">{req.serviceType}</TableCell>
                        <TableCell>{req.applicantName}</TableCell>
                        <TableCell>
                            {req.requestDate?.seconds
                            ? format(new Date(req.requestDate.seconds * 1000), 'PPP')
                            : 'Date not available'}
                        </TableCell>
                        <TableCell>
                            <Select
                                value={req.status}
                                onValueChange={(newStatus) => handleStatusChange(req.id!, newStatus as ServiceRequest['status'])}
                            >
                                <SelectTrigger className="w-[140px]">
                                    <Badge variant={getStatusVariant(req.status)}>{req.status}</Badge>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="Approved">Approved</SelectItem>
                                    <SelectItem value="Rejected">Rejected</SelectItem>
                                </SelectContent>
                            </Select>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Admin Panel
        </h1>
      </div>
      <p className="text-muted-foreground">
        Manage service requests and user applications.
      </p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>All Service Requests</CardTitle>
          <CardDescription>
            View and update the status of user-submitted requests.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-lg">
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
            <TabsContent value="pending" className="mt-4">
                {renderTable(filterRequestsByStatus('Pending'))}
            </TabsContent>
            <TabsContent value="approved" className="mt-4">
                {renderTable(filterRequestsByStatus('Approved'))}
            </TabsContent>
            <TabsContent value="rejected" className="mt-4">
                {renderTable(filterRequestsByStatus('Rejected'))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
