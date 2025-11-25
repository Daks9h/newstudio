import { Laptop, Wallet, Globe, Lock } from "lucide-react";
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
  },
  {
    title: 'Accessing Government Services Online',
    slug: 'online-services',
    description: 'Learn how to find and use online government portals to access schemes and services without visiting an office.',
    icon: Globe,
    lessons: [
      {
        videoId: '83b2g2B38gE',
        title: 'Lesson 1: What are e-Governance Services?',
        summary: 'An overview of how governments provide services online and the benefits of using digital platforms like official portals and apps.',
      },
      {
        videoId: 'XGKl6inLwgo',
        title: 'Lesson 2: Using DigiLocker for Your Documents',
        summary: 'Learn how to set up and use DigiLocker to store and share your important documents like Aadhaar and driving license digitally.',
      },
      {
        videoId: 'YkbqXO9m5wE',
        title: 'Lesson 3: How to Navigate a Government Website',
        summary: 'A practical guide on how to find the "Apply Now" or "Check Status" sections on a typical government scheme website.',
      },
    ],
    quiz: [
      {
        question: "What is the main purpose of DigiLocker?",
        options: ["To play games", "To store and share official documents online", "To watch movies", "To shop online"],
        correctAnswer: "To store and share official documents online"
      },
      {
        question: "What should you look for on a government website to apply for a scheme?",
        options: ["The 'Contact Us' page", "The 'About Us' section", "Links that say 'Apply Now', 'Register', or 'New User'", "The photo gallery"],
        correctAnswer: "Links that say 'Apply Now', 'Register', or 'New User'"
      },
      {
        question: "What is a benefit of e-Governance?",
        options: ["It is only available at night", "It requires you to travel to a government office", "It is usually slower than offline methods", "It can save time and reduce paperwork"],
        correctAnswer: "It can save time and reduce paperwork"
      }
    ]
  },
  {
    title: 'Staying Safe Online',
    slug: 'online-safety',
    description: 'Protect your personal information and learn to identify common online scams, fake news, and other digital threats.',
    icon: Lock,
    lessons: [
      {
        videoId: 'g-zDWoA7iLc',
        title: 'Lesson 1: Creating Strong Passwords',
        summary: 'Learn the principles of creating a password that is difficult for others to guess but easy for you to remember.',
      },
      {
        videoId: 'u_1x2zt0sWk',
        title: 'Lesson 2: Identifying Online Scams (Phishing)',
        summary: 'Understand how to spot fake emails, messages, and websites that try to steal your personal information like PINs and passwords.',
      },
      {
        videoId: 'zrkcGL2H388',
        title: 'Lesson 3: What is OTP and Why You Should Never Share It',
        summary: 'Learn what a One-Time Password (OTP) is, why it is used, and the absolute rule of never sharing it with anyone.',
      },
    ],
    quiz: [
      {
        question: "Which of these is the strongest password?",
        options: ["123456", "password", "MyDog@123", "qwerty"],
        correctAnswer: "MyDog@123"
      },
      {
        question: "If you receive an email with a link asking for your bank password, what should you do?",
        options: ["Click the link and enter your password", "Reply with your password", "Ignore and delete the email", "Forward it to all your contacts"],
        correctAnswer: "Ignore and delete the email"
      },
      {
        question: "Should you share your OTP (One-Time Password) with a bank employee who calls you?",
        options: ["Yes, if they say it's an emergency", "Only if they know your name", "No, never share your OTP with anyone", "Yes, but only the first two digits"],
        correctAnswer: "No, never share your OTP with anyone"
      }
    ]
  }
];
