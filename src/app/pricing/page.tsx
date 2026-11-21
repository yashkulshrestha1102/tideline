import type { Metadata } from 'next';
import PageHero from '@/components/page/PageHero';
import PricingTable from '@/components/page/PricingTable';
import Faq from '@/components/sections/Faq';
import CtaBand from '@/components/sections/CtaBand';
import { pricingPage as p } from '@/lib/pages';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple plans for founders and investors. Start free and upgrade when your round is in motion.',
};

export default function PricingPage() {
  return (
    <main>
      <PageHero {...p.hero} compact />
      <PricingTable founders={p.founders} investors={p.investors} />
      <Faq items={p.faq} title="Pricing *questions.*" />
      <CtaBand />
    </main>
  );
}
