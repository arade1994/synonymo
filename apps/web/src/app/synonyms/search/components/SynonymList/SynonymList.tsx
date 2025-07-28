import styles from "./SynonymList.module.scss";

interface Props {
  items: string[];
  word: string;
}

const SynonymList: React.FC<React.PropsWithChildren<Props>> = ({
  items,
  word,
}) => {
  if (items.length === 0) {
    return (
      <div className={styles.noSynonyms}>
        There are no synonyms for <strong>{word}</strong>
      </div>
    );
  }

  return (
    <div className={styles.synonyms}>
      <h2>
        Synonyms for <strong>{word}</strong>
      </h2>
      <ul>
        {items.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </div>
  );
};

export default SynonymList;
