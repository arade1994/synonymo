import Link from "next/link";

import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Welcome to <span className={styles.highlight}>Synonymo</span>
        </h1>
        <p className={styles.description}>
          The fun and easy way to build your vocabulary. Add new words and
          discover their synonyms, or search for existing ones to expand your
          lexicon.
        </p>
        <div className={styles.ctaContainer}>
          <Link className={styles.ctaButton} href="/synonyms">
            Add Synonyms
          </Link>
          <Link className={styles.ctaButtonSecondary} href="/synonyms/search">
            Search Synonyms
          </Link>
        </div>
      </div>
    </main>
  );
}
