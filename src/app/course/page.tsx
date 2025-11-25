'use client';

import React from 'react';
import { CourseLesson } from '@/components/course-lesson';
import { CourseQuiz } from '@/components/course-quiz';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { QuizQuestion } from '@/lib/types';

const lessons = [
  {
    videoId: 'zNViBptv4cw',
    title: 'Lesson 1: Introduction to Digital Payments',
    summary: 'Learn the basics of what digital payments are and why they are important for financial inclusion in rural areas.',
  },
  {
    videoId: '5g4hV8gGjG0',
    title: 'Lesson 2: Setting Up and Using UPI',
    summary: 'A step-by-step guide on how to set up a UPI account on your smartphone and make your first transaction securely.',
  },
  {
    videoId: '3aRIa9CK0p0',
    title: 'Lesson 3: Staying Safe with Online Transactions',
    summary: 'Understand the common risks associated with digital payments and learn best practices to keep your money and data safe.',
  },
];

const quizQuestions: QuizQuestion[] = [
    {
        question: "What is UPI?",
        options: ["A messaging app", "A digital payment system", "A government scheme for housing", "A type of bank account"],
        correctAnswer: "A digital payment system"
    },
    {
        question: "Which of the following is important for online transaction safety?",
        options: ["Sharing your PIN with friends", "Using public Wi-Fi for financial transactions", "Setting a strong, unique password", "Clicking on links from unknown senders"],
        correctAnswer: "Setting a strong, unique password"
    },
    {
        question: "What is a primary benefit of digital payments?",
        options: ["They are always slower than cash", "They can only be used in big cities", "They provide a digital record of transactions", "They require a physical bank visit for every transaction"],
        correctAnswer: "They provide a digital record of transactions"
    }
];

export default function CoursePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Digital Payments Course</h1>
        <div className="md:hidden">
          <SidebarTrigger />
        </div>
      </div>
      <p className="text-muted-foreground">
        Learn how to use digital payments safely and effectively. Complete the lessons and take the quiz to earn your badge!
      </p>

      <div className="space-y-8 mt-6">
        {lessons.map((lesson, index) => (
          <CourseLesson key={index} lesson={lesson} lessonNumber={index + 1} />
        ))}
      </div>

      <div className="mt-12">
        <CourseQuiz questions={quizQuestions} courseName="Digital Payments" />
      </div>
    </div>
  );
}
