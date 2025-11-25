'use client';

import {
  collection,
  query,
  where,
  getDocs,
  type Firestore,
} from 'firebase/firestore';
import type { Application } from '@/lib/types';

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
