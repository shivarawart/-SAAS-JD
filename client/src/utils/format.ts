export class FormatUtils {
  /**
   * Truncate long text safely
   */
  static truncate(text: string, length: number = 100): string {
    if (!text) return "";
    return text.length > length ? text.slice(0, length) + "..." : text;
  }

  /**
   * Capitalize first letter
   */
  static capitalize(text: string): string {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  /**
   * Convert array to bullet string (for UI display)
   */
  static toBulletList(items: string[]): string {
    return items.map((item) => `• ${item}`).join("\n");
  }
}