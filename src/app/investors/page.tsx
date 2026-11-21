import type { Metadata } from 'next';
import PageHero from '@/components/page/PageHero';
import FeatureRows from '@/components/page/FeatureRows';
import FeatureGrid from '@/components/page/FeatureGrid';
import Statement from '@/components/sections/Statement';
import CtaBand from '@/components/sections/CtaBand';
import { investorsPage as p } from '@/lib/pages';

export const metadata: Metadata = {
  title: 'For Investors',
  description: 'Pre-screened, thesis-matched deal flow with structured data and diligence-ready data rooms.',
};

export default function InvestorsPage() {
  return (
    <main>
      <PageHero {...p.hero} flip />
      <FeatureRows rows={p.rows} />
      <FeatureGrid {...p.benefits} dark />
      <Statement />
      <CtaBand />
    </main>
  );
}
