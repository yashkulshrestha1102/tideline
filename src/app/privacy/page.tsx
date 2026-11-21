import type { Metadata } from 'next';
import LegalPage from '@/components/page/LegalPage';

export const metadata: Metadata = { title: 'Privacy policy' };

const sections = [
  { title: 'Who we are', body: '[Company legal name] ("Tideline", "we", "us") operates this website and platform. This policy explains how we collect, use and protect personal data.' },
  { title: 'Data we collect', body: 'Account details (name, email, company), profile information you provide for matching, documents you upload to a data room, and usage data such as pages visited and device information.' },
  { title: 'How we use data', body: 'To create and maintain your account, compute match scores, arrange introductions you approve, operate the pitch and data rooms, improve the service and communicate with you.' },
  { title: 'Sharing', body: 'Investors and founders only see the information you choose to share. We use trusted service providers (hosting, email, analytics) under contract, and never sell personal data.' },
  { title: 'Your rights', body: 'You may access, correct, export or delete your data and withdraw consent at any time, in line with applicable law including India’s Digital Personal Data Protection Act, 2023. Contact [privacy@yourdomain.com].' },
  { title: 'Security & retention', body: 'Data is encrypted in transit and at rest and access is logged. We keep data only as long as needed for the purposes above or as required by law.' },
  { title: 'Contact', body: 'Questions or grievances: [Grievance officer name], [privacy@yourdomain.com], [registered address].' },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      crumb="Privacy policy"
      title="Privacy *policy.*"
      updated="[Date]"
      intro="How Tideline collects, uses and protects your personal data."
      sections={sections}
    />
  );
}
