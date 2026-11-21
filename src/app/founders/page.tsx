import type { Metadata } from 'next';
import PageHero from '@/components/page/PageHero';
import FeatureRows from '@/components/page/FeatureRows';
import FeatureGrid from '@/components/page/FeatureGrid';
import ToolkitScroller from '@/components/sections/ToolkitScroller';
import Faq from '@/components/sections/Faq';
import CtaBand from '@/components/sections/CtaBand';
import { foundersPage as p } from '@/lib/pages';

export const metadata: Metadata = {
  title: 'For Founders',
  description: 'Build one profile, get matched with aligned investors, and pitch, share and close in one place.',
};

export default function FoundersPage() {
  return (
    <main>
      <PageHero {...p.hero} />
      <FeatureRows rows={p.rows} />
      <ToolkitScroller />
      <FeatureGrid id="founder-tools" {...p.toolkit} />
      <Faq items={p.faq} title="Founder *questions.*" />
      <CtaBand />
    </main>
  );
}
