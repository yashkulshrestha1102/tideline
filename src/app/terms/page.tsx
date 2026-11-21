import type { Metadata } from 'next';
import LegalPage from '@/components/page/LegalPage';

export const metadata: Metadata = { title: 'Terms of use' };

const sections = [
  { title: 'Acceptance', body: 'By creating an account or using Tideline you agree to these terms. If you use Tideline on behalf of an organisation, you confirm you are authorised to bind it.' },
  { title: 'The service', body: 'Tideline provides software to help founders and investors discover and connect with each other. We are not a broker, investment adviser or fund, and nothing on the platform is investment advice.' },
  { title: 'Your account', body: 'Keep your login details secure and the information you provide accurate. You are responsible for activity under your account.' },
  { title: 'Content you share', body: 'You keep ownership of everything you upload. You grant us a limited licence to host and display it only as needed to run the service for you.' },
  { title: 'Acceptable use', body: 'Do not misuse the platform, misrepresent yourself or your company, scrape data, or share another user’s confidential information without permission.' },
  { title: 'Fees', body: 'Paid plans are billed as described on the Pricing page. [Add your refund and cancellation terms.]' },
  { title: 'Liability', body: 'The service is provided “as is”. To the extent permitted by law, our liability is limited to the fees you paid in the 12 months before a claim.' },
  { title: 'Governing law', body: 'These terms are governed by the laws of India. Courts at [City] have exclusive jurisdiction.' },
];

export default function TermsPage() {
  return (
    <LegalPage
      crumb="Terms of use"
      title="Terms of *use.*"
      updated="[Date]"
      intro="The rules for using Tideline. Please read them carefully."
      sections={sections}
    />
  );
}
