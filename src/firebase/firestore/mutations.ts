
'use client';
import {
  doc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
  type Firestore,
  updateDoc,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import {
  FirestorePermissionError,
  type SecurityRuleContext,
} from '@/firebase/errors';
import type { UserProfile, PDSComplaint, ServiceRequestForm, Application, HealthAppointment } from '@/lib/types';

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

export function savePDSComplaint(
  db: Firestore,
  complaint: Omit<PDSComplaint, 'complaintDate' | 'status'>
) {
    const complaintCollection = collection(db, 'pdsComplaints');
    const newComplaint = {
        ...complaint,
        status: 'Open',
        complaintDate: serverTimestamp(),
    };
    addDoc(complaintCollection, newComplaint)
    .catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
            path: complaintCollection.path,
            operation: 'create',
            requestResourceData: newComplaint,
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
    });
}

export function saveServiceRequest(
    db: Firestore,
    userId: string,
    formData: ServiceRequestForm
) {
    const requestCollection = collection(db, 'serviceRequests');
    const newRequest = {
        userId,
        ...formData,
        requestDate: serverTimestamp(),
        status: 'Pending',
    };
    // Note: Document upload would require Firebase Storage, which is not implemented here.
    // We are only saving the form data.
    const { document, ...dataToSave } = newRequest;

    addDoc(requestCollection, dataToSave)
    .catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
            path: requestCollection.path,
            operation: 'create',
            requestResourceData: dataToSave,
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
    });
}

export function saveApplication(
  db: Firestore,
  userId: string,
  schemeName: string
) {
  const appCollection = collection(db, 'applications');
  const newApplication: Omit<Application, 'id'> = {
    userId,
    schemeName,
    submissionDate: serverTimestamp(),
    status: 'Pending',
  };

  addDoc(appCollection, newApplication)
  .catch(async (serverError) => {
      const permissionError = new FirestorePermissionError({
          path: appCollection.path,
          operation: 'create',
          requestResourceData: newApplication,
      } satisfies SecurityRuleContext);
      errorEmitter.emit('permission-error', permissionError);
  });
}

export function bookHealthAppointment(
    db: Firestore,
    appointment: Omit<HealthAppointment, 'id' | 'status' | 'createdAt'>
) {
    const appointmentCollection = collection(db, 'healthAppointments');
    const newAppointment = {
        ...appointment,
        status: 'Scheduled',
        createdAt: serverTimestamp(),
    };

    addDoc(appointmentCollection, newAppointment)
    .catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
            path: appointmentCollection.path,
            operation: 'create',
            requestResourceData: newAppointment,
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
    });
}

export function cancelHealthAppointment(db: Firestore, appointmentId: string) {
    const appointmentRef = doc(db, 'healthAppointments', appointmentId);
    updateDoc(appointmentRef, { status: 'Cancelled' })
    .catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
            path: appointmentRef.path,
            operation: 'update',
            requestResourceData: { status: 'Cancelled' },
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
    });
}
