"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

import buildClient from "@/api/buildClient";
import Errors from "@/app/components/form/Errors/Errors";
import Input from "@/app/components/form/Input/Input";
import { mapErrors } from "@/utils/mapErrors";

import SynonymList from "./components/SynonymList/SynonymList";

import styles from "./page.module.scss";

export default function SearchSynonymsPage() {
  const [word, setWord] = useState("");
  const [synonyms, setSynonyms] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [showSynonyms, setShowSynonyms] = useState(false);

  const handleChangeWord = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setWord(event.target.value);
      setErrors((prev) => ({ ...prev, word: [] }));
      setShowSynonyms(false);
    },
    []
  );

  const fetchSynonyms = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);
      setSynonyms([]);
      setErrors({});
      try {
        const { data } = await buildClient().get(`/api/synonyms/${word || ""}`);
        setSynonyms(data.synonyms);
        setShowSynonyms(true);
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
        <Input
          errors={errors.word}
          id="wordInput"
          placeholder="Enter a word"
          type="text"
          value={word}
          onChange={handleChangeWord}
        />
        <Errors errors={errors.general} />
        <button
          className={styles.button}
          disabled={loading || !word}
          id="searchSynonymButton"
          type="submit"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {showSynonyms && <SynonymList items={synonyms} word={word} />}
      <Errors errors={errors.message} />
    </main>
  );
}
