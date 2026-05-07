export class TextUtils {
  /**
   * Clean job description text
   * Removes extra spaces, weird formatting, noise
   */
  static cleanJobDescription(text: string): string {
    return text
      .replace(/\r/g, "")
      .replace(/\t/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  /**
   * Extract basic keywords (lightweight heuristic layer)
   * Useful before sending to LLM
   */
  static extractKeywords(text: string): string[] {
    const words = text
      .toLowerCase()
      .split(/[^a-zA-Z0-9+.#]/)
      .filter((w) => w.length > 2);

    return [...new Set(words)];
  }
}