
'use client';
import {
  doc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
  type Firestore,
  updateDoc,
  getDoc,
  DocumentReference,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import {
  FirestorePermissionError,
  type SecurityRuleContext,
} from '@/firebase/errors';
import type { UserProfile, PDSComplaint, ServiceRequestForm, Application, HealthAppointment, TelemedicineBooking, SchoolDetails } from '@/lib/types';

// Initial data to seed if Firestore is empty
const initialSchoolData: SchoolDetails = {
  schoolName: 'Govt. Senior Secondary School',
  address: 'Main Village Road, Rampur',
  phone: '0123-456789',
  email: 'contact@gss-rampur.edu',
  principalName: 'Mrs. Sunita Sharma',
  admissionCriteria:
    'Admission is open for residents of Rampur and nearby villages. Required documents include previous marksheet, transfer certificate, Aadhaar card of the student and parents, and birth certificate. Admissions for the new session start from April 1st.',
  academicCalendar: [
    { event: 'New Session Begins', date: 'April 1, 2024' },
    { event: 'Summer Vacation', date: 'May 15 - June 30, 2024' },
    { event: 'Half-Yearly Exams', date: 'September 10 - 25, 2024' },
    { event: 'Annual Sports Day', date: 'November 14, 2024' },
    { event: 'Winter Break', date: 'December 24, 2024 - January 5, 2025' },
    { event: 'Final Exams', date: 'March 5 - 20, 2025' },
  ],
  upcomingEvents: [
    { event: 'Annual Day Function', date: 'August 15, 2024' },
    { event: 'Parent-Teacher Meeting', date: 'August 28, 2024' },
    {
      event: 'Science Exhibition',
      date: 'October 2, 2024',
    },
  ],
};


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

    const docRef = doc(requestCollection);

    setDoc(docRef, dataToSave)
    .catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
            path: requestCollection.path,
            operation: 'create',
            requestResourceData: dataToSave,
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
    });

    return docRef.id;
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
    
    const docRef = doc(appointmentCollection);

    setDoc(docRef, newAppointment)
    .catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
            path: appointmentCollection.path,
            operation: 'create',
            requestResourceData: newAppointment,
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
    });

    return docRef.id;
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

export function subscribeToMobileUnitAlerts(
  db: Firestore,
  userId: string,
  village: string
) {
  const alertCollection = collection(db, 'mobileUnitAlerts');
  addDoc(alertCollection, {
    userId,
    village,
    subscriptionDate: serverTimestamp(),
  }).catch(async (serverError) => {
    const permissionError = new FirestorePermissionError({
      path: alertCollection.path,
      operation: 'create',
      requestResourceData: { userId, village },
    } satisfies SecurityRuleContext);
    errorEmitter.emit('permission-error', permissionError);
  });
}

export function bookTelemedicineConsultation(
    db: Firestore,
    booking: Omit<TelemedicineBooking, 'id' | 'status' | 'createdAt'>
) {
    const bookingCollection = collection(db, 'telemedicineBookings');
    const newBooking = {
        ...booking,
        status: 'Scheduled',
        createdAt: serverTimestamp(),
    };
    
    const docRef = doc(bookingCollection);

    setDoc(docRef, newBooking)
    .catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
            path: bookingCollection.path,
            operation: 'create',
            requestResourceData: newBooking,
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
    });

    return docRef.id;
}

export async function setInitialSchoolDetails(db: Firestore) {
  const schoolRef = doc(db, 'educationServices', 'local-school');
  
  try {
    const docSnap = await getDoc(schoolRef);
    if (!docSnap.exists()) {
      // If no data exists, seed it
      await setDoc(schoolRef, initialSchoolData).catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
          path: schoolRef.path,
          operation: 'create',
          requestResourceData: initialSchoolData,
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
      });
    }
  } catch (error) {
    console.error("Error checking or setting initial school details: ", error);
  }
}
