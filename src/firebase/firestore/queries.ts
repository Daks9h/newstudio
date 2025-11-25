'use client';

import {
  collection,
  query,
  where,
  getDocs,
  type Firestore,
  orderBy,
} from 'firebase/firestore';
import type { Application, Progress, HealthAppointment } from '@/lib/types';

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
