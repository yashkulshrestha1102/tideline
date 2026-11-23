import ScrollMarquee from '@/components/ui/ScrollMarquee';
import { marqueeRows } from '@/lib/site';
import styles from './MarqueeBand.module.css';

export default function MarqueeBand() {
  return (
    <section className={styles.band} aria-label="What Raisedesk brings together">
      <ScrollMarquee rows={marqueeRows} />
    </section>
  );
}
