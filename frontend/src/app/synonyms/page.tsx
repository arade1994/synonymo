"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import buildClient from "@/api/buildClient";
import { mapErrors } from "@/utils/mapErrors";

import styles from "./page.module.css";

const client = buildClient();

export default function SynonymsPage() {
  const router = useRouter();

  const [word, setWord] = useState("");
  const [synonym, setSynonym] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      setErrors({});
      try {
        await client.post("/api/synonyms", { word, synonym });
        toast.success("Synonym added successfully");
        router.push("/");
      } catch (error: any) {
        const errorData = error.response?.data?.errors;
        if (errorData) {
          toast.error("Something went wrong!");
          const mappedErrors = mapErrors(errorData);
          setErrors(mappedErrors);
        } else {
          setErrors({ general: ["An unexpected error occurred."] });
        }
      }
    },
    [word, synonym, router]
  );

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        Add a <span className={styles.highlight}>new</span> Synonym
      </h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            id="word"
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
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            id="synonym"
            placeholder="Enter a synonym"
            type="text"
            value={synonym}
            onChange={(e) => {
              setSynonym(e.target.value);
              setErrors((prev) => ({ ...prev, synonym: [] }));
            }}
          />
          {errors.synonym && (
            <div className={styles.error}>{errors.synonym.join(", ")}</div>
          )}
        </div>
        {errors.general && (
          <div className={styles.error}>{errors.general.join(", ")}</div>
        )}
        <button className={styles.button} type="submit">
          Add Synonym
        </button>
      </form>
    </main>
  );
}
