'use client';
import {
  doc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
  type Firestore,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import {
  FirestorePermissionError,
  type SecurityRuleContext,
} from '@/firebase/errors';
import type { UserProfile } from '@/lib/types';

export function updateUserProfile(
  db: Firestore,
  userId: string,
  data: Partial<UserProfile>
) {
  const profileRef = doc(db, 'users', userId);
  setDoc(
    profileRef,
    {
      ...data,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  ).catch(async (serverError) => {
    const permissionError = new FirestorePermissionError({
      path: profileRef.path,
      operation: 'update',
      requestResourceData: data,
    } satisfies SecurityRuleContext);
    errorEmitter.emit('permission-error', permissionError);
  });
}

export function saveCourseProgress(
  db: Firestore,
  userId: string,
  course: string,
  score: number
) {
  const progressCollection = collection(db, 'progress');
  addDoc(progressCollection, {
    userId,
    course,
    score,
    completedAt: serverTimestamp(),
  }).catch(async (serverError) => {
    const permissionError = new FirestorePermissionError({
      path: progressCollection.path,
      operation: 'create',
      requestResourceData: { userId, course, score },
    } satisfies SecurityRuleContext);
    errorEmitter.emit('permission-error', permissionError);
  });
}
