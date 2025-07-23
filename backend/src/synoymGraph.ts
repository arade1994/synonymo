export class SynonymGraph {
  private graph: Map<string, Set<string>>;

  constructor() {
    this.graph = new Map();
  }

  addSynonymPair(a: string, b: string) {
    const word1 = a.toLocaleLowerCase();
    const word2 = b.toLocaleLowerCase();

    if (!this.graph.has(word1)) this.graph.set(word1, new Set());
    if (!this.graph.has(word2)) this.graph.set(word2, new Set());

    this.graph.get(word1)?.add(word2);
    this.graph.get(word2)?.add(word1);
  }

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

    visited.delete(word); // don't include the original word
    return Array.from(visited);
  }
}
