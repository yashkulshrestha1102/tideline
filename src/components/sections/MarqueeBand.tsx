import ScrollMarquee from '@/components/ui/ScrollMarquee';
import { marqueeRows } from '@/lib/site';
import styles from './MarqueeBand.module.css';

export default function MarqueeBand() {
  return (
    <section data-section="moving-text" className={styles.band} aria-label="What Raisedesk brings together">
      <ScrollMarquee rows={marqueeRows} />
    </section>
  );
}
