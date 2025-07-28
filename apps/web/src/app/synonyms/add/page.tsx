"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import buildClient from "@/api/buildClient";
import Errors from "@/app/components/form/Errors/Errors";
import Input from "@/app/components/form/Input/Input";
import { mapErrors } from "@/utils/mapErrors";

import styles from "./page.module.scss";

const client = buildClient();

export default function SynonymsPage() {
  const router = useRouter();

  const [word, setWord] = useState("");
  const [synonym, setSynonym] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleChangeWord = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setWord(event.target.value);
      setErrors((prev) => ({ ...prev, word: [] }));
    },
    []
  );

  const handleChangeSynonym = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSynonym(event.target.value);
      setErrors((prev) => ({ ...prev, synonym: [] }));
    },
    []
  );

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
      <Link className={styles.homeLink} href="/" id="homeLink">
        &larr; Back to Home
      </Link>
      <h1 className={styles.title}>
        Add a <span className={styles.highlight}>new</span> Synonym
      </h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          errors={errors.word}
          id="wordInput"
          placeholder="Enter a word"
          type="text"
          value={word}
          onChange={handleChangeWord}
        />
        <Input
          errors={errors.synonym}
          id="synonymInput"
          placeholder="Enter a synonym"
          type="text"
          value={synonym}
          onChange={handleChangeSynonym}
        />
        <Errors errors={errors.general} />
        <button
          className={styles.button}
          disabled={!word || !synonym}
          id="addSynonymButton"
          type="submit"
        >
          Add Synonym
        </button>
      </form>
    </main>
  );
}
