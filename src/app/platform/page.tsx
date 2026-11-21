import type { Metadata } from 'next';
import PageHero from '@/components/page/PageHero';
import Timeline from '@/components/page/Timeline';
import FeatureRows from '@/components/page/FeatureRows';
import MarqueeBand from '@/components/sections/MarqueeBand';
import Faq from '@/components/sections/Faq';
import CtaBand from '@/components/sections/CtaBand';
import { platformPage as p } from '@/lib/pages';

export const metadata: Metadata = {
  title: 'The Platform',
  description: 'How Tideline takes founders from profile to term sheet with AI matching, pitch rooms and secure data rooms.',
};

export default function PlatformPage() {
  return (
    <main>
      <PageHero {...p.hero} />
      <Timeline id="how-it-works" {...p.timeline} />
      <FeatureRows rows={p.rows} />
      <MarqueeBand />
      <Faq items={p.faq} title="Platform *questions.*" />
      <CtaBand />
    </main>
  );
}
