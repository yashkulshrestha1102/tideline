import type { Metadata } from 'next';
import PageHero from '@/components/page/PageHero';
import ContactForm from '@/components/forms/ContactForm';
import Faq from '@/components/sections/Faq';
import { contactPage as p } from '@/lib/pages';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Tideline team.',
};

export default function ContactPage() {
  return (
    <main>
      <PageHero {...p.hero} compact />
      <ContactForm channels={p.channels} topics={p.topics} />
      <Faq />
    </main>
  );
}
