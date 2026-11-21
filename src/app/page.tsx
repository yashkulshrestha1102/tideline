import Hero from '@/components/sections/Hero';
import Journey from '@/components/sections/Journey';
import MarqueeBand from '@/components/sections/MarqueeBand';
import Statement from '@/components/sections/Statement';
import AiMatching from '@/components/sections/AiMatching';
import AudienceSplit from '@/components/sections/AudienceSplit';
import ToolkitScroller from '@/components/sections/ToolkitScroller';
import Stories from '@/components/sections/Stories';
import Faq from '@/components/sections/Faq';
import CtaBand from '@/components/sections/CtaBand';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Journey />
      <MarqueeBand />
      <Statement />
      <AiMatching />
      <AudienceSplit />
      <ToolkitScroller />
      <Stories />
      <Faq />
      <CtaBand />
    </main>
  );
}
