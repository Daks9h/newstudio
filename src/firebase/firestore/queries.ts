
'use client';

import {
  collection,
  query,
  where,
  getDocs,
  type Firestore,
  orderBy,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import type { Application, Progress, HealthAppointment, SchoolDetails, ServiceRequest } from '@/lib/types';

export async function getUserApplications(
  db: Firestore,
  userId: string
): Promise<Application[]> {
  const applicationsCol = collection(db, 'applications');
  const q = query(applicationsCol, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  const applications: Application[] = [];
  querySnapshot.forEach((doc) => {
    applications.push({ id: doc.id, ...doc.data() } as Application);
  });
  return applications;
}

export async function getUserProgress(
  db: Firestore,
  userId: string
): Promise<Progress[]> {
  const progressCol = collection(db, 'progress');
  const q = query(progressCol, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  const progress: Progress[] = [];
  querySnapshot.forEach((doc) => {
    progress.push({ id: doc.id, ...doc.data() } as Progress);
  });
  return progress;
}

export async function getUserHealthAppointments(db: Firestore, userId: string): Promise<HealthAppointment[]> {
    const appointmentsCol = collection(db, 'healthAppointments');
    const q = query(
        appointmentsCol, 
        where('userId', '==', userId),
        orderBy('appointmentDate', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const appointments: HealthAppointment[] = [];
    querySnapshot.forEach((doc) => {
        appointments.push({ id: doc.id, ...doc.data() } as HealthAppointment);
    });
    return appointments;
}

export async function getSchoolDetails(db: Firestore): Promise<SchoolDetails | null> {
    const docRef = doc(db, 'educationServices', 'local-school');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data() as SchoolDetails;
    } else {
        return null;
    }
}

export async function getAllServiceRequests(db: Firestore): Promise<ServiceRequest[]> {
    const requestsCol = collection(db, 'serviceRequests');
    const q = query(requestsCol, orderBy('requestDate', 'desc'));
    const querySnapshot = await getDocs(q);
    const requests: ServiceRequest[] = [];
    querySnapshot.forEach((doc) => {
        requests.push({ id: doc.id, ...doc.data() } as ServiceRequest);
    });
    return requests;
}

export async function updateServiceRequestStatus(db: Firestore, requestId: string, status: ServiceRequest['status']) {
    const requestRef = doc(db, 'serviceRequests', requestId);
    await updateDoc(requestRef, { status });
}
