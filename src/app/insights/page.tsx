import type { Metadata } from 'next';
import PageHero from '@/components/page/PageHero';
import ArticleGrid from '@/components/page/ArticleGrid';
import FeatureGrid from '@/components/page/FeatureGrid';
import Stories from '@/components/sections/Stories';
import CtaBand from '@/components/sections/CtaBand';
import { insightsPage as p } from '@/lib/pages';

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Guides, funding reports and success stories for founders and investors.',
};

export default function InsightsPage() {
  return (
    <main>
      <PageHero {...p.hero} compact flip />
      <ArticleGrid categories={p.categories} articles={p.articles} />
      <FeatureGrid
        id="reports"
        eyebrow="Funding reports"
        title="Data on how capital *moves.*"
        text="Download-ready reports — replace the bracketed periods when you publish."
        dark
        items={p.reports.map((r) => ({ icon: 'chart', title: r.title, text: `${r.period} · ${r.text}` }))}
      />
      <Stories />
      <CtaBand />
    </main>
  );
}
