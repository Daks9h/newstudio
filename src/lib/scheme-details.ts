
import { Leaf, HeartPulse, Users, Home, Flame, Shield, Droplets, Banknote, School, Sprout, IndianRupee, Baby, PersonStanding, School2, Briefcase } from "lucide-react";
import type { SchemeDetails } from "./types";

export const allSchemeDetails: SchemeDetails[] = [
  {
    name: "PM-KISAN",
    slug: "pm-kisan",
    icon: Leaf,
    category: "Agriculture",
    shortDescription: "Income support of Rs. 6,000 per year for all landholding farmer families.",
    longDescription: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a central sector scheme with 100% funding from Government of India. It has become operational from 1.12.2018. Under the scheme an income support of 6,000/- per year in three equal installments will be provided to all land holding farmer families.",
    eligibility: [
      "Must be an Indian citizen.",
      "The scheme is applicable to all landholding farmer families.",
      "The definition of family for the scheme is husband, wife and minor children.",
      "Certain categories of higher economic status are excluded (e.g., institutional land holders, government employees, income tax payers)."
    ],
    applicationProcess: [
      "Visit the official PM-KISAN website.",
      "Find the 'Farmers Corner' section on the homepage.",
      "Click on the 'New Farmer Registration' link.",
      "Enter your Aadhaar number and the captcha text, then click 'Click here to continue'.",
      "Fill in the registration form with your personal and land details.",
      "Upload the required documents and submit the form."
    ],
    documents: ["Aadhaar Card", "Landholding Papers", "Bank Account Passbook", "Citizenship Certificate"],
    websiteUrl: "https://pmkisan.gov.in/",
  },
  {
    name: "Ayushman Bharat (PM-JAY)",
    slug: "ayushman-bharat",
    icon: HeartPulse,
    category: "Healthcare",
    shortDescription: "Health insurance coverage up to Rs. 5 lakh per family per year.",
    longDescription: "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY) is a national public health insurance fund of the Government of India that aims to provide free access to health insurance coverage for low income earners in the country. It provides a cover of Rs. 5 lakh per family per year for secondary and tertiary care hospitalization.",
    eligibility: [
      "Families must be listed in the Socio-Economic Caste Census (SECC) 2011 data.",
      "There is no cap on family size or age of members.",
      "The scheme covers poor and vulnerable families based on deprivation and occupational criteria from SECC data.",
      "You can check eligibility on the official website."
    ],
    applicationProcess: [
      "Visit the official PM-JAY website.",
      "Click on the 'Am I Eligible' button on the homepage.",
      "Enter your mobile number, captcha, and generate an OTP.",
      "Select your state and search by your name, HHD number, ration card number, or mobile number.",
      "If your family is eligible, you can get your Ayushman card from the nearest empaneled hospital or Common Service Centre (CSC)."
    ],
    documents: ["Aadhaar Card", "Ration Card", "SECC 2011 HHD Number", "Mobile Number"],
    websiteUrl: "https://pmjay.gov.in/",
  },
  {
    name: "MGNREGA",
    slug: "mgnrega",
    icon: Users,
    category: "Employment",
    shortDescription: "Guarantees 100 days of wage employment in a financial year to a rural household.",
    longDescription: "The Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA) aims to enhance livelihood security in rural areas by providing at least 100 days of guaranteed wage employment in a financial year to every household whose adult members volunteer to do unskilled manual work.",
    eligibility: [
      "Must be a citizen of India and at least 18 years old at the time of application.",
      "The applicant must be part of a rural household.",
      "The applicant must volunteer to do unskilled manual work."
    ],
    applicationProcess: [
      "Application is typically done offline.",
      "Visit your local Gram Panchayat office and request the prescribed form for registration.",
      "Fill out the form and submit it along with photographs and copies of required documents.",
      "The Gram Panchayat will verify your details.",
      "After verification, a Job Card will be issued to your household. This card contains details of adult members of the household."
    ],
    documents: ["Aadhaar Card", "Ration Card", "Bank/Post Office Passbook", "Passport-size Photographs"],
    websiteUrl: "https://nrega.nic.in/",
  },
  {
    name: "PM Awas Yojana (Gramin)",
    slug: "pm-awas-yojana",
    icon: Home,
    category: "Housing",
    shortDescription: "Financial assistance for constructing a 'pucca' (permanent) house with basic amenities.",
    longDescription: "Pradhan Mantri Awas Yojana - Gramin (PMAY-G) aims to provide a pucca house with basic amenities to all houseless households and households living in kutcha and dilapidated house in rural areas by 2024.",
    eligibility: [
      "The family must be houseless or living in houses with zero, one, or two rooms with kutcha wall and kutcha roof.",
      "The family should not own any pucca house anywhere in India.",
      "The selection of beneficiaries is done based on SECC 2011 data and confirmed by the Gram Sabha."
    ],
    applicationProcess: [
      "Registration is typically done by local government officials, not by direct application from citizens.",
      "The list of eligible beneficiaries is prepared from the SECC 2011 data.",
      "This list is verified by the Gram Sabha.",
      "You can find the beneficiary list on the official website under the 'Awaassoft' -> 'Reports' -> 'Beneficiary details for verification' section.",
      "Contact your Gram Panchayat to know if your name is on the list."
    ],
    documents: ["Aadhaar Card", "Bank Account Details", "Swachh Bharat Mission (SBM) Number", "MGNREGA Job Card Number"],
    websiteUrl: "https://pmayg.nic.in/netiay/home.aspx",
  },
  {
    name: "PM Ujjwala Yojana",
    slug: "pm-ujjwala-yojana",
    icon: Flame,
    category: "Basic Needs",
    shortDescription: "Provides clean cooking fuel (LPG) to women from Below Poverty Line (BPL) households.",
    longDescription: "The Pradhan Mantri Ujjwala Yojana (PMUY) aims to safeguard the health of women and children by providing them with clean cooking fuel (LPG), so they don’t have to compromise their health in smoky kitchens.",
    eligibility: [
        "Applicant must be a woman above the age of 18.",
        "Must belong to a BPL (Below Poverty Line) household.",
        "The household should not already have an LPG connection.",
        "Must have a savings bank account and Aadhaar number."
    ],
    applicationProcess: [
        "Visit the official PMUY website.",
        "Click on 'Apply for New Ujjwala 2.0 Connection' on the homepage.",
        "You will see options for Indane, Bharatgas, and HP Gas. Click on the one you prefer.",
        "You will be redirected to the Oil Marketing Company's portal. Fill out the online application form.",
        "Alternatively, you can download the form, fill it, and submit it at the nearest LPG distributor."
    ],
    documents: ["KYC Form", "Aadhaar Card", "Ration Card", "Bank Account Passbook"],
    websiteUrl: "https://www.pmuy.gov.in/",
  },
  {
    name: "PM Fasal Bima Yojana",
    slug: "pm-fasal-bima-yojana",
    icon: Shield,
    category: "Agriculture",
    shortDescription: "Crop insurance for farmers against yield losses due to unforeseen events.",
    longDescription: "The Pradhan Mantri Fasal Bima Yojana (PMFBY) provides a comprehensive insurance cover against failure of the crop thus helping in stabilising the income of the farmers.",
    eligibility: [
        "All farmers including sharecroppers and tenant farmers growing notified crops in the notified areas are eligible for coverage.",
        "Farmers must have an insurable interest in the crop.",
        "The scheme is compulsory for loanee farmers availing crop loans for notified crops and voluntary for non-loanee farmers."
    ],
    applicationProcess: [
        "Visit the official PMFBY portal.",
        "Click on 'Farmer Application' on the homepage.",
        "If you are a new user, click on 'Guest Farmer' to register. Fill in your details.",
        "After registration, log in and fill out the insurance application form.",
        "You need to provide your land details, crop details, and bank account information.",
        "You can also enroll through your nearest bank, Primary Agricultural Credit Society (PACS), or Common Service Centre (CSC)."
    ],
    documents: ["Aadhaar Card", "Land Records (RoR, Khasra number)", "Sowing Certificate", "Bank Passbook"],
    websiteUrl: "https://pmfby.gov.in/",
  },
  {
    name: "Atal Pension Yojana (APY)",
    slug: "atal-pension-yojana",
    icon: IndianRupee,
    category: "Social Welfare",
    shortDescription: "A pension scheme for citizens in the unorganized sector, providing a fixed monthly pension.",
    longDescription: "Atal Pension Yojana (APY) is a government-backed pension scheme in India, targeted at the unorganized sector. Subscribers receive a fixed monthly pension of Rs. 1,000 to Rs. 5,000 after the age of 60, depending on their contributions.",
    eligibility: [
        "Must be an Indian citizen.",
        "Age must be between 18 and 40 years.",
        "Must have a savings bank account or a post office savings bank account.",
        "Should not be a member of any other social security scheme or an income tax payer."
    ],
    applicationProcess: [
        "Approach your bank or post office branch where you hold a savings account.",
        "Ask for the APY registration form.",
        "Fill the form with your account number, Aadhaar number, and mobile number.",
        "Specify the pension amount you want to receive (Rs. 1,000, Rs. 2,000, Rs. 3,000, Rs. 4,000, or Rs. 5,000).",
        "The contribution amount will be automatically debited from your account every month."
    ],
    documents: ["Aadhaar Card", "Bank/Post Office Account Details", "Mobile Number"],
    websiteUrl: "https://www.npscra.nsdl.co.in/scheme-details.php",
  },
  {
    name: "Sukanya Samriddhi Yojana (SSY)",
    slug: "sukanya-samriddhi-yojana",
    icon: Baby,
    category: "Social Welfare",
    shortDescription: "A small savings scheme for the girl child to build a fund for her future.",
    longDescription: "The Sukanya Samriddhi Yojana (SSY) is a savings scheme launched as part of the Beti Bachao, Beti Padhao campaign. It enables parents to build a fund for the future education and marriage expenses for their female child.",
    eligibility: [
        "An account can be opened by the natural or legal guardian for a girl child.",
        "The girl child must be below the age of 10 at the time of account opening.",
        "A family can open a maximum of two accounts for two different girl children (exceptions for twins/triplets)."
    ],
    applicationProcess: [
        "Visit any Post Office or an authorized branch of a commercial bank.",
        "Fill out the SSY Account Opening Form (Form-1).",
        "Submit the form along with the initial deposit (minimum Rs. 250) and required documents.",
        "The bank or post office will provide a passbook after the account is opened."
    ],
    documents: ["SSY Account Opening Form", "Birth Certificate of the Girl Child", "Guardian's ID Proof", "Guardian's Address Proof"],
    websiteUrl: "https://www.indiapost.gov.in/Financial/Pages/Content/sukanya-samriddhi-yojana.aspx",
  },
  {
    name: "Old Age Pension Scheme",
    slug: "old-age-pension",
    icon: PersonStanding,
    category: "Social Welfare",
    shortDescription: "Provides monthly financial assistance to senior citizens who are in need.",
    longDescription: "The Indira Gandhi National Old Age Pension Scheme (IGNOAPS) is a non-contributory old age pension scheme that covers Indians who are 60 years and above and live below the poverty line.",
    eligibility: [
      "Applicant must be 60 years or older.",
      "Must belong to a household living below the poverty line (BPL) as per government criteria.",
      "Must not be receiving any other pension from the government or any other source."
    ],
    applicationProcess: [
      "Visit the Social Welfare Department or the Block Development Office in your area.",
      "Obtain the application form for the Old Age Pension Scheme.",
      "Fill the form completely and attach all required documents.",
      "Submit the form to the concerned authority.",
      "The application will be verified, and after approval, the pension amount will be credited to the beneficiary's bank account."
    ],
    documents: ["Aadhaar Card", "Proof of Age (Birth Certificate or School Certificate)", "BPL Ration Card", "Bank Passbook", "Passport-size Photograph"],
    websiteUrl: "https://nsap.nic.in/nsap-component/indira-gandhi-national-old-age-pension-scheme",
  },
  {
    name: "National Scholarship Portal",
    slug: "national-scholarship",
    icon: School2,
    category: "Social Welfare",
    shortDescription: "A single portal for students to apply for various educational scholarships.",
    longDescription: "The National Scholarship Portal (NSP) is a one-stop solution through which various services starting from student application, receipt, processing, sanction and disbursal of various scholarships to students are enabled.",
    eligibility: [
      "Eligibility varies greatly depending on the specific scholarship.",
      "Open to students from primary school to post-doctoral level.",
      "Schemes are available for minority communities, SC/ST students, and students with disabilities, among others."
    ],
    applicationProcess: [
      "Visit the National Scholarship Portal (NSP) website.",
      "Click on 'New Registration' on the top menu.",
      "Read the guidelines, agree to the terms, and continue.",
      "Fill in your basic details like state, scholarship category, name, date of birth, mobile number, and bank details.",
      "Register and you will receive an Application ID.",
      "Log in with your Application ID and password to complete the detailed application form and apply for specific schemes."
    ],
    documents: ["Aadhaar Card", "Educational Certificates", "Caste/Community Certificate (if applicable)", "Income Certificate", "Bank Passbook", "Passport-size Photograph"],
    websiteUrl: "https://scholarships.gov.in/",
  },
  {
    name: "Mudra Yojana (PMMY)",
    slug: "mudra-yojana",
    icon: Briefcase,
    category: "Social Welfare",
    shortDescription: "Provides loans up to Rs. 10 lakh to non-corporate, non-farm small/micro enterprises.",
    longDescription: "Pradhan Mantri MUDRA Yojana (PMMY) provides loans to small business owners. Loans are given through commercial banks, RRBs, Small Finance Banks, MFIs and NBFCs. The borrower can approach any of these lending institutions or apply online.",
    eligibility: [
      "Any Indian Citizen who has a business plan for a non-farm sector income generating activity.",
      "The business must be in manufacturing, processing, trading or service sector.",
      "The credit need should be up to Rs. 10 lakh."
    ],
    applicationProcess: [
      "Visit the Udyamimitra portal (www.udyamimitra.in) to apply online.",
      "Alternatively, visit the nearest branch of a bank, MFI, or NBFC.",
      "Present your business idea along with the filled MUDRA loan application form.",
      "Submit all the required documents.",
      "The loan will be sanctioned based on the bank's eligibility norms."
    ],
    documents: ["MUDRA Application Form", "Proof of Identity & Address (Aadhaar, Voter ID, etc.)", "Business Plan", "Quotations for machinery/items to be purchased", "Passport-size Photographs"],
    websiteUrl: "https://www.mudra.org.in/",
  }
];
