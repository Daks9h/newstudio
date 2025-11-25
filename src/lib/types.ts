import type { LucideIcon } from 'lucide-react';

export type Service = {
  category: string;
  services: {
    name: string;
    description: string;
    icon: LucideIcon;
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
