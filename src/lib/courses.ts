import { Laptop, Wallet } from "lucide-react";
import type { Course } from "./types";

export const allCourses: Course[] = [
  {
    title: 'Intro to Digital Payments',
    slug: 'digital-payments',
    description: 'Learn how to use digital payments safely and effectively. Complete the lessons and take the quiz to earn your badge!',
    icon: Wallet,
    lessons: [
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
    ],
    quiz: [
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
    ]
  },
  {
    title: 'Computer Basics',
    slug: 'computer-basics',
    description: 'Learn the fundamentals of using a computer, from turning it on to navigating the desktop and managing files.',
    icon: Laptop,
    lessons: [
      {
        videoId: '7c06W5T30iY',
        title: 'Lesson 1: What is a Computer?',
        summary: 'An introduction to the different parts of a computer (monitor, CPU, keyboard, mouse) and what they do.',
      },
      {
        videoId: 'pNqy_Q_dYPA',
        title: 'Lesson 2: Using the Keyboard and Mouse',
        summary: 'Learn how to type using the keyboard and how to click, double-click, and right-click with a mouse.',
      },
      {
        videoId: 'F0pToW_aKtc',
        title: 'Lesson 3: Understanding Files & Folders',
        summary: 'Discover how to create, open, save, and organize your documents and pictures using files and folders.',
      },
    ],
    quiz: [
      {
        question: "Which part of the computer is often called its 'brain'?",
        options: ["Monitor", "Keyboard", "CPU (Central Processing Unit)", "Mouse"],
        correctAnswer: "CPU (Central Processing Unit)"
      },
      {
        question: "What action on a mouse is typically used to open a file or program?",
        options: ["Single-click", "Double-click", "Right-click", "Scrolling the wheel"],
        correctAnswer: "Double-click"
      },
      {
        question: "What is the best way to keep your documents organized on a computer?",
        options: ["Save everything on the desktop", "Use folders with clear names", "Give every file the same name", "Delete files after you use them"],
        correctAnswer: "Use folders with clear names"
      }
    ]
  }
];
