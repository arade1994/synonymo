import { SynonymGraph } from "../synoymGraph";

describe("SynonymGraph", () => {
  let graph: SynonymGraph;

  beforeEach(() => {
    graph = new SynonymGraph();
  });

  test("Adds and retrieves direct synonyms", () => {
    graph.addSynonymPair("clean", "wash");
    const synonyms = graph.getSynonyms("clean");
    expect(synonyms).toEqual(["wash"]);
  });

  test("Returns empty array for unknown word", () => {
    expect(graph.getSynonyms("unknown")).toEqual([]);
  });

  test("Supports bidirectional synonyms", () => {
    graph.addSynonymPair("clean", "wash");
    expect(graph.getSynonyms("wash").sort()).toEqual(["clean"]);
  });

  test("Supports transitive synonyms", () => {
    graph.addSynonymPair("clean", "wash");
    graph.addSynonymPair("wash", "sanitize");
    const result = graph.getSynonyms("clean").sort();
    expect(result).toEqual(["sanitize", "wash"]);
  });

  test("Ignores duplicate synonyms", () => {
    graph.addSynonymPair("clean", "wash");
    graph.addSynonymPair("clean", "wash");
    expect(graph.getSynonyms("clean")).toEqual(["wash"]);
  });

  test("Trims and normalizes casing", () => {
    graph.addSynonymPair("  cleaN", " WASh  ");
    const synonyms = graph.getSynonyms("CLEAN");
    expect(synonyms).toEqual(["wash"]);
  });
});
