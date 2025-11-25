
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
        videoId: '2pIn2Kj2M2Y',
        title: 'Lesson 1: Introduction to Digital Payments',
        summary: 'Learn the basics of what digital payments are and why they are important for financial inclusion in rural areas.',
        steps: [
            "Understand that digital payments mean paying without cash, using your phone.",
            "Recognize the benefits: it's fast, safe, and keeps a record of your spending.",
            "Learn about different types like UPI, mobile wallets, and cards.",
            "Know that you need a bank account and a smartphone for most digital payments.",
            "Understand that this technology can help you access services more easily.",
        ]
      },
      {
        videoId: 'P6UPoVdJ34g',
        title: 'Lesson 2: Setting Up and Using UPI',
        summary: 'A step-by-step guide on how to set up a UPI account on your smartphone and make your first transaction securely.',
        steps: [
            "Download a trusted UPI app (like BHIM, Google Pay, PhonePe) from the Play Store.",
            "Open the app and allow it to verify your phone number (it must be the one linked to your bank).",
            "Select your bank from the list provided in the app.",
            "The app will automatically find your bank account.",
            "Set a 4 or 6-digit UPI PIN. This is a secret code, do not share it.",
            "To pay someone, enter their UPI ID or phone number, enter the amount, and confirm with your UPI PIN.",
            "You can also pay at shops by scanning a QR code.",
        ]
      },
      {
        videoId: 'i_t5d2DB2s4',
        title: 'Lesson 3: Staying Safe with Online Transactions',
        summary: 'Understand the common risks associated with digital payments and learn best practices to keep your money and data safe.',
        steps: [
            "Never share your UPI PIN, ATM PIN, or password with anyone. Banks never ask for this.",
            "Beware of fake calls or messages asking for your details or telling you to click a link.",
            "Only use trusted apps from the official Google Play Store.",
            "When paying, always double-check the name of the person or shop before entering your PIN.",
            "Do not approve a UPI payment request from someone you don't know.",
            "If a transaction fails but money is deducted, wait for 24-48 hours. It usually comes back automatically.",
            "Regularly check your transaction history for any payments you don't recognize.",
        ]
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
        videoId: 'B2pA06A3-yY',
        title: 'Lesson 1: What is a Computer?',
        summary: 'An introduction to the different parts of a computer (monitor, CPU, keyboard, mouse) and what they do.',
        steps: [
            "Identify the main parts: Monitor (screen), CPU (the box), Keyboard (for typing), and Mouse (for pointing).",
            "Understand how to turn the computer on using the power button on the CPU.",
            "Recognize the 'desktop' - the main screen you see after the computer starts.",
            "Learn that icons on the desktop are shortcuts to programs.",
            "Know how to properly shut down the computer using the 'Shut Down' option in the Start Menu.",
        ]
      },
      {
        videoId: 'E99s4o1Z3aI',
        title: 'Lesson 2: Using the Keyboard and Mouse',
        summary: 'Learn how to type using the keyboard and how to click, double-click, and right-click with a mouse.',
        steps: [
            "Hold the mouse gently and move it to see the cursor move on the screen.",
            "Practice a single-click (left button) to select an item.",
            "Practice a double-click (left button twice quickly) to open a program or file.",
            "Understand that a right-click opens a menu with more options.",
            "Locate the letter keys on the keyboard to type your name.",
            "Find the 'Enter' key to start a new line and the 'Backspace' key to delete.",
        ]
      },
      {
        videoId: 'aKRYa21-93M',
        title: 'Lesson 3: Understanding Files & Folders',
        summary: 'Discover how to create, open, save, and organize your documents and pictures using files and folders.',
        steps: [
            "Think of folders as containers to keep your work organized.",
            "To create a new folder, right-click on the desktop, go to 'New', and select 'Folder'.",
            "Give your folder a clear name, like 'My Documents'.",
            "Understand that a 'file' is a single item, like a letter, a photo, or a song.",
            "Learn to save your work by going to 'File' and then 'Save' inside a program.",
            "Practice dragging and dropping files into your folders to keep your desktop clean.",
        ]
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
        videoId: 'sS_PsVNr4a4',
        title: 'Lesson 1: What are e-Governance Services?',
        summary: 'An overview of how governments provide services online and the benefits of using digital platforms like official portals and apps.',
        steps: [
            "Understand that 'e-Governance' means government services are available online.",
            "Recognize benefits like saving time, less paperwork, and no need to travel to an office.",
            "Learn to identify official government websites, which often end in '.gov.in' or '.nic.in'.",
            "Be aware that many services like applying for schemes or paying bills can be done online.",
            "Know that you can find these services on national portals or your state's specific government website.",
        ]
      },
      {
        videoId: 'g-n7a0R3_bA',
        title: 'Lesson 2: Using DigiLocker for Your Documents',
        summary: 'Learn how to set up and use DigiLocker to store and share your important documents like Aadhaar and driving license digitally.',
        steps: [
            "Go to the DigiLocker website or download the app.",
            "Sign up using your Aadhaar number and the mobile number linked to it.",
            "You will receive an OTP to complete your registration.",
            "Once logged in, you can 'fetch' or 'pull' documents from government departments.",
            "Search for your Driving License, Vehicle RC, or Class X/XII Marksheet.",
            "Provide the required details to link them to your DigiLocker.",
            "These digital documents are legally valid, just like the originals.",
        ]
      },
      {
        videoId: '9rvMVq5a9q0',
        title: 'Lesson 3: How to Navigate a Government Website',
        summary: 'A practical guide on how to find the "Apply Now" or "Check Status" sections on a typical government scheme website.',
        steps: [
            "Open the official website for the scheme (e.g., PM-KISAN).",
            "Look for main menu sections like 'Services', 'Schemes', or 'Farmers Corner'.",
            "Search for buttons or links with text like 'Apply Now', 'New Registration', or 'Login'.",
            "To check your application, look for 'Track Status' or 'Beneficiary Status'.",
            "Have your important numbers ready, like your Aadhaar number or application ID.",
            "Read the instructions and fill in the information carefully.",
            "Always note down your application reference number after submitting.",
        ]
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
        videoId: 'pL3oB-5o30Y',
        title: 'Lesson 1: Creating Strong Passwords',
        summary: 'Learn the principles of creating a password that is difficult for others to guess but easy for you to remember.',
        steps: [
            "Avoid simple passwords like '123456', 'password', or your name.",
            "A strong password should have at least 8 characters.",
            "Mix uppercase letters (A-Z), lowercase letters (a-z), numbers (0-9), and symbols (!, @, #).",
            "A good trick is to use a memorable phrase, like 'My!Village&Sun@2024'.",
            "Do not use the same password for all your accounts.",
            "Never write your password down where others can see it.",
        ]
      },
      {
        videoId: 'ybrvWd37p9w',
        title: 'Lesson 2: Identifying Online Scams (Phishing)',
        summary: 'Understand how to spot fake emails, messages, and websites that try to steal your personal information like PINs and passwords.',
        steps: [
            "Be suspicious of messages that create urgency, like 'Your account will be blocked!'",
            "Check the sender's email address. Scammers often use slightly misspelled or unofficial addresses.",
            "Do not click on links in suspicious emails or SMS messages.",
            "Be wary of offers that seem too good to be true (e.g., winning a lottery you never entered).",
            "Official companies or banks will never ask for your password or PIN in an email.",
            "If a message seems suspicious, it's always safer to ignore and delete it.",
        ]
      },
      {
        videoId: 'J3aUhb9kHhg',
        title: 'Lesson 3: What is OTP and Why You Should Never Share It',
        summary: 'Learn what a One-Time Password (OTP) is, why it is used, and the absolute rule of never sharing it with anyone.',
        steps: [
            "Understand that an OTP is a temporary, secret code sent to your phone to confirm a transaction or login.",
            "It is like a digital key that can only be used once.",
            "The most important rule: NEVER share your OTP with anyone, not even someone claiming to be from the bank, police, or a company.",
            "Scammers will often call and try to trick you into sharing the OTP to steal your money.",
            "Remember: Sharing your OTP is like giving someone the keys to your safe.",
            "If you receive an OTP for a transaction you did not do, ignore it and be alert.",
        ]
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
