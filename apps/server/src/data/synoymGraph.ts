export class SynonymGraph {
  private graph: Map<string, Set<string>>;

  constructor() {
    this.graph = new Map();
  }

  /**
   * Add a synonym pair to the graph
   * @param a - The first word
   * @param b - The second word
   */
  addSynonymPair(a: string, b: string) {
    const word1 = a.trim().toLocaleLowerCase();
    const word2 = b.trim().toLocaleLowerCase();

    if (!this.graph.has(word1)) this.graph.set(word1, new Set());
    if (!this.graph.has(word2)) this.graph.set(word2, new Set());

    this.graph.get(word1)?.add(word2);
    this.graph.get(word2)?.add(word1);
  }

  /**
   * Get all synonyms for a word
   * @param word - The word to get synonyms for
   * @returns An array of synonyms
   */
  getSynonyms(word: string) {
    word = word.toLowerCase().trim();
    if (!this.graph.has(word)) return [];

    const visited = new Set();
    const stack = [word];

    while (stack.length > 0) {
      const current = stack.pop()!;
      if (!visited.has(current)) {
        visited.add(current);
        const neighbors = this.graph.get(current) || [];
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            stack.push(neighbor);
          }
        }
      }
    }

    visited.delete(word);
    return Array.from(visited);
  }
}
