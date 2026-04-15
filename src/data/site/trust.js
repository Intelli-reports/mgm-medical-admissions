import { CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE, SITE_NAME } from "../../config/site";

export const GOOGLE_MAPS_URL =
  "https://www.google.com/maps?q=Haware%20Infotech%20Park%20Vashi";

export const organizationOverview = {
  eyebrow: "About Us",
  title: `${SITE_NAME} helps families make clearer medical admission decisions`,
  paragraphs: [
    "BalaJi Admission Guidance is a counseling-focused website and office support desk for students and parents navigating NEET UG, college shortlisting, fee comparison, and admission planning.",
    "The guidance platform is led by Rahul Singh, Founder, together with a support team focused on counseling coordination, college research, parent communication, and enquiry handling.",
    "The platform combines direct counseling support with detailed medical college pages so families can review fees, intake, location, facilities, cutoff context, and next-step guidance in one place."
  ],
  bullets: [
    "One-to-one MBBS admission guidance",
    "College shortlisting and comparison support",
    "Fee, intake, and reporting-step clarity",
    "Direct office support from Vashi, Navi Mumbai"
  ],
  image: "/image/mgm-admissions-office.png"
};

export const trustContactCards = [
  {
    title: "Office Address",
    value: CONTACT_ADDRESS,
    actionLabel: "Open in Google Maps",
    href: GOOGLE_MAPS_URL
  },
  {
    title: "Direct Phone",
    value: CONTACT_PHONE,
    actionLabel: "Call Counseling Desk",
    href: `tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`
  },
  {
    title: "Email Support",
    value: CONTACT_EMAIL,
    actionLabel: "Send Email",
    href: `mailto:${CONTACT_EMAIL}`
  },
  {
    title: "Working Trust Signals",
    value: "HTTPS website, office map, contact form, and college-specific enquiry flows are all live.",
    actionLabel: "Go to Contact Page",
    href: "/contact"
  }
];

export const teamProfiles = [
  {
    name: "Rahul Singh",
    role: "Founder",
    text: "Leads the counseling approach, platform direction, and the overall student-first admission guidance workflow."
  },
  {
    name: "Counseling Support Team",
    role: "Admission coordination",
    text: "Handles first-contact enquiries, shortlist discussions, and practical counseling follow-up for students and parents."
  },
  {
    name: "College Research Team",
    role: "Fees and college comparison support",
    text: "Maintains structured college research inputs so families can compare colleges, fees, location, and intake with less guesswork."
  },
  {
    name: "Parent Support Team",
    role: "Planning and communication support",
    text: "Supports parent-side decision making around budget clarity, reporting steps, and communication readiness."
  }
];

export const trustProofPoints = [
  "Real office address published on-site",
  "Direct phone number and email available on every lead path",
  "Working WhatsApp and email enquiry flow",
  "Google Maps business-location verification link",
  "Dedicated About, Privacy Policy, and Terms pages",
  "Detailed medical college research pages for actual decision support"
];

export const googleTrustBlock = {
  eyebrow: "Google Verification",
  title: "Use the live Google listing and reviews to verify office location and contact touchpoints",
  body:
    "This website intentionally avoids hardcoding unverified Google rating numbers or copied review text. Instead, families are directed to the live Google Maps listing for location verification and direct trust checks.",
  primaryLabel: "View Google Listing and Reviews",
  primaryHref: GOOGLE_MAPS_URL,
  secondaryLabel: "Talk to Counselor",
  secondaryHref: "/contact"
};

export const legalLinks = [
  {
    label: "About Us",
    to: "/about"
  },
  {
    label: "Privacy Policy",
    to: "/privacy-policy"
  },
  {
    label: "Terms & Conditions",
    to: "/terms-and-conditions"
  }
];

export const privacySections = [
  {
    title: "Information We Collect",
    paragraphs: [
      "When you submit an enquiry on this website, we may collect your name, mobile number, email address, city, course interest, NEET score, and the message you choose to send.",
      "We also receive the information you intentionally send through WhatsApp, email, phone calls, or map directions."
    ]
  },
  {
    title: "How We Use Your Information",
    paragraphs: [
      "We use enquiry information to respond to counseling requests, provide admission guidance, share relevant college information, and follow up on requested support.",
      "We do not publish your personal data on the website."
    ]
  },
  {
    title: "Communication Consent",
    paragraphs: [
      "By contacting BalaJi Admission Guidance through the website, you consent to follow-up communication related to your enquiry through phone, WhatsApp, or email."
    ]
  },
  {
    title: "Third-Party Services",
    paragraphs: [
      "This website may open third-party services such as Google Maps, WhatsApp, email clients, YouTube, or external college resources. Their privacy practices are governed by their respective policies."
    ]
  },
  {
    title: "Contact for Privacy Questions",
    paragraphs: [
      `For privacy-related requests, contact ${SITE_NAME} at ${CONTACT_EMAIL} or visit the office at ${CONTACT_ADDRESS}.`
    ]
  }
];

export const termsSections = [
  {
    title: "Website Purpose",
    paragraphs: [
      "This website is intended to provide medical admission guidance, college information, contact access, and educational support content for students and parents."
    ]
  },
  {
    title: "No Admission Guarantee",
    paragraphs: [
      "Counseling support, college research, and planning assistance do not guarantee admission, seat allotment, fee stability, or final cutoff outcomes. Admission outcomes depend on official counseling rules, merit, eligibility, and institutional processes."
    ]
  },
  {
    title: "Information Accuracy",
    paragraphs: [
      "We aim to keep website content practical and current, but fees, intake, cutoff trends, college facilities, and counseling timelines can change. Users should verify critical decisions with official counseling authorities and institutions."
    ]
  },
  {
    title: "External Links",
    paragraphs: [
      "The website may include links to external websites, maps, videos, or communication services. BalaJi Admission Guidance is not responsible for the content or availability of third-party platforms."
    ]
  },
  {
    title: "Contact",
    paragraphs: [
      `For questions about these terms, contact ${SITE_NAME} at ${CONTACT_EMAIL} or ${CONTACT_PHONE}.`
    ]
  }
];
