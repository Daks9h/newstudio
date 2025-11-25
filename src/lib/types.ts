
import type { LucideIcon } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';

export type Service = {
  category: string;
  services: {
    name: string;
    description: string;
    icon: LucideIcon;
    href?: string;
  }[];
};

export type Resource = {
  id: string;
  title: string;
  description: string;
  type: 'Video' | 'Guide' | 'Article';
  image: string;
  imageHint: string;
  youtubeLink: string;
};

export type ForumPost = {
  id: number;
  author: string;
  authorImage: string;
  title: string;
  excerpt: string;
  comments: number;
  timestamp: string;
};

export type AnalyticsStat = {
  name: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: LucideIcon;
};

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export type GovernmentScheme = {
  name:string;
  description: string;
  icon: LucideIcon;
  slug: string;
  category: string;
};

export type SchemeDetails = {
    name: string;
    slug: string;
    icon: LucideIcon;
    category: string;
    shortDescription: string;
    longDescription: string;
    eligibility: string[];
    applicationProcess: string[];
    documents: string[];
    websiteUrl: string;
}

export type UserProfile = {
  uid?: string;
  name: string;
  email: string;
  village: string;
  createdAt?: any;
  updatedAt?: any;
};

export type Application = {
  id?: string;
  userId: string;
  schemeName: string;
  submissionDate: any;
  status: 'Pending' | 'Approved' | 'Rejected';
};

export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
};

export type PDSComplaint = {
  id?: string;
  userId: string;
  rationCardNumber: string;
  shopName: string;
  description: string;
  status: 'Open' | 'Resolved' | 'Closed';
  complaintDate: any;
};

export type VillageService = {
  name: string;
  documents: string[];
  processingTime: string;
  fees: string;
};

export type ServiceRequestForm = {
  serviceType: string;
  applicantName: string;
  phone: string;
  purpose: string;
  document: any;
};

export type ServiceRequest = {
  id?: string;
  userId: string;
  serviceType: string;
  applicantName: string;
  phone: string;
  purpose: string;
  requestDate: Timestamp;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export type CourseLesson = {
  title: string;
  paragraphs: string[];
  infographicUrl: string;
  infographicHint: string;
  keyPoints: string[];
  videoId?: string;
};

export type Course = {
  title: string;
  slug: string;
  description: string;
  lessons: CourseLesson[];
  quiz: QuizQuestion[];
  icon: LucideIcon;
};

export type Progress = {
  id?: string;
  userId: string;
  course: string;
  score: number;
  completedAt: any;
};

export type HealthAppointment = {
    id?: string;
    userId: string;
    patientName: string;
    age: number;
    phone: string;
    appointmentDate: any;
    timeSlot: 'Morning' | 'Afternoon';
    reason: string;
    status: 'Scheduled' | 'Completed' | 'Cancelled';
    createdAt: any;
};

export type MobileUnitSchedule = {
  date: Date;
  village: string;
  time: string;
  services: string[];
};

export type TelemedicineBooking = {
    id?: string;
    userId: string;
    patientName: string;
    age: number;
    phone: string;
    healthIssue: string;
    consultationDate: any;
    timeSlot: 'Morning' | 'Evening';
    consultationType: 'Video' | 'Phone';
    status: 'Scheduled' | 'Completed' | 'Cancelled';
    createdAt: any;
};

export type SchoolDetails = {
    schoolName: string;
    address: string;
    phone: string;
    email: string;
    principalName: string;
    admissionCriteria: string;
    academicCalendar: { event: string; date: string }[];
    upcomingEvents: { event: string; date: string }[];
}
