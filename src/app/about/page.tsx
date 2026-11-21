import type { Metadata } from 'next';
import PageHero from '@/components/page/PageHero';
import Statement from '@/components/sections/Statement';
import NumberBand from '@/components/page/NumberBand';
import FeatureGrid from '@/components/page/FeatureGrid';
import TeamGrid from '@/components/page/TeamGrid';
import MarqueeBand from '@/components/sections/MarqueeBand';
import CtaBand from '@/components/sections/CtaBand';
import { aboutPage as p } from '@/lib/pages';

export const metadata: Metadata = {
  title: 'About',
  description: 'Why Tideline exists and the principles behind how we match founders and investors.',
};

export default function AboutPage() {
  return (
    <main>
      <PageHero {...p.hero} flip />
      <Statement eyebrow="Our mission" text={p.mission} />
      <NumberBand items={p.numbers} />
      <FeatureGrid {...p.values} dark />
      <TeamGrid team={p.team} />
      <MarqueeBand />
      <CtaBand />
    </main>
  );
}
