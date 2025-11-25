import type { LucideIcon } from 'lucide-react';

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

export type ProgressData = {
  month: string;
  completed: number;
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
  uid: string;
  name: string;
  email: string;
  village: string;
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

export type CourseLesson = {
  videoId: string;
  title: string;
  summary: string;
};

export type Course = {
  title: string;
  slug: string;
  description: string;
  lessons: CourseLesson[];
  quiz: QuizQuestion[];
  icon: LucideIcon;
};
