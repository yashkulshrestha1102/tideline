import type { Metadata } from 'next';
import MatchWizard from '@/components/forms/MatchWizard';

export const metadata: Metadata = {
  title: 'Get matched',
  description: 'Create your Tideline profile in four quick steps and get your first matches.',
};

export default function GetMatchedPage() {
  return (
    <main>
      <MatchWizard />
    </main>
  );
}
