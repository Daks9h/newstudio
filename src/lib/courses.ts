
import { Laptop, Wallet, Globe, Lock } from "lucide-react";
import type { Course } from "./types";
import { PlaceHolderImages } from "./placeholder-images";

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';

export const allCourses: Course[] = [
  {
    title: 'Intro to Digital Payments',
    slug: 'digital-payments',
    description: 'Learn how to use digital payments safely and effectively. Complete the lessons and take the quiz to earn your badge!',
    icon: Wallet,
    lessons: [
      {
        title: 'Lesson 1: Introduction to Digital Payments',
        paragraphs: [
          "Digital payments are a way to pay for things without using physical cash. Instead of notes and coins, you use your mobile phone, a card, or the internet. Think of it as a digital wallet on your phone. This makes transactions faster, safer, and easier to track.",
          "For rural communities, this is a powerful tool. It means you don't have to travel far to a bank for every transaction. You can pay for goods at the local shop, send money to family in another village, or receive government scheme benefits directly into your account, all from your phone.",
          "There are several types of digital payments. The most common are UPI (like Google Pay, PhonePe), mobile wallets (like Paytm), and debit/credit cards. Each works slightly differently, but they all share the goal of making payments simple and secure. To get started, you usually need a bank account linked to your mobile number."
        ],
        infographicUrl: findImage('resource-digital-payments'),
        infographicHint: 'mobile payment',
        keyPoints: [
          "Digital payments are cashless transactions using your phone.",
          "They offer speed, safety, and a clear record of your spending.",
          "Common types include UPI, mobile wallets, and cards.",
          "A bank account and a smartphone are usually required.",
          "Digital payments improve access to financial services in rural areas."
        ],
        videoId: '2pIn2Kj2M2Y',
      },
      {
        title: 'Lesson 2: Setting Up and Using UPI',
        paragraphs: [
          "UPI, or Unified Payments Interface, is the most popular way to make digital payments in India. It lets you transfer money instantly between bank accounts using just your phone. Setting it up is a simple, one-time process.",
          "First, you need to download a trusted UPI app like BHIM, Google Pay, or PhonePe from the Google Play Store. When you open the app, it will ask for permission to verify your mobile number. It's very important that this is the same number you have registered with your bank.",
          "Once your number is verified, the app will ask you to select your bank from a list. It will then automatically find your account. The final step is to create a secret 4 or 6-digit UPI PIN. This PIN is like your ATM PIN—you must never share it with anyone. You will use this PIN for every transaction to keep your money safe."
        ],
        infographicUrl: findImage('resource-online-services'),
        infographicHint: 'online services',
        keyPoints: [
          "Download a trusted UPI app (BHIM, Google Pay, etc.).",
          "Use the mobile number that is linked to your bank account.",
          "Select your bank and let the app find your account.",
          "Create a secret 4 or 6-digit UPI PIN and never share it.",
          "Use this PIN to authorize all your payments securely."
        ],
        videoId: 'P6UPoVdJ34g',
      },
      {
        title: 'Lesson 3: Staying Safe with Online Transactions',
        paragraphs: [
            "While digital payments are very secure, it's important to be careful to protect yourself from scams. The most important rule is to never share your secret PINs (UPI PIN, ATM PIN) or passwords with anyone. Banks or company representatives will never call you to ask for this information.",
            "Be cautious of fake calls, SMS messages, or emails that create a sense of urgency, like 'Your account will be blocked!' or 'You have won a lottery!'. These are often tricks to get your personal information. Do not click on any links in such messages.",
            "Always double-check the name and UPI ID of the person or shop you are paying. Make sure it matches who you intend to pay before you enter your PIN. Also, be careful about 'payment requests'. Scammers may send you a request, and if you approve it and enter your PIN, money will be taken from your account."
        ],
        infographicUrl: findImage('resource-internet-safety'),
        infographicHint: 'internet security',
        keyPoints: [
            "NEVER share your UPI PIN, ATM PIN, or passwords with anyone.",
            "Be suspicious of urgent messages or offers that seem too good to be true.",
            "Verify the recipient's name before approving any payment.",
            "Do not approve payment requests from unknown people.",
            "Only download financial apps from the official Google Play Store."
        ],
        videoId: 'i_t5d2DB2s4',
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
        title: 'Lesson 1: What is a Computer?',
        paragraphs: [
          "A computer is an electronic machine that helps us with many tasks, like writing letters, watching videos, and connecting with people. The main parts are the monitor (the screen), the CPU (the box or 'brain' of the computer), the keyboard (for typing), and the mouse (for pointing and clicking).",
          "To start, you press the power button, usually found on the CPU. The computer will then load its main program, called the operating system. After a minute, you will see the 'desktop'. This is the main screen with small pictures called 'icons'.",
          "These icons are shortcuts to different programs or files. For example, you might see an icon for a web browser to access the internet. When you are finished using the computer, it's important to shut it down properly through the 'Start Menu' to avoid losing your work."
        ],
        infographicUrl: findImage('resource-computer-basics'),
        infographicHint: 'computer learning',
        keyPoints: [
          "The main parts are the monitor, CPU, keyboard, and mouse.",
          "The power button on the CPU turns the computer on.",
          "The 'desktop' is the main screen with icons.",
          "Icons are shortcuts to open programs.",
          "Always use the 'Shut Down' option to turn off the computer."
        ],
        videoId: 'B2pA06A3-yY',
      },
      {
        title: 'Lesson 2: Using the Keyboard and Mouse',
        paragraphs: [
          "The mouse and keyboard are your main tools for interacting with the computer. The mouse controls the arrow, or 'cursor', on the screen. As you move the mouse on your desk, the cursor moves with it. The mouse has two main buttons. The left button is used for most actions.",
          "A single 'click' with the left button is used to select an item, like an icon or a file. A 'double-click' (two quick clicks) is used to open that item. The right button is used less often; clicking it usually opens a menu with more options for the item you clicked on.",
          "The keyboard is used for typing text. The keys are arranged in a 'QWERTY' layout. You can use it to write documents, search for information, or fill out forms. The 'Enter' key confirms an action or starts a new line, while the 'Backspace' key deletes characters behind the cursor."
        ],
        infographicUrl: findImage('resource-computer-basics'),
        infographicHint: 'computer learning',
        keyPoints: [
          "The mouse controls the cursor on the screen.",
          "A single-click selects an item; a double-click opens it.",
          "A right-click opens a menu with more options.",
          "The keyboard is for typing text.",
          "The 'Enter' key confirms actions, and 'Backspace' deletes text."
        ],
        videoId: 'E99s4o1Z3aI',
      },
      {
        title: 'Lesson 3: Understanding Files & Folders',
        paragraphs: [
            "Files and folders are how a computer organizes information. A 'file' is a single item, such as a document you've written, a photograph, or a song. Each file has a name and an icon that tells you what type of file it is.",
            "A 'folder' is like a container where you can store files. Using folders helps you keep your work organized and easy to find. For example, you can create a folder called 'My Photos' to store all your pictures, and another called 'My Documents' for your written files.",
            "You can create new folders on your desktop or inside other folders. To do this, you usually right-click on an empty space, choose 'New', and then 'Folder'. Give it a name that makes sense. You can move files into folders by 'dragging and dropping' them with your mouse. This helps keep your desktop tidy and your files easy to manage."
        ],
        infographicUrl: findImage('resource-computer-basics'),
        infographicHint: 'computer learning',
        keyPoints: [
            "A file is a single item like a document or photo.",
            "A folder is a container to store and organize files.",
            "Right-click on an empty space to create a new folder.",
            "Give folders clear, descriptive names.",
            "Drag and drop files into folders to keep your computer organized."
        ],
        videoId: 'aKRYa21-93M',
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
        title: 'Lesson 1: What are e-Governance Services?',
        paragraphs: [
            "'e-Governance' is a simple term for when government services are provided online through the internet. This means you can access many services from a computer or smartphone without needing to travel to a government office. It makes processes faster, more transparent, and more convenient.",
            "The benefits are significant. You can save time and money on travel, avoid long queues, and access services 24/7. It also reduces paperwork and makes it easier to track the status of your application. Examples include applying for schemes, paying utility bills, or accessing land records.",
            "It's important to use official government websites. These websites often have domain names ending in '.gov.in' or '.nic.in'. You can usually find a link to your state's main portal or specific department websites. These official sites are the most secure and reliable sources of information and services."
        ],
        infographicUrl: findImage('resource-online-services'),
        infographicHint: 'online services',
        keyPoints: [
            "e-Governance means government services are available online.",
            "It saves time, money, and reduces paperwork.",
            "Look for official websites ending in '.gov.in' or '.nic.in'.",
            "Many tasks like applying for schemes or paying bills can be done online.",
            "Services are often available 24/7 from anywhere with internet."
        ],
        videoId: 'sS_PsVNr4a4',
      },
      {
        title: 'Lesson 2: Using DigiLocker for Your Documents',
        paragraphs: [
            "DigiLocker is a digital locker service from the Government of India where you can securely store and share your official documents. Think of it as a secure online folder for your most important papers, like your Aadhaar card, driving license, and education certificates.",
            "To get started, you can download the DigiLocker app or visit its website. You will need to sign up using your Aadhaar number. An OTP (One-Time Password) will be sent to the mobile number linked with your Aadhaar to complete the registration. This ensures that only you can create your DigiLocker account.",
            "Once logged in, you can 'fetch' documents directly from government departments. For example, you can get your digital driving license from the Ministry of Road Transport or your marksheets from the CBSE board. These fetched documents in DigiLocker are considered legally valid and are accepted as originals by many organizations, saving you the trouble of carrying physical copies."
        ],
        infographicUrl: findImage('resource-online-services'),
        infographicHint: 'online services',
        keyPoints: [
            "DigiLocker is a secure online platform for your official documents.",
            "Sign up using your Aadhaar number and the linked mobile number.",
            "You can 'fetch' original documents like driving licenses and marksheets.",
            "Documents in DigiLocker are legally equivalent to physical copies.",
            "It provides a safe and convenient way to carry and share documents."
        ],
        videoId: 'g-n7a0R3_bA',
      },
      {
        title: 'Lesson 3: How to Navigate a Government Website',
        paragraphs: [
            "Government websites can sometimes seem confusing, but they usually follow a similar structure. When you land on a scheme's official homepage, take a moment to look at the main menu, which is often at the top of the page. Look for keywords that match what you want to do.",
            "If you want to apply for a new scheme, look for buttons or links that say 'Apply Now', 'New Registration', 'Register', or 'Services'. These will usually take you to the application form. For farmers, there might be a special section called 'Farmers Corner' with all the relevant links.",
            "If you have already applied and want to check the progress, search for links like 'Track Application Status', 'Check Status', or 'Beneficiary List'. You will often need your Aadhaar number or the application reference number that you received when you first applied. Always write down or save your reference number after submitting an application."
        ],
        infographicUrl: findImage('resource-online-services'),
        infographicHint: 'online services',
        keyPoints: [
            "Look for main menu sections like 'Services' or 'Schemes'.",
            "To apply, find links such as 'Apply Now' or 'New Registration'.",
            "To check progress, look for 'Track Status' or 'Beneficiary Status'.",
            "Keep your Aadhaar number and application reference number handy.",
            "Always save your application reference number after submitting."
        ],
        videoId: '9rvMVq5a9q0',
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
        title: 'Lesson 1: Creating Strong Passwords',
        paragraphs: [
          "A password is the first line of defense for your online accounts. A weak password is like leaving your door unlocked. Avoid using simple, easy-to-guess information like your name, birthday, '123456', or the word 'password'.",
          "A strong password should be long, ideally at least 8-10 characters. The best passwords are a mix of different character types: uppercase letters (A-Z), lowercase letters (a-z), numbers (0-9), and symbols (like !, @, #, $). The more variety you use, the harder it is for someone to guess.",
          "A good technique is to think of a memorable phrase and turn it into a password. For example, 'My first school was Sunrise!' could become 'MfswS!2'. It's also very important to use different passwords for different websites, especially for important accounts like your email and banking."
        ],
        infographicUrl: findImage('resource-internet-safety'),
        infographicHint: 'internet security',
        keyPoints: [
          "Avoid simple and easy-to-guess passwords.",
          "Use a mix of uppercase, lowercase, numbers, and symbols.",
          "Make your passwords at least 8-10 characters long.",
          "Turn a memorable phrase into a complex password.",
          "Use a different password for each important online account."
        ],
        videoId: 'pL3oB-5o30Y',
      },
      {
        title: 'Lesson 2: Identifying Online Scams (Phishing)',
        paragraphs: [
            "'Phishing' is a type of online scam where criminals try to trick you into giving them your personal information, like your password, bank details, or Aadhaar number. They often do this by sending fake emails or messages that look like they are from a real company or bank.",
            "Be suspicious of any message that creates a sense of panic or urgency. Scammers use phrases like 'Your account has been compromised!' or 'You have won a prize, click here to claim!'. They want you to act quickly without thinking. Always check the sender's email address; it often has small spelling mistakes or looks unofficial.",
            "The most important rule is to never click on links or download attachments from an unknown or suspicious sender. If you receive a message that seems to be from your bank, it is safer to go to the bank's official website by typing the address yourself or using their official app, rather than clicking a link in an email."
        ],
        infographicUrl: findImage('resource-internet-safety'),
        infographicHint: 'internet security',
        keyPoints: [
            "Phishing is a scam to steal your personal information.",
            "Be wary of messages that create panic or seem too good to be true.",
            "Always check the sender's email address for mistakes.",
            "Do not click on links or download files from suspicious emails.",
            "Banks and official companies will never ask for your password via email."
        ],
        videoId: 'ybrvWd37p9w',
      },
      {
        title: 'Lesson 3: What is OTP and Why You Should Never Share It',
        paragraphs: [
            "An OTP, or One-Time Password, is a special, temporary code that is sent to your registered mobile number when you are trying to make a transaction or log in to a secure account. It acts as a second layer of security to prove that it is really you.",
            "Think of it as a digital key that only works once and expires after a few minutes. Even if someone has your password, they cannot complete the transaction without the OTP that has been sent to your phone. This is why it is such a powerful security feature.",
            "There is one absolute rule about OTPs: YOU MUST NEVER SHARE YOUR OTP WITH ANYONE. No one from a bank, a company, or even the police will ever call you and ask for your OTP. Scammers will often create a fake story to trick you into sharing it so they can steal your money. Remember, if you share your OTP, you are giving them direct access to your account."
        ],
        infographicUrl: findImage('resource-internet-safety'),
        infographicHint: 'internet security',
        keyPoints: [
            "An OTP is a temporary code sent to your phone for security.",
            "It is used to confirm that it's really you making a transaction.",
            "NEVER share your OTP with anyone, for any reason.",
            "No legitimate company or bank will ever ask you for your OTP over the phone.",
            "Sharing your OTP is like giving away the keys to your money."
        ],
        videoId: 'J3aUhb9kHhg',
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
