import type { Metadata } from 'next';
import SignInForm from '@/components/forms/SignInForm';

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to your Raisedesk workspace.',
};

export default function SignInPage() {
  return (
    <main>
      <SignInForm />
    </main>
  );
}
