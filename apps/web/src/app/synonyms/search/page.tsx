import Link from "next/link";

import styles from "./page.module.scss";

export default function SearchSynonymsPage() {
  return (
    <main className={styles.main}>
      <Link className={styles.homeLink} href="/" id="homeLink">
        &larr; Back to Home
      </Link>
      <h1 className={styles.title}>Search for Synonyms</h1>
      <p>Search functionality coming soon!</p>
    </main>
  );
}
