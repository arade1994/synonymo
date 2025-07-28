"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

import buildClient from "@/api/buildClient";
import { mapErrors } from "@/utils/mapErrors";

import styles from "./page.module.scss";

export default function SearchSynonymsPage() {
  const [word, setWord] = useState("");
  const [synonyms, setSynonyms] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const fetchSynonyms = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);
      setSynonyms([]);
      setErrors({});
      try {
        const { data } = await buildClient().get(`/api/synonyms/${word || ""}`);
        setSynonyms(data.synonyms);
      } catch (error: any) {
        const errorData = error.response?.data?.errors;
        if (errorData) {
          toast.error("Something went wrong!");
          const mappedErrors = mapErrors(errorData);
          setErrors(mappedErrors);
        } else {
          setErrors({ general: ["An unexpected error occurred."] });
        }
      } finally {
        setLoading(false);
      }
    },
    [word]
  );

  return (
    <main className={styles.main}>
      <Link className={styles.homeLink} href="/" id="homeLink">
        &larr; Back to Home
      </Link>
      <h1 className={styles.title}>
        Search <span className={styles.highlight}>for</span> Synonyms
      </h1>
      <form className={styles.form} onSubmit={fetchSynonyms}>
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            id="wordInput"
            placeholder="Enter a word"
            type="text"
            value={word}
            onChange={(e) => {
              setWord(e.target.value);
              setErrors((prev) => ({ ...prev, word: [] }));
            }}
          />
          {errors.word && (
            <div className={styles.error}>{errors.word.join(", ")}</div>
          )}
        </div>
        {errors.general && (
          <div className={styles.error}>{errors.general.join(", ")}</div>
        )}
        <button
          className={styles.button}
          disabled={loading || !word}
          id="searchSynonymButton"
          type="submit"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {synonyms.length > 0 && (
        <div className={styles.synonyms}>
          <h2>
            Synonyms for <strong>{word}</strong>
          </h2>
          <ul>
            {synonyms.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      )}
      {errors.message && <div className={styles.error}>{errors.message}</div>}
    </main>
  );
}
